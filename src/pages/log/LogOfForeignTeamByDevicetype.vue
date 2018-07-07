<template>
  <div>
    <oms2-header :title="$route.meta.title"></oms2-header>
    <div id="LogOfForeignTeamByDevicetype">
      <!-- <h4>测井工作量油区分布统计表</h4> -->
      <oms2-date-picker-monthly :date=date @date-change="handleChange"></oms2-date-picker-monthly>
      <!-- Button trigger modal -->

      <v-table
        is-horizontal-resize
        is-vertical-resize
        :height=tableHeight
        :title-row-height=30
        :row-height=30
        :row-click="handleRowClick"
        style="width:100%;font-size:12px"
        :columns="columns"
        :title-rows="titleRows"
        :cell-merge="cellMerge"
        :column-cell-class-name="columnCellClass"
        :table-data="tableData"
        title-bg-color="#F6F6F6"
        even-bg-color="#F4F4F4"
        row-hover-color="#eee"
        row-click-color="#edF7FF"
      ></v-table>
      <div class='oms2-g-report-float-right'>数据来源于A7集团系统测井专业队伍国外分布(按设备类型)表</div>
      <!-- Modal 具体数据信息 -->
      <div class="modal fade oms2-font-size" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size:14px" id="exampleModalLongTitle">{{selectedRow.juOrgabb}} <b>/</b> {{selectedRow.chuOrgabb}} <b>/</b> {{selectedRow.p2Name}} <span style="padding-left:2rem;font-size:14px">(
                                {{date.time}})</span></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span style="font-size:20px;" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="oms2-list-divider list-group-item list-group-item-dark">市场分布</div>
                <div class="row">
                  <label class="col-5 oms2-right">总计:</label>
                  <p>{{selectedRow.marketTotal | ifNumberIsNull}}</p>
                </div>
                <div class="oms2-list-divider list-group-item list-group-item-dark">亚太</div>
                <div class="row">
                  <label class="col-5 oms2-right">合计:</label>
                  <p>{{selectedRow.asiaTotal | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">印度尼西亚:</label>
                  <p>{{selectedRow.indonesia | ifNumberIsNull}}</p>
                </div>
                <div class="oms2-list-divider list-group-item list-group-item-dark ">中亚</div>
                <div class="row">
                  <label class="col-5 oms2-right">合计:</label>
                  <p>{{selectedRow.centerAsiaTotal | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">哈萨克斯坦:</label>
                  <p>{{selectedRow.kazakhstan | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">乌兹别克斯坦:</label>
                  <p>{{selectedRow.uzbekistan | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">土库曼斯坦:</label>
                  <p>{{selectedRow.turkmenistan | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">阿富汗:</label>
                  <p>{{selectedRow.afghanistan | ifNumberIsNull}}</p>
                </div>
                <div class="list-group-item list-group-item-dark oms2-list-divider">非洲</div>
                <div class="row">
                  <label class="col-5 oms2-right">合计:</label>
                  <p>{{selectedRow.africaTotal | ifNumberIsNull}}</p>
                </div>
                <div class="list-group-item list-group-item-dark oms2-list-divider">美洲</div>
                <div class="row">
                  <label class="col-5 oms2-right">合计:</label>
                  <p>{{selectedRow.americaTotal | ifNumberIsNull}}</p>
                </div>
                <div class="list-group-item list-group-item-dark oms2-list-divider">中东</div>
                <div class="row">
                  <label class="col-5 oms2-right">合计:</label>
                  <p>{{selectedRow.middleEastTotal | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">伊拉克:</label>
                  <p>{{selectedRow.iraq | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">伊朗:</label>
                  <p>{{selectedRow.iran | ifNumberIsNull}}</p>
                </div>
                <div class="list-group-item list-group-item-dark oms2-list-divider">其他区域</div>
                <div class="row">
                  <label class="col-5 oms2-right">其它区域:</label>
                  <p>{{selectedRow.otherArea | ifNumberIsNull}}</p>
                </div>

              </form>
              <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-primary">返回</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import timepicker from './../../components/datepicker/timepicker'
  import { getForeignTeamByDevicetype } from './../../service/log/logGetData'
  import {formatDate,addMonth,getCurrentDate} from './../../service/utils/date/date'
  export default {
    name: "LogOfForeignTeamByDevicetype",
    data() {
      return {
        date: {
          time:getCurrentDate('yyyy-MM')
        },
        tableHeight:0,
        tableData: [],
        selectedRow:{},  //选中的行
        columns: [
          {field: 'juOrgabb', width:20, columnAlign: 'left', isFrozen: true,isResize:true},
          {field: 'chuOrgabb', width: 38, columnAlign: 'left', isFrozen: true,isResize:true},
          {field: 'p2Name', width: 70, columnAlign: 'left',isFrozen: true,},

          {field: 'marketTotal', width: 42, columnAlign: 'right',isResize:true},

          {field: 'asiaTotal', width: 42, columnAlign: 'right',isResize:true},
          {field: 'indonesia', width: 70, columnAlign: 'right',isResize:true},

          {field: 'centerAsiaTotal', width: 40, columnAlign: 'right',isResize:true},
          {field: 'kazakhstan', width: 70, columnAlign: 'right',isResize:true},
          {field: 'uzbekistan', width: 80, columnAlign: 'right',isResize:true},
          {field: 'turkmenistan', width: 70, columnAlign: 'right',isResize:true},
          {field: 'afghanistan', width: 50, columnAlign: 'right',isResize:true},

          {field: 'africaTotal', width: 40, columnAlign: 'right',isResize:true},
          {field: 'americaTotal', width: 40, columnAlign: 'right',isResize:true},

          {field: 'middleEastTotal', width: 40, columnAlign: 'right',isResize:true},
          {field: 'iraq', width: 50, columnAlign: 'right',isResize:true},
          {field: 'iran', width: 40, columnAlign: 'right',isResize:true},

          {field: 'otherArea', width: 40, columnAlign: 'right',isResize:true},

        ],

        titleRows: [
          //第一行
          [{fields: ['juOrgabb','chuOrgabb','p2Name'], title: '队伍类型', titleAlign: 'center', rowspan:2, colspan:3},
            {fields: ['marketTotal'], title: '总计', titleAlign: 'center',rowspan:2},
            {fields: ['asiaTotal','indonesia'], title: '亚太', titleAlign: 'center', colspan: 2},
            {fields: ['centerAsiaTotal','kazakhstan','uzbekistan','turkmenistan','afghanistan'], title: '中亚', titleAlign: 'center', colspan: 5},
            {fields: ['africaTotal'], title: '非洲', titleAlign: 'center', colspan: 1},
            {fields: ['americaTotal'], title: '美洲', titleAlign: 'center', colspan: 1},
            {fields: ['middleEastTotal','iraq','iran'], title: '中东', titleAlign: 'center', colspan: 3},
            {fields: ['otherArea'], title: '其它区域', titleAlign: 'center', rowspan:2,colspan: 1},
          ],

          //第二行
          [
            {fields: ['asiaTotal'], title: '合计', titleAlign: 'center', colspan:1},
            {fields: ['indonesia'], title: '印度尼西亚', titleAlign: 'center', colspan:1},
            {fields: ['centerAsiaTotal'], title: '合计', titleAlign: 'center', colspan:1},
            {fields: ['kazakhstan'], title: '哈萨克斯坦', titleAlign: 'center', colspan:1},
            {fields: ['uzbekistan'], title: '乌兹别克斯坦', titleAlign: 'center', colspan:1},
            {fields: ['turkmenistan'], title: '土库曼斯坦', titleAlign: 'center', colspan:1},
            {fields: ['afghanistan'], title: '阿富汗', titleAlign: 'center', colspan:1},
            {fields: ['africaTotal'], title: '合计', titleAlign: 'center', colspan: 1},
            {fields: ['americaTotal'], title: '合计', titleAlign: 'center', colspan: 1},
            {fields: ['middleEastTotal'], title: '合计', titleAlign: 'center', colspan:1},
            {fields: ['iraq'], title: '伊拉克', titleAlign: 'center', colspan:1},
            {fields: ['iran'], title: '伊朗', titleAlign: 'center', colspan:1},
          ]
        ],

      }
    },
    created(){
      this.requestData();
      this.tableHeight=window.innerHeight-130;
    },
    mounted(){
      // this.$ruixin.setWebViewTitle({title:'专业队伍国外分布表(按设备类型)'});
      this.$ruixin.hideWebViewTitle({});
      setTimeout(()=>{
        this.$ruixin.supportAutorotate({});
      },200)
    },
    methods:{
      //请求数据方法
      requestData(){
        Indicator.open('加载中...');
        getForeignTeamByDevicetype(this.date.time).then((data)=>{
          Indicator.close();
          if(data.data){
            this.tableData=data.data;
            //检查是否含有所有地区
            let juOrgabbnames=[{'juOrgabb':'集团总计','chuOrgabb':null,'p2Name':'合计'},
              {'juOrgabb':'集团总计','chuOrgabb':'成像系列','p2Name':'成像系列'},
              {'juOrgabb':'集团总计','chuOrgabb':'高精度系列','p2Name':'高精度系列'},
              {'juOrgabb':'集团总计','chuOrgabb':'国产数控系列','p2Name':'国产数控系列'},
              {'juOrgabb':'集团总计','chuOrgabb':'LWD','p2Name':'LWD'},
              // {'juOrgabb':'长城钻探','chuOrgabb':'合计'},
              // {'juOrgabb':'长城钻探','chuOrgabb':'国际测井公司'},
              // {'juOrgabb':'渤海钻探','chuOrgabb':'合计'},
              // {'juOrgabb':'渤海钻探','chuOrgabb':'井下作业公司'},
              // {'juOrgabb':'渤海钻探','chuOrgabb':'油气井测试分公司'},
              {'juOrgabb':'中油测井','chuOrgabb':'合计','p2Name':'合计'},
              {'juOrgabb':'中油测井','chuOrgabb':'合计','p2Name':'成像系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'合计','p2Name':'高精度系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'合计','p2Name':'国产数控系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'合计','p2Name':'LWD'},
              {'juOrgabb':'中油测井','chuOrgabb':'长庆分公司','p2Name':'合计'},
              {'juOrgabb':'中油测井','chuOrgabb':'长庆分公司','p2Name':'成像系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'长庆分公司','p2Name':'高精度系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'长庆分公司','p2Name':'国产数控系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'长庆分公司','p2Name':'LWD'},
              {'juOrgabb':'中油测井','chuOrgabb':'西南分公司','p2Name':'合计'},
              {'juOrgabb':'中油测井','chuOrgabb':'西南分公司','p2Name':'成像系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'西南分公司','p2Name':'高精度系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'西南分公司','p2Name':'国产数控系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'西南分公司','p2Name':'LWD'},
              {'juOrgabb':'中油测井','chuOrgabb':'新疆分公司','p2Name':'合计'},
              {'juOrgabb':'中油测井','chuOrgabb':'新疆分公司','p2Name':'成像系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'新疆分公司','p2Name':'高精度系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'新疆分公司','p2Name':'国产数控系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'新疆分公司','p2Name':'LWD'},
              {'juOrgabb':'中油测井','chuOrgabb':'大庆分公司','p2Name':'合计'},
              {'juOrgabb':'中油测井','chuOrgabb':'大庆分公司','p2Name':'成像系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'大庆分公司','p2Name':'高精度系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'大庆分公司','p2Name':'国产数控系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'大庆分公司','p2Name':'LWD'},
              // {'juOrgabb':'中油测井','chuOrgabb':'辽河分公司'},
              {'juOrgabb':'中油测井','chuOrgabb':'天津分公司','p2Name':'合计'},
              {'juOrgabb':'中油测井','chuOrgabb':'天津分公司','p2Name':'成像系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'天津分公司','p2Name':'高精度系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'天津分公司','p2Name':'国产数控系列'},
              {'juOrgabb':'中油测井','chuOrgabb':'天津分公司','p2Name':'LWD'},
              // {'juOrgabb':'中油测井','chuOrgabb':'华北分公司'},
              // {'juOrgabb':'中油测井','chuOrgabb':'青海分公司'},
              // {'juOrgabb':'中油测井','chuOrgabb':'吐哈分公司'},
              // {'juOrgabb':'中油测井','chuOrgabb':'塔里木分公司'},
              // {'juOrgabb':'中油测井','chuOrgabb':'国际事业部'},
              // {'juOrgabb':'中油测井','chuOrgabb':'生产测井中心'},
            ];
            let juOrgabbFromData=[];
            for(var td of this.tableData){
              juOrgabbFromData.push({
                'juOrgabb':td.juOrgabb,
                'chuOrgabb':td.chuOrgabb,
                'p2Name':td.p2Name,
              })
            }
            let include=false;  //判断是否存在
            for(var juOrgabbname of juOrgabbnames){
              include=false;
              for(var juji of juOrgabbFromData){
                if(juji.juOrgabb==juOrgabbname.juOrgabb&&juji.chuOrgabb==juOrgabbname.chuOrgabb&&juji.p2Name==juOrgabbname.p2Name){
                  include=true
                }
              }
              if(!include){
                //不存在需要添加
                let newItem={
                  'juOrgabb':juOrgabbname.juOrgabb,
                  'chuOrgabb':juOrgabbname.chuOrgabb,
                  'p2Name':juOrgabbname.p2Name,
                  remark:'Not exist'
                }
                this.tableData.push(newItem)
              }
            }

            //排序
            this.tableData.sort((pre,next)=>{
              let preIndex=-1;
              let nextIndex=-1;
              let index=0;
              for(var item of juOrgabbnames){
                if(item.juOrgabb==pre.juOrgabb&&item.chuOrgabb==pre.chuOrgabb&&item.p2Name==pre.p2Name){
                  preIndex=index
                }
                if(item.juOrgabb==next.juOrgabb&&item.chuOrgabb==next.chuOrgabb&&item.p2Name==next.p2Name){
                  nextIndex=index
                }
                if(preIndex!=-1&&nextIndex!=-1){
                  break
                }
                index++
              }
              return preIndex-nextIndex
            })
          }else{
            this.tableData=[];
          }
        })
          .catch(function(error) {
            Indicator.close();
            console.log(error);
          })

      },
      handleMonthReduce(){
        console.log("月减少一天");
        this.date=new Date(addMonth(this.date,-1));
      },
      handleMonthAdd(){
        console.log("月增加一天");
        this.date=new Date(addMonth(this.date,1));
      },
      //返回按钮
      handleBack(){
        if(Indicator){
          Indicator.close();
        }
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
      },
      handleChange(){
        this.requestData();
      },
      //合并单元格
      cellMerge(rowIndex,rowData,field){
        if(rowIndex==0&&field=="juOrgabb"){
          return {
            colSpan: 2,
            rowSpan: 5,
            content: '集团总计',
            componentName: ''
          }
        }
        if(field=="p2Name" && rowData[field] == '高精度系列'){
          return {
            colSpan: 1,
            rowSpan: 1,
            content: '数控系列',
            componentName: ''
          }
        }
        if(field=="p2Name" && rowData[field] == '国产数控系列'){
          return {
            colSpan: 1,
            rowSpan: 1,
            content: '小数控',
            componentName: ''
          }
        }
        if(rowData[field]<=0){
          return {
            colSpan: 1,
            rowSpan: 1,
            content: '',
            componentName: ''
          }
        }
        if(field==='juOrgabb'){
          let juOrgabb=rowData[field];
          let juOrgList=[];
          if(juOrgList.indexOf(juOrgabb)==-1){
            //还没有合并该局级单位
            let num=0;  //记录这个局级单位有多少个
            for(let i=rowIndex;i<this.tableData.length;i++){
              if(this.tableData[i].juOrgabb==juOrgabb){
                num++
              }
            }
            if(num>0){
              return {
                colSpan: 1,
                rowSpan: num,
                content: juOrgabb,
                componentName: ''
              }
            }
            juOrgList.push(juOrgabb)
          }
        }

        if(field==='chuOrgabb'){
          let chuOrgabb=rowData[field];
          //还没有合并该局级单位
          let num=0;  //记录这个局级单位有多少个
          for(let i=rowIndex;i<this.tableData.length;i++){
            if(this.tableData[i].chuOrgabb==chuOrgabb){
              num++
            }else{
              break
            }
          }
          if(num>0){
            return {
              colSpan: 1,
              rowSpan: num,
              content: chuOrgabb,
              componentName: ''
            }
          }
        }
      },
      columnCellClass(rowIndex,columnName,rowData){
        if(columnName=='juOrgabb'){
          if(this.tableData[rowIndex].remark=='Not exist'){
            return 'column-cell-class-name-test oms2-g-item-not-exist';
          }
          return 'column-cell-class-name-test';
        }
        if(columnName=='chuOrgabb'){
          if(this.tableData[rowIndex].remark=='Not exist'){
            return 'column-cell-class-name-test oms2-g-item-not-exist';
          }
          return 'column-cell-class-name-test';
        }
        if(this.tableData[rowIndex].remark=='Not exist'){
          return 'oms2-g-item-not-exist';
        }
        // if(columnName=='zhibiao'&&&rowData.marketTotal==null){
        //   return 'column-cell-class-name-test-not-exist'
        // }
      },
      /**
       * 表格行点击回掉
       */
      handleRowClick(rowIndex, rowData, column){
        this.selectedRow=rowData;
        $("#ModalWellMessage").modal('show');
      }
    },
  }

</script>

<style lang="scss" >
  #LogOfForeignTeamByDevicetype{
    padding-top:$header-height;
    /*解决列数据过长换行问题 v-table-body-cell*/
    .column-cell-class-name-test {
      div{
        display:table-cell!important;
        vertical-align:middle!important;
        white-space: normal !important;
        line-height: 30px !important;
      }
    }
    .not-exist{
      color: #ff0000;
    }
    .oms2-list-item-content{
      text-align: left;
      padding-left:0rem;
      padding-bottom:1rem;
    }
    .oms2-list-divider{
      text-align: center;
      padding-top:0rem !important;
      padding-bottom:0rem !important;
      margin-bottom:1rem;
    }
    .oms2-right{
      text-align: right;
    }
  }
</style>
