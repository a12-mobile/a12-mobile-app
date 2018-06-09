<template>
  <div id="home">
    <!-- <mt-header title="应用" fixed>
    </mt-header> -->
    <div class="container">
      <div class="row">
          <div class="col-4 oms2-grid-cell" >
            <a href="http://11.10.97.109:9493/websocket/echarts/demo.html">
            <img class='oms2-grid-cell-image' src="./../assets/img/shishishuju.png">
            </a>
            <p>实时监测</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/drill/daily/well/key">
              <img class='oms2-grid-cell-image' src="./../assets/img/drillDailyOfKeyWell.png">
            </router-link>
            <p>重点井日报</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/dailyOfDrilling">
              <img class='oms2-grid-cell-image' src="./../assets/img/mlogFJDT.png">
            </router-link>
            <p>钻井综合日报</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/dRDailyOfRigDynamic">
              <img class='oms2-grid-cell-image' src="./../assets/img/wellList.png">
            </router-link>
            <p>钻机动态日报</p>
          </div>


          <div class="col-4 oms2-grid-cell">
            <router-link to="/mlogMonthOfTeam">
              <img class='oms2-grid-cell-image' src="./../assets/img/mlogFDW.png">
            </router-link>
            <p>录井队伍统计月报</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/mlogsOfRecordWell">
              <img class='oms2-grid-cell-image' src="./../assets/img/mlogDaily.png">
            </router-link>
            <p>录井分队动态</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/MonthLogOfLogWellByCompany">
              <img class='oms2-grid-cell-image' src="./../assets/img/mlogMonthlyByMarket.png">
            </router-link>
            <p>录井分单位月报</p>
          </div>


          <div class="col-4 oms2-grid-cell">
            <router-link to="/log/Monthly/workload">
              <img class='oms2-grid-cell-image' src="./../assets/img/logMonthlyWorkload.png">
            </router-link>
            <p>测井工作量月报</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/log/daily/workload">
              <img class='oms2-grid-cell-image' src="./../assets/img/logMonthlyWorkload.png">
            </router-link>
            <p>测井工作量日报</p>
          </div>

          <div class="col-4 oms2-grid-cell">
            <router-link to="/dh/monthly/workload/total">
              <img class='oms2-grid-cell-image' src="./../assets/img/dhMonthlyWorkload.png">
            </router-link>
            <p>井下工作量月报总</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/dh/monthly/workload/gn">
              <img class='oms2-grid-cell-image' src="./../assets/img/dhMonthlyWorkload.png">
            </router-link>
            <p>井下工作量月报国内</p>
          </div>

          <div class="col-4 oms2-grid-cell">
            <router-link to="/well/list">
              <img class='oms2-grid-cell-image' src="./../assets/img/wellList.png">
            </router-link>
            <p>井列表</p>
          </div>
          <div class="col-4 oms2-grid-cell">
            <router-link to="/well/list/key">
              <img class='oms2-grid-cell-image' src="./../assets/img/wellList.png">
            </router-link>
            <p>关注井列表</p>
          </div>
          <div class="col-4 oms2-grid-cell">
          <router-link to="/real-time/list/project">
            <img class='oms2-grid-cell-image' src="./../assets/img/shishishuju.png">
          </router-link>
          <p>工程数据列表</p>
        </div>


      </div>
    </div>


    <!-- <router-link to="/drill/form/list">
      <button type="button" class="btn btn-primary">钻井报表</button>
    </router-link>
    <br>
    <br>
    <router-link to="/dh/form/list">
      <button type="button" class="btn btn-primary">井下报表</button>
    </router-link>
    <br>
    <br>
    <router-link to="/log/monthly">
      <button type="button" class="btn btn-primary">测井报表</button>
    </router-link>
    <br/>
    <br/>
    <router-link to="/mlog/form/list">
      <button type="button" class="btn btn-primary">录井报表</button>
    </router-link>
    <br/>
    <br/>
    <router-link to="/well/list">
      <button type="button" class="btn btn-primary">井列表</button>
    </router-link> -->
  </div>
</template>

<script>
  export default {
    created(){
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  #home{
    margin-top:10px;
  }
  .oms2-grid-cell{
    border:1px solid #F4F4F4;
    img{
      margin-top:10px;
      width: 60%;
    }
    h6{
      margin-top:5px;
    }
  }

</style>


