import httpService from './../http/httpService'

/**
 * 向服务器获取录井分井动态（日报）数据
 * @param {*} date
 */
export function getDailyOfMlogWell(date) {
  return httpService('GET', '/mlog/daily/findByDate', {
    'date': date
  })
}

/**
 * 向服务器通过分页查询获取录井分井动态（日报）数据
 * @param {*} date
 */
export function getDailyOfMlogByPage(date,page,pageSize) {
  return httpService('GET', '/mlog/daily/page', {
      date,
      page,
      pageSize
  })
}

/**
 * 向服务器获取录井分市场月报数据
 * @param {*} date
 */
export function getMonthLogOfMlogWellByCompany(date) {
  return httpService('GET', '/mlog/month/findByCompany', {
    'date': date
  })
}

/**
 * 向服务器获取录井队伍统计月报
 * @param {*} date
 */
export function getMlogMonthOfTeam(startDate,endDate) {
  return httpService('GET', '/mlog/month/findTeamByDate', {
    'startDate': startDate,
    'endDate':endDate
  })
}
