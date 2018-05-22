<template>
  <div>
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
    <!-- <button class="btn btn-info" @click="requestTest">请求数据测试</button>
    <br/>
    <br/>
    <br/> -->
    <!-- <router-link to="/sub">
      <button type="button" class="btn btn-primary">进入子页面</button>
    </router-link> -->
<!-- 
    <br/>
    <br/> -->
    <router-link to="/dailyOfDrilling">
      <button type="button" class="btn btn-primary">进入中油油服钻井日报</button>
    </router-link>
    <router-link to="/logsOfRecordWell">
      <button type="button" class="btn btn-primary">进入录井日报</button>
    </router-link>

  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
