<template>
<div>
  <oms2-header :title="$route.meta.title"></oms2-header>
  <div id="DrillKeyIndicatorsYearly">
    <header>
      <!-- <mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" @click="handleBack"><i class="fa fa-search"></i></mt-button>
      </mt-header> -->
      <!--<h4>中油油服钻井工作量日报</h4>-->
      <!-- <p>钻机统计表</p> -->
      <!-- <div class='oms2-report-float-right' style="top:40px">数据来源于A7集团系统钻井综合日报</div> -->
      <oms2-date-picker-daily :date="date">
      </oms2-date-picker-daily>
    </header>
    <v-table
      is-horizontal-resize
      is-vertical-resize
      style="width:100%;font-size:12px"
      :title-row-height=25
      :row-height=30
      :height=tableHeight
      :columns="columns"
      :title-rows="titleRows"
      :table-data="tableData"
      :cellMerge="cellMerge"
      title-bg-color="#F6F6F6"
      even-bg-color="#F4F4F4"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :row-click="handleRowClick"
    ></v-table>
    <div class='oms2-g-report-float-right'>数据来源于A7集团系统库钻井主要指标统计表（年报）</div>
    <!-- Modal 具体数据信息 -->
        <div class="modal fade oms2-font-size" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" style="font-size:18px" id="exampleModalLongTitle">{{selectedRow.orgs}} <b>/</b> {{selectedRow.cityName}} <b>/</b><span style="padding-left:1rem;font-size:14px">({{date.time}})</span></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span style="font-size:32px;" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>

                            <div class="oms2-list-divider list-group-item list-group-item-dark">指标信息</div>
                            <div class="row">
                                <label class="col-5 oms2-right">动用钻井队(个):</label>
                                <p>{{selectedRow.drillTeamNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">开钻(口):</label>
                                <p>{{selectedRow.startDrillNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">完井(口):</label>
                                <p>{{selectedRow.finishDrillNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">进尺(万米):</label>
                                <p>{{selectedRow.jinChi}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻机月速(米/台月):</label>
                                <p>{{selectedRow.rigSpeed}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">机械钻速(米/时):</label>
                                <p>{{selectedRow.mechanicalSpeed}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">平均井深(米):</label>
                                <p>{{selectedRow.avgDeep}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">井身质量</div>
                            <div class="row">
                                <label class="col-5 oms2-right">合格(口):</label>
                                <p>{{selectedRow.qualified}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">合格率(%):</label>
                                <p>{{selectedRow.passRate}}</p>
                            </div>
                             <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">固井质量</div>
                            <div class="row">
                                <label class="col-5 oms2-right">合格(口):</label>
                                <p>{{selectedRow.qualified1}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">合格率(%):</label>
                                <p>{{selectedRow.passRate1}}</p>
                            </div>
                             <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">取心</div>
                            <div class="row">
                                <label class="col-5 oms2-right">进尺(米):</label>
                                <p>{{selectedRow.jinchi1}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">收获率(%):</label>
                                <p>{{selectedRow.harvestRate}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">取心</div>
                            <div class="row">
                                <label class="col-5 oms2-right">进尺(米):</label>
                                <p>{{selectedRow.jinchi1}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">收获率(%):</label>
                                <p>{{selectedRow.harvestRate}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">施工周期(天)</div>
                            <div class="row">
                                <label class="col-5 oms2-right">建井:</label>
                                <p>{{selectedRow.jianjing}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻井:</label>
                                <p>{{selectedRow.zuanjing}}</p>
                            </div>


                        </form>
                        <div class="modal-footer">
                            <!-- <button type="button" data-dismiss="modal" class="btn btn-primary">返回</button> -->
                            <button type="button" @click="closeModel" class="btn btn-primary">返回</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</div>
</template>

<script>
  import { transToHorizontalScreen } from './../../service/utils/system/screen'
  import { Indicator } from 'mint-ui';
  import timepicker from './../../components/datepicker/timepicker'
  import {formatDate,addMonth,getCurrentDate} from './../../service/utils/date/date'
  export default {
    name: "DrillKeyIndicatorsYearly",
    data() {
      return {
        selectedRow:{},  //选中的行
        date: {
          time:getCurrentDate('yyyy')-1,
        },
        tableHeight:0,
        tableData: [
          {"orgs":"合计","cityName":"","drillTeamNum":"735.79","startDrillNum":"10905","finishDrillNum":"10722","jinChi":"2329.84","rigSpeed":"3152","mechanicalSpeed":"13.72","qualified":"10722","passRate":"100","qualified1":"10585",'passRate1':"100","jinchi1":"16941.43","harvestRate":"97.74","jianjing":"23.82","zuanjing":"17.31","avgDeep":"2117"},
          {"orgs":"大庆钻探","cityName":"大庆","drillTeamNum":"98.6","startDrillNum":"3644","finishDrillNum":"3649","jinChi":"541.39","rigSpeed":"4838","mechanicalSpeed":"25.75","qualified":"3649","passRate":"100","qualified1":"3649",'passRate1':"100","jinchi1":"3103.43","harvestRate":"98.99","jianjing":"9.86","zuanjing":"6.48","avgDeep":"1484"},
          {"orgs":"大庆钻探","cityName":"吉林","drillTeamNum":"35.28","startDrillNum":"821","finishDrillNum":"813","jinChi":"149.04","rigSpeed":"3720","mechanicalSpeed":"12.81","qualified":"813","passRate":"100","qualified1":"813",'passRate1':"100","jinchi1":"1355.60","harvestRate":"97.92","jianjing":"15.84","zuanjing":"12.75","avgDeep":"1833"},
          {"orgs":"大庆钻探","cityName":"冀东","drillTeamNum":"2.22","startDrillNum":"16","finishDrillNum":"18","jinChi":"6.25","rigSpeed":"2840","mechanicalSpeed":"13.74","qualified":"18","passRate":"100","qualified1":"18",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"45.03","zuanjing":"29.45","avgDeep":"3470"},
          {"orgs":"大庆钻探","cityName":"塔里木","drillTeamNum":"0.71","startDrillNum":"1","finishDrillNum":"2","jinChi":"1.08","rigSpeed":"1533","mechanicalSpeed":"5.53","qualified":"2","passRate":"100","qualified1":"2",'passRate1':"100","jinchi1":"23.95","harvestRate":"91.69","jianjing":"128.65","zuanjing":"100.07","avgDeep":"5423"},
          {"orgs":"大庆钻探","cityName":"小计","drillTeamNum":"136.81","startDrillNum":"4482","finishDrillNum":"4482","jinChi":"697.76","rigSpeed":"4505","mechanicalSpeed":"20.95","qualified":"4482","passRate":"100","qualified1":"4482",'passRate1':"100","jinchi1":"4482.98","harvestRate":"98.62","jianjing":"11.14","zuanjing":"7.76","avgDeep":"1557"},
          {"orgs":"西部钻探","cityName":"塔里木","drillTeamNum":"11.25","startDrillNum":"20","finishDrillNum":"19","jinChi":"11.40","rigSpeed":"939","mechanicalSpeed":"5.11","qualified":"19","passRate":"100","qualified1":"19",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"194.36","zuanjing":"173.71","avgDeep":"6606"},
          {"orgs":"西部钻探","cityName":"新疆","drillTeamNum":"88.81","startDrillNum":"827","finishDrillNum":"786","jinChi":"179.35","rigSpeed":"2287","mechanicalSpeed":"8.18","qualified":"786","passRate":"100","qualified1":"786",'passRate1':"100","jinchi1":"2576.98","harvestRate":"98.29","jianjing":"40.68","zuanjing":"35.71","avgDeep":"2087"},
          {"orgs":"西部钻探","cityName":"吐哈","drillTeamNum":"23.31","startDrillNum":"180","finishDrillNum":"178","jinChi":"55.09","rigSpeed":"2847","mechanicalSpeed":"8.46","qualified":"178","passRate":"100","qualified1":"178",'passRate1':"100","jinchi1":"309.14","harvestRate":"97.91","jianjing":"47.16","zuanjing":"42.27","avgDeep":"3062"},
          {"orgs":"西部钻探","cityName":"青海","drillTeamNum":"26.40","startDrillNum":"427","finishDrillNum":"413","jinChi":"80.71","rigSpeed":"3111","mechanicalSpeed":"17.09","qualified":"413","passRate":"100","qualified1":"413",'passRate1':"100","jinchi1":"17.00","harvestRate":"98.29","jianjing":"23.02","zuanjing":"20.48","avgDeep":"1900"},
          {"orgs":"西部钻探","cityName":"玉门","drillTeamNum":"7.63","startDrillNum":"25","finishDrillNum":"22","jinChi":"10.99","rigSpeed":"1171","mechanicalSpeed":"3.34","qualified":"22","passRate":"100","qualified1":"22",'passRate1':"100","jinchi1":"70.48","harvestRate":"99.76","jianjing":"124.84","zuanjing":"118.11","avgDeep":"4477"},
          {"orgs":"西部钻探","cityName":"小计","drillTeamNum":"157.40","startDrillNum":"1479","finishDrillNum":"1418","jinChi":"337.54","rigSpeed":"2324","mechanicalSpeed":"8.73","qualified":"1418","passRate":"100","qualified1":"1418",'passRate1':"100","jinchi1":"2973.60","harvestRate":"98.29","jianjing":"39.71","zuanjing":"35.23","avgDeep":"2253"},
          {"orgs":"长城钻探","cityName":"大庆","drillTeamNum":"1.32","startDrillNum":"22","finishDrillNum":"22","jinChi":"5.33","rigSpeed":"3637","mechanicalSpeed":"15.21","qualified":"22","passRate":"100","qualified1":"22",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"24.87","zuanjing":"18.79","avgDeep":"2405"},
          {"orgs":"长城钻探","cityName":"吉林","drillTeamNum":"4.82","startDrillNum":"36","finishDrillNum":"39","jinChi":"11.66","rigSpeed":"2411","mechanicalSpeed":"7.80","qualified":"39","passRate":"100","qualified1":"39",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"51.41","zuanjing":"38.74","avgDeep":"2926"},
          {"orgs":"长城钻探","cityName":"辽河","drillTeamNum":"53.64","startDrillNum":"850","finishDrillNum":"856","jinChi":"165.75","rigSpeed":"2646","mechanicalSpeed":"14.45","qualified":"856","passRate":"100","qualified1":"856",'passRate1':"100","jinchi1":"684.82","harvestRate":"90.61","jianjing":"29.27","zuanjing":"20.74","avgDeep":"1947"},
          {"orgs":"长城钻探","cityName":"冀东","drillTeamNum":"3.10","startDrillNum":"20","finishDrillNum":"18","jinChi":"6.25","rigSpeed":"2257","mechanicalSpeed":"14.12","qualified":"18","passRate":"100","qualified1":"18",'passRate1':"100","jinchi1":"14.83","harvestRate":"72.01","jianjing":"67.87","zuanjing":"48.76","avgDeep":"3217"},
          {"orgs":"长城钻探","cityName":"西南","drillTeamNum":"2.40","startDrillNum":"12","finishDrillNum":"8","jinChi":"5.10","rigSpeed":"1775","mechanicalSpeed":"6.81","qualified":"8","passRate":"100","qualified1":"8",'passRate1':"100","jinchi1":"46.85","harvestRate":"94.80","jianjing":"105.33","zuanjing":"72.52","avgDeep":"5008"},
          {"orgs":"长城钻探","cityName":"长庆","drillTeamNum":"15.41","startDrillNum":"93","finishDrillNum":"93","jinChi":"27.64","rigSpeed":"3032","mechanicalSpeed":"12.97","qualified":"93","passRate":"100","qualified1":"93",'passRate1':"100","jinchi1":"676.19","harvestRate":"100.00","jianjing":"35.82","zuanjing":"25.05","avgDeep":"2975"},
          {"orgs":"长城钻探","cityName":"苏里格","drillTeamNum":"11.99","startDrillNum":"95","finishDrillNum":"79","jinChi":"31.14","rigSpeed":"4975","mechanicalSpeed":"14.47","qualified":"79","passRate":"100","qualified1":"79",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"28.22","zuanjing":"20.86","avgDeep":"3565"},
          {"orgs":"长城钻探","cityName":"塔里木","drillTeamNum":"0.58","startDrillNum":"3","finishDrillNum":"3","jinChi":"1.11","rigSpeed":"1592","mechanicalSpeed":"7.03","qualified":"3","passRate":"100","qualified1":"3",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"88.33","zuanjing":"73.31","avgDeep":"5871"},
          {"orgs":"长城钻探","cityName":"吐哈","drillTeamNum":"7.00","startDrillNum":"35","finishDrillNum":"36","jinChi":"10.93","rigSpeed":"1913","mechanicalSpeed":"6.98","qualified":"36","passRate":"100","qualified1":"36",'passRate1':"100","jinchi1":"18.34","harvestRate":"89.00","jianjing":"54.62","zuanjing":"41.98","avgDeep":"2996"},
          {"orgs":"长城钻探","cityName":"青海","drillTeamNum":"11.00","startDrillNum":"47","finishDrillNum":"45","jinChi":"9.69","rigSpeed":"2232","mechanicalSpeed":"10.38","qualified":"45","passRate":"100","qualified1":"45",'passRate1':"100","jinchi1":"97.35","harvestRate":"83.01","jianjing":"31.79","zuanjing":"21.44","avgDeep":"2236"},
          {"orgs":"长城钻探","cityName":"浙江","drillTeamNum":"5.49","startDrillNum":"14","finishDrillNum":"14","jinChi":"7.29","rigSpeed":"1316","mechanicalSpeed":"4.10","qualified":"14","passRate":"100","qualified1":"14",'passRate1':"100","jinchi1":"18.45","harvestRate":"82.66","jianjing":"126.80","zuanjing":"94.70","avgDeep":"4597"},
          {"orgs":"长城钻探","cityName":"煤层气","drillTeamNum":"3.00","startDrillNum":"7","finishDrillNum":"7","jinChi":"1.64","rigSpeed":"2909","mechanicalSpeed":"11.16","qualified":"7","passRate":"100","qualified1":"7",'passRate1':"100","jinchi1":"52.67","harvestRate":"100.00","jianjing":"29.06","zuanjing":"20.13","avgDeep":"2333"},
          {"orgs":"长城钻探","cityName":"小计","drillTeamNum":"119.75","startDrillNum":"1234","finishDrillNum":"1220","jinChi":"283.53","rigSpeed":"2654","mechanicalSpeed":"12.13","qualified":"1220","passRate":"100","qualified1":"1220",'passRate1':"100","jinchi1":"1609.50","harvestRate":"94.24","jianjing":"33.50","zuanjing":"24.00","avgDeep":"2292"},
          {"orgs":"渤海钻探","cityName":"大庆","drillTeamNum":"0.42","startDrillNum":"1","finishDrillNum":"1","jinChi":"0.58","rigSpeed":"1150","mechanicalSpeed":"6.41","qualified":"1","passRate":"100","qualified1":"1",'passRate1':"100","jinchi1":"14.90","harvestRate":"13.42","jianjing":"151.75","zuanjing":"80.56","avgDeep":"5820"},
          {"orgs":"渤海钻探","cityName":"华北","drillTeamNum":"28.39","startDrillNum":"374","finishDrillNum":"358","jinChi":"102.92","rigSpeed":"3607","mechanicalSpeed":"18.29","qualified":"358","passRate":"100","qualified1":"342",'passRate1':"100","jinchi1":"260.27","harvestRate":"94.58","jianjing":"27.51","zuanjing":"14.53","avgDeep":"2782"},
          {"orgs":"渤海钻探","cityName":"大港","drillTeamNum":"33.11","startDrillNum":"500","finishDrillNum":"490","jinChi":"119.99","rigSpeed":"3994","mechanicalSpeed":"20.98","qualified":"490","passRate":"100","qualified1":"477",'passRate1':"100","jinchi1":"380.77","harvestRate":"92.94","jianjing":"22.15","zuanjing":"13.18","avgDeep":"2403"},
          {"orgs":"渤海钻探","cityName":"冀东","drillTeamNum":"12.45","startDrillNum":"86","finishDrillNum":"87","jinChi":"31.38","rigSpeed":"2522","mechanicalSpeed":"14.67","qualified":"87","passRate":"100","qualified1":"83",'passRate1':"100","jinchi1":"284.34","harvestRate":"96.63","jianjing":"53.13","zuanjing":"33.74","avgDeep":"3617"},
          {"orgs":"渤海钻探","cityName":"西南","drillTeamNum":"1.31","startDrillNum":"13","finishDrillNum":"2","jinChi":"3.08","rigSpeed":"1416","mechanicalSpeed":"5.72","qualified":"2","passRate":"100","qualified1":"1",'passRate1':"100","jinchi1":"105.65","harvestRate":"98.63","jianjing":"122.55","zuanjing":"100.09","avgDeep":"3530"},
          {"orgs":"渤海钻探","cityName":"长庆","drillTeamNum":"7.00","startDrillNum":"56","finishDrillNum":"55","jinChi":"18.70","rigSpeed":"2857","mechanicalSpeed":"11.34","qualified":"55","passRate":"100","qualified1":"54",'passRate1':"100","jinchi1":"488.75","harvestRate":"99.18","jianjing":"43.78","zuanjing":"28.12","avgDeep":"3390"},
          {"orgs":"渤海钻探","cityName":"苏里格","drillTeamNum":"7.85","startDrillNum":"99","finishDrillNum":"100","jinChi":"36.16","rigSpeed":"5015","mechanicalSpeed":"15.82","qualified":"100","passRate":"100","qualified1":"100",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"25.60","zuanjing":"17.47","avgDeep":"3566"},
          {"orgs":"渤海钻探","cityName":"塔里木","drillTeamNum":"26.36","startDrillNum":"53","finishDrillNum":"43","jinChi":"30.13","rigSpeed":"1158","mechanicalSpeed":"5.15","qualified":"43","passRate":"100","qualified1":"30",'passRate1':"100","jinchi1":"113.97","harvestRate":"96.48","jianjing":"168.18","zuanjing":"131.06","avgDeep":"6434"},
          {"orgs":"渤海钻探","cityName":"吐哈","drillTeamNum":"8.11","startDrillNum":"55","finishDrillNum":"60","jinChi":"19.67","rigSpeed":"2000","mechanicalSpeed":"7.69","qualified":"60","passRate":"100","qualified1":"58",'passRate1':"100","jinchi1":"42.83","harvestRate":"90.68","jianjing":"59.93","zuanjing":"40.90","avgDeep":"3442"},
          {"orgs":"渤海钻探","cityName":"青海","drillTeamNum":"7.60","startDrillNum":"175","finishDrillNum":"172","jinChi":"16.62","rigSpeed":"2184","mechanicalSpeed":"9.82","qualified":"172","passRate":"100","qualified1":"163",'passRate1':"100","jinchi1":"359.42","harvestRate":"95.09","jianjing":"13.83","zuanjing":"8.22","avgDeep":"911"},
          {"orgs":"渤海钻探","cityName":"玉门","drillTeamNum":"1.36","startDrillNum":"3","finishDrillNum":"3","jinChi":"1.48","rigSpeed":"994","mechanicalSpeed":"2.85","qualified":"3","passRate":"100","qualified1":"2",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"167.13","zuanjing":"150.61","avgDeep":"4937"},
          {"orgs":"渤海钻探","cityName":"浙江","drillTeamNum":"1.68","startDrillNum":"9","finishDrillNum":"7","jinChi":"2.47","rigSpeed":"2438","mechanicalSpeed":"13.56","qualified":"7","passRate":"100","qualified1":"5",'passRate1':"100","jinchi1":"153.57","harvestRate":"99.26","jianjing":"47.48","zuanjing":"26.54","avgDeep":"3301"},
          {"orgs":"渤海钻探","cityName":"南方","drillTeamNum":"2.53","startDrillNum":"18","finishDrillNum":"18","jinChi":"5.90","rigSpeed":"2657","mechanicalSpeed":"11.93","qualified":"18","passRate":"100","qualified1":"16",'passRate1':"100","jinchi1":"40.92","harvestRate":"99.76","jianjing":"48.86","zuanjing":"31.18","avgDeep":"3531"},
          {"orgs":"渤海钻探","cityName":"煤层气","drillTeamNum":"4.62","startDrillNum":"49","finishDrillNum":"50","jinChi":"9.94","rigSpeed":"2343","mechanicalSpeed":"9.85","qualified":"50","passRate":"100","qualified1":"50",'passRate1':"100","jinchi1":"53.62","harvestRate":"96.55","jianjing":"32.92","zuanjing":"19.05","avgDeep":"1769"},
          {"orgs":"渤海钻探","cityName":"小计","drillTeamNum":"142.79","startDrillNum":"1491","finishDrillNum":"1446","jinChi":"399.02","rigSpeed":"2852","mechanicalSpeed":"13.14","qualified":"1446","passRate":"100","qualified1":"1382",'passRate1':"100","jinchi1":"2299.01","harvestRate":"95.75","jianjing":"32.68","zuanjing":"20.62","avgDeep":"2679"},
          {"orgs":"川庆钻探","cityName":"西南","drillTeamNum":"41.75","startDrillNum":"97","finishDrillNum":"60","jinChi":"41.94","rigSpeed":"837","mechanicalSpeed":"4.03","qualified":"60","passRate":"100","qualified1":"55",'passRate1':"100","jinchi1":"1377.52","harvestRate":"95.17","jianjing":"198.12","zuanjing":"163.74","avgDeep":"4840"},
          {"orgs":"川庆钻探","cityName":"长庆","drillTeamNum":"98.23","startDrillNum":"1891","finishDrillNum":"1884","jinChi":"482.79","rigSpeed":"4972","mechanicalSpeed":"21.62","qualified":"1884","passRate":"100","qualified1":"1816",'passRate1':"100","jinchi1":"3994.86","harvestRate":"99.79","jianjing":"18.82","zuanjing":"11.26","avgDeep":"2506"},
          {"orgs":"川庆钻探","cityName":"苏里格","drillTeamNum":"7.55","startDrillNum":"90","finishDrillNum":"93","jinChi":"34.85","rigSpeed":"3777","mechanicalSpeed":"11.65","qualified":"93","passRate":"100","qualified1":"93",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"39.00","zuanjing":"28.00","avgDeep":"3754"},
          {"orgs":"川庆钻探","cityName":"塔里木","drillTeamNum":"14.24","startDrillNum":"77","finishDrillNum":"60","jinChi":"28.23","rigSpeed":"1651","mechanicalSpeed":"7.16","qualified":"60","passRate":"100","qualified1":"60",'passRate1':"100","jinchi1":"96.50","harvestRate":"97.05","jianjing":"74.06","zuanjing":"63.55","avgDeep":"4407"},
          {"orgs":"川庆钻探","cityName":"新疆","drillTeamNum":"14.24","startDrillNum":"77","finishDrillNum":"60","jinChi":"28.23","rigSpeed":"1651","mechanicalSpeed":"7.16","qualified":"60","passRate":"100","qualified1":"60",'passRate1':"100","jinchi1":"96.50","harvestRate":"97.05","jianjing":"74.06","zuanjing":"29.45","avgDeep":"3470"},
          {"orgs":"川庆钻探","cityName":"青海","drillTeamNum":"6.64","startDrillNum":"33","finishDrillNum":"27","jinChi":"8.64","rigSpeed":"1236","mechanicalSpeed":"5.00","qualified":"27","passRate":"100","qualified1":"27",'passRate1':"100","jinchi1":"4.00","harvestRate":"58.00","jianjing":"71.15","zuanjing":"49.85","avgDeep":"3506"},
          {"orgs":"川庆钻探","cityName":"浙江","drillTeamNum":"6.39","startDrillNum":"20","finishDrillNum":"20","jinChi":"10.62","rigSpeed":"1354","mechanicalSpeed":"5.79","qualified":"20","passRate":"100","qualified1":"20",'passRate1':"100","jinchi1":"18.71","harvestRate":"100.00","jianjing":"110.13","zuanjing":"86.33","avgDeep":"4323"},
          {"orgs":"川庆钻探","cityName":"小计","drillTeamNum":"178.04","startDrillNum":"2216","finishDrillNum":"2153","jinChi":"611.45","rigSpeed":"3180","mechanicalSpeed":"13.87","qualified":"2153","passRate":"100","qualified1":"2080",'passRate1':"100","jinchi1":"5576.34","harvestRate":"98.56","jianjing":"28.31","zuanjing":"19.38","avgDeep":"2717"},
          {"orgs":"海洋工程公司","cityName":"大港","drillTeamNum":"1.00","startDrillNum":"3","finishDrillNum":"3","jinChi":"0.54","rigSpeed":"4655","mechanicalSpeed":"45.00","qualified":"3","passRate":"100","qualified1":"3",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"33.46","zuanjing":"17.18","avgDeep":"2360"},
          {"orgs":"海洋工程公司","cityName":"小计","drillTeamNum":"1.00","startDrillNum":"3","finishDrillNum":"3","jinChi":"0.54","rigSpeed":"4655","mechanicalSpeed":"45.00","qualified":"3","passRate":"100","qualified1":"3",'passRate1':"100","jinchi1":"","harvestRate":"","jianjing":"33.46","zuanjing":"17.18","avgDeep":"2360"},
        ],
        columns: [
          {field: 'orgs', width: 79, columnAlign: 'left',isFrozen: true,isResize: true},
          {field: 'cityName', width: 60, columnAlign: 'left',isFrozen: true,isResize: true},
          {field: 'drillTeamNum', width: 60, columnAlign: 'right', isResize: true},
          {field: 'startDrillNum', width: 50, columnAlign: 'right', isResize: true},
          {field: 'finishDrillNum', width: 50, columnAlign: 'right', isResize: true},
          {field: 'jinChi', width: 51, columnAlign: 'right', isResize: true},
          {field: 'rigSpeed', width: 50, columnAlign: 'right', isResize: true},
          {field: 'mechanicalSpeed', width: 50, columnAlign: 'right', isResize: true},
          {field: 'qualified', width: 50, columnAlign: 'right', isResize: true},
          {field: 'passRate', width: 50, columnAlign: 'right', isResize: true},
          {field: 'qualified1', width: 60, columnAlign: 'right', isResize: true},
          {field: 'passRate1', width: 50, columnAlign: 'right', isResize: true},
          {field: 'jinchi1', width: 58, columnAlign: 'right', isResize: true},
          {field: 'harvestRate', width: 50, columnAlign: 'right', isResize: true},
          {field: 'jianjing', width: 50, columnAlign: 'right', isResize: true},
          {field: 'zuanjing', width: 50, columnAlign: 'right', isResize: true},
          {field: 'avgDeep', width: 50, columnAlign: 'right', isResize: true},
        ],
        titleRows: [
          //第一行
          [{fields: ['orgs','cityName'], title: '单位', titleAlign: 'center', rowspan: 3,colspan: 2},
            {fields: ['drillTeamNum'], title: '动用钻井队(个)', titleAlign: 'center',rowspan: 3},
            {fields: ['startDrillNum'], title: '开钻(口)', titleAlign: 'center',rowspan: 3},
            {fields: ['finishDrillNum'], title: '完井(口)', titleAlign: 'center',rowspan: 3},
            {fields: ['jinChi'], title: '进尺(万米)', titleAlign: 'center',rowspan:3},
            {fields: ['rigSpeed'], title: '钻机月速(米/台月)', titleAlign: 'center',rowspan:3},
            {fields: ['mechanicalSpeed'], title: '机械钻速(米/时)', titleAlign: 'center',rowspan:3},
            {fields: ['qualified','passRate'], title: '井身质量', titleAlign: 'center',colspan:2},
            {fields: ['qualified1','passRate1'], title: '固井质量', titleAlign: 'center',colspan:2},
            {fields: ['jinchi1','harvestRate'], title: '取心', titleAlign: 'center',colspan:2},
            {fields: ['jianjing','zuanjing'], title: '施工周期(天)', titleAlign: 'center',colspan:2},
            {fields: ['avgDeep'], title: '平均井深(米)', titleAlign: 'center',rowspan:3},
          ],
          //第二行
          [
            {fields: ['qualified'], title: '合格', titleAlign: 'center'},
            {fields: ['passRate'], title: '合格率', titleAlign: 'center'},
            {fields: ['qualified1'], title: '合格', titleAlign: 'center'},
            {fields: ['passRate1'], title: '合格率', titleAlign: 'center'},
            {fields: ['jinchi1'], title: '进尺', titleAlign: 'center'},
            {fields: ['harvestRate'], title: '收获率', titleAlign: 'center'},
            {fields: ['jianjing'], title: '建井', titleAlign: 'center',rowspan:2},
            {fields: ['zuanjing'], title: '钻井', titleAlign: 'center',rowspan:2},
          ],
          //第三行
          [
            {fields: ['qualified'], title: '(口)', titleAlign: 'center'},
            {fields: ['passRate'], title: '%', titleAlign: 'center'},
            {fields: ['qualified1'], title: '(口)', titleAlign: 'center'},
            {fields: ['passRate1'], title: '%', titleAlign: 'center'},
            {fields: ['jinchi1'], title: '(米)', titleAlign: 'center'},
            {fields: ['harvestRate'], title: '%', titleAlign: 'center'},
          ],
          //第四行
          //[
            //{fields: ['orgs','cityName'], title: '合计', titleAlign: 'center', colspan: 2},
            //{fields: ['drillTeamNum'], title: '735.79', titleAlign: 'right'},
            //{fields: ['startDrillNum'], title: '10905', titleAlign: 'right'},
            //{fields: ['finishDrillNum'], title: '10722', titleAlign: 'right'},
            //{fields: ['jinChi'], title: '2329.84', titleAlign: 'right'},
            //{fields: ['rigSpeed'], title: '3152', titleAlign: 'right'},
            //{fields: ['mechanicalSpeed'], title: '13.72', titleAlign: 'right'},
            //{fields: ['qualified'], title: '10722', titleAlign: 'right'},
            //{fields: ['passRate'], title: '100', titleAlign: 'right'},
            //{fields: ['qualified1'], title: '10585', titleAlign: 'right'},
            //{fields: ['passRate1'], title: '100', titleAlign: 'right'},
            //{fields: ['jinchi1'], title: '16941.43', titleAlign: 'right'},
            //{fields: ['harvestRate'], title: '97.74', titleAlign: 'right'},
            //{fields: ['jianjing'], title: '23.82', titleAlign: 'right'},
            //{fields: ['zuanjing'], title: '17.31', titleAlign: 'right'},
            //{fields: ['avgDeep'], title: '2117', titleAlign: 'right'},
          //],

        ],

      }
    },
    created(){
      this.tableHeight=window.innerHeight-80
    },
    mounted(){
      this.$ruixin.setWebViewTitle({title:"2017钻井主要指标统计表"});
      setTimeout(()=>{
        this.$ruixin.supportAutorotate({});
      },200)
    },
    methods: {
      handleBack() {
        if (Indicator) {
          Indicator.close()
        }
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
    cellMerge(rowIndex, rowData, field) {
        if(field=="orgs"&&rowData[field]=="合计"){
          return {
            colSpan: 2,
            rowSpan: 1,
            content: '合计',
            componentName: ''
          }
        }
        if(field==='orgs'){
          let allorgs=rowData[field];
          //还没有合并该局级单位
          let num=0;  //记录这个局级单位有多少个
          for(let i=rowIndex;i<this.tableData.length;i++){
            if(this.tableData[i].orgs==allorgs){
              num++
            }else{
              break
            }
          }
          if(num>0){
            return {
              colSpan: 1,
              rowSpan: num,
              content: allorgs,
              componentName: ''
            }
          }
        }
      },
      /**
     * 表格行点击回掉
     */
      handleRowClick(rowIndex, rowData, column){
          this.selectedRow=rowData
          $("#ModalWellMessage").modal('show')
            },
          closeModel(){
            $("#ModalWellMessage").modal('hide')
            }

    },
  }

</script>

<style lang="scss" scoped>
  #DrillKeyIndicatorsYearly{
    .oms2-list-item-content{
      text-align: left;
      padding-left:0px;
      padding-bottom:10px;
    }
    .oms2-list-divider{
      text-align: center;
      padding-top:0rem !important;
      padding-bottom:0rem !important;
      margin-bottom:10px;
    }
    .oms2-right{
      text-align: right;
    }
  }
</style>
