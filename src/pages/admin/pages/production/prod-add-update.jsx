import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Card, Icon ,Form,Input,Select,Button,message} from 'antd';
import { reqCategoryList,reqAddProduction,reqUpdateProduction } from "../../../../api/api";
import {LinkButton} from '../../../../components/link-button/link-button'
import UploadImg from './upload-img'
import RichEditor from './rich-editor'

const {Item} = Form
const {Option} = Select


export class ProdAddUpdate extends Component {


    state={
        categoryList:[]
    }
    refUploadImg =React.createRef()
    getDetail=null //函数，由RichEditor组件赋值，调用该函数可以拿到RichEditor中编辑的数据
    _setGetDetail =(func)=>{
        this.getDetail = func
    }
    categoryNames ={} //键值对集合，key:categoryId,value：name(categoryName) 
    render() {
        // 不允许从地址栏跳过来
        if (!this.props.location) {   
            return <Redirect to="/production"></Redirect>
        }
        const {categoryList} = this.state
        const {getFieldDecorator} = this.props.form
        const production = this.props.location.state ||{}
        const titleTxt = production._id?'修改商品':'添加商品'
        const title=(<>
        <LinkButton onClick={this.props.history.goBack}>
            <Icon type="arrow-left"></Icon>
        </LinkButton>
        {titleTxt}
        </>)

        const formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const detailLayOut={
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            }
        }
        const submitBtnLayout={  
        wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 ,offset:3},
            }
        }
        return (
            <Card title={title} >
                <Form {...formLayout}  onSubmit={this.submit}>
                    {/*   |categoryId    |Y       |string   |分类ID
                        |name          |Y       |string   |商品名称
                        |desc          |N       |string   |商品描述
                        |price         |N       |string   |商品价格
                        |detail        |N       |string   |商品详情
                        |imgs          |N       |array   |商品图片名数组
                        */}
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name',{initialValue:production.name,rules:[
                                {required:true, whitespace:true , message:'商品名不能为空'}
                            ]})(<Input placeholder="请输入商品名"></Input>)
                        }
                    </Item>
                
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc',{initialValue:production.desc,rules:[
                                {required:true, whitespace:true , message:'商品描述不能为空'}
                            ]})(<Input placeholder="请输入商品描述"></Input>)
                        }
                    </Item>
                
                    <Item label="商品价格">
                        {
                            getFieldDecorator('price',{
                            initialValue:typeof production.price=== 'undefined'?'0':''+production.price,
                            rules:[
                                {required:true, whitespace:true , message:'商品价格不能为空'},
                                {validator:this.validatePrice}
                            ]})(<Input placeholder="请输入商品名" type="number" min='0' addonAfter="元"></Input>)
                        }
                    </Item>
                    
                    <Item label="商品分类">
                        {
                            getFieldDecorator('categoryId',{
                                initialValue:production.categoryId,
                                rules:[
                                    {required:true,message:'请选择分类'},
                                ]
                            })(
                                <Select >
                                    <Option value=''>未分类</Option>
                                    {
                                        categoryList.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>
                
                    <Item label="商品图片">
                        <UploadImg imgs={production.imgs}  ref={this.refUploadImg} ></UploadImg>
                    </Item>
                    
                    <Item label="商品详情" {...detailLayOut}>
                        <RichEditor  _setGetDetail={this._setGetDetail}  detail={production.detail}></RichEditor>
                    </Item>
                    <Item {...submitBtnLayout} style={{marginTop:-42}} >
                        <Button type="primary" htmlType="submit" style={{width:'100%'}}>{titleTxt}</Button>
                    </Item>
                </Form>
            </Card>
        )
    }

    async componentDidMount(){


        // 获取当前用户的所有商品目录信息
         const result = await reqCategoryList()
         if (result.status ===0) {
             const categoryList = result.data
             this.setState({categoryList})
         }
        //  this.categoryNames = 
    }
    // 校验商品价格字段
    validatePrice = (rule,value,callback)=>{
        if (value<0) {
            callback('商品价格不能小于0')
            return
        }
        // 验证通过
        callback()

    }
    submit= (ev)=>{
        ev.preventDefault()
        const form = this.props.form
        // 如果state中有production数据，表示此时用户在进行修改操作
        const production =  this.props.location.state
        form.validateFields(async (error,values)=>{
            if (!error) {
                values.detail = this.getDetail()
                values.imgs =  this.refUploadImg.current.getImgs()
                let result 
                if (production) { //发送修改请求
                    values._id = production._id
                    result = await reqUpdateProduction(values)
                }else{ //发送请求添加数据
                    result = await reqAddProduction(values)
                }

                if (result.status===0) {
                    message.success('操作成功')
                    this.props.history.replace('/production')
                }else{
                    message.error('操作失败',result.msg||"")
                }

            }
        })
    }
}

export default Form.create()(ProdAddUpdate)
