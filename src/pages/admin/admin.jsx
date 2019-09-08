import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd'

import userService from '../../service/userService'
import './admin.less'
import Top from '../../components/top/top'
import Main from '../../components/main/main'
import LeftNav from '../../components/left-nav/left-nav'

const { Header, Footer, Sider, Content } = Layout;

// 管理界面
export default class Admin extends Component {

    render() {
        if (userService.getUser()) {
            return (
                <Layout style={{height:'100%'}} className='admin'>
                  <Sider  theme={'light'}  style={{overflow:'hidden'}} width={255}><LeftNav setSliderTheme={this.setSliderTheme}></LeftNav></Sider>
                  <Layout>
                    <Header style={{backgroundColor:'#fff',height:'80px',padding:'0px'}}><Top/></Header>
                    <Content style={{padding:'30px',backgroundColor:'rgb(240, 242, 245)'}}><Main /></Content>
                    <Footer><h3>使用chrome，可以得到更好的用户体验哦</h3></Footer>
                  </Layout>
                </Layout>
            )
        }else{
            return(
                <Redirect to="/login"></Redirect>
            )
        }

    }
}
