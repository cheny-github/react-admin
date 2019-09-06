import React, { Component } from 'react'
import { reqProductionInfoByID, reqCategoryById } from '../../../../api/api'
import {  Empty, List, Icon } from 'antd'
import {center} from '../../../../style-object'
import {IMG_URL_BASE} from '../../../../config/constants'
import {LinkButton} from '../../../../components/link-button/link-button'


const {Item} = List


export default class ProdDetail extends Component {
    


    state ={
        production:null,
        categoryName:''
    }

    render() {

        const {production,categoryName} = this.state
        if (!production) {
            return <Empty style={center} image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有商品数据" />
        }

        return (
            <List
            className="producion-detail"
            size="large"
            header={<div style={{fontSize:20,fontWeight:'bold'}}><LinkButton onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left"></Icon></LinkButton>商品详情</div>}
            bordered
          >
                <Item>
                  <span className='production-detail-field'>商品名称：</span> {production.name}
                </Item>
                <Item>
                  <span className='production-detail-field'>商品描述：</span>{production.desc}
                </Item>
                <Item>
                  <span className='production-detail-field'>商品价格：</span>￥{production.price}
                </Item>
                <Item>
                  <span className='production-detail-field'>商品分类：</span>{categoryName}
                </Item>
                <Item style={{flexDirection:'column',alignItems:'flex-start'}}>
                  <span className='production-detail-field'>商品图片：</span>
                  <div style={{display:'flex'}}>
                    {
                          // imgs
                        production.imgs.map(img=>{
                            return <img key={img} src={IMG_URL_BASE+img} alt="商品图片" style={{width:200,margin:10}}></img>
                        })
                    }
                  </div>
                </Item>
                <Item style={{flexDirection:'column',alignItems:'flex-start'}}>
                  <span className='production-detail-field'>商品详情：</span><div dangerouslySetInnerHTML={{__html:production.detail}}></div>
                </Item>
          </List>
        )
    }

    componentDidMount(){
        // 如果数据已经有请求下来了，那就复用
        const production = this.props.location.state
        if (production) {
            this.setState({
                production
            })
            this.getCategoryName(production.categoryId)
        }else{ //用户直接从Url访问，没有缓存数据，需要请求
            const prodId =  this.props.match.params.id
            this.getProduction(prodId)
        }
    }

    getCategoryName=async (categoryId)=>{
        const result = await reqCategoryById(categoryId)
         if (result.status ===0) {
                this.setState({
                    categoryName:result.data.name
                })
         }
    }

    getProduction= async (prodId)=>{
       const result =  await reqProductionInfoByID(prodId)
       if (result.status ===0) {
           const production = result.data
           this.setState({
               production
           })
           this.getCategoryName(production.categoryId)
       }
    }
}
