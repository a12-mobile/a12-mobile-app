// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import httpServer from './service/http/httpService'


//引入jquery
import $ from 'jquery' 

//引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// // 引入全部mint-ui组件
// import Mint from 'mint-ui';
// Vue.use(Mint);

// 按需引入部分mint-ui组件
import { Header,Button } from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

//easytable引入
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

// require("./assets/css/style.css")


let ruixinApi=new RuixinApi()
//全局注册
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$http = httpServer
Vue.prototype.$ruixinApi=ruixinApi


//定义全局过滤器
/**
 * 如果数值为-1,则说明该值为null,   自己定义的，后台传入
 * 用于报表展示
 */
Vue.filter('ifNumberIsNull', function (value) {
  if(value==-1){
    return ''
  }else{
    return value
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
