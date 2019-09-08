import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal, message} from 'antd'

import './category.less'
import {reqCategoryList, reqUpdateCategory,reqAddCategory} from '../../../../api/api'
import LinkButton from '../../../../components/link-button/link-button'
import AddUpdateForm from './add-update-form'

export default class Category extends Component {
    state={
        categoryList:[],
        flag_showLoading:true,
        flag_showUpdate:false,
        flag_showAdd:false
    }


    render() {
      const {categoryList,flag_showLoading,flag_showUpdate,flag_showAdd} = this.state
      const {columns} = this
      const extra=<Button type="primary" onClick={()=>{this.setState({flag_showAdd:true})}}><Icon type="plus"></Icon>添加</Button>
     
      const updateCategoryModal = (
        <Modal 
        visible={flag_showUpdate}
        title="修改品类名称"
        onCancel={()=>this.setState({flag_showUpdate:false})}
        onOk={()=>{this.updateCategory()}}
        >
          <AddUpdateForm setForm={this.setUpdateForm} categoryName={this.categoryNameToUpdate}>
          </AddUpdateForm>
        </Modal>
      )
      const addCategoryModal =(
        <Modal 
        visible={flag_showAdd}
        title="添加商品分类"
        onCancel={()=>this.setState({flag_showAdd:false})}
        onOk={
          ()=>{
            this.addCategory()
          }
        }
        >
          <AddUpdateForm setForm={this.setAddForm}>
          </AddUpdateForm>
        </Modal>
      )
      return (
          <Card  extra={extra} >
              <Table
                  bordered
                  rowKey='_id'
                  loading={flag_showLoading}
                  columns={columns}
                  dataSource={categoryList}
                  pagination={{pageSize:5}}
              />


              {
                updateCategoryModal
              }
              {
                addCategoryModal
              }
             
         </Card>
      )
  }


    componentWillMount(){
        this.columns=[
            { title: '分类名称', dataIndex: 'name', key: 'name' },
            {title:'操作',width:200,
              render:({_id,name})=>{
                return(<LinkButton  
                  onClick={
                        ()=>{
                          this.setState({flag_showUpdate:true})
                          // categoryNameToUpdate 用于 当用户修改商品类别名称的时候提供默认值
                          this.categoryNameToUpdate = name
                          this.categoryIdToUpdate =_id
                        }
                   }>
                  修改</LinkButton>)}
            }
        ]
    }


    componentDidMount(){
      this.getCategoryList()
    }


    updateCategory = ()=>{
      const form =  this.updateForm
      form.validateFields( async (error,values)=>{
        if (!error) {
           const result =  await reqUpdateCategory(this.categoryIdToUpdate,values.categoryName)
           if (result.status ===0) {
             message.success('修改成功')
             this.getCategoryList()
           }else{
             message.error('修改失败',result.msg || '')
           }
           this.setState({flag_showUpdate:false})
           form.resetFields()
        }
      })
    }

    addCategory= ()=>{
      const form  =this.addForm
      form.validateFields( async(error,values)=>{
        if (!error) {
          const result  = await reqAddCategory(values.categoryName)
          if (result.status === 0) {
              message.success('添加成功')
          }else{
            message.error('添加失败')
          }
          this.setState({
            flag_showAdd:false
          })
          form.resetFields()
        }
      })
    }


    // 让子组件把props中的form传过来，以用于表单验证
    setUpdateForm=(form)=>{
      this.updateForm =form
    }
    // 同setUpdateForm
    setAddForm=(form)=>{
      this.addForm = form
    }


    getCategoryList= async ()=>{
        this.setState({
          flag_showLoading:true
        })
        const result = await reqCategoryList()
        if (result.status ===0) {
          this.setState({
            flag_showLoading:false,
            categoryList:result.data
          })
        }
    }


}

 