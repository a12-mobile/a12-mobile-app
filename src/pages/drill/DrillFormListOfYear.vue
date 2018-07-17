<template>
  <div id="DrillFormList">
    <div class="container">

      <div class="row">
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/rigstatistics">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/workloadOfBlock.png">
            </router-link>
            <p>钻机统计(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/drillTeam">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/teamOfTeamType.png">
            </router-link>
            <p>队伍分布(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/footage">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/teamOfDeviceType.png">
            </router-link>
            <p>工作量-钻井进尺(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/drillNum">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/foreignOfTeamType.png">
            </router-link>
            <p>工作量-开钻口数(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/drillFinishNum">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/drill/dailyOfKeyWell.png">
            </router-link>
            <p>工作量-完井口数(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/drillKeyIndicators">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/wellList.png">
            </router-link>
            <p>主要指标(年报)</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/shamTsengFinish">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/drill/dailyOfKeyWell.png">
            </router-link>
            <p>深井完成井(4000米以上)(年报）</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/years/engineeringAccidents">
              <img class='oms2-grid-cell-image' src="./../../assets/icon/log/workloadOfBlock.png">
            </router-link>
            <p>工程事故统计（年报）</p>
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
      this.$ruixin.setWebViewTitle({title:'钻井年报'})
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
