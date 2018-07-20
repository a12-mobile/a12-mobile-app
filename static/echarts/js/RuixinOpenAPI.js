/**
 * Cordova原生代码与JS文件接口，V1.0.6版本，20180416
 * 原生代码实现接口时需要注意：
 *	1. 服务实现时错误处理需要统一处理，并将提示信息返回给错误处理函数
 *	2. 如果没有参数，则需要[]结束
 *	3. 要调用的方法，必须要和后台的方法名一致
 */
var RuixinApi = function() {
};

/*
 * js版本号
 */
RuixinApi.prototype.versionNumber = function() {
	return 20180416;
};

/**
 * 查询当前客户端SDK版本
 * @param success 成功回调函数名称，versionNumber表示当前SDK版本号，
 * 					自然数(目前为瑞信发布版本的日期如2018041400)
 */
RuixinApi.prototype.openSDKVersion =  function(params) {
    this.callNative("openSDKVersion", params);
};

/*
 * 原生代码识别URI
 */
RuixinApi.prototype.uri ='imwebviewjs::';


/*RuixinApi.prototype.config = function(params)
{
	return this;
};*/

RuixinApi.prototype.callNative = function(funcName, params) {
	if (this.isInMobileClient())
	{
		var url = this.uri + funcName + this.commonProcess(params);
		document.location = url;
	} else if (parent.window.RXPCClient) {
		var func = 'parent.window.RXPCClient.' + funcName + '(' + JSON.stringify(params) + ')';
		new Function(func).apply();
	} else if (window.RXPCClient) {
		var func = 'window.RXPCClient.' + funcName + '(' + JSON.stringify(params) + ')';
		new Function(func).apply();
	} else {
		// alert("请在开放平台中打开");
	}
};

/**
 * 初始化js框架
 * @param appId 必填，公众号的唯一标识
 * @param accessToken 必填，开发者接口调用凭证
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.config =  function(params) {
    this.callNative("config", params);
};

/**
 * 获取当前用户Token
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.getUserInfo =  function(params) {
    this.callNative("getUserInfo", params);
};

/**
 * 文档预览
 * @param fileUrl文件下载地址
 * @param fileName文件名称
 */
RuixinApi.prototype.docPreview = function(params) {
	this.callNative("docPreview", params);
};

/**
 * 修改页面标题
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.setWebViewTitle =  function(params) {
	this.callNative("setWebViewTitle", params);
};

/**
 * 隐藏页面标题
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.hideWebViewTitle =  function(params) {
	this.callNative("hideWebViewTitle", params);
};

/**
 * 查看人员详情
 * @param userEmail 查看人员的邮箱
 * @param fail 无权限时的回调函数名称
 */
RuixinApi.prototype.showUserInfo =  function(params) {
	this.callNative("showUserInfo", params);
};

/**
 * 向内网服务器发送get请求
 * @param url 请求内网地址+URLEncode后的参数
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.get =  function(params) {
	this.callNative("get", params);
};

/**
 * 向内网服务器发送post请求
 * @param url  请求内网地址
 * @param params {post参数表}
 * @param body post内容
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.post =  function(params) {
	this.callNative("post", params);
};

/**
 * 隐藏分享按钮
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.hideShareButton =  function(params) {
	this.callNative("hideShareButton", params);
};

/**
 * 返回上一级页面
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.goBackPreviousPage =  function(params) {
	this.callNative("goBackPreviousPage", params);
};

/**
 * 关闭当前页
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.closePage =  function(params) {
	this.callNative("closePage", params);
};

/**
 *  拨打电话
 * @param fail 失败时的回调函数名称
 * @param phoneNum 拨打的电话号码
 */
RuixinApi.prototype.telePhoneCall =  function(params) {
	this.callNative("telePhoneCall", params);
};

/**
 * 发起单人会话
 * @param fail 失败时的回调函数名称
 * @param userEmail 被发起对话的人员邮箱
 */
RuixinApi.prototype.chat =  function(params) {
	this.callNative("chat", params);
};

