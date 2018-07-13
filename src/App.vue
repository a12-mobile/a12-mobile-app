<template>
  <div id="app">
    <!-- 下面是底部标签 -->
    <Tabs></Tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  import Tabs from "./pages/Tabs.vue"
  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      Tabs,
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    // font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // margin-top: 50px;    //瑞信端直接使用瑞信标题，不需要为标题栏留出空位
    // padding-top:10px;
  }
</style>
