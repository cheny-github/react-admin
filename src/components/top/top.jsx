import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import './top.less'
import userService from '../../service/userService'
import {formatTime} from '../../uitls/timeUtils';
import {reqWeather} from '../../api/weather'
import menuList from '../../config/menu.config';
class Top extends Component {
    state = {
        time:new Date(),
        weather:'',
        dayPictureUrl:''
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
    render() {
        const {time,weather,dayPictureUrl}=this.state
        const {pageTitle} =this
        return (
            <div id="top" style={{height:'80px'}}>
                    <h3>欢迎,{this.userName}<span><a href="##">退出</a></span> </h3> 
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