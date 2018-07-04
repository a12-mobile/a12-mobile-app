import httpService from './../http/httpService'


/**
 * 向服务器获取钻井重点井日报数据
 * @param {*} date
 */
export function getDaliyOfKeyWell(date) {
  return httpService('GET', '/drill/daily/list/keyWell', {
    'date': date
  })
}

/**
 * 向服务器获取分井动态数据
 * @param {*} date
 */
export function getDaliyOfWell(date) {
  return httpService('GET', '/drill/daily/list/well', {
    'date': date
  })
}

/**
 * 向服务器获取某井的日报列表
 * @param {*} wellId
 */
export function getWellDaliyListByWellId(wellId) {
  return httpService('GET', '/drill/daily/well', {
    'wellId': wellId
  })
}

/**
 * 向服务器获取钻井工作量日报
 * @param {*} date
 */
export function getDaliyOfWorkload(date) {
  return httpService('GET', '/drill/report/findByDate', {
    'date': date
  })
}

/**
 * 向服务器获取钻机动态日报
 * @param {*} date
 */
export function getDaliyOfRigDynamic(date) {
  return httpService('GET', '/drill/report/findRigByDate', {
    'date': date
  })
}
