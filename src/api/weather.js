import jsonp from 'jsonp';
import { message } from 'antd';




export function reqWeather(city){
   return new Promise((resole)=>{
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,{},
    (error,data)=>{
        if (!error) {
            resole(data)
        }else{
            message.error(error.message)
        }
    }
    )
   })
}