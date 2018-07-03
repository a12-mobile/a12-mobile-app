import httpService from './../http/httpService'

/**
 * 向服务器通过分页查询获取井列表
 * @param {*} page 页码
 * @param {*} pageSize 每页数量
 */
export function getWellListByPage(page,pageSize) {
  return httpService('GET', '/well/list/page', {
    page,
    pageSize
  })
}

/**
 * 向服务器获取所有井列表
 */
export function getWellList() {
  return httpService('GET', '/well/list')
}
/**
 * 向服务器获取所有重点井列表
 */
export function getKeyWellList() {
  return httpService('GET', '/well/key')
}
/**
 * 向服务器获取所有重点井列表
 */
export function getWellDaily(wellId,date) {
  return httpService('GET', '/drill/daily/well',{
    date,
    wellId
  })
}