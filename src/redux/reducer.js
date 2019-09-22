import {combineReducers} from 'redux';
import { SET_HEAD_TITLE } from './actions';


const initHeadTitle ='首页';
// reducer的名称可以看做是读取state信息时的命名空间
function headTitle(state=initHeadTitle,action) {
    switch (action.type) {
        case  SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

const initUser ={};
function user(state=initUser,action) {
    switch (action.type) {
        case 'XXX':
            break;
    
        default:
            return state
    }
}

export default combineReducers({headTitle,user});