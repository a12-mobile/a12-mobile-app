import axios from 'axios'
import qs from 'qs'
import { Toast } from "mint-ui"
import {baseUrl} from './config'


/**
 * 该文件对axios进行二次封装
 * 
 * 已经将封装后的axios定义了全局变量$http  
 * 参数值
 * method  请求方式，  'GET' 或 'POST'，不区分大小写
 * url     请求的路径，  不需要写ip,端口以及基础项目路径， ip和端口配置在同文件夹下的config.js文件中  例如： 10.88.123.01:8080/mobile
 * data    请求的参数，  类型为一个对象
 * 返回值为Promise形式，then()中的回掉参数data 为请求返回值的data，  假设返回值为res ， 则data为 res.data的值
 * 
 * 
 * 使用demo
 * requestTest() {
        this.$http('GET','/drill/daily/keyWell',{
          "date":"2018-05-15"
        }).then((data)=>{
          console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
      }
 */

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(config=>{
    return config
},error=>{
    return Promise.reject(error)
})


//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(response=>{
    return response
},error=>{
    return Promise.resolve(error.response)
})

//对错误数据进行处理
function errorState(response){
    console.log(response)
    //如果状态吗正常，则直接返回数据
    if(response&&(response.status===200||response.status===304||response.status===400)){
        //不需要date之外的数据，可以直接返回response.data
        return response
    }else{
        Toast({
            message: '网络异常',
            position: 'bottom',
            duration: 3000,
        })
    }
}

//对正确返回数据进行处理
function successState(res){
    if(res.data.errCode == '000002'){
        Toast({
            message: '网络异常，错误码000002',
            position: 'bottom',
            duration: 3000,
        })
    }
}


//请求方法
const httpServer=(method,url,data)=>{
    let requestMethod=method.toUpperCase()
    let Public={  //存放公共参数

    }
    let httpDefaultOpts={ //http默认配置
        method:requestMethod,
        url:baseUrl+url,
        timeout:20*1000,
        params:Object.assign(Public,data),
        data:qs.stringify(Object.assign(Public,data)),
        headers:requestMethod=='GET'?{ 
            "Accept": "application/json",  
            "Content-Type": "application/json; charset=UTF-8"  
          }:{  
            'X-Requested-With': 'XMLHttpRequest',  
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
          }
    }
    
    if(requestMethod=='GET'){
        delete httpDefaultOpts.data
    }else{
        delete httpDefaultOpts.params
    }

    return new Promise((resolve,reject)=>{
        axios(httpDefaultOpts).then((res)=>{
            successState(res)
            resolve(res.data)
        }).catch((response)=>{
            errorState(response)
            reject(response)
        })
    })
}
export default httpServer