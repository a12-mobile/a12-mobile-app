import httpService from './../http/httpService'

const comm = {
  // 从服务器获取用户信息
  getUser: () => {
    return new Promise((resolve, reject) => {
      let user = sessionStorage.getItem('user')
      if (user) {
          resolve(JSON.parse(user))
      }else {
        httpService('GET', '/user').then((data) => {
          if (data.body.length > 0) {
            let user = {
              userName: data.body[0].userName,
              userId: data.body[0].userId
            }
            sessionStorage.setItem('user', JSON.stringify(user))
            resolve(user)
          }else {
            resolve(null)
          }
        }).catch((err) => {
            this.$toast.showToast("获取用户信息失败")
          reject(err)
        })
      }
    })
  }
}
export default comm
