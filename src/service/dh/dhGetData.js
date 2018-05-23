import httpService from './../../assets/js/http/httpService'

/**
 * 向服务器获取井下工作量统计月报（国内）数据
 * @param {*} date 
 */
export function getMonthlyOfWorkloadGN(date) {
  return httpService('GET', '/dh/monthly/workload/gn', {
    'token': 'a735579b-93fa-4719-aa92-968191372004',
    'rx_token': 'a735579b-93fa-4719-aa92-968191372004',
    'date': date
  })
}
/**
 * 向服务器获取井下工作量统计月报（总）数据
 * @param {*} date 
 */
export function getMonthlyOfWorkloadZ(date) {
  return httpService('GET', '/dh/monthly/workload/total', {
    'token': 'a735579b-93fa-4719-aa92-968191372004',
    'rx_token': 'a735579b-93fa-4719-aa92-968191372004',
    'date': date
  })
}
