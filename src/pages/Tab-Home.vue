<template>
  <div id="home">
    <!-- <mt-header title="应用" fixed>
    </mt-header> -->
    <div class="container">
      <div class="row">
          <div class="col-4 oms2-grid-cell" >
            <a href="http://61.158.56.6:8030/websocket/echarts/demo.html">
            <img class='oms2-grid-cell-image' src="./../assets/img/shishishuju.png">
            </a>
            <h6>实时监测</h6>
          </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/drill/daily/well/key">
            <img class='oms2-grid-cell-image' src="./../assets/img/drillDailyOfKeyWell.png">
          </router-link>
          <h6>重点井日报</h6>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/horizontal/drill/daily/zh">
            <img class='oms2-grid-cell-image' src="./../assets/img/mlogFJDT.png">
          </router-link>
          <h6>钻井综合日报</h6>
        </div>
      </div>

      <div class="row">
        <div class="col-4 oms2-grid-cell">
          <router-link to="/mlogMonthOfTeam">
            <img class='oms2-grid-cell-image' src="./../assets/img/mlogFDW.png">
          </router-link>
          <h6>录井队伍统计月报</h6>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/mlogs">
            <img class='oms2-grid-cell-image' src="./../assets/img/mlogDaily.png">
          </router-link>
          <h6>录井分队动态</h6>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/MonthLogOfLogWellByCompany">
            <img class='oms2-grid-cell-image' src="./../assets/img/mlogMonthlyByMarket.png">
          </router-link>
          <h6>录井分市场月报</h6>
        </div>
      </div>

      <div class="row">
        <div class="col-4 oms2-grid-cell">
          <router-link to="/log/Monthly/workload">
            <img class='oms2-grid-cell-image' src="./../assets/img/logMonthlyWorkload.png">
          </router-link>
          <h6>测井工作量月报</h6>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/dh/monthly/workload/total">
            <img class='oms2-grid-cell-image' src="./../assets/img/dhMonthlyWorkload.png">
          </router-link>
          <h6>井下工作量月报总</h6>
        </div>
        <div class="col-4 oms2-grid-cell">
          <router-link to="/dh/monthly/workload/gn">
            <img class='oms2-grid-cell-image' src="./../assets/img/wellList.png">
          </router-link>
          <h6>井下工作量月报国内</h6>
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
      // var w=$('.oms2-grid-cell').width();
      // console.log(w)
      // $('.oms2-grid-cell').attr('height',w);
//       var w=document.getElementById("oms2-grid-cell").style.width;
// document.getElementById("oms2-grid-cell").style.height=
// document.getElementById("oms2-grid-cell").offsetWidth+"px";
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


