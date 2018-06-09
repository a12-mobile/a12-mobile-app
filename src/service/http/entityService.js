import axios from 'axios'
import qs from 'qs'
import { Toast } from "mint-ui"
import {entityBaseUrl} from './config'

// 封装后端实体服务请求时的方法，，，用于通过实体服务对数据库增删改

//批处理说明



const entityServer = {
  /**
   * 实体新增服务，用来创建一条新的实体数据
   * 
   * 修改也可以使用改方法
   * 使用方式：url: /{实体名称}/{主键值}   参数为要修改的字段
   * 
   * 
   * @param {*} url /{实体名称}   例如在重点井数据表KEY_WELL中加入数据，后台对应的bean为KeyWell,  因此url='/KeyWell'
   * @param {*} data 对象格式的数据，传入的参数     例如 {wellId:'1',userId:'1'}
   */
  add: function (url, data = {}) {
    if(url[0]!='/'){
        url='/'+url
    }
    let httpDefaultOpts = { // http默认配置
      method: 'POST',
      url: entityBaseUrl + url,
      timeout: 30 * 1000,
      data:data,
      headers: {
        "Accept": "application/json",  
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
    return new Promise((resolve, reject) => {
      axios(httpDefaultOpts).then((res) => {
        if(successState(res)){
            resolve(res.data)
        }
      }).catch((response) => {
        errorState(response)
        reject(response)
      })
    })
  },

  //访问规则见A7 2.0实体服务
  query:function(url,data={}){
    if(url[0]!='/'){
        url='/'+url
    }
    let httpDefaultOpts={ //http默认配置
        method:'GET',
        url:entityBaseUrl+url,
        timeout:45*1000,
        params:data,
        headers:{ 
            "Accept": "application/json",  
            "Content-Type": "application/json; charset=UTF-8"  
          }
    }
    return new Promise((resolve,reject)=>{
        axios(httpDefaultOpts).then((res)=>{
            if(successState(res)){
                resolve(res.data)
            }
        }).catch((response)=>{
            errorState(response)
            reject(response)
        })
    })
  },

  //删除实体    url为实体名，  body中为json数组，数组的每个元素包含主键属性和值
  //注意删除参数是数组
  delete:function(url,body=[]){
    if(url[0]!='/'){
        url='/'+url
    }
    let httpDefaultOpts={ //http默认配置
        method:'POST',
        url:entityBaseUrl+url+'/bsflag/1',
        timeout:45*1000,
        data:body,
        headers:{ 
            "Accept": "application/json",  
            "Content-Type": "application/json; charset=UTF-8"  
          }
    }
    return new Promise((resolve,reject)=>{
        axios(httpDefaultOpts).then((res)=>{
            if(successState(res)){
                resolve(res.data)
            }
        }).catch((response)=>{
            errorState(response)
            reject(response)
        })
    })
  }
}









// 对错误数据进行处理
function errorState (response) {
  // 如果状态吗正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 不需要date之外的数据，可以直接返回response.data
    return response
  }else {
    Toast({
      message: '网络异常',
      position: 'bottom',
      duration: 3000
    })
  }
}

// 对正确返回数据进行处理
function successState (res) {
  if (res.status==500) {
      //插入数据后台出错
      Toast({
        message: res.statusText,
        position: 'bottom',
        duration: 1000
      })
      return false
  }
  return true
}



export default entityServer