<template>
  <div id="EngineeringAccidentsYearly">
    <header>
      <!-- <mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" @click="handleBack"><i class="fa fa-search"></i></mt-button>
      </mt-header> -->
      <!--<h4>中油油服钻井工作量日报</h4>-->
      <!-- <p>钻机统计表</p> -->
      <!-- <div class='oms2-report-float-right' style="top:40px">数据来源于A7集团系统钻井综合日报</div> -->
      <!--<oms2-date-picker-daily :date="date"
                              @date-change="handleChange">
      </oms2-date-picker-daily>-->
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
    <div class='oms2-g-report-float-right'>数据来源于A7集团系统库钻井工程事故统计表</div>
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
                                <label class="col-5 oms2-right">事故发生次数(次):</label>
                                <p>{{selectedRow.accidentsHappenNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">事故损失时间(小时):</label>
                                <p>{{selectedRow.accidentLossTime}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">卡钻事故</div>
                            <div class="row">
                                <label class="col-5 oms2-right">事故次数:</label>
                                <p>{{selectedRow.kzAccidentNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">损失时间:</label>
                                <p>{{selectedRow.kzLossTime}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">钻头事故</div>
                            <div class="row">
                                <label class="col-5 oms2-right">事故次数:</label>
                                <p>{{selectedRow.ztAccidentNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">损失时间:</label>
                                <p>{{selectedRow.ztLossTime}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">钻具事故</div>
                            <div class="row">
                                <label class="col-5 oms2-right">事故次数:</label>
                                <p>{{selectedRow.zjAccidentNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">损失时间:</label>
                                <p>{{selectedRow.zjLossTime}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">落物事故</div>
                            <div class="row">
                                <label class="col-5 oms2-right">事故次数:</label>
                                <p>{{selectedRow.lwAccidentNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">损失时间:</label>
                                <p>{{selectedRow.lwLossTime}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">井喷事故</div>
                            <div class="row">
                                <label class="col-5 oms2-right">事故次数:</label>
                                <p>{{selectedRow.jpAccidentNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">损失时间:</label>
                                <p>{{selectedRow.jpLossTime}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 100%;position: center;">其他事故</div>
                            <div class="row">
                                <label class="col-5 oms2-right">事故次数:</label>
                                <p>{{selectedRow.qtAccidentNum}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">损失时间:</label>
                                <p>{{selectedRow.qtLossTime}}</p>
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
</template>

<script>
  import { transToHorizontalScreen } from './../../service/utils/system/screen'
  import { Indicator } from 'mint-ui';
  import timepicker from './../../components/datepicker/timepicker'
  import {formatDate,addMonth,getCurrentDate} from './../../service/utils/date/date'
  export default {
    name: "EngineeringAccidentsYearly",
    data() {
      return {
        selectedRow:{},  //选中的行
        date: {
          time:getCurrentDate('yyyy')-1,
        },
        tableHeight:0,
        tableData: [
          {"orgs":"大庆钻探","cityName":"大庆","accidentsHappenNum":"26","accidentLossTime":"664.3","kzAccidentNum":"17","kzLossTime":"437.4","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"10.5","lwAccidentNum":"1",'lwLossTime':"15.9","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"7",'qtLossTime':"200.5"},
          {"orgs":"大庆钻探","cityName":"吉林","accidentsHappenNum":"7","accidentLossTime":"179","kzAccidentNum":"","kzLossTime":"","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"7",'qtLossTime':"179"},
          {"orgs":"大庆钻探","cityName":"冀东","accidentsHappenNum":"1","accidentLossTime":"99","kzAccidentNum":"","kzLossTime":"","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"99","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"大庆钻探","cityName":"塔里木","accidentsHappenNum":"2","accidentLossTime":"191","kzAccidentNum":"","kzLossTime":"","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"2",'qtLossTime':"191"},
          {"orgs":"大庆钻探","cityName":"小计","accidentsHappenNum":"36","accidentLossTime":"1133","kzAccidentNum":"17","kzLossTime":"437","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"2","zjLossTime":"110","lwAccidentNum":"1",'lwLossTime':"16","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"16",'qtLossTime':"571"},
          {"orgs":"西部钻探","cityName":"塔里木","accidentsHappenNum":"2","accidentLossTime":"494","kzAccidentNum":"2","kzLossTime":"494","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"西部钻探","cityName":"新疆","accidentsHappenNum":"1","accidentLossTime":"574","kzAccidentNum":"","kzLossTime":"","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"574"},
          {"orgs":"西部钻探","cityName":"吐哈","accidentsHappenNum":"3","accidentLossTime":"546","kzAccidentNum":"3","kzLossTime":"546","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"西部钻探","cityName":"小计","accidentsHappenNum":"6","accidentLossTime":"1614","kzAccidentNum":"5","kzLossTime":"1040","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"574"},
          {"orgs":"长城钻探","cityName":"辽河","accidentsHappenNum":"31","accidentLossTime":"2407","kzAccidentNum":"15","kzLossTime":"957","ztAccidentNum":"3","ztLossTime":"158","zjAccidentNum":"3","zjLossTime":"593","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"10",'qtLossTime':"699"},
          {"orgs":"长城钻探","cityName":"苏里格","accidentsHappenNum":"2","accidentLossTime":"316","kzAccidentNum":"1","kzLossTime":"175","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"141"},
          {"orgs":"长城钻探","cityName":"吐哈","accidentsHappenNum":"3","accidentLossTime":"346","kzAccidentNum":"2","kzLossTime":"239","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"107","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"长城钻探","cityName":"浙江","accidentsHappenNum":"1","accidentLossTime":"79.16","kzAccidentNum":"1","kzLossTime":"79.16","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"长城钻探","cityName":"小计","accidentsHappenNum":"37","accidentLossTime":"3148","kzAccidentNum":"19","kzLossTime":"1450","ztAccidentNum":"3","ztLossTime":"158","zjAccidentNum":"4","zjLossTime":"700","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"11",'qtLossTime':"840"},
          {"orgs":"渤海钻探","cityName":"华北","accidentsHappenNum":"1","accidentLossTime":"190","kzAccidentNum":"1","kzLossTime":"190","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"渤海钻探","cityName":"大港","accidentsHappenNum":"3","accidentLossTime":"249","kzAccidentNum":"","kzLossTime":"","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"2","zjLossTime":"209","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"40"},
          {"orgs":"渤海钻探","cityName":"冀东","accidentsHappenNum":"2","accidentLossTime":"166","kzAccidentNum":"1","kzLossTime":"142","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"24","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"渤海钻探","cityName":"长庆","accidentsHappenNum":"1","accidentLossTime":"177","kzAccidentNum":"","kzLossTime":"","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"177","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"渤海钻探","cityName":"苏里格","accidentsHappenNum":"1","accidentLossTime":"531","kzAccidentNum":"","kzLossTime":"","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"531"},
          {"orgs":"渤海钻探","cityName":"塔里木","accidentsHappenNum":"12","accidentLossTime":"3657","kzAccidentNum":"5","kzLossTime":"2362","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"4","zjLossTime":"1170","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"3",'qtLossTime':"125"},
          {"orgs":"渤海钻探","cityName":"吐哈","accidentsHappenNum":"5","accidentLossTime":"607","kzAccidentNum":"2","kzLossTime":"396","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"2","zjLossTime":"41","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"170"},
          {"orgs":"渤海钻探","cityName":"青海","accidentsHappenNum":"4","accidentLossTime":"1063","kzAccidentNum":"3","kzLossTime":"1029","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"34","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"渤海钻探","cityName":"小计","accidentsHappenNum":"29","accidentLossTime":"6640","kzAccidentNum":"12","kzLossTime":"4119","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"11","zjLossTime":"1655","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"6",'qtLossTime':"866"},
          {"orgs":"川庆钻探","cityName":"西南","accidentsHappenNum":"30","accidentLossTime":"2824","kzAccidentNum":"20","kzLossTime":"2176","ztAccidentNum":"4","ztLossTime":"470","zjAccidentNum":"5","zjLossTime":"121","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"57"},
          {"orgs":"川庆钻探","cityName":"长庆","accidentsHappenNum":"8","accidentLossTime":"554","kzAccidentNum":"6","kzLossTime":"498","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"32","lwAccidentNum":"1",'lwLossTime':"24","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"川庆钻探","cityName":"塔里木","accidentsHappenNum":"12","accidentLossTime":"1664","kzAccidentNum":"10","kzLossTime":"1608","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"17","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"39"},
          {"orgs":"川庆钻探","cityName":"新疆","accidentsHappenNum":"4","accidentLossTime":"196","kzAccidentNum":"1","kzLossTime":"32","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"2","zjLossTime":"65","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"99"},
          {"orgs":"川庆钻探","cityName":"青海","accidentsHappenNum":"5","accidentLossTime":"576","kzAccidentNum":"4","kzLossTime":"569","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"","zjLossTime":"","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"1",'qtLossTime':"7"},
          {"orgs":"川庆钻探","cityName":"浙江","accidentsHappenNum":"3","accidentLossTime":"541","kzAccidentNum":"2","kzLossTime":"416","ztAccidentNum":"","ztLossTime":"","zjAccidentNum":"1","zjLossTime":"125","lwAccidentNum":"",'lwLossTime':"","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"",'qtLossTime':""},
          {"orgs":"川庆钻探","cityName":"小计","accidentsHappenNum":"62","accidentLossTime":"6355","kzAccidentNum":"43","kzLossTime":"5299","ztAccidentNum":"4","ztLossTime":"470","zjAccidentNum":"10","zjLossTime":"360","lwAccidentNum":"1",'lwLossTime':"24","jpAccidentNum":"","jpLossTime":"","qtAccidentNum":"4",'qtLossTime':"202"},
        ],
        columns: [
          {field: 'orgs', width: 60, columnAlign: 'center',isResize: true},
          {field: 'cityName', width: 60, columnAlign: 'center',isResize: true},
          {field: 'accidentsHappenNum', width: 60, columnAlign: 'right', isResize: true},
          {field: 'accidentLossTime', width: 50, columnAlign: 'right', isResize: true},
          {field: 'kzAccidentNum', width: 50, columnAlign: 'right', isResize: true},
          {field: 'kzLossTime', width: 50, columnAlign: 'right', isResize: true},
          {field: 'ztAccidentNum', width: 50, columnAlign: 'right', isResize: true},
          {field: 'ztLossTime', width: 50, columnAlign: 'right', isResize: true},
          {field: 'zjAccidentNum', width: 50, columnAlign: 'right', isResize: true},
          {field: 'zjLossTime', width: 50, columnAlign: 'right', isResize: true},
          {field: 'lwAccidentNum', width: 60, columnAlign: 'right', isResize: true},
          {field: 'lwLossTime', width: 50, columnAlign: 'right', isResize: true},
          {field: 'jpAccidentNum', width: 50, columnAlign: 'right', isResize: true},
          {field: 'jpLossTime', width: 50, columnAlign: 'right', isResize: true},
          {field: 'qtAccidentNum', width: 60, columnAlign: 'right', isResize: true},
          {field: 'qtLossTime', width: 50, columnAlign: 'right', isResize: true},
        ],
        titleRows: [ 
          //第一行
          [
            {fields: ['orgs','cityName'], title: '单位', titleAlign: 'center', colspan: 2,rowspan:2},
            {fields: ['accidentsHappenNum'], title: '事故发生次数(次)', titleAlign: 'center',rowspan:2},
            {fields: ['accidentLossTime'], title: '事故损失时间(小时)', titleAlign: 'center',rowspan:2},
            {fields: ['kzAccidentNum','kzLossTime'], title: '卡钻事故', titleAlign: 'center',colspan: 2},
            {fields: ['ztAccidentNum','ztLossTime'], title: '钻头事故', titleAlign: 'center',colspan: 2},
            {fields: ['zjAccidentNum','zjLossTime'], title: '钻具事故', titleAlign: 'center',colspan: 2},
            {fields: ['lwAccidentNum','lwLossTime'], title: '落物事故', titleAlign: 'center',colspan: 2},
            {fields: ['jpAccidentNum','jpLossTime'], title: '井喷事故', titleAlign: 'center',colspan: 2},
            {fields: ['qtAccidentNum','qtLossTime'], title: '其他事故', titleAlign: 'center',colspan: 2},
          ],
          //第二行
          [
            {fields: ['kzAccidentNum'], title: '事故次数', titleAlign: 'center'},
            {fields: ['kzLossTime'], title: '损失时间', titleAlign: 'center'},
            {fields: ['ztAccidentNum'], title: '事故次数', titleAlign: 'center'},
            {fields: ['ztLossTime'], title: '损失时间', titleAlign: 'center'},
            {fields: ['zjAccidentNum'], title: '事故次数', titleAlign: 'center'},
            {fields: ['zjLossTime'], title: '损失时间', titleAlign: 'center',},
            {fields: ['lwAccidentNum'], title: '事故次数', titleAlign: 'center'},
            {fields: ['lwLossTime'], title: '损失时间', titleAlign: 'center'},
            {fields: ['jpAccidentNum'], title: '事故次数', titleAlign: 'center'},
            {fields: ['jpLossTime'], title: '损失时间', titleAlign: 'center'},
            {fields: ['qtAccidentNum'], title: '事故次数', titleAlign: 'center'},
            {fields: ['qtLossTime'], title: '损失时间', titleAlign: 'center'},
          ],
          //第三行
          [
            {fields: ['orgs','cityName'], title: '合计', titleAlign: 'center', colspan: 2},
            {fields: ['accidentsHappenNum'], title: '170', titleAlign: 'right'},
            {fields: ['accidentLossTime'], title: '18890', titleAlign: 'right'},
            {fields: ['kzAccidentNum'], title: '96', titleAlign: 'right'},
            {fields: ['kzLossTime'], title: '12346', titleAlign: 'right'},
            {fields: ['ztAccidentNum'], title: '7', titleAlign: 'right'},
            {fields: ['ztLossTime'], title: '628', titleAlign: 'right'},
            {fields: ['zjAccidentNum'], title: '27', titleAlign: 'right'},
            {fields: ['zjLossTime'], title: '2825', titleAlign: 'right',},
            {fields: ['lwAccidentNum'], title: '2', titleAlign: 'right'},
            {fields: ['lwLossTime'], title: '40', titleAlign: 'right'},
            {fields: ['jpAccidentNum'], title: '', titleAlign: 'right'},
            {fields: ['jpLossTime'], title: '', titleAlign: 'right'},
            {fields: ['qtAccidentNum'], title: '38', titleAlign: 'right'},
            {fields: ['qtLossTime'], title: '3053', titleAlign: 'right'},
          ],
         
        ],

      }
    },
    created(){
      this.tableHeight=window.innerHeight-80
    },
    mounted(){
      this.$ruixin.setWebViewTitle({title:"2017钻井工程事故统计表"});
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
        if(field=="part"&&rowData[field]=="集团公司"){
          return {
            colSpan: 2,
            rowSpan: 1,
            content: '集团公司',
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
  #EngineeringAccidentsYearly{
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
