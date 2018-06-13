<template>
  <div id="home">
    <!-- <mt-header title="应用" fixed>
      </mt-header> -->
    <div class="container">
      <div class="row">
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
        <div class="col-4 oms2-grid-cell">
          <a href="http://11.10.97.109:9493/websocket/echarts/demo.html">
            <img class='oms2-grid-cell-image' src="./../assets/img/shishishuju.png">
          </a>
          <p>实时监测</p>
        </div>

        <div class="col-4 oms2-grid-cell">
          <router-link to="/drill/form/list">
            <img class='oms2-grid-cell-image' src="./../assets/img/wellList.png">
          </router-link>
          <p>钻井专业</p>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/mlog/form/list">
            <img class='oms2-grid-cell-image' src="./../assets/img/wellList.png">
          </router-link>
          <p>录井专业</p>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/log/form/list">
            <img class='oms2-grid-cell-image' src="./../assets/img/shishishuju.png">
          </router-link>
          <p>测井专业</p>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/dh/form/list">
            <img class='oms2-grid-cell-image' src="./../assets/img/shishishuju.png">
          </router-link>
          <p>井下专业</p>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/gp/form/list">
            <img class='oms2-grid-cell-image' src="./../assets/img/shishishuju.png">
          </router-link>
          <p>物探专业</p>
        </div>


        <!-- <div class="col-4 oms2-grid-cell">
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
            </div> -->
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {},
    methods: {}
  }
</script>

<style lang="scss">
  #home {
    padding-top: 10px;
  }
</style>