/**
 * 分享
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 * @param imageUrl 必填，收到的用户在分享消息中看到的图片
 * @param title 必填，收到的用户在分享消息中看到的标题
 * @param summary 必填，收到的用户在分享消息中看到的内容文字
 * @param url 必填，收到的用户点击分享消息后跳转的url
 * @param type 非必填，默认web收到的用户点击分享消息后跳转的子应用，目前仅支持web所以该参数可以没有
 * @param subId 非必填，如果type为web外其他则必填，否则忽略该参数，用于跳转时指定跳转的目的记录的ID
 * @param extra 非必填，后续协议扩展字段，用于在跳转时携带的参数
 */
RuixinApi.prototype.setShareContent =  function(params) {
    params.interactiveName = "sendToChat";
    params.interactiveID = "";
    params.interactiveDetailID = "";
	this.callNative("addInteractiveMenu", params);
    //this.callNative("setShareContent", params);
};

/**
 * 添加QQ分享菜单
 * @param success 成功时的回调函数名称
 * @param title 必填，收到的用户在分享消息中看到的标题
 * @param summary 必填，收到的用户在分享消息中看到的内容文字
 * @param url 必填，收到的用户点击分享消息后跳转的url
 * @param imageUrl 收到的用户在分享消息中看到的图片
 */
RuixinApi.prototype.addQQMenu =  function(params) {
    params.interactiveName = "shareQQ";
    params.interactiveID = "";
    params.interactiveDetailID = "";
	this.callNative("addInteractiveMenu", params);
};

/**
 * 添加分享到新浪微博菜单
 * @param success 成功时的回调函数名称
 * @param title 必填，收到的用户在分享消息中看到的标题
 * @param summary 必填，收到的用户在分享消息中看到的内容文字
 * @param url 必填，收到的用户点击分享消息后跳转的url
 * @param imageUrl 收到的用户在分享消息中看到的图片
 */
RuixinApi.prototype.addSinaMenu =  function(params) {
    params.interactiveName = "shareSina";
    params.interactiveID = "";
    params.interactiveDetailID = "";
	this.callNative("addInteractiveMenu", params);
};

/**
 * 添加分享到微信收藏菜单
 * @param success 成功时的回调函数名称
 * @param title 必填，收到的用户在分享消息中看到的标题
 * @param summary 必填，收到的用户在分享消息中看到的内容文字
 * @param url 必填，收到的用户点击分享消息后跳转的url
 * @param imageUrl 收到的用户在分享消息中看到的图片
 */
RuixinApi.prototype.addWeixinFavoriteMenu =  function(params) {
    params.interactiveName = "shareWeixinFavorite";
    params.interactiveID = "";
    params.interactiveDetailID = "";
	this.callNative("addInteractiveMenu", params);
    //this.callNative("setShareContent", params);
};

/**
 * 添加分享到微信朋友圈菜单
 * @param success 成功时的回调函数名称
 * @param title 必填，收到的用户在分享消息中看到的标题
 * @param summary 必填，收到的用户在分享消息中看到的内容文字
 * @param url 必填，收到的用户点击分享消息后跳转的url
 * @param imageUrl 收到的用户在分享消息中看到的图片
 */
RuixinApi.prototype.addWeixinCircleMenu =  function(params) {
    params.interactiveName = "shareWeixinCircle";
    params.interactiveID = "";
    params.interactiveDetailID = "";
	this.callNative("addInteractiveMenu", params);
};

/**
 * 添加分享到微信好友菜单
 * @param success 成功时的回调函数名称
 * @param title 必填，收到的用户在分享消息中看到的标题
 * @param summary 必填，收到的用户在分享消息中看到的内容文字
 * @param url 必填，收到的用户点击分享消息后跳转的url
 * @param imageUrl 收到的用户在分享消息中看到的图片
 */
RuixinApi.prototype.addWeixinMenu =  function(params) {
    params.interactiveName = "shareWeixin";
    params.interactiveID = "";
    params.interactiveDetailID = "";
	this.callNative("addInteractiveMenu", params);
};


