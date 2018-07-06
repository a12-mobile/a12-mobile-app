<template>
  <div id="LogWorkloadOfBlock">
    <!-- <h4>测井工作量油区分布统计表</h4> -->
    <oms2-date-picker-monthly :date=date @date-change="handleChange"></oms2-date-picker-monthly>
    <!-- Button trigger modal -->

    <v-table
      is-horizontal-resize
      is-vertical-resize
      :height=tableHeight
      :title-row-height=25
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
    <div class='oms2-g-report-float-right'>数据来源于A7集团系统测井工作量油区分布统计表</div>
    <!-- Modal 具体数据信息 -->
    <div class="modal fade oms2-font-size" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" style="font-size:14px" id="exampleModalLongTitle">{{selectedRow.juOrgabb}} <b>/</b> {{selectedRow.chuOrgabb}} <b>/</b> {{selectedRow.zhibiao}} <span style="padding-left:2rem;font-size:14px">(
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
              <div class="oms2-list-divider list-group-item list-group-item-dark">国内集团内</div>
              <div class="row">
                <label class="col-5 oms2-right">合计:</label>
                <p>{{selectedRow.subtotal1 | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">大庆:</label>
                <p>{{selectedRow.daqing | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">吉林:</label>
                <p>{{selectedRow.jilin | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">辽河:</label>
                <p>{{selectedRow.liaohe | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">冀东:</label>
                <p>{{selectedRow.jidong | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">大港:</label>
                <p>{{selectedRow.dangang | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">华北:</label>
                <p>{{selectedRow.huabei | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">长庆小计:</label>
                <p>{{selectedRow.cqtotal | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">长庆苏里格:</label>
                <p>{{selectedRow.cqsulige | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">长庆其它:</label>
                <p>{{selectedRow.cqother | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">西南:</label>
                <p>{{selectedRow.xinan | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">青海:</label>
                <p>{{selectedRow.qinghai | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">玉门:</label>
                <p>{{selectedRow.yumen | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">吐哈:</label>
                <p>{{selectedRow.tuha | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">塔里木:</label>
                <p>{{selectedRow.talimu | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">新疆:</label>
                <p>{{selectedRow.xinjiang | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">其它:</label>
                <p>{{selectedRow.jtnother | ifNumberIsNull}}</p>
              </div>
              <div class="oms2-list-divider list-group-item list-group-item-dark ">国内集团外</div>
              <div class="row">
                <label class="col-5 oms2-right">合计:</label>
                <p>{{selectedRow.subtotal2 | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">中石化:</label>
                <p>{{selectedRow.sinopec | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">中海油:</label>
                <p>{{selectedRow.cnooc | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">反承包:</label>
                <p>{{selectedRow.reverseContract | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">其它:</label>
                <p>{{selectedRow.jtwother | ifNumberIsNull}}</p>
              </div>
              <div class="list-group-item list-group-item-dark oms2-list-divider">国外</div>
              <div class="row">
                <label class="col-5 oms2-right">合计:</label>
                <p>{{selectedRow.subtotal3 | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">集团内:</label>
                <p>{{selectedRow.incompany | ifNumberIsNull}}</p>
              </div>
              <div class="row">
                <label class="col-5 oms2-right">集团外:</label>
                <p>{{selectedRow.outcompany | ifNumberIsNull}}</p>
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
</template>

<script>
    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import { getWorkloadOfBlock } from './../../service/log/logGetData'
    import {formatDate,addMonth,getCurrentDate} from './../../service/utils/date/date'
    export default {
        name: "LogWorkloadOfBlock",
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
              {field: 'zhibiao', width: 70, columnAlign: 'left',isFrozen: true,},

              {field: 'marketTotal', width: 42, columnAlign: 'right',isResize:true},
              {field: 'subtotal1', width: 42, columnAlign: 'right',isResize:true},
              {field: 'daqing', width: 40, columnAlign: 'right',isResize:true},
              {field: 'jilin', width: 40, columnAlign: 'right',isResize:true},
              {field: 'liaohe', width: 40, columnAlign: 'right',isResize:true},
              {field: 'jidong', width: 40, columnAlign: 'right',isResize:true},
              {field: 'dangang', width: 40, columnAlign: 'right',isResize:true},
              {field: 'huabei', width: 40, columnAlign: 'right',isResize:true},

              {field: 'cqtotal', width: 40, columnAlign: 'right',isResize:true},
              {field: 'cqsulige', width: 40, columnAlign: 'right',isResize:true},
              {field: 'cqother', width: 40, columnAlign: 'right',isResize:true},

              {field: 'xinan', width: 40, columnAlign: 'right',isResize:true},
              {field: 'qinghai', width: 40, columnAlign: 'right',isResize:true},
              {field: 'yumen', width: 40, columnAlign: 'right',isResize:true},
              {field: 'tuha', width: 40, columnAlign: 'right',isResize:true},
              {field: 'talimu', width: 40, columnAlign: 'right',isResize:true},
              {field: 'xinjiang', width: 40, columnAlign: 'right',isResize:true},
              {field: 'jtnother', width: 40, columnAlign: 'right',isResize:true},

              {field: 'subtotal2', width: 40, columnAlign: 'right',isResize:true},
              {field: 'sinopec', width: 40, columnAlign: 'right',isResize:true},
              {field: 'cnooc', width: 40, columnAlign: 'right',isResize:true},
              {field: 'reverseContract', width: 40, columnAlign: 'right',isResize:true},
              {field: 'jtwother', width: 40, columnAlign: 'right',isResize:true},

              {field: 'subtotal3', width: 40, columnAlign: 'right',isResize:true},
              {field: 'incompany', width: 40, columnAlign: 'right',isResize:true},
              {field: 'outcompany', width: 40, columnAlign: 'right',isResize:true},
            ],

            titleRows: [
              //第一行
              [{fields: ['juOrgabb','chuOrgabb','zhibiao'], title: '指标名称', titleAlign: 'center', rowspan:5, colspan:3},
                {fields: ['marketTotal','subtotal1','daqing','jilin','liaohe','jidong','dangang','huabei',
                    'cqtotal','cqsulige','cqother','xinan','qinghai','yumen','tuha','talimu',
                    'xinjiang','jtnother','subtotal2','sinopec','cnooc','reverseContract','jtwother','subtotal3',
                    'incompany','outcompany'], title: '市场分布', titleAlign: 'center', colspan: 26},
              ],

              //第二行
              [{fields: ['marketTotal'], title: '总计', titleAlign: 'center',rowspan:4},
                {fields: ['subtotal1','daqing','jilin','liaohe','jidong','dangang','huabei',
                    'cqtotal','cqsulige','cqother','xinan','qinghai','yumen','tuha','talimu',
                    'xinjiang','jtnother','subtotal2','sinopec','cnooc','reverseContract','jtwother'], title: '国内', titleAlign: 'center', colspan:22},
                {fields: ['subtotal3', 'incompany','outcompany'], title: '国外', titleAlign: 'center', colspan:3},
              ],

              //第三行
              [//
                {fields: ['subtotal1','daqing','jilin','liaohe','jidong','dangang','huabei',
                    'cqtotal','cqsulige','cqother','xinan','qinghai','yumen','tuha','talimu',
                    'xinjiang','jtnother'], title: '集团内', titleAlign: 'center', colspan:17},
                {fields: ['subtotal2','sinopec','cnooc','reverseContract','jtwother'], title: '集团外', titleAlign: 'center', colspan:5},
                {fields: ['subtotal3'], title: '合计', titleAlign: 'center', rowspan:3},
                {fields: ['incompany'], title: '集团内', titleAlign: 'center', rowspan:3},
                {fields: ['outcompany'], title: '集团外', titleAlign: 'center', rowspan:3},
              ],

              //第四行
              [//射孔（井次）
                {fields: ['subtotal1'], title: '合计', titleAlign: 'center', rowspan:2},//
                {fields: ['daqing'], title: '大庆', titleAlign: 'center', rowspan:2},
                {fields: ['jilin'], title: '吉林', titleAlign: 'center', rowspan:2},
                {fields: ['liaohe'], title: '辽河', titleAlign: 'center', rowspan:2},
                {fields: ['jidong'], title: '冀东', titleAlign: 'center', rowspan:2},
                {fields: ['dangang'], title: '大港', titleAlign: 'center', rowspan:2},
                {fields: ['huabei'], title: '华北', titleAlign: 'center', rowspan:2},
                {fields: ['cqtotal','cqsulige','cqother'], title: '长庆', titleAlign: 'center', colspan:3},
                {fields: ['xinan'], title: '西南', titleAlign: 'center', rowspan:2},
                {fields: ['qinghai'], title: '青海', titleAlign: 'center', rowspan:2},
                {fields: ['yumen'], title: '玉门', titleAlign: 'center', rowspan:2},
                {fields: ['tuha'], title: '吐哈', titleAlign: 'center', rowspan:2},
                {fields: ['talimu'], title: '塔里木', titleAlign: 'center', rowspan:2},
                {fields: ['xinjiang'], title: '新疆', titleAlign: 'center', rowspan:2},
                {fields: ['jtnother'], title: '其它', titleAlign: 'center', rowspan:2},

                {fields: ['subtotal2'], title: '合计', titleAlign: 'center', rowspan:2},
                {fields: ['sinopec'], title: '中石化', titleAlign: 'center', rowspan:2},
                {fields: ['cnooc'], title: '中海油', titleAlign: 'center', rowspan:2},
                {fields: ['reverseContract'], title: '反承包', titleAlign: 'center', rowspan:2},
                {fields: ['jtwother'], title: '其它', titleAlign: 'center', rowspan:2},
              ],

              //第五行
              [
                {fields: ['cqtotal'], title: '小计', titleAlign: 'center', rowspan:1},
                {fields: ['cqsulige'], title: '苏里格', titleAlign: 'center', rowspan:1},
                {fields: ['cqother'], title: '其它', titleAlign: 'center', rowspan:1},
              ]
            ],

          }
        },
        created(){
          this.requestData();
          this.tableHeight=window.innerHeight-80
        },
        mounted(){
          this.$ruixin.setWebViewTitle({title:'测井工作量油区分布统计表'});
          setTimeout(()=>{
            this.$ruixin.supportAutorotate({});
          },200)
        },
        methods:{
          //请求数据方法
          requestData(){
            Indicator.open('加载中...');
            getWorkloadOfBlock(this.date.time).then((data)=>{
              Indicator.close();
              if(data.body){
                this.tableData=data.body;
              }else{
                this.tableData=[]
              }
            })
              .catch(function(error) {
                Indicator.close();
                console.log(error)
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
              Indicator.close()
            }
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
          },
          handleChange(){
            this.requestData()
          },
          //合并单元格
          cellMerge(rowIndex,rowData,field){
            if(rowIndex==0&&field=="juOrgabb"){
              return {
                colSpan: 2,
                rowSpan: 7,
                content: '集团总计',
                componentName: ''
              }
            }
            if(field=="zhibiao"&&rowData[field]=='VSP'){
              return {
                colSpan: 1,
                rowSpan: 1,
                content: '其中：VSP',
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

            if(this.tableData[rowIndex].flag=='0'&&(columnName=='juOrgabb'||columnName=='chuOrgabb')){
              return 'column-cell-class-name-test not-exist'
            }
            if(this.tableData[rowIndex].flag=='0'&&columnName=='zhibiao'){
              if(columnName=="zhibiao"&&this.tableData[rowIndex].zhibiao=='LWD'){
                return 'column-cell-class-name-lwd not-exist'
              }
              return 'not-exist'
            }
            if(columnName=="zhibiao"&&this.tableData[rowIndex].zhibiao=='LWD'){
              return 'column-cell-class-name-lwd'
            }
            if(columnName=='juOrgabb'){
              return 'column-cell-class-name-test'
            }
            if(columnName=='chuOrgabb'){
              return 'column-cell-class-name-test'
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
            $("#ModalWellMessage").modal('show')
          }
        },
    }
</script>

<style lang="scss" >
  #LogWorkloadOfBlock{
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
    .column-cell-class-name-lwd {
      div{
        text-align: right!important;
      }
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
