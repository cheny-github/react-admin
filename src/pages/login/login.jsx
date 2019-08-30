import React, { Component } from 'react'
import logo from './logo.png'
import './login.less'
import { Form, Icon, Input, Button,message } from 'antd';
// 登录界面
export default class Login extends Component {
    handleSubmit = e => {
        e.preventDefault()
        message.success('登录成功')
      };

    render() {
        return (
            <div className="login-wrap">
                <div className="header">
                    <img src={logo} alt="logo"/> 
                    <h1>咸鱼后台管理系统</h1>
                </div>
                <div className="content">
                    <div className="form-login">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
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
