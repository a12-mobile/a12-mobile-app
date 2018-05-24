<template>
<div>
  <mt-header :title="$route.meta.title" fixed>
      <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
    </mt-header>
    <!-- <router-link to="/drill/project/data/list">
      <button type="button" class="btn btn-primary">工程数据列表</button>
    </router-link>
    <br>
    <br>
    <router-link to="/drill/project/data/list2">
      <button type="button" class="btn btn-primary">工程数据列表2</button>
    </router-link> -->
    <router-link to="/drill/daily/well/key">
      <button type="button" class="btn btn-primary">重点井日报</button>
    </router-link>
    <br/>
    <br/>
    <router-link to="/dailyOfDrilling">
      <button type="button" class="btn btn-primary">中油油服钻井工作量日报</button>
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
