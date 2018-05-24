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


#文件目录说明
重要文件内容均在src目录下，因此只说明该目录下内容
assets:
    /img: 存放图片或图标资源

components: 存放自定义组件
    /datepicker: 存放关于时间选择的组件，目前包含日报/月报时间选择组件

pages: 存放页面组件，一个组件对应一个页面
    /dh: 关于井下的页面
    /drill: 关于钻井的页面
    /log: 关于测井的页面

router: 对路由的配置

service: 为页面提供数据服务，用于http请求，本地存取等操作
    /dh: 为井下页面提供数据服务
    /drill: 为钻井页面提供数据服务
    /dh: 为测井页面提供数据服务
    /http: 对axios进行二次封装，方便对数据进行调用
    /utils: 工具类
        /date: 提供时间方面的函数

style: 为页面提供全局样式
    global.scss: 全局样式入口文件，用于当有多个scss样式文件时可以提供统一的出口
    theme.scss: 提供自定义样式
    variables.scss： 提供全局样式变量















