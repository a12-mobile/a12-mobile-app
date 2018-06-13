<template>
  <div id="DhFormList">
    <div class="container">
      <div class="row">
          <div class="col-4 oms2-grid-cell">
            <router-link to="/dh/monthly/workload/total">
              <img class='oms2-grid-cell-image' src="./../../assets/img/dhMonthlyWorkload.png">
            </router-link>
            <p>井下工作量月报总</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/dh/monthly/workload/gn">
              <img class='oms2-grid-cell-image' src="./../../assets/img/dhMonthlyWorkload.png">
            </router-link>
            <p>井下工作量月报国内</p>
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
  #DhFormList{
    padding-top:10px;
  }

</style>