# oms2-mobile

> 井场实时监测与预警移动应用

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#公共变量说明
$axios       http请求  (function)
$http        封装axios (function)
$entity      实体服务，用于服务器对实体进行增删改查
    |——$entity.add(url, data = {})
    |——$entity.query(url,data={})
    |——$entity.delete(url,body=[])

$ruixin      瑞信API
    |——详情请见瑞信api文档

$toast       土司
    |——$toast.showToast(message,duration='3000',position='bottom')

$mixin        混入
    |——$mixin.mixin_ruixin()  设置瑞信标题头、调用横屏API接口


#文件目录说明
重要文件内容均在src目录下，因此只说明该目录下内容
/assets 
    /img         存放图片或图标资源

/components    存放自定义组件
    /datepicker  存放关于时间选择的组件，目前包含日报/月报时间选择组件

/pages  存放页面组件，一个组件对应一个页面
    /demo        各种页面demo存放处
    /dh          关于井下的页面
    /drill       关于钻井的页面
    /log         关于测井的页面
    /mlog        关于录井的页面

/router  对路由的配置

/service     为页面提供数据服务，用于http请求，本地存取等操作
    /comm   存放公共服务部分
        /user.js              关于用户的服务，可以获取用户信息

    /dh     为井下页面提供数据服务
    /drill  为钻井页面提供数据服务
    /dh     为井下页面提供数据服务
    /http   对axios进行二次封装，方便对数据进行调用
        /config.js            http请求基本路径设置
        /entityService.js     对于后台实体服务请求的封装
        /httpService.js       对axios的二次封装

    /log    为测井页面提供数据服务
    /mlog   为录井页面提供数据服务
    /utils  工具类
        /database
            /database.js
                |—— createUUID()  获取32位uuid

        /date
            /date.js
                |—— getCurrentTime()        获取当前时间  HH mm ss
                |—— getCurrentDate()        获取当前日期  yyyy-MM-dd
                |—— addDate()               日期，在原有日期基础上，增加（减少）days天数，默认增加1天
                |—— addMonth()              在原有日期基础上，增加（减少）months月，默认增加1月
                |—— formatDate()            将date类型按指定格式转化为String类型
                |—— compareDate()           比较两个日期的大小

        /system
            /screen.js
                |—— transToHorizontalScreen()   css横屏显示

        /toast
            /toast.js
                |—— POSITION       {Object} toast出现的位置 'bottom','middle','top'
                |—— showToast()    显示toast

        /well   为井下页面提供数据服务 

/style    为页面提供全局样式
    /global.scss        全局样式入口文件，用于当有多个scss样式文件时可以提供统一的出口
    /reportForm.scss    关于报表的样式
        |—— .oms2-g-report-float-right  报表底部显示数据来源 
        |—— .oms2-g-item-not-exist      列表不存在时显示红色
        |—— .oms2-g-horizontal-back     不显示瑞信标题时返回按钮的位置
        |—— .oms2-g-grid-cell           各专业索引表格

    /theme.scss        提供自定义样式
        |—— .cov-date-body            设置timepicker的样式 宽度最大为屏幕宽度的80%
        |—— .oms2-font-size           文字默认大小：16px 为了屏幕适配造成某些文字不合适时调用，可以直接使用

    /variables.scss   提供全局样式变量















