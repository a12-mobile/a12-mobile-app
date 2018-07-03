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
let socket='11.59.0.177:8030/websocket'
let dataMonitorUrl=`http://${socket}/rtdata/echarts/demo.html`
let webSocketUrl=`ws://${socket}/websocket`
let webSocketHttpUrl=`http://${socket}`

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