<template>
  <div id="MlogFormList">
    <div class="container">
      <div class="row">
        <div class="col-4 oms2-grid-cell">
          <router-link to="/real-time/list/project">
            <img class='oms2-grid-cell-image' src="./../../assets/icon/realtimeData.png">
          </router-link>
          <p>实时数据监测</p>
        </div>
        <div class="col-4 oms2-grid-cell">
          <!-- <a href="http://11.10.97.109:9493/websocket/echarts/demo.html"> -->
          <a :href="dataMonitor">
            <img class='oms2-grid-cell-image' src="./../../assets/icon/realtimeCharts.png">
          </a>
          <p>实时曲线监测</p>
        </div>
        <div class="col-4 oms2-grid-cell">
            <router-link to="/mlogsOfRecordWell">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/mlog/daily.png">
            </router-link>
            <p>分队动态</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/mlogMonthOfTeam">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/mlog/monthlyByTeam.png">
            </router-link>
            <p>队伍统计月报</p>
          </div>
          
          <div class="col-4 oms2-grid-cell">
            <router-link to="/MonthLogOfLogWellByCompany">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/mlog/monthlyByMarket.png">
            </router-link>
            <p>分单位月报</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {dataMonitorUrl} from './../../service/http/config'
  export default {
    data(){
      return {
        dataMonitor:dataMonitorUrl
      }
    },
      created(){
        this.$ruixin.setWebViewTitle({title:'录井专业'})
      },
    }
</script>

<style scoped>
  #MlogFormList{
    padding-top:10px;
  }


</style>
