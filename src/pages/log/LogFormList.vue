<template>
  <div id="LogFormList">
    <div class="container">
      <div class="row">
        <div class="col-4 oms2-grid-cell">
          <router-link to="/log/daily/workload">
            <img class='oms2-grid-cell-image' src="./../../assets/icon/drill/dailyOfKeyWell.png">
          </router-link>
          <p>工作量日报</p>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/log/Monthly/workload">
            <img class='oms2-grid-cell-image' src="./../../assets/icon/log/monthlyOfWorkload.png">
          </router-link>
          <p>工作量月报</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created(){
      this.$ruixin.setWebViewTitle({title:'测井专业'})
    },
    methods: {}
  }
</script>

<style>
  #LogFormList {
    padding-top: 10px;
  }
</style>