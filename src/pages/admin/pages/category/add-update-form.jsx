import React, { Component } from 'react'
import {Form,Input} from 'antd'
const {Item} = Form
export  class AddUpdateForm extends Component {

    render() {
        const {getFieldDecorator} = this.props.form
        const {categoryName} = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName,
                            rules:[
                                {whitespace:true, required:true,message:'分类名不能为空' },
                            ]
                        })(
                            <Input placeholder="请输入商品分类名称"  ></Input>
                        )
                    }
                </Item>
            </Form>
        )
    }

    componentWillMount(){
        const {setForm} =  this.props
        setForm(this.props.form)
    }
}

export default Form.create()(AddUpdateForm)
