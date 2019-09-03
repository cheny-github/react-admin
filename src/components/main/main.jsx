import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Category from '../../pages/admin/pages/category/category'
import ChartBar from '../../pages/admin/pages/chart-bar/chart-bar'
import ChartLine from '../../pages/admin/pages/chart-line/chart-line'
import ChartPie from '../../pages/admin/pages/chart-pie/chart-pie'
import Home from '../../pages/admin/pages/home/home'
import Production from '../../pages/admin/pages/production/production'
import Role from '../../pages/admin/pages/role/role'
import User from '../../pages/admin/pages/user/user'
import './main.less'
export default class Main extends Component {
    render() {
        return (
            <div id="main">
                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/chart/bar" component={ChartBar}></Route>
                    <Route path="/chart/line" component={ChartLine}></Route>
                    <Route path="/chart/pie" component={ChartPie}></Route>
                    <Route path="/category" component={Category}></Route>
                    <Route path="/production" component={Production}></Route>
                    <Route path="/role" component={Role}></Route>
                    <Route path="/user" component={User}></Route>
                    <Redirect to="/home"></Redirect>
                </Switch>
            </div>
        )
    }
}