/**
 * 进入子应用
 * @param fail 失败时的回调函数名称
 * @param subAppId 必填，所要进入的子应用的ID
 * @param subAppEntityId 必填，对应HSE记录的topicId
 * @param imageUrl 收到的用户在分享消息中看到的图片
 * @param title 收到的用户在分享消息中看到的标题
 * @param summary 收到的用户在分享消息中看到的内容文字
 * @param url 收到的用户点击分享消息后跳转的url
 * @param mediatype 有图/视频时必填，对应HSE记录的媒体类型 0-图片 1-视频
 */
RuixinApi.prototype.enterSubApp =  function(params) {
	this.callNative("enterSubApp", params);
};


/**
 * 调用拍照/录像/照片选择并上传资源到服务器
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 * @param percent 处理上传进度的回调函数名称
 * @param url 上传的服务器地址
 */
RuixinApi.prototype.selectResourceAndUpload =  function(params) {
	this.callNative("selectResourceAndUpload", params);
};

/**
 * 调用手机拍照/录像/相册功能，并通过回调返回资源信息
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.selectResource =  function(params) {
	this.callNative("selectResource", params);
};

/**
 * 调用手机拍照/录像/相册功能，并通过回调返回资源信息(可选多张图片)
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.selectMultiResource =  function(params) {
	this.callNative("selectMultiResource", params);
};

/**
 * 上传资源
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 * @param percent 处理上传进度的回调函数名称
 * @param url 上传的服务器地址
 * @param selectMultiResource返回的资源信息参数
 */
RuixinApi.prototype.uploadResource =  function(params) {
	this.callNative("uploadResource", params);
};

/**
 * 上传多张图片资源
 * @param success 每一张上传成功时的回调函数名称
 * @param fail 每一张上传失败时的回调函数名称
 * @param percent 每一张上传处理上传进度的回调函数名称
 * @param url 上传的服务器地址
 * @param selectResource/createSignature返回的资源信息参数
 */
RuixinApi.prototype.uploadMultiResource =  function(params) {
    this.callNative("uploadMultiResource", params);
};

/**
 * 调用签名控件，并通过回调返回签名信息
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.createSignature =  function(params) {
	this.callNative("createSignature", params);
};

/**
 * 隐藏返回按钮
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.hideBackButton =  function(params) {
	this.callNative("hideBackButton", params);
};

/**
 * 添加菜单项(菜单显示顺序由菜单添加顺序决定)
 * menuID 菜单ID
 * menuText 菜单上显示的文字（字数限制？）
 * interactiveName 交互命令名称
 * interactiveID交互对象ID(如用户ID，子应用ID，公众号ID,用户邮箱等)
 * interactiveDetailID交互对象详情ID(如待办中每条记录ID，公众号消息ID等) 
 * … 扩展参数
 */
RuixinApi.prototype.addInteractiveMenu =  function(params) {
	this.callNative("addInteractiveMenu", params);
};

/**
 * 添加设置字体菜单
 * @param success 成功回调函数名称
 */
RuixinApi.prototype.addSetFontSizeMenu =  function(params) {
    this.callNative("addSetFontSizeMenu", params);
};

/**
 * 添加在浏览器打开菜单(在浏览器打开当前页面)
 * @param success 成功回调函数名称
 */
RuixinApi.prototype.addOpenInBrowserMenu =  function(params) {
    this.callNative("addOpenInBrowserMenu", params);
};

/**
 * 支持横屏旋转开关(调用后支持横屏)
 * @param success 成功回调函数名称
 */
RuixinApi.prototype.supportAutorotate =  function(params) {
    this.callNative("supportAutorotate", params);
};

/**
 * 进入指定公众号 
 * @param pubsubId 公众号ID
 */
RuixinApi.prototype.enterPubSub =  function(params) {
	this.callNative("enterPubSub", params);
};

