/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''
let imgBaseUrl = ''
// let dataMonitorUrl='http://'+window.location.hostname+":"+window.location.port+'/mobile/server/rtDataMonitor/echarts/demo.html'
// let webSocketUrl='ws://'+window.location.hostname+":"+window.location.port+'/mobile/websocket'
let dataMonitorUrl='http://61.158.56.6:8030/websocket/rtdata/echarts/demo.html'
let webSocketUrl='ws://61.158.56.6:8030/websocket/websocket'
let webSocketHttpUrl='http://61.158.56.6:8030/websocket'

// baseUrl="/api"


let httpBaseUrl=baseUrl+'/mobile'
let entityBaseUrl=baseUrl+'/report/comm/entity'
export {
	httpBaseUrl,
	entityBaseUrl,
	webSocketUrl,
	webSocketHttpUrl,
	dataMonitorUrl,
	imgBaseUrl,
}