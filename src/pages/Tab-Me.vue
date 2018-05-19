<template>
  <div>
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
    <button class="btn btn-info" @click="requestTest">请求数据测试</button>
    <br/>
    <br/>
    <br/>
    <router-link to="/sub">
      <button type="button" class="btn btn-primary">进入子页面</button>
    </router-link>

    <br/>
    <br/>
    <router-link to="/dailyOfDrilling">
      <button type="button" class="btn btn-primary">进入中油油服钻井日报</button>
    </router-link>
    <router-link to="/monthLogOfWellWorkload">
      <button type="button" class="btn btn-primary">进入录井工作量月报</button>
    </router-link>


  </div>
</template>

<script>
  import * as config from './../assets/js/configure'
  export default {
    data() {
      return {}
    },
    methods: {
      request() {
        //  为解决跨域问题使用了代理,  /api 代表了代理的ip和端口, 具体配置见   config/index.js
        this.$axios.get('/api/a12/data/get')
          .then(function(response) {
            console.log(response);
            alert(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      requestTest() {
        this.$axios.get('http://11.10.97.76:8080/eaam-app/asset/current/time')
          .then(function(response) {
            console.log(response);
            alert(response.data.currentTime);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style>

</style>
