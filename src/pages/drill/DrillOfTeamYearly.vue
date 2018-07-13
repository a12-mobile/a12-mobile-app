<template>
  <div>
    <oms2-header :title="$route.meta.title"></oms2-header>
    <div id="DrillOfTeamYearly">
        <!-- <mt-header :title="$route.meta.title" fixed>
          <mt-button slot="left" @click="handleBack"><i class="fa fa-search"></i></mt-button>
        </mt-header> -->
        <!--<h4>中油油服钻井工作量日报</h4>-->
        <!-- <p>钻机统计表</p> -->
        <!-- <div class='oms2-g-report-float-right' style="top:40px">数据来源于A7集团系统钻井综合日报</div> -->
        <oms2-date-picker-daily :date="date">
        </oms2-date-picker-daily>
      <v-table
        is-horizontal-resize
        is-vertical-resize
        style="width:100%;font-size:12px"
        :title-row-height=25
        :row-height=30
        :row-click="handleRowClick"
        :height=tableHeight
        :columns="columns"
        :title-rows="titleRows"
        :table-data="tableData"
        :cellMerge="cellMerge"
        title-bg-color="#F6F6F6"
        even-bg-color="#F4F4F4"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
      ></v-table>
      <div class='oms2-g-report-float-right'>数据来源于A7集团系统库在编钻井队伍分布统计表</div>
      <!-- Modal 具体数据信息 -->
      <div class="modal fade oms2-font-size" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size:14px" id="exampleModalLongTitle">{{selectedRow.orgs}} <b>/</b> <span style="padding-left:1rem;font-size:14px">({{date.time}})</span></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span style="font-size:20px;" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="oms2-list-divider list-group-item list-group-item-dark">市场分布</div>
                <div class="row">
                  <label class="col-5 oms2-right">合计:</label>
                  <p>{{selectedRow.total | ifNumberIsNull}}</p>
                </div>
                <div class="oms2-list-divider list-group-item list-group-item-dark">国内集团内</div>
                <div class="row">
                  <label class="col-5 oms2-right">小计:</label>
                  <p>{{selectedRow.subtotal | ifNumberIsNull}}</p>
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
                  <label class="col-5 oms2-right">华北:</label>
                  <p>{{selectedRow.huabei | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">大港:</label>
                  <p>{{selectedRow.dangang | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">冀东:</label>
                  <p>{{selectedRow.jidong | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">西南:</label>
                  <p>{{selectedRow.xinan | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">长庆:</label>
                  <p>{{selectedRow.changqing | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">苏里格:</label>
                  <p>{{selectedRow.sulige | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">新疆:</label>
                  <p>{{selectedRow.xinjiang | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">吐哈:</label>
                  <p>{{selectedRow.tuha | ifNumberIsNull}}</p>
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
                  <label class="col-5 oms2-right">塔里木:</label>
                  <p>{{selectedRow.talimu | ifNumberIsNull}}</p>
                </div>
               <div class="row">
                  <label class="col-5 oms2-right">浙江:</label>
                  <p>{{selectedRow.zhejiang | ifNumberIsNull}}</p>
                </div>
               <div class="row">
                  <label class="col-5 oms2-right">南方:</label>
                  <p>{{selectedRow.nanfang | ifNumberIsNull}}</p>
                </div>
               <div class="row">
                  <label class="col-5 oms2-right">煤层气:</label>
                  <p>{{selectedRow.meicengqi | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">储气库:</label>
                  <p>{{selectedRow.chuqiku | ifNumberIsNull}}</p>
                </div>
                <div class="oms2-list-divider list-group-item list-group-item-dark ">国内集团外</div>
                <div class="row">
                  <label class="col-5 oms2-right">小计:</label>
                  <p>{{selectedRow.subtotal2 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">中石化:</label>
                  <p>{{selectedRow.Sinopec | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">中海油:</label>
                  <p>{{selectedRow.CNOOC | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">其它:</label>
                  <p>{{selectedRow.other | ifNumberIsNull}}</p>
                </div>
                <div class="list-group-item list-group-item-dark oms2-list-divider">国外</div>
                <div class="row">
                  <label class="col-5 oms2-right">小计:</label>
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
  </div>
</template>

<script>
    import { transToHorizontalScreen } from './../../service/utils/system/screen'
    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import {formatDate,addMonth,getCurrentDate} from './../../service/utils/date/date'
    export default {
      name: "DrillOfTeamYearly",
      data() {
        return {
          date: {
            time:getCurrentDate('yyyy')-1,
          },
          tableHeight:0,
          selectedRow:{},  //选中的行
          tableData: [
            {"orgs":"集团公司","total":"1163","subtotal":"916","daqing":"124","jilin":"37","liaohe":"50","huabei":"31","dagang":"39","jidong":"27","xinan":"95","changqing":"136","sulige":"37","xinjiang":"118","tuha":"53",'qinghai':'51','yumen':'13','talimu':'84','zhejiang':'9','nanfang':'4','meicengqi':'8','chuqiku':'','subtotal2':'5','Sinopec':'','CNOOC':'','other':'5','subtotal3':'242','incompany':'61','outcompany':'181'},
            {"orgs":"大庆钻探","total":"217","subtotal":"165","daqing":"123","jilin":"37","liaohe":"","huabei":"","dagang":"","jidong":"3","xinan":"","changqing":"","sulige":"","xinjiang":"","tuha":"",'qinghai':'','yumen':'','talimu':'2','zhejiang':'','nanfang':'','meicengqi':'','chuqiku':'','subtotal2':'','Sinopec':'','CNOOC':'','other':'','subtotal3':'52','incompany':'18','outcompany':'34'},
            {"orgs":"西部钻探","total":"247","subtotal":"202","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"","jidong":"","xinan":"","changqing":"","sulige":"","xinjiang":"112","tuha":"32",'qinghai':'32','yumen':'11','talimu':'15','zhejiang':'','nanfang':'','meicengqi':'','chuqiku':'','subtotal2':'','Sinopec':'','CNOOC':'','other':'','subtotal3':'45','incompany':'','outcompany':'45'},
            {"orgs":"长城钻探","total":"197","subtotal":"122","daqing":"","jilin":"","liaohe":"50","huabei":"","dagang":"","jidong":"3","xinan":"16","changqing":"9","sulige":"24","xinjiang":"1","tuha":"9",'qinghai':'7','yumen':'','talimu':'','zhejiang':'1','nanfang':'','meicengqi':'2','chuqiku':'','subtotal2':'1','Sinopec':'','CNOOC':'','other':'1','subtotal3':'74','incompany':'24','outcompany':'50'},
            {"orgs":"渤海钻探","total":"210","subtotal":"177","daqing":"1","jilin":"","liaohe":"","huabei":"31","dagang":"38","jidong":"14","xinan":"5","changqing":"13","sulige":"10","xinjiang":"","tuha":"12",'qinghai':'6','yumen':'2','talimu':'33','zhejiang':'2','nanfang':'4','meicengqi':'6','chuqiku':'','subtotal2':'4','Sinopec':'','CNOOC':'','other':'4','subtotal3':'29','incompany':'6','outcompany':'23'},
            {"orgs":"川庆钻探","total":"280","subtotal":"242","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"","jidong":"","xinan":"74","changqing":"114","114":"3","xinjiang":"5","tuha":"",'qinghai':'6','yumen':'','talimu':'34','zhejiang':'6','nanfang':'','meicengqi':'','chuqiku':'','subtotal2':'','Sinopec':'','CNOOC':'','other':'','subtotal3':'38','incompany':'13','outcompany':'25'},
            {"orgs":"海洋工程公司","total":"12","subtotal":"8","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"1","jidong":"7","xinan":"","changqing":"","sulige":"","xinjiang":"","tuha":"",'qinghai':'','yumen':'','talimu':'','zhejiang':'','nanfang':'','meicengqi':'','chuqiku':'','subtotal2':'','Sinopec':'','CNOOC':'','other':'','subtotal3':'4','incompany':'','outcompany':'4'},
          ],
          columns: [
            {field: 'orgs', width: 80, columnAlign: 'left', isFrozen: true,isResize: true},
            {field: 'total', width: 40, columnAlign: 'right', isFrozen: true,isResize: true},
            {field: 'subtotal', width: 50, columnAlign: 'right', isResize: true},
            {field: 'daqing', width: 50, columnAlign: 'right', isResize: true},
            {field: 'jilin', width: 50, columnAlign: 'right', isResize: true},
            {field: 'liaohe', width: 50, columnAlign: 'right', isResize: true},
            {field: 'huabei', width: 50, columnAlign: 'right', isResize: true},
            {field: 'dagang', width: 50, columnAlign: 'right', isResize: true},
            {field: 'jidong', width: 50, columnAlign: 'right', isResize: true},
            {field: 'xinan', width: 50, columnAlign: 'right', isResize: true},
            {field: 'changqing', width: 50, columnAlign: 'right', isResize: true},
            {field: 'sulige', width: 50, columnAlign: 'right', isResize: true},
            {field: 'xinjiang', width: 50, columnAlign: 'right', isResize: true},
            {field: 'tuha', width: 50, columnAlign: 'right', isResize: true},
            {field: 'qinghai', width: 50, columnAlign: 'right', isResize: true},
            {field: 'yumen', width: 50, columnAlign: 'right', isResize: true},
            {field: 'talimu', width: 50, columnAlign: 'right', isResize: true},
            {field: 'zhejiang', width: 50, columnAlign: 'right', isResize: true},
            {field: 'nanfang', width: 50, columnAlign: 'right', isResize: true},
            {field: 'meicengqi', width: 50, columnAlign: 'right', isResize: true},
            {field: 'chuqiku', width: 50, columnAlign: 'right', isResize: true},
            {field: 'subtotal2', width: 50, columnAlign: 'right', isResize: true},
            {field: 'Sinopec', width: 50, columnAlign: 'right', isResize: true},
            {field: 'CNOOC', width: 50, columnAlign: 'right', isResize: true},
            {field: 'other', width: 50, columnAlign: 'right', isResize: true},
            {field: 'subtotal3', width: 50, columnAlign: 'right', isResize: true},
            {field: 'incompany', width: 50, columnAlign: 'right', isResize: true},
            {field: 'outcompany', width: 50, columnAlign: 'right', isResize: true},
          ],

          titleRows: [ //第一行
            [{fields: ['orgs'], title: '单位', titleAlign: 'center', rowspan: 3},
              {fields: ['total'], title: '合计', titleAlign: 'center', rowspan: 3},
              {fields: ['subtotal','daqing','jilin','liaohe','huabei','dagang','jidong','xinan','changqing','sulige',
                  'xinjiang','tuha','qinghai','yumen','talimu','zhejiang','nanfang','meicengqi','chuqiku','subtotal2',
                  'Sinopec','CNOOC','other'], title: '国内(支)', titleAlign: 'center', rowspan: 1, colspan:23},
              {fields: ['subtotal3','incompany','outcompany'], title: '国外(支)', titleAlign: 'center', rowspan: 1, colspan:3},
            ],
            //第二行
            [
              {fields: ['subtotal','daqing','jilin','liaohe','huabei','dagang','jidong','xinan','changqing','sulige',
                  'xinjiang','tuha','qinghai','yumen','talimu','zhejiang','nanfang','meicengqi','chuqiku'], title: '集团内', titleAlign: 'center', rowspan: 1, colspan:19},
              {fields: ['subtotal2',
                  'Sinopec','CNOOC','other'], title: '集团外', titleAlign: 'center', rowspan: 1, colspan:4},
              {fields: ['subtotal3'], title: '小计', titleAlign: 'center', rowspan: 2},
              {fields: ['incompany'], title: '集团内', titleAlign: 'center', rowspan: 2},
              {fields: ['outcompany'], title: '集团外', titleAlign: 'center', rowspan: 2},
            ],
            //第三行
            [
              {fields: ['subtotal'], title: '小计', titleAlign: 'center', rowspan: 1},
              {fields: ['daqing'], title: '大庆', titleAlign: 'center', rowspan: 1},
              {fields: ['jilin'], title: '吉林', titleAlign: 'center', rowspan: 1},
              {fields: ['liaohe'], title: '辽河', titleAlign: 'center', rowspan: 1},
              {fields: ['huabei'], title: '华北', titleAlign: 'center', rowspan: 1},
              {fields: ['dagang'], title: '大港', titleAlign: 'center', rowspan: 1},
              {fields: ['jidong'], title: '冀东', titleAlign: 'center', rowspan: 1},
              {fields: ['xinan'], title: '西南', titleAlign: 'center', rowspan: 1},
              {fields: ['changqing'], title: '长庆', titleAlign: 'center', rowspan: 1},
              {fields: ['sulige'], title: '苏里格', titleAlign: 'center', rowspan: 1},
              {fields: ['xinjiang'], title: '新疆', titleAlign: 'center', rowspan: 1},
              {fields: ['tuha'], title: '吐哈', titleAlign: 'center', rowspan: 1},
              {fields: ['qinghai'], title: '青海', titleAlign: 'center', rowspan: 1},
              {fields: ['yumen'], title: '玉门', titleAlign: 'center', rowspan: 1},
              {fields: ['talimu'], title: '塔里木', titleAlign: 'center', rowspan: 1},
              {fields: ['zhejiang'], title: '浙江', titleAlign: 'center', rowspan: 1},
              {fields: ['nanfang'], title: '南方', titleAlign: 'center', rowspan: 1},
              {fields: ['meicengqi'], title: '煤层气', titleAlign: 'center', rowspan: 1},
              {fields: ['chuqiku'], title: '储气库', titleAlign: 'center', rowspan: 1},
              {fields: ['subtotal2'], title: '小计', titleAlign: 'center', rowspan: 1},
              {fields: ['Sinopec'], title: '中石化', titleAlign: 'center', rowspan: 1},
              {fields: ['CNOOC'], title: '中海油', titleAlign: 'center', rowspan: 1},
              {fields: ['other'], title: '其它', titleAlign: 'center', rowspan: 1},
            ],

          ],

        }
      },
      created(){
        this.tableHeight=window.innerHeight-30
      },
      mounted(){
        // this.$ruixin.setWebViewTitle({title:"钻井队伍分布表2017年报"});
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
          this.selectedRow=rowData;
          $("#ModalWellMessage").modal('show')
        }

      },
    }

</script>

<style lang="scss" >
  #DrillOfTeamYearly{
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
