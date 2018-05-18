<template>
<div>
  <mt-header :title="$route.meta.title" fixed>
      <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <router-link to="/dh/workload/monthly/home">
      <button type="button" class="btn btn-primary">井下作业工作量统计月报（国内）</button>
    </router-link>
    <br>
    <br>
    <router-link to="/dh/workload/monthly/total">
      <button type="button" class="btn btn-primary">井下作业工作量统计月报（总）</button>
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
</style>