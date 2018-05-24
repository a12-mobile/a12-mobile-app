<template>
  <div id="LogFormList">
    <mt-header :title="$route.meta.title" fixed>
      <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
    </mt-header>
    <router-link to="/log/Monthly/workload">
      <button type="button" class="btn btn-primary">测井工作量统计表</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    methods: {
      handleBack() {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      }
    }
  }
</script>

<style>
  #LogFormList{
    margin-top:50px;
  }

</style>