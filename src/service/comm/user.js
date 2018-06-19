import httpService from './../http/httpService'
import toast from './../utils/toast/toast'

const comm = {
  // 从服务器获取用户信息
  getUser: () => {
    return new Promise((resolve, reject) => {
      let user = sessionStorage.getItem('user')
      if (user) {
          resolve(JSON.parse(user))
      }else {
        httpService('GET', '/user').then((data) => {
          if (data.data.length > 0) {
            let user = {
              userName: data.data[0].userName,
              userId: data.data[0].userId
            }
            sessionStorage.setItem('user', JSON.stringify(user))
            resolve(user)
          }else {
            resolve(null)
          }
        }).catch((err) => {
            toast.showToast("获取用户信息失败")
          reject(err)
        })
      }
    })
  }
}
export default comm
