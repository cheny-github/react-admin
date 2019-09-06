import React, { Component } from 'react'
import {Card,Select,Input,Button,Icon,Table, message} from 'antd'

import './production.less'
import {reqProductionPage,reqSetProductionStatus,reqSearchProductions} from  '../../../../api/api'
import {debounce} from '../../../../uitls/functionUtils';
import {LinkButton} from '../../../../components/link-button/link-button'
const {Option} = Select

export default class Production extends Component {
   
    productToBeView =null
    productToBeModified =null
   
    state={
        productList:[],
        total:0,
        searchType:'productName',
        pageSize:3,
        keyword:'',
        currentPage:1,
        flag_searchResult:false //展示的结果是通过reqSearchProductions请求的
    }
   
   
    render() {
        const {columns,} = this
        const {productList,total,pageSize,currentPage:current,flag_searchResult,keyword} = this.state
        const title =(<div>
            <Select onChange={(searchType)=>{this.setState({searchType})}} defaultValue='productName' style={{width:150}}>
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input onChange={this.handleSearchInput} placeholder='请输入关键字进行搜索' style={{width:200,margin:'0 10px'}}></Input>
        </div>)
        const extra = <Button type="primary" onClick={this.addProduction}><Icon type="plus"></Icon>添加商品</Button>

        return (
        <Card title={title} extra={extra}>
            <Table
            columns={columns}
            dataSource={productList}
            rowKey='_id'
            
            pagination={{pageSize,total,
                current,
                onChange:(pageNum)=>{
                    if (flag_searchResult) {
                        this._searchProductions(keyword,pageNum)                        
                    } else{
                        this.getProductionList(pageNum)
                    }
                }}}
            />

        </Card>
        )
    }



    handleSearchInput= (ev)=>{
        const keyword = ev.target.value
        this.setState({
            keyword
        })
        // 如果没有输入数据则请求分页获取数据的接口，如果输入了数据则请求搜索的接口
        if (keyword) {
            this.searchProductions(keyword)
        }else{
            this.getProductionList(1)
        }
    }



    searchProductions =async (keyword,pageNum=1)=>{
        const {searchType,pageSize} = this.state
        const result  = await reqSearchProductions(searchType,keyword,pageNum,pageSize)
        if (+result.status ===0) {
            this.setState({
                productList:result.data.list,
                total:result.data.total,
                currentPage:pageNum,
                flag_searchResult:true
            })
        }
    }

    setProductionStatus = async (id,status)=>{
    const result  =  await reqSetProductionStatus(id,status)
        if (+result.status ===0) {
            message.success('修改成功')
            this.getProductionList(this.state.currentPage)
        }else{
            message.error('修改失败',result.msg ||'')
        }
        
    }

    getProductionList =  async (pageNum=1)=>{
         const result = await reqProductionPage(pageNum,this.state.pageSize)
         if (+result.status ===0) {
             this.setState({
                 productList:result.data.list,
                 total:result.data.total,
                 currentPage:pageNum,
                 flag_searchResult:false
             })
         }
    }

    addProduction= ()=>{
        this.props.history.push('/production/addUpdate')
    }


    componentWillMount(){
        this.columns=[
            {title:'商品名称',dataIndex:'name'},
            {title:'商品描述',dataIndex:'desc'},
            {title:'价格',dataIndex:'price',render:(price)=>'￥'+price},
            {title:'状态' ,width:60,align:'center',render:({status,_id})=>{
                let btnTxt='下架'
                let statuTxt ='在售'
                let btnType=''
                if (+status === 2) {
                    btnTxt='上架'
                    statuTxt = '已下架'
                    btnType='primary'
                }
                return (
                    <div>
                     <Button type={btnType} onClick={()=>{this.setProductionStatus(_id,status===1?2:1)}}>{btnTxt}</Button>
                     <span>{statuTxt}</span>
                    </div>
                )

            }},
            {title:'操作',width:120,render:(product)=>{
                return (
                    <div>
                        <LinkButton onClick={()=>{
                            // 跳转路由并传递数据
                            this.productToBeView = product
                            this.props.history.push(`/production/detail/${product._id}`,product)
                        }}>详情</LinkButton>
                        <br/>
                        <LinkButton to={`/production/addUpdate`} onClick ={
                            ()=>{
                                this.productToBeModified = product
                                this.props.history.push('/production/addUpdate',product)
                            }
                        }>修改</LinkButton>
                    </div>
                    
                    )
            }},
    ]
        this._searchProductions=this.searchProductions
        this.searchProductions = debounce(this.searchProductions)
    }


    componentDidMount(){
        // 请求数据
        this.getProductionList(1)
    }
}

