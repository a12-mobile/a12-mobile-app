/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''
let imgBaseUrl = ''


//吴同本地测试地址
// baseUrl="http://10.88.123.11:8080/mobile"
baseUrl="/api/mobile"

//集成到后台
// baseUrl="/mobile"

export {
	baseUrl,
	imgBaseUrl,
}