<template>
  <div id="app">
    <!-- 下面是底部标签 -->
    <Tabs></Tabs>
    <div class="content">
      <router-view></router-view>
    </div>
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // margin-top: 50px;    //瑞信端直接使用瑞信标题，不需要为标题栏留出空位
    margin-top:10px;
    height: 100% !important;
  }
</style>
