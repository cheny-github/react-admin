import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import userDao from '../../dao/userDao';

// 管理界面
export default class Admin extends Component {
    render() {
        if (userDao.getUser()) {
            return (
                <div>
                     管理界面
                </div>
            )
        }else{
            return(
                <Redirect to="/login"></Redirect>
            )
        }

    }
}
