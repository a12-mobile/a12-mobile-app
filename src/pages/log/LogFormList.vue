<template>
  <div id="LogFormList">
    <div class="container">
      <div class="row">
          <div class="col-4 oms2-grid-cell">
            <router-link to="/log/Monthly/workload">
              <img class='oms2-grid-cell-image' src="./../../assets/img/logMonthlyWorkload.png">
            </router-link>
            <p>测井工作量月报</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/log/daily/workload">
              <img class='oms2-grid-cell-image' src="./../../assets/img/logMonthlyWorkload.png">
            </router-link>
            <p>测井工作量日报</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
    }
  }
</script>

<style>
  #LogFormList{
    padding-top:10px;
  }

</style>