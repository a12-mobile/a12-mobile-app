/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''
let imgBaseUrl = ''

baseUrl="/api"

let httpBaseUrl=baseUrl+'/mobile'
let entityBaseUrl=baseUrl+'/report/comm/entity'
export {
	httpBaseUrl,
	entityBaseUrl,
	imgBaseUrl,
}