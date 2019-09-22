import React, { useRef,useState,useEffect } from 'react'
import {Card,Button,Icon,Table,Modal, message} from 'antd'

import './category.less'
import {reqCategoryList, reqUpdateCategory,reqAddCategory} from '../../../../api/api'
import LinkButton from '../../../../components/link-button/link-button'
import AddUpdateForm from './add-update-form'



function getUpdateCategoryModal(
  { flag_showUpdate,
    setFlag_showUpdate,
    updateCategory,
    setUpdateForm,
    categoryNameToBeUpdate
  })
{
 return (
    <Modal 
    visible={flag_showUpdate}
    title="修改品类名称"
    onCancel={()=>setFlag_showUpdate(false)}
    onOk={updateCategory}
    >
      <AddUpdateForm setForm={setUpdateForm} categoryName={categoryNameToBeUpdate}>
      </AddUpdateForm>
    </Modal>
  )


}



export default function Category(props) {
    const [categoryList,setCategoryList] = useState([]);
    // table的loading状态
    const [flag_showLoading,setFlag_showLoading] = useState(false);
    // 展示更新表单
    const [flag_showUpdate,setFlag_showUpdate] = useState(false);
    // 展示添加表单
    const [flag_showAdd,setFlag_showAdd] = useState(false);
    
 

    const updateFormRef = useRef(null);
    const addFormRef = useRef(null);
    const addForm = addFormRef.current;
    const categoryIdToUpdateRef = useRef(null);
    const categoryNameToBeUpdateRef =useRef(null);
    const categoryNameToBeUpdate=  categoryNameToBeUpdateRef.current
    const columnRef  = useRef(getColumsDefinition());
    const columns = columnRef.current;

  // 表头定义
  function getColumsDefinition() {
    return  [
      { title: '分类名称', dataIndex: 'name', key: 'name' },
      {title:'操作',width:200,
        render:({_id,name})=>{
          return(<LinkButton  
            onClick={
                  ()=>{
                    setFlag_showUpdate(true)
                    // categoryNameToBeUpdate 用于 当用户修改商品类别名称的时候提供默认值
                    categoryNameToBeUpdateRef.current = name
                    categoryIdToUpdateRef.current =_id
                  }
            }>
            修改</LinkButton>)}
      }
    ];
  }

    // willUpdate
    useEffect(()=>{
      getCategoryList();
    },[])


    function updateCategory  (){
      const form =  updateFormRef.current
      form.validateFields( async (error,values)=>{
        if (!error) {
           const result =  await reqUpdateCategory(categoryIdToUpdateRef.current,values.categoryName)
           if (result.status ===0) {
             message.success('修改成功')
             getCategoryList()
           }else{
             message.error('修改失败',result.msg || '')
           }
           setFlag_showUpdate(false)
           form.resetFields()
        }
      })
    }

    function addCategory(){
      const form  =addFormRef.current
      form.validateFields( async(error,values)=>{
        if (!error) {
          const result  = await reqAddCategory(values.categoryName)
          if (result.status === 0) {
              message.success('添加成功')
          }else{
            message.error('添加失败')
          }
          setFlag_showAdd(false)
          form.resetFields()
        }
      })
    }


    // 让子组件把props中的form传过来，以用于表单验证
    function setUpdateForm(form){
      updateFormRef.current = form;
    }
    // 同setUpdateForm
    function setAddForm(form){
      addFormRef.current =form
    }

    async function getCategoryList(){
        setFlag_showLoading(true)
        const result = await reqCategoryList()
        if (result.status ===0) {
          setFlag_showLoading(false)
          setCategoryList(result.data)
        }
    }



    const extra=(<Button type="primary" onClick={()=>{setFlag_showAdd(true)}}><Icon type="plus"></Icon>添加</Button>);
    const updateCategoryModal =getUpdateCategoryModal({ flag_showUpdate,
                                                        setFlag_showUpdate,
                                                        updateCategory,
                                                        setUpdateForm,
                                                        categoryNameToBeUpdate
                                                      });
      const addCategoryModal =(
        <Modal 
        visible={flag_showAdd}
        title="添加商品分类"
        onCancel={()=>setFlag_showAdd(false)}
        onOk={addCategory}
        >
          <AddUpdateForm setForm={setAddForm}>
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

 