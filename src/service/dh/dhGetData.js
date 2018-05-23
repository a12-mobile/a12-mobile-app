import httpService from './../http/httpService'

/**
 * 向服务器获取井下工作量统计月报（国内）数据
 * @param {*} date 
 */
export function getMonthlyOfWorkloadGN(date) {
  return httpService('GET', '/dh/monthly/workload/gn', {
    'date': date
  })
}
/**
 * 向服务器获取井下工作量统计月报（总）数据
 * @param {*} date 
 */
export function getMonthlyOfWorkloadZ(date) {
  return httpService('GET', '/dh/monthly/workload/total', {
    'date': date
  })
}
