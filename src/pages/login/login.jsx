import React, { Component } from 'react'
import { Form, Icon, Input, Button,message } from 'antd';
import {Redirect} from 'react-router-dom'

import logo from './logo.png'
import './login.less'
import {requestLogin} from '../../api/login';
import userService from '../../service/userService';



// 登录界面
class Login extends Component {
    
        handleSubmit =  e => {
            e.preventDefault()
            const {validateFields} = this.props.form
            // handleSubmit的时候 用validateFields检查数据的是否全部校验通过，如果有，则发送登录请求
            validateFields( async (error,{username,password})=>{
                if (!error) { 
                    const result= await requestLogin(username,password)
                    const {status} = result
                    if (+status === 0) {
                        message.success('登录成功')
                        const userInfo = result.data
                        userService.setUser(userInfo)
                        this.props.history.replace('/')
                    }else{
                        message.error('登录失败,'+result.msg)
                    }
                }
            })
           
        }

        pwdValidator =(rule,value,callback)=>{
            let failed =false
            if (!value) {
                failed=true
                callback('请输入密码')
            }
            if (value.length<5) {
                failed=true
                callback('密码最短5位')
            }
            if (!failed) {
                callback()
            }
      }
    render() {

        if (userService.getUser()) {
          return  <Redirect to="/"></Redirect>
        }

        const {form:{getFieldDecorator}} = this.props
        return (
            <div className="login-wrap">
                <div className="header">
                    <img src={logo} alt="logo"/> 
                    <h1>咸鱼后台管理系统</h1>
                </div>
                <div className="content">

                    <div className="form-login">             
                       <h3>登录</h3>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {/* 要校验数据的字段使用 */}
                                {
                                    getFieldDecorator('username',{
                                        rules:[
                                            {min:4,message:'最小4位'},
                                            {max:12,message:'最大12位'},
                                            {pattern:/^[a-zA-Z_][a-zA-Z0-9_]/,message:'字母字符下划线，且不能以数字开头'}
                                        ]
                                    })(
                                        <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password',{rules:[
                                        {
                                            validator:this.pwdValidator
                                        }
                                    ]})(
                                        <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                        />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                {/* htmlType 设置button原生的type类型 */}
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
// 高阶组件：函数，接收一个组件，返回一个组件，create的返回值是一个高阶组件，
// 主要作用是提供一个form到我自己组件的props中，以用于表单校验
const wrappedComponent = Form.create({name:'user_login_form'})(Login)
export default wrappedComponent
