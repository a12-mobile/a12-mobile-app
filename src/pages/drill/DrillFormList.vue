<template>
  <div id="DrillFormList">
    <div class="container">

      <div class="row">
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/well/list">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/wellList.png">
          </router-link>
          <p>井列表</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/well/list/key">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/careWellList.png">
          </router-link>
          <p>关注井列表</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/real-time/list/project">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/realtimeData.png">
          </router-link>
          <p>实时数据监测</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <!-- <a href="http://11.10.97.109:9493/websocket/echarts/demo.html"> -->
          <a :href="dataMonitor">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/realtimeCharts.png">
          </a>
          <p>实时曲线监测</p>
        </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/drill/daily/well/key">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/drill/dailyOfKeyWell.png">
            </router-link>
            <p>重点井日报</p>
          </div>

          <!-- <div class="col-4 oms2-g-grid-cell">
            <router-link to="/dRDailyOfRigDynamic">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/dh/monthlyOfWorkload.png">
            </router-link>
            <p>钻机动态日报</p>
          </div> -->
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/drill/daily/well">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/drill/dailyOfKeyWell.png">
            </router-link>
            <p>分井动态</p>
          </div>

          <!-- <div class="col-4 oms2-g-grid-cell">
            <router-link to="/dailyOfDrilling">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/wellList.png">
            </router-link>
            <p>工作量日报</p>
          </div> -->
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/rigstatistics">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/workloadOfBlock.png">
            </router-link>
            <p>钻机统计表(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/drillTeam">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/teamOfTeamType.png">
            </router-link>
            <p>队伍分布表(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/footage">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/teamOfDeviceType.png">
            </router-link>
            <p>工作量-钻井进尺表(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/drillNum">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/foreignOfTeamType.png">
            </router-link>
            <p>工作量-开钻口数表(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/drillFinishNum">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/wellList.png">
            </router-link>
            <p>钻井工作量-完井口数统计表(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/drillKeyIndicators">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/wellList.png">
            </router-link>
            <p>钻井主要指标统计表(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/shamTsengFinish">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/wellList.png">
            </router-link>
            <p>深井完成井(4000米以上)统计表（年报）</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/engineeringAccidents">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/wellList.png">
            </router-link>
            <p>钻井工程事故统计表（年报）</p>
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
      this.$ruixin.setWebViewTitle({title:'钻井专业'})
    },
    methods: {
    }
  }
</script>

<style>
  #DrillFormList{
    padding-top:10px;
  }

</style>
