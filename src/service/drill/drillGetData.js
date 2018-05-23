import httpService from './../http/httpService'

/**
 * 向服务器获取钻井重点井日报数据
 * @param {*} date 
 */
export function getDaliyOfKeyWell(date) {
  return httpService('GET', '/drill/daily/keyWell', {
    'date': date
  })
}