/**
 * 进入扫一扫页面
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.enterBarcodeScanner =  function(params) {
	this.callNative("enterBarcodeScanner", params);
};

/**
 * 跳转通用入口
 * interactiveName 交互命令名称
 * interactiveID交互对象ID(如用户ID，子应用ID，公众号ID,用户邮箱等)
 * interactiveDetailID交互对象详情ID(如待办中每条记录ID，公众号消息ID等) 
 * … 扩展参数
 */
RuixinApi.prototype.clickInteractiveMenu =  function(params) {
	this.callNative("clickInteractiveMenu", params);
};

/**
 * 进入讨论组
 * roomJid 讨论组ID
 */
RuixinApi.prototype.enterGroupChat =  function(params) {
    params.interactiveName = "enterGroupChat";
	this.callNative("clickInteractiveMenu", params);
};
/**
 * 设置WPS权限
 * // 1 代表开启  0 关闭
 */
RuixinApi.prototype.setWpsOfficeEnable =  function(params) {
    params.interactiveName = "setWpsOfficeEnable";
    this.callNative("clickInteractiveMenu", params);
};
/**
 * 重新设置子应用未读消息数
 */
RuixinApi.prototype.reSetSubAppUnReadNum =  function(params) {
    params.interactiveName = "reSetSubAppUnReadNum";
    this.callNative("clickInteractiveMenu", params);
};
/**
 * 通过urlscheme打开第三方应用
 * urlScheme 第三方应用urlscheme
 */
RuixinApi.prototype.openUrlScheme =  function(params) {
    params.interactiveName = "openUrlScheme";
    this.callNative("clickInteractiveMenu", params);
};
/**
 * 弹出提示信息
 * @param hintMsg 提示信息内容
 * @param duration 显示时间，不传默认3秒
 */
RuixinApi.prototype.showHint =  function(params) {
	this.callNative("showHint", params);
};

/**
 * 返回待办列表(resMode=3/4待办使用，其他地方勿用)
 * @param isRefresh "0"不刷新 "1"刷新
 * @param isRemove  "0"不删除，"1"删除
 */
RuixinApi.prototype.returnBacklog =  function(params) {
	this.callNative("returnBacklog", params);
};

/**
 * 扫一扫并返回结果
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.scanBarcode =  function(params) {
	this.callNative("scanBarcode", params);
};

/**
 * 打开设备计步功能
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.openStepCounter =  function(params) {
	this.callNative("openStepCounter", params);
};

/**
 * 获取当天运动步数
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.getStepCount =  function(params) {
	this.callNative("getStepCount", params);
};

/**
 * 获取从起始日期开始到今天，每天的运动步数数组
 * @param timeStamp 起始日期，如2017-03-27
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.getStepCountByDate =  function(params) {
	this.callNative("getStepCountByDate", params);
};

/**
 * 开启实时记步功能
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.startRealTimeStepCount =  function(params) {
	this.callNative("startRealTimeStepCount", params);
};

/**
 * 结束实时记步功能
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.finishRealTimeStepCount =  function(params) {
	this.callNative("finishRealTimeStepCount", params);
};

/**
 * 开启定位
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.startLocate =  function(params) {
	this.callNative("startLocate", params);
};

/**
 * 获取当前位置
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.getCurrentAddr =  function(params) {
	this.callNative("getCurrentAddr", params);
};

/**
 * 获取当前网络状态
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.checkNetwork =  function(params) {
	this.callNative("checkNetwork", params);
};

/**
 * 隐藏返回按钮
 * @param success 成功时的回调函数名称
 */
RuixinApi.prototype.hideBackButton =  function(params) {
	this.callNative("hideBackButton", params);
};

/**
 * 获取用户瑞信头像
 * @param jid 用户jid
 * @param success 成功时的回调函数名称
 * @param fail 失败时的回调函数名称
 */
RuixinApi.prototype.getHeadPhotoByJid =  function(params) {
	this.callNative("getHeadPhotoByJid", params);
};

/**
 * 在新页面打开链接
 * @param  url_open
 * @param name 页面标题(为空时使用网页标题)
 */
