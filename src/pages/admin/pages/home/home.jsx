import React, { Component } from 'react'
import userService from '../../../../service/userService'
import './home.less'
export default class Home extends Component {
    componentWillMount(){
        this.userName = userService.getUser().username
    }
    render() {
        return (
            <div>
                <h1>欢迎,{this.userName}</h1>
            </div>
        )
    }
}
