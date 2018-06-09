// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import httpServer from './service/http/httpService'
import entityServer from './service/http/entityService'
import toastServer from './service/utils/toast/toast'

import './config/rem'


//引入jquery
import $ from 'jquery' 

//引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// // 引入全部mint-ui组件
// import Mint from 'mint-ui';
// Vue.use(Mint);

// 按需引入部分mint-ui组件
import { Header,Button,IndexList, IndexSection, Cell ,Loadmore ,Spinner,Navbar ,TabItem,TabContainer,TabContainerItem } from 'mint-ui';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.component(Spinner.name, Spinner);

Vue.component(Loadmore.name, Loadmore);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Cell.name, Cell);

// 按需引入部分mint-ui组件 END

//添加自动完成搜索框
import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant'
Vue.use(VueInstant)

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
Vue.prototype.$axios = axios          //http请求
Vue.prototype.$http = httpServer      //封装axios
Vue.prototype.$entity = entityServer  //实体服务，用于服务器对实体进行增删改查
Vue.prototype.$ruixin=ruixinApi    //瑞信API
Vue.prototype.$toast=toastServer      //土司


//定义全局过滤器
/**
 * 如果数值为-1,则说明该值为null,   自己定义的，后台传入
 * 用于报表展示
 */
Vue.filter('ifNumberIsNull', function (value) {
  if(!value||value==-1){
    return ''
  }else{
    return value
  }
})

Vue.filter('ifStringIsNull', function (value) {
  if(!value||value==''){
    return '空'
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
