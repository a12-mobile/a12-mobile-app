<template>
  <div id="MlogFormList">
    <div class="container">
      <div class="row">
          <div class="col-4 oms2-grid-cell">
            <router-link to="/mlogMonthOfTeam">
              <img class='oms2-grid-cell-image' src="./../../assets/img/mlogFDW.png">
            </router-link>
            <p>录井队伍统计月报</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/mlogsOfRecordWell">
              <img class='oms2-grid-cell-image' src="./../../assets/img/mlogDaily.png">
            </router-link>
            <p>录井分队动态</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/MonthLogOfLogWellByCompany">
              <img class='oms2-grid-cell-image' src="./../../assets/img/mlogMonthlyByMarket.png">
            </router-link>
            <p>录井分单位月报</p>
          </div>
      </div>
    </div>
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
    padding-top:10px;
  }


</style>
