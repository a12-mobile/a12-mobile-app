import httpService from './../http/httpService'

/**
 * 向服务器获取井下工作量统计月报（国内）数据
 * @param {*} startDate 格式'2018-01-01 00:00:00' 
 * @param {*} endDate 格式'2018-01-01 00:00:00' 
 */
export function getMonthlyOfWorkloadGN(startDate,endDate) {
  return httpService('GET', '/dh/monthly/workload/gn', {
    'startDate': startDate,
    'endDate':endDate
  })
}
/**
 * 向服务器获取井下工作量统计月报（总）数据
 * @param {*} startDate 格式'2018-01-01 00:00:00'
 * @param {*} endDate 格式'2018-01-01 00:00:00'
 */
export function getMonthlyOfWorkloadZ(startDate,endDate) {
  return httpService('GET', '/dh/monthly/workload/total', {
    'startDate': startDate,
    'endDate':endDate
  })
}
