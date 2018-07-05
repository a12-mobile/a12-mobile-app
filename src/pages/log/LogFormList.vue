<template>
  <div id="LogFormList">
    <div class="container">
      <div class="row">
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/log/daily/workload">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/dailyOfWorkload.png">
          </router-link>
          <p>工作量日报</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/log/Monthly/workload">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/monthlyOfWorkload.png">
          </router-link>
          <p>工作量月报</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/log/Monthly/workloadOfBlock">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/workloadOfBlock.png">
          </router-link>
          <p>工作量油区分布</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/log/Monthly/TeamByTeamType">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/teamOfTeamType.png">
          </router-link>
          <p>专业队伍分布表(队伍类型)</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/log/Monthly/TeamByDeviceType">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/teamOfDeviceType.png">
          </router-link>
          <p>专业队伍分布表(设备类型)</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/log/Monthly/ForeignTeamByTeamType">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/foreignOfTeamType.png">
          </router-link>
          <p>专业队伍国外分布表(队伍类型)</p>
        </div>
        <div class="col-4 oms2-g-grid-cell">
          <router-link to="/log/Monthly/ForeignTeamByDeviceType">
            <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/foreignOfDeviceType.png">
          </router-link>
          <p>专业队伍国外分布表(设备类型)</p>
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
