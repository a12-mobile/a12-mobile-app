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

/**
 * 向服务器获取测井工作量油区分布统计表
 * @param {*} date
 */
export function getWorkloadOfBlock(date) {
  return httpService('GET', '/log/month/findWorkloadByBlock', {
    'date': date
  })
}

/**
 * 向服务器获取测井专业队伍分布情况统计表（按队伍类型）
 * @param {*} date
 */
export function getTeamByTeamtype(date) {
  return httpService('GET', '/log/logTeam/findByTeamtype', {
    'date': date
  })
}

/**
 * 向服务器获取测井专业队伍分布情况统计表（按设备类型）
 * @param {*} date
 */
export function getTeamByDevicetype(date) {
  return httpService('GET', '/log/logTeam/findByDevicetype', {
    'date': date
  })
}

/**
 * 向服务器获取测井专业队伍国外分布情况统计表（按队伍类型）
 * @param {*} date
 */
export function getForeignTeamByTeamtype(date) {
  return httpService('GET', '/log/ForeignTeam/findByTeamtype', {
    'date': date
  })
}

/**
 * 向服务器获取测井专业队伍国外分布情况统计表（按设备类型）
 * @param {*} date
 */
export function getForeignTeamByDevicetype(date) {
  return httpService('GET', '/log/ForeignTeam/findByDevicetype', {
    'date': date
  })
}
