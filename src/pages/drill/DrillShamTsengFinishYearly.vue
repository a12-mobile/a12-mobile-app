<template>
<div>
  <oms2-header :title="$route.meta.title"></oms2-header>
  <div id="ShamTsengFinishYearly">
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
      :title-row-height=53
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
    <div class='oms2-g-report-float-right'>数据来源于A7集团系统库深井完成井统计表（4000米以上）</div>
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

                            <div class="oms2-list-divider list-group-item list-group-item-dark">基本信息</div>
                            <div class="row">
                                <label class="col-5 oms2-right">完成井数(口):</label>
                                <p>{{selectedRow.drillFinishNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻井周期(天):</label>
                                <p>{{selectedRow.drillCycle}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">建井周期(天):</label>
                                <p>{{selectedRow.shaftBuildingCycle}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">平均井深(米):</label>
                                <p>{{selectedRow.avgDeep}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">取心井数(口):</label>
                                <p>{{selectedRow.avgCoringJinChi}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">平均取心进尺(米):</label>
                                <p>{{selectedRow.avgCoringJinChi}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">平均取心收获率(%):</label>
                                <p>{{selectedRow.avgCoringHarvestRate}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">机械钻速(米/时):</label>
                                <p>{{selectedRow.mechanicalSpeed}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻机月速(米/台月):</label>
                                <p>{{selectedRow.rigSpeed}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻机台月(台月):</label>
                                <p>{{selectedRow.rigNum}}</p>
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
    name: "ShamTsengFinishYearly",
    data() {
      return {
        selectedRow:{},  //选中的行
        date: {
          time:getCurrentDate('yyyy')-1,
        },
        tableHeight:0,
        tableData: [
          {"orgs":"合计","cityName":"","drillFinishNum":"648","drillCycle":"92.60","shaftBuildingCycle":"112.75","avgDeep":"4923","CoringNum":"132","avgCoringJinChi":"26.03","avgCoringHarvestRate":"95.98","mechanicalSpeed":"5.7","rigSpeed":"1449",'rigNum':"2083.93"},
          {"orgs":"大庆钻探","cityName":"大庆","drillFinishNum":"10","drillCycle":"155.46","shaftBuildingCycle":"200.84","avgDeep":"4431","CoringNum":"6","avgCoringJinChi":"10.69","avgCoringHarvestRate":"99.72","mechanicalSpeed":"3.34","rigSpeed":"707",'rigNum':"62.65"},
          {"orgs":"大庆钻探","cityName":"吉林","drillFinishNum":"4","drillCycle":"193.16","shaftBuildingCycle":"212.91","avgDeep":"4813","CoringNum":"2","avgCoringJinChi":"10.99","avgCoringHarvestRate":"97.27","mechanicalSpeed":"2.23","rigSpeed":"705",'rigNum':"27.39"},
          {"orgs":"大庆钻探","cityName":"冀东","drillFinishNum":"4","drillCycle":"44.57","shaftBuildingCycle":"63.24","avgDeep":"4278","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"12.31","rigSpeed":"2637",'rigNum':"6.49"},
          {"orgs":"大庆钻探","cityName":"塔里木","drillFinishNum":"1","drillCycle":"167.19","shaftBuildingCycle":"201.13","avgDeep":"7096","CoringNum":"1","avgCoringJinChi":"7.14","avgCoringHarvestRate":"72.97","mechanicalSpeed":"4.34","rigSpeed":"1205",'rigNum':"5.89"},
          {"orgs":"大庆钻探","cityName":"小计","drillFinishNum":"19","drillCycle":"140.67","shaftBuildingCycle":"174.43","avgDeep":"4619","CoringNum":"9","avgCoringJinChi":"10.36","avgCoringHarvestRate":"97.09","mechanicalSpeed":"3.52","rigSpeed":"857",'rigNum':"102.42"},
          {"orgs":"西部钻探","cityName":"塔里木","drillFinishNum":"19","drillCycle":"173.71","shaftBuildingCycle":"194.36","avgDeep":"6606","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"6.23","rigSpeed":"1138",'rigNum':"110.27"},
          {"orgs":"西部钻探","cityName":"新疆","drillFinishNum":"90","drillCycle":"111.27","shaftBuildingCycle":"123.23","avgDeep":"4903","CoringNum":"30","avgCoringJinChi":"16.53","avgCoringHarvestRate":"97.9","mechanicalSpeed":"5.08","rigSpeed":"1322",'rigNum':"333.79"},
          {"orgs":"西部钻探","cityName":"吐哈","drillFinishNum":"23","drillCycle":"81.11","shaftBuildingCycle":"85.29","avgDeep":"4456","CoringNum":"5","avgCoringJinChi":"6.53","avgCoringHarvestRate":"100","mechanicalSpeed":"5.44","rigSpeed":"1648",'rigNum':"62.18"},
          {"orgs":"西部钻探","cityName":"青海","drillFinishNum":"14","drillCycle":"119.68","shaftBuildingCycle":"123.23","avgDeep":"4543","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"5.7","rigSpeed":"1144",'rigNum':"55.6"},
          {"orgs":"西部钻探","cityName":"玉门","drillFinishNum":"19","drillCycle":"127.57","shaftBuildingCycle":"134.57","avgDeep":"4615","CoringNum":"4","avgCoringJinChi":"14.1","avgCoringHarvestRate":"99.76","mechanicalSpeed":"3.09","rigSpeed":"1082",'rigNum':"81.06"},
          {"orgs":"西部钻探","cityName":"小计","drillFinishNum":"165","drillCycle":"116.85","shaftBuildingCycle":"127.44","avgDeep":"4973","CoringNum":"39","avgCoringJinChi":"15.00","avgCoringHarvestRate":"98.2","mechanicalSpeed":"4.96","rigSpeed":"1276",'rigNum':"642.90"},
          {"orgs":"长城钻探","cityName":"吉林","drillFinishNum":"3","drillCycle":"69.97","shaftBuildingCycle":"80.43","avgDeep":"4391","CoringNum":"2","avgCoringJinChi":"8.56","avgCoringHarvestRate":"99.53","mechanicalSpeed":"5.11","rigSpeed":"1638",'rigNum':"8.04"},
          {"orgs":"长城钻探","cityName":"辽河","drillFinishNum":"26","drillCycle":"97.85","shaftBuildingCycle":"116.42","avgDeep":"4418","CoringNum":"11","avgCoringJinChi":"11.95","avgCoringHarvestRate":"84.45","mechanicalSpeed":"6.47","rigSpeed":"1191",'rigNum':"103.43"},
          {"orgs":"长城钻探","cityName":"西南","drillFinishNum":"8","drillCycle":"72.52","shaftBuildingCycle":"105.33","avgDeep":"5008","CoringNum":"1","avgCoringJinChi":"9.37","avgCoringHarvestRate":"94.8","mechanicalSpeed":"6.81","rigSpeed":"1775",'rigNum':"28.75"},
          {"orgs":"长城钻探","cityName":"长庆","drillFinishNum":"2","drillCycle":"40.73","shaftBuildingCycle":"49.34","avgDeep":"4708","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"12.25","rigSpeed":"3139",'rigNum':"3"},
          {"orgs":"长城钻探","cityName":"苏里格","drillFinishNum":"1","drillCycle":"88","shaftBuildingCycle":"102","avgDeep":"4749","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"9.7","rigSpeed":"3895",'rigNum':"3.1"},
          {"orgs":"长城钻探","cityName":"塔里木","drillFinishNum":"3","drillCycle":"73.31","shaftBuildingCycle":"88.33","avgDeep":"5871","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"7.03","rigSpeed":"1592",'rigNum':"6.98"},
          {"orgs":"长城钻探","cityName":"吐哈","drillFinishNum":"2","drillCycle":"108","shaftBuildingCycle":"120","avgDeep":"4443","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"4.9","rigSpeed":"1169",'rigNum':"7.6"},
          {"orgs":"长城钻探","cityName":"青海","drillFinishNum":"8","drillCycle":"64.64","shaftBuildingCycle":"82.19","avgDeep":"4263","CoringNum":"1","avgCoringJinChi":"97.35","avgCoringHarvestRate":"83.01","mechanicalSpeed":"7.83","rigSpeed":"1654",'rigNum':"24.45"},
          {"orgs":"长城钻探","cityName":"浙江","drillFinishNum":"12","drillCycle":"94.7","shaftBuildingCycle":"126.8","avgDeep":"4597","CoringNum":"1","avgCoringJinChi":"9.22","avgCoringHarvestRate":"82.66","mechanicalSpeed":"4.11","rigSpeed":"1334",'rigNum':"53.84"},
          {"orgs":"长城钻探","cityName":"小计","drillFinishNum":"65","drillCycle":"86.05","shaftBuildingCycle":"107.63","avgDeep":"4585","CoringNum":"16","avgCoringJinChi":"16.54","avgCoringHarvestRate":"85.2","mechanicalSpeed":"5.97","rigSpeed":"1426",'rigNum':"239.19"},
          {"orgs":"渤海钻探","cityName":"大庆","drillFinishNum":"1","drillCycle":"80.56","shaftBuildingCycle":"151.75","avgDeep":"5820","CoringNum":"1","avgCoringJinChi":"14.9","avgCoringHarvestRate":"13.42","mechanicalSpeed":"6.41","rigSpeed":"1150",'rigNum':"5.06"},
          {"orgs":"渤海钻探","cityName":"华北","drillFinishNum":"20","drillCycle":"42.18","shaftBuildingCycle":"71.82","avgDeep":"4425","CoringNum":"3","avgCoringJinChi":"6.82","avgCoringHarvestRate":"76.24","mechanicalSpeed":"11.6","rigSpeed":"2174",'rigNum':"40.71"},
          {"orgs":"渤海钻探","cityName":"大港","drillFinishNum":"25","drillCycle":"37.97","shaftBuildingCycle":"54.92","avgDeep":"4471","CoringNum":"1","avgCoringJinChi":"8.34","avgCoringHarvestRate":"100","mechanicalSpeed":"13.34","rigSpeed":"2757",'rigNum':"40.53"},
          {"orgs":"渤海钻探","cityName":"冀东","drillFinishNum":"24","drillCycle":"48.27","shaftBuildingCycle":"73.34","avgDeep":"4500","CoringNum":"5","avgCoringJinChi":"26.62","avgCoringHarvestRate":"98.08","mechanicalSpeed":"11.84","rigSpeed":"2125",'rigNum':"50.81"},
          {"orgs":"渤海钻探","cityName":"西南","drillFinishNum":"1","drillCycle":"94.42","shaftBuildingCycle":"107.42","avgDeep":"4450","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"7.11","rigSpeed":"1245",'rigNum':"3.57"},
          {"orgs":"渤海钻探","cityName":"长庆","drillFinishNum":"13","drillCycle":"46.52","shaftBuildingCycle":"64.78","avgDeep":"4325","CoringNum":"6","avgCoringJinChi":"18.78","avgCoringHarvestRate":"90.9","mechanicalSpeed":"9.44","rigSpeed":"2388",'rigNum':"23.79"},
          {"orgs":"渤海钻探","cityName":"苏里格","drillFinishNum":"5","drillCycle":"37.82","shaftBuildingCycle":"46.72","avgDeep":"4323","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"11.9","rigSpeed":"3707",'rigNum':"5.83"},
          {"orgs":"渤海钻探","cityName":"塔里木","drillFinishNum":"38","drillCycle":"142.9","shaftBuildingCycle":"180.4","avgDeep":"6777","CoringNum":"5","avgCoringJinChi":"19.98","avgCoringHarvestRate":"96.46","mechanicalSpeed":"5.33","rigSpeed":"1088",'rigNum':"210.59"},
          {"orgs":"渤海钻探","cityName":"吐哈","drillFinishNum":"12","drillCycle":"67.07","shaftBuildingCycle":"89.42","avgDeep":"4386","CoringNum":"2","avgCoringJinChi":"8.58","avgCoringHarvestRate":"39.94","mechanicalSpeed":"5.64","rigSpeed":"1668",'rigNum':"32.31"},
          {"orgs":"渤海钻探","cityName":"青海","drillFinishNum":"7","drillCycle":"83.9","shaftBuildingCycle":"108.67","avgDeep":"4693","CoringNum":"2","avgCoringJinChi":"26.93","avgCoringHarvestRate":"97.38","mechanicalSpeed":"5.38","rigSpeed":"1388",'rigNum':"22.53"},
          {"orgs":"渤海钻探","cityName":"玉门","drillFinishNum":"3","drillCycle":"150.61","shaftBuildingCycle":"167.14","avgDeep":"4937","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"2.85","rigSpeed":"925",'rigNum':"16.01"},
          {"orgs":"渤海钻探","cityName":"浙江","drillFinishNum":"1","drillCycle":"49.58","shaftBuildingCycle":"79.96","avgDeep":"4055","CoringNum":"1","avgCoringJinChi":"121.47","avgCoringHarvestRate":"99.07","mechanicalSpeed":"12.83","rigSpeed":"2075",'rigNum':"1.95"},
          {"orgs":"渤海钻探","cityName":"南方","drillFinishNum":"5","drillCycle":"51.12","shaftBuildingCycle":"77.35","avgDeep":"4332","CoringNum":"1","avgCoringJinChi":"19.17","avgCoringHarvestRate":"100","mechanicalSpeed":"9.04","rigSpeed":"1991",'rigNum':"10.88"},
          {"orgs":"渤海钻探","cityName":"小计","drillFinishNum":"155","drillCycle":"74.19","shaftBuildingCycle":"100.40","avgDeep":"5032","CoringNum":"27","avgCoringJinChi":"22.26","avgCoringHarvestRate":"92.19","mechanicalSpeed":"7.46","rigSpeed":"1618",'rigNum':"464.57"},
          {"orgs":"川庆钻探","cityName":"西南","drillFinishNum":"49","drillCycle":"172.48","shaftBuildingCycle":"213.8","avgDeep":"5411","CoringNum":"13","avgCoringJinChi":"30.96","avgCoringHarvestRate":"92.36","mechanicalSpeed":"3.56","rigSpeed":"757",'rigNum':"214.19"},
          {"orgs":"川庆钻探","cityName":"长庆","drillFinishNum":"121","drillCycle":"45.68","shaftBuildingCycle":"61.22","avgDeep":"4529","CoringNum":"16","avgCoringJinChi":"87.59","avgCoringHarvestRate":"99.7","mechanicalSpeed":"6.27","rigSpeed":"2538",'rigNum':"210.37"},
          {"orgs":"川庆钻探","cityName":"苏里格","drillFinishNum":"6","drillCycle":"41.67","shaftBuildingCycle":"48.3","avgDeep":"4353","CoringNum":"","avgCoringJinChi":"","avgCoringHarvestRate":"","mechanicalSpeed":"7.98","rigSpeed":"2366",'rigNum':"11.04"},
          {"orgs":"川庆钻探","cityName":"塔里木","drillFinishNum":"35","drillCycle":"94.88","shaftBuildingCycle":"107.82","avgDeep":"6015","CoringNum":"4","avgCoringJinChi":"8.64","avgCoringHarvestRate":"94.65","mechanicalSpeed":"7.03","rigSpeed":"1658",'rigNum':"102.4"},
          {"orgs":"川庆钻探","cityName":"新疆","drillFinishNum":"9","drillCycle":"133.14","shaftBuildingCycle":"157.87","avgDeep":"4968","CoringNum":"6","avgCoringJinChi":"8.01","avgCoringHarvestRate":"99.11","mechanicalSpeed":"4.77","rigSpeed":"1057",'rigNum':"34.68"},
          {"orgs":"川庆钻探","cityName":"青海","drillFinishNum":"9","drillCycle":"80.56","shaftBuildingCycle":"96.9","avgDeep":"4708","CoringNum":"1","avgCoringJinChi":"4","avgCoringHarvestRate":"58","mechanicalSpeed":"6.09","rigSpeed":"1889",'rigNum':"19.88"},
          {"orgs":"川庆钻探","cityName":"浙江","drillFinishNum":"15","drillCycle":"99","shaftBuildingCycle":"128","avgDeep":"4486","CoringNum":"1","avgCoringJinChi":"1.25","avgCoringHarvestRate":"100","mechanicalSpeed":"5.44","rigSpeed":"1248",'rigNum':"42.29"},
          {"orgs":"川庆钻探","cityName":"小计","drillFinishNum":"244","drillCycle":"85.89","shaftBuildingCycle":"107.21","avgDeep":"4935","CoringNum":"41","avgCoringJinChi":"46.14","avgCoringHarvestRate":"97.94","mechanicalSpeed":"5.61","rigSpeed":"1605",'rigNum':"634.85"},
        ],
        columns: [
          {field: 'orgs', width: 60, columnAlign: 'left',isFrozen: true,isResize: true},
          {field: 'cityName', width: 60, columnAlign: 'left',isFrozen: true,isResize: true},
          {field: 'drillFinishNum', width: 60, columnAlign: 'right', isResize: true},
          {field: 'drillCycle', width: 50, columnAlign: 'right', isResize: true},
          {field: 'shaftBuildingCycle', width: 50, columnAlign: 'right', isResize: true},
          {field: 'avgDeep', width: 50, columnAlign: 'right', isResize: true},
          {field: 'CoringNum', width: 50, columnAlign: 'right', isResize: true},
          {field: 'avgCoringJinChi', width: 50, columnAlign: 'right', isResize: true},
          {field: 'avgCoringHarvestRate', width: 50, columnAlign: 'right', isResize: true},
          {field: 'mechanicalSpeed', width: 50, columnAlign: 'right', isResize: true},
          {field: 'rigSpeed', width: 60, columnAlign: 'right', isResize: true},
          {field: 'rigNum', width: 50, columnAlign: 'right', isResize: true},
        ],
        titleRows: [
          //第一行
          [{fields: ['orgs','cityName'], title: '单位', titleAlign: 'center', colspan: 2},
            {fields: ['drillFinishNum'], title: '完成井数(口)', titleAlign: 'center'},
            {fields: ['drillCycle'], title: '钻井周期(天)', titleAlign: 'center'},
            {fields: ['shaftBuildingCycle'], title: '建井周期(天)', titleAlign: 'center'},
            {fields: ['avgDeep'], title: '平均井深(米)', titleAlign: 'center'},
            {fields: ['CoringNum'], title: '取心井数(口)', titleAlign: 'center',},
            {fields: ['avgCoringJinChi'], title: '平均取心进尺(米)', titleAlign: 'center'},
            {fields: ['avgCoringHarvestRate'], title: '平均取心收获率(%)', titleAlign: 'center'},
            {fields: ['mechanicalSpeed'], title: '机械钻速(米/时)', titleAlign: 'center'},
            {fields: ['rigSpeed'], title: '钻机月速(米/台月)', titleAlign: 'center'},
            {fields: ['rigNum'], title: '钻机台月(台月)', titleAlign: 'center'},
          ],
          // //第二行
          // [
          //   {fields: ['orgs','cityName'], title: '合计', titleAlign: 'center', colspan: 2},
          //   {fields: ['drillFinishNum'], title: '648', titleAlign: 'right'},
          //   {fields: ['drillCycle'], title: '92.60', titleAlign: 'right'},
          //   {fields: ['shaftBuildingCycle'], title: '112.75', titleAlign: 'right'},
          //   {fields: ['avgDeep'], title: '4923', titleAlign: 'right'},
          //   {fields: ['CoringNum'], title: '132', titleAlign: 'right',},
          //   {fields: ['avgCoringJinChi'], title: '26.03', titleAlign: 'right'},
          //   {fields: ['avgCoringHarvestRate'], title: '95.98', titleAlign: 'right'},
          //   {fields: ['mechanicalSpeed'], title: '5.7', titleAlign: 'right'},
          //   {fields: ['rigSpeed'], title: '1449', titleAlign: 'right'},
          //   {fields: ['rigNum'], title: '2083.93', titleAlign: 'right'},
          // ],

        ],

      }
    },
    created(){
      this.tableHeight=window.innerHeight-30
    },
    mounted(){
      //this.$ruixin.setWebViewTitle({title:"2017深井完成井统计表（4000米以上）"});
      this.$ruixin.hideWebViewTitle({});
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
  #ShamTsengFinishYearly{
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
