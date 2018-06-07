import httpService from './../http/httpService'
const comm={
    //从服务器获取用户信息
    getUser:function(){
        return new promise((resolve,reject)=>{
            httpService('GET', '/user').then((data)=>{
                let array=JSON.parse(data)
                if(array.length>0){
                    resolve(array[0])
                }else{
                    resolve(null)
                }
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}
export default comm