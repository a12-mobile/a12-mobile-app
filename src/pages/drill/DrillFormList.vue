<template>
  <div id="DrillFormList">
    <div class="container">
      <div class="row">
          <div class="col-4 oms2-grid-cell">
            <router-link to="/drill/daily/well/key">
              <img class='oms2-grid-cell-image' src="./../../assets/img/drillDailyOfKeyWell.png">
            </router-link>
            <p>重点井日报</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/dailyOfDrilling">
              <img class='oms2-grid-cell-image' src="./../../assets/img/mlogFJDT.png">
            </router-link>
            <p>钻井综合日报</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/dRDailyOfRigDynamic">
              <img class='oms2-grid-cell-image' src="./../../assets/img/wellList.png">
            </router-link>
            <p>钻机动态日报</p>
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
  #DrillFormList{
    padding-top:10px;
  }

</style>
