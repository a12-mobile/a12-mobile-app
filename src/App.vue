<template>
  <div id="app">
    <div v-show="$route.meta.navShow">
      <!-- 下面是底部标签 -->
      <Tabs></Tabs>
    </div>
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
      Tabs
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
