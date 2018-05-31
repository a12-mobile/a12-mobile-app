<template>
  <div id="home">
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
    <router-link to="/drill/form/list">
      <button type="button" class="btn btn-primary">钻井报表</button>
    </router-link>
    <br>
    <br>
    <router-link to="/dh/form/list">
      <button type="button" class="btn btn-primary">井下报表</button>
    </router-link>
    <br>
    <br>
    <router-link to="/log/monthly">
      <button type="button" class="btn btn-primary">测井报表</button>
    </router-link>
    <br/>
    <br/>
    <router-link to="/mlog/form/list">
      <button type="button" class="btn btn-primary">录井报表</button>
    </router-link>
    <br/>
    <br/>
    <router-link to="/well/list">
      <button type="button" class="btn btn-primary">井列表</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    methods: {}
  }
</script>

<style>
  #home{
    margin-top:50px;
  }

</style>


