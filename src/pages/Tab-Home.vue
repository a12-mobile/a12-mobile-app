<template>
  <div id="home">
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
    <router-link to="/drill/project/data/list">
      <button type="button" class="btn btn-primary">工程数据列表</button>
    </router-link>
    <br>
    <br>
    <router-link to="/drill/project/data/list2">
      <button type="button" class="btn btn-primary">工程数据列表2</button>
    </router-link>
    <router-link to="/daily/well/key">
      <button type="button" class="btn btn-primary">重点井日报</button>
    </router-link>
    <p id="font">微软雅黑</p>
    <p id="">微软雅黑</p>
  </div>
</template>

<script>
  export default {
    methods: {}
  }
</script>

<style>
  
    #font{
        font-family:'楷体';
    }
    p{
      font-size: 25px;

    }

</style>


