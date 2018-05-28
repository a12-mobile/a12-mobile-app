<template>
  <div id="MlogFormList">
    <mt-header :title="$route.meta.title" fixed>
      <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
    </mt-header>
    <router-link to="/mlogsOfRecordWell">
      <button type="button" class="btn btn-primary">录井分队日报</button>
    </router-link>
    <br/>
    <br/>
    <router-link to="/MonthLogOfLogWellByCompany">
      <button type="button" class="btn btn-primary">录井分市场月报</button>
    </router-link>
    <br/>
    <br/>
    <!--<router-link to="/monthLogOfWellWorkload">
      <button type="button" class="btn btn-primary">录井工作量月报</button>
    </router-link>-->
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

<style scoped>
  #MlogFormList{
    margin-top:50px;
  }


</style>
