import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import ProdHome from './prod-home'
import ProdDetail from './prod-detail'
import ProdAddUpdate from './prod-add-update'   
import './production.less'
export default class Production extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path="/production" component={ProdHome} exact></Route>
                    <Route path="/production/home" component={ProdHome} ></Route>
                    <Route path="/production/detail/:id" component={ProdDetail} ></Route>
                    <Route path="/production/addUpdate" component={ProdAddUpdate} ></Route>
                    <Redirect to="/production"></Redirect>
                </Switch>
            
            </>
        )
    }
}
