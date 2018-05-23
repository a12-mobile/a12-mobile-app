import httpService from './../http/httpService'

/**
 * 向服务器获取钻井重点井日报数据
 * @param {*} date 
 */
export function getMonthlyOfWorkload(date) {
  return httpService('GET', '/log/monthly/workload', {
    'date': date
  })
}
