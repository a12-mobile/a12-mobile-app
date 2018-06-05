import httpService from './../http/httpService'

/**
 * 向服务器获取测井工作量月报
 * @param {*} date
 */
export function getMonthlyOfWorkload(date) {
  return httpService('GET', '/log/monthly/workload', {
    'date': date
  })
}

/**
 * 向服务器获取测井工作量日报
 * @param {*} date
 */
export function getDailyOfWorkload(date) {
  return httpService('GET', '/log/daily/findWorkload', {
    'date': date
  })
}