RuixinApi.prototype.openUrl =  function(params) {
	this.callNative("openUrl", params);
};

/**
 * 是否支持通过判断错误码显示错误页（iOS有效)
 * @param isSupport 支持"1",不支持"0"
 * @param success 成功回调函数名称
 */
RuixinApi.prototype.supportErrorPage =  function(params) {
    this.callNative("supportErrorPage", params);
};

/**
 * 暂存应用参数
 * @param key 参数key，目前仅支持字符串
 * @param value 参数值，目前仅支持字符串
 * @param success 成功回调函数名称
 */
RuixinApi.prototype.storeKeyValue = function(params) {
    this.callNative("storeKeyValue", params);
};

/**
 * 读取暂存的应用参数
 * @param key 参数key，目前仅支持字符串
 * @param success 成功回调函数名称
 */
RuixinApi.prototype.loadKeyValue = function(params) {
    this.callNative("loadKeyValue", params);
};

/**
 * 调用易会JS
 * @param meetId 会议ID
 * @param sipId 员工编号
 * @param displayName 员工姓名
 * @param videoType 会议类型，0主持人，1参会人
 * @param isOnline 是否为线上会议(是否有直播)，0无直播，1有直播
 */
RuixinApi.prototype.toEhuiMeet =  function(params) {
	this.callNative("toEhuiMeet", params);
};

/**
 * 判断第三方应用是否安装
 * @param androidPackageName 包名（安卓）
 * @param urlScheme 地址（iOS）
 */
RuixinApi.prototype.isInstallApp =  function(params) {
    this.callNative("isInstallApp", params);
};

/**
 * 设置页面出现时回调函数
 * @param willAppear 回调函数名
 */
RuixinApi.prototype.setListenerCallback =  function(params) {
    this.callNative("setListenerCallback", params);
};

/**
 * 获取设备唯一码
 * @param success 成功回调函数名称
 */
RuixinApi.prototype.getDeviceId =  function(params) {
    this.callNative("getDeviceId", params);
};

/**
 * 通用参数处理，用于将json参数转换为uri的参数
 */
RuixinApi.prototype.commonProcess = function(params) {
	if (this.isEmpty(params))
	{
		return "";
	}
	if (this.isString(params))
	{
		return "&" + params;
	} else {
		return "&" + JSON.stringify(params);
	}
}

/**
 * 判断是否是瑞信的API环境
 */
RuixinApi.prototype.isInRuixin = function()
{
	return this.isInMobileClient() || this.isInPCClient();
}

/**
 * 判断是否是瑞信移动端
 */
RuixinApi.prototype.isInMobileClient = function()
{
	var browserName=navigator.userAgent.toLowerCase();
	return browserName.indexOf("qixinwebview") > 0;
}

/**
 * 判断是否是瑞信PC端
 */
RuixinApi.prototype.isInPCClient = function()
{
	//  --------- 融云PC端添加 ----------- //
	if (parent.window.RXPCClient) {
		return true;
	}
	if (window.RXPCClient) {
		return true;
	}
	return false;
	//  --------- 融云PC端添加 ----------- //
}

/**
 * 判断是否非空
 */
RuixinApi.prototype.isEmpty = function(callbackName)
{
	if (callbackName!=null && !callbackName && typeof(callbackName)!="undefined" && callbackName!=0)
	{
		return true;
	}
	return false;
}

/**
 * 判断是否字符串
 */
RuixinApi.prototype.isString = function(str)
{ 
	return (typeof str=='string')&&str.constructor==String; 
}

/**
 * 判断是否运行在Android中
 */
RuixinApi.prototype.isInAndroid = function()
{
	var str = navigator.userAgent;
	var isAndroid = str.indexOf('Android') > -1 ; //android终端
	return isAndroid;
}

/**
 * 判断是否运行在iOS中
 */
RuixinApi.prototype.isInIOS = function()
{
	var str = navigator.userAgent;
	var isiOS = !!str.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	return isiOS;
}