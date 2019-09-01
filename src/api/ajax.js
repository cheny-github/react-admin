import axios from 'axios'
import qs from 'qs';
import {message} from 'antd';
axios.interceptors.request.use(config=>{
    const {data} = config
    config.data  = data && qs.stringify(data)
    return config
})

axios.interceptors.response.use(response=>{
    return response.data
},error=>{
    message.error(error.message)
    return new Promise(()=>{})
})

export default axios