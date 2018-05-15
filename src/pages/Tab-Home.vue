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
  </div>
</template>

<script>
  export default {
    methods: {}
  }
</script>

<style>

</style>


