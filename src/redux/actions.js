
import {requestLogin} from '../api/login'
import userService from '../service/userService'
export const SET_HEAD_TITLE ='set header title'
export const RECEIVE_USER ='receive user'
export const SHOW_ERROR_MESSAGE ='show error message'
export const RESET_USER = 'reset user'

export const  setHeadTitle = (title)=>({ type:SET_HEAD_TITLE,data:title });

