import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import './top.less'
import userService from '../../service/userService'
import {formatTime} from '../../uitls/timeUtils';
import {reqWeather} from '../../api/weather'
import menuList from '../../config/menu.config';
import LinkButton from '../../components/link-button/link-button';
import { message ,Modal} from 'antd';
const {confirm} =Modal
class Top extends Component {
    state = {
        time:new Date(),
        weather:'',
        dayPictureUrl:'',
    }
     showLogOutConfirm= ()=> {
        confirm({
          title: '退出',
          content: '你要退出吗？',
          onOk:()=> {
           this.logOut()
          },
          onCancel:() =>{

          },
        });
      }
      
    componentWillMount(){
        this.getPageTitle(menuList)
        this.userName = userService.getUser().username
    }
    componentWillUpdate(){
        this.getPageTitle(menuList)
    }
    componentDidMount(){
        this.timeId=setInterval(() => {
            this.setState({
                time:new Date()
            })
        }, 1000);
        ;( async()=>{
            const result= await reqWeather('上海')
            const {weather,dayPictureUrl} = result.results[0]['weather_data'][0]
            this.setState({
                weather,
                dayPictureUrl
            })
        })()
    }
    componentWillUnmount(){
        clearInterval(this.timeId)
    }
    getPageTitle =(menuList)=>{
        const {pathname} = this.props.location
        menuList.forEach((item)=>{
            if (item.children) {
                this.getPageTitle(item.children)
            }else{
                if (item.path ===pathname) {
                    this.pageTitle=item.title
                }
            }
        })
    }

    logOut=()=>{
        userService.logOut()
        message.success('用户退出')
        setTimeout(() => {
            this.props.history.replace('/login')
        }, 200);
    }
    render() {
        const {time,weather,dayPictureUrl}=this.state
        const {pageTitle} =this
        return (
            <div id="top" style={{height:'80px'}}>
                    <h3>欢迎,{this.userName}
                        <span>
                            <LinkButton onClick={this.showLogOutConfirm}>退出登录</LinkButton>
                        </span> 
                    </h3> 
                    <div id="info">
                        <div><span className="position">{pageTitle}</span> </div>
                        <div className='time-weather'>
                            <span className='time'>{formatTime(time)}</span>
                            <img src={dayPictureUrl} alt="图片"/>
                            <span>{weather}</span>
                        </div>
                    </div>
            </div>
        )
    }
}


export default withRouter(Top)