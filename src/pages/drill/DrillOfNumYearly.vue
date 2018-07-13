<template>
  <div>
    <oms2-header :title="$route.meta.title"></oms2-header>
    <div id="DrillOfNumYearly">

        <!-- <mt-header :title="$route.meta.title" fixed>
          <mt-button slot="left" @click="handleBack"><i class="fa fa-search"></i></mt-button>
        </mt-header> -->
        <!--<h4>中油油服钻井工作量日报</h4>-->
        <!-- <p>钻机统计表</p> -->
        <!-- <div class='oms2-g-report-float-right' style="top:40px">数据来源于A7集团系统钻井综合日报</div> -->
        <oms2-date-picker-daily :date="date"></oms2-date-picker-daily>

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
      <div class='oms2-g-report-float-right'>数据来源于A7集团系统库钻井工作量--开钻口数统计表</div>
      <!-- Modal 具体数据信息 -->
      <div class="modal fade oms2-font-size" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size:14px" id="exampleModalLongTitle">{{selectedRow.part}} <b>/</b> {{selectedRow.orgs}} <b>/</b><span style="padding-left:1rem;font-size:14px">({{date.time}})</span></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span style="font-size:20px;" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="oms2-list-divider list-group-item list-group-item-dark" >市场分布</div>
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
                  <label class="col-5 oms2-right">塔里木:</label>
                  <p>{{selectedRow.talimu | ifNumberIsNull}}</p>
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
                  <label class="col-5 oms2-right">浙江:</label>
                  <p>{{selectedRow.zhejiang | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">南方:</label>
                  <p>{{selectedRow.nanfang | ifNumberIsNull}}</p>
                </div>
                <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 80%;position: center;left: 10%">合作(自营)区块</div>
                <div class="row">
                  <label class="col-5 oms2-right">长庆:</label>
                  <p>{{selectedRow.changqing2 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">大港:</label>
                  <p>{{selectedRow.dagang2 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">其它:</label>
                  <p>{{selectedRow.chuqiku | ifNumberIsNull}}</p>
                </div>
                <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 80%;position: center;left: 10%">煤层气</div>
                <div class="row">
                  <label class="col-5 oms2-right">山西:</label>
                  <p>{{selectedRow.shanxi | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">陕西:</label>
                  <p>{{selectedRow.shanxi2 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">其它:</label>
                  <p>{{selectedRow.other2 | ifNumberIsNull}}</p>
                </div>
                 <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 80%;position: center;left: 10%">储气库</div>
                <div class="row">
                  <label class="col-5 oms2-right">华北:</label>
                  <p>{{selectedRow.huabei2 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">大港:</label>
                  <p>{{selectedRow.dagang3 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">长庆:</label>
                  <p>{{selectedRow.changqing3 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">西南:</label>
                  <p>{{selectedRow.xinan2 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">新疆:</label>
                  <p>{{selectedRow.xinjiang2 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">江苏:</label>
                  <p>{{selectedRow.jiangsu | ifNumberIsNull}}</p>
                </div>
                <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 80%;position: center;left: 10%">页岩气</div>
                <div class="row">
                  <label class="col-5 oms2-right">长宁:</label>
                  <p>{{selectedRow.changning | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">威远:</label>
                  <p>{{selectedRow.weiyuan | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">其它:</label>
                  <p>{{selectedRow.other3 | ifNumberIsNull}}</p>
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
                  <label class="col-5 oms2-right">延长石油:</label>
                  <p>{{selectedRow.yanchang | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">反承包:</label>
                  <p>{{selectedRow.fanchengbao | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">其它:</label>
                  <p>{{selectedRow.other4 | ifNumberIsNull}}</p>
                </div>
                <div class="list-group-item list-group-item-dark oms2-list-divider">国外</div>
                <div class="row">
                  <label class="col-5 oms2-right">小计:</label>
                  <p>{{selectedRow.subtotal3 | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">国外集团内:</label>
                  <p>{{selectedRow.incompany | ifNumberIsNull}}</p>
                </div>
                <div class="row">
                  <label class="col-5 oms2-right">国外集团外:</label>
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
    name: "DrillOfNumYearly",
    data() {
      return {
        date: {
          time:getCurrentDate('yyyy')-1,
        },
        tableHeight:0,
        selectedRow:{},  //选中的行
        tableData: [
          {"part":"集团公司","orgs":"","total":"19598","subtotal":"18608","daqing":"3667","jilin":"888","liaohe":"871","huabei":"381","dagang":"503","jidong":"147","xinan":"45","changqing":"8179",'talimu':'208',"xinjiang":"1697","tuha":"284",'qinghai':'709','yumen':'28','zhejiang':'126','nanfang':'43',
            'changqing2':'284','dagang2':'','other':'','shanxi':'460', 'shanxi2':'2','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'44','weiyuan':'34', 'other3':'8',
            'subtotal2':'63','Sinopec':'1','CNOOC':'','yanchang':'','fanchengbao':'40','other4':'22','subtotal3':'927','incompany':'354','outcompany':'573'},
          {"part":"内部","orgs":"小计","total":"11916","subtotal":"10926","daqing":"3667","jilin":"857","liaohe":"871","huabei":"374","dagang":"503","jidong":"122","xinan":"45","changqing":"2040",'talimu':'154',"xinjiang":"835","tuha":"270",'qinghai':'682','yumen':'28','zhejiang':'43','nanfang':'18',
            'changqing2':'284','dagang2':'','other':'','shanxi':'54', 'shanxi2':'2','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'35','weiyuan':'34', 'other3':'8',
            'subtotal2':'63','Sinopec':'1','CNOOC':'','yanchang':'','fanchengbao':'40','other4':'22','subtotal3':'927','incompany':'354','outcompany':'573'},
          {"part":"内部","orgs":"大庆钻探","total":"4682","subtotal":"4482","daqing":"3644","jilin":"821","liaohe":"","huabei":"","dagang":"","jidong":"16","xinan":"","changqing":"",'talimu':'1',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'',
            'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
            'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'200','incompany':'162','outcompany':'38'},
          {"part":"内部","orgs":"西部钻探","total":"1745","subtotal":"1479","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"","jidong":"","xinan":"","changqing":"",'talimu':'20',"xinjiang":"827","tuha":"180",'qinghai':'427','yumen':'25','zhejiang':'','nanfang':'',
            'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
            'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'266','incompany':'','outcompany':'266'},
          {"part":"内部","orgs":"长城钻探","total":"1575","subtotal":"1255","daqing":"22","jilin":"36","liaohe":"871","huabei":"","dagang":"","jidong":"20","xinan":"","changqing":"93",'talimu':'3',"xinjiang":"","tuha":"35",'qinghai':'47','yumen':'','zhejiang':'14','nanfang':'',
            'changqing2':'95','dagang2':'','other':'','shanxi':'7', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'12', 'other3':'',
            'subtotal2':'16','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'8','other4':'8','subtotal3':'304','incompany':'172','outcompany':'132'},
          {"part":"内部","orgs":"渤海钻探","total":"1639","subtotal":"1491","daqing":"1","jilin":"","liaohe":"","huabei":"374","dagang":"500","jidong":"86","xinan":"","changqing":"56",'talimu':'53',"xinjiang":"","tuha":"55",'qinghai':'175','yumen':'3','zhejiang':'9','nanfang':'18',
            'changqing2':'99','dagang2':'','other':'','shanxi':'47', 'shanxi2':'2','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'13','weiyuan':'', 'other3':'',
            'subtotal2':'38','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'32','other4':'6','subtotal3':'110','incompany':'14','outcompany':'96'},
          {"part":"内部","orgs":"川庆钻探","total":"2264","subtotal":"2216","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"","jidong":"","xinan":"45","changqing":"1891",'talimu':'77',"xinjiang":"8","tuha":"",'qinghai':'33','yumen':'','zhejiang':'20','nanfang':'',
            'changqing2':'90','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'22','weiyuan':'22', 'other3':'8',
            'subtotal2':'1','Sinopec':'1','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'47','incompany':'6','outcompany':'41'},
          {"part":"内部","orgs":"海洋公司","total":"11","subtotal":"3","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"3","jidong":"","xinan":"","changqing":"",'talimu':'',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'',
            'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
            'subtotal2':'8','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'8','subtotal3':'','incompany':'','outcompany':''},
          {"part":"外部","orgs":"中石化","total":"86","subtotal":"86","daqing":"","jilin":"7","liaohe":"","huabei":"","dagang":"","jidong":"25","xinan":"","changqing":"",'talimu':'20',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'25',
            'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'9','weiyuan':'', 'other3':'',
            'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'','incompany':'','outcompany':''},
          {"part":"外部","orgs":"民营","total":"7596","subtotal":"7596","daqing":"","jilin":"24","liaohe":"","huabei":"7","dagang":"","jidong":"","xinan":"","changqing":"6139",'talimu':'34',"xinjiang":"862","tuha":"14",'qinghai':'27','yumen':'','zhejiang':'83','nanfang':'',
            'changqing2':'','dagang2':'','other':'','shanxi':'406', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
            'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'','incompany':'','outcompany':''},

        ],
        columns: [
          {field: 'part', width: 40, columnAlign: 'left', isFrozen: true,isResize: true},
          {field: 'orgs', width: 60, columnAlign: 'left', isFrozen: true,isResize: true},
          {field: 'total', width: 60, columnAlign: 'right', isResize: true},

          {field: 'subtotal', width: 60, columnAlign: 'right', isResize: true},
          {field: 'daqing', width: 50, columnAlign: 'right', isResize: true},
          {field: 'jilin', width: 50, columnAlign: 'right', isResize: true},
          {field: 'liaohe', width: 50, columnAlign: 'right', isResize: true},
          {field: 'huabei', width: 50, columnAlign: 'right', isResize: true},
          {field: 'dagang', width: 50, columnAlign: 'right', isResize: true},
          {field: 'jidong', width: 50, columnAlign: 'right', isResize: true},
          {field: 'xinan', width: 50, columnAlign: 'right', isResize: true},
          {field: 'changqing', width: 60, columnAlign: 'right', isResize: true},
          {field: 'talimu', width: 50, columnAlign: 'right', isResize: true},
          {field: 'xinjiang', width: 50, columnAlign: 'right', isResize: true},
          {field: 'tuha', width: 50, columnAlign: 'right', isResize: true},
          {field: 'qinghai', width: 50, columnAlign: 'right', isResize: true},
          {field: 'yumen', width: 50, columnAlign: 'right', isResize: true},
          {field: 'zhejiang', width: 50, columnAlign: 'right', isResize: true},
          {field: 'nanfang', width: 50, columnAlign: 'right', isResize: true},

          {field: 'changqing2', width: 50, columnAlign: 'right', isResize: true},
          {field: 'dagang2', width: 50, columnAlign: 'right', isResize: true},
          {field: 'other', width: 50, columnAlign: 'right', isResize: true},
          {field: 'shanxi', width: 50, columnAlign: 'right', isResize: true},
          {field: 'shanxi2', width: 50, columnAlign: 'right', isResize: true},
          {field: 'other2', width: 50, columnAlign: 'right', isResize: true},
          {field: 'huabei2', width: 50, columnAlign: 'right', isResize: true},
          {field: 'dagang3', width: 50, columnAlign: 'right', isResize: true},
          {field: 'changqing3', width: 50, columnAlign: 'right', isResize: true},
          {field: 'xinan2', width: 50, columnAlign: 'right', isResize: true},
          {field: 'xinjiang2', width: 50, columnAlign: 'right', isResize: true},
          {field: 'jiangsu', width: 50, columnAlign: 'right', isResize: true},
          {field: 'changning', width: 50, columnAlign: 'right', isResize: true},
          {field: 'weiyuan', width: 50, columnAlign: 'right', isResize: true},
          {field: 'other3', width: 50, columnAlign: 'right', isResize: true},

          {field: 'subtotal2', width: 50, columnAlign: 'right', isResize: true},
          {field: 'Sinopec', width: 50, columnAlign: 'right', isResize: true},
          {field: 'CNOOC', width: 50, columnAlign: 'right', isResize: true},
          {field: 'yanchang', width: 50, columnAlign: 'right', isResize: true},
          {field: 'fanchengbao', width: 50, columnAlign: 'right', isResize: true},
          {field: 'other4', width: 50, columnAlign: 'right', isResize: true},

          {field: 'subtotal3', width: 50, columnAlign: 'right', isResize: true},
          {field: 'incompany', width: 50, columnAlign: 'right', isResize: true},
          {field: 'outcompany', width: 50, columnAlign: 'right', isResize: true},
        ],

        titleRows: [ //第一行
          [{fields: ['part','orgs'], title: '单位', titleAlign: 'center', rowspan: 4,colspan: 2},
            {fields: ['total'], title: '合计', titleAlign: 'center', rowspan: 4},
            {fields: ['subtotal','daqing','jilin','liaohe','huabei','dagang','jidong','xinan','changqing','talimu',
                'xinjiang','tuha','qinghai','yumen','zhejiang','nanfang','changqing2','dagang2','other','shanxi',
                'shanxi2','other2','huabei2','dagang3','changqing3','xinan2','xinjiang2','jiangsu','changning','weiyuan',
                'other3','subtotal2','Sinopec','CNOOC','yanchang','fanchengbao','other4'], title: '国内(万米)', titleAlign: 'center', rowspan: 1, colspan:37},
            {fields: ['subtotal3','incompany','outcompany'], title: '国外(万米)', titleAlign: 'center', rowspan: 1, colspan:3},
          ],
          //第二行
          [
            {fields: ['subtotal','daqing','jilin','liaohe','huabei','dagang','jidong','xinan','changqing','talimu',
                'xinjiang','tuha','qinghai','yumen','zhejiang','nanfang','changqing2','dagang2','other','shanxi',
                'shanxi2','other2','huabei2','dagang3','changqing3','xinan2','xinjiang2','jiangsu','changning','weiyuan',
                'other3'], title: '集团内', titleAlign: 'center', rowspan: 1, colspan:31},
            {fields: ['subtotal2',
                'Sinopec','CNOOC','yanchang','fanchengbao','other4'], title: '集团外', titleAlign: 'center', rowspan: 1, colspan:6},
            {fields: ['subtotal3'], title: '小计', titleAlign: 'center', rowspan: 3},
            {fields: ['incompany'], title: '国外集团内', titleAlign: 'center', rowspan: 3},
            {fields: ['outcompany'], title: '国外集团外', titleAlign: 'center', rowspan: 3},
          ],
          //第三行
          [
            {fields: ['subtotal'], title: '小计', titleAlign: 'center', rowspan: 2},
            {fields: ['daqing'], title: '大庆', titleAlign: 'center', rowspan: 2},
            {fields: ['jilin'], title: '吉林', titleAlign: 'center', rowspan: 2},
            {fields: ['liaohe'], title: '辽河', titleAlign: 'center', rowspan: 2},
            {fields: ['huabei'], title: '华北', titleAlign: 'center', rowspan: 2},
            {fields: ['dagang'], title: '大港', titleAlign: 'center', rowspan: 2},
            {fields: ['jidong'], title: '冀东', titleAlign: 'center', rowspan: 2},
            {fields: ['xinan'], title: '西南', titleAlign: 'center', rowspan: 2},
            {fields: ['changqing'], title: '长庆', titleAlign: 'center', rowspan: 2},
            {fields: ['talimu'], title: '塔里木', titleAlign: 'center', rowspan: 2},
            {fields: ['xinjiang'], title: '新疆', titleAlign: 'center', rowspan: 2},
            {fields: ['tuha'], title: '吐哈', titleAlign: 'center', rowspan: 2},
            {fields: ['qinghai'], title: '青海', titleAlign: 'center', rowspan: 2},
            {fields: ['yumen'], title: '玉门', titleAlign: 'center', rowspan: 2},
            {fields: ['zhejiang'], title: '浙江', titleAlign: 'center', rowspan: 2},
            {fields: ['nanfang'], title: '南方', titleAlign: 'center', rowspan: 2},

            {fields: ['changqing2','dagang2','other'], title: '合作（自营）区块', titleAlign: 'center', rowspan: 1,colspan:3},
            {fields: ['shanxi','shanxi2','other2'], title: '煤层气', titleAlign: 'center', rowspan: 1,colspan: 3},
            {fields: ['huabei2','dagang3','changqing3','xinan2','xinjiang2','jiangsu'], title: '储气库', titleAlign: 'center', rowspan: 1,colspan: 6},
            {fields: ['changning','weiyuan','other3'], title: '页岩气', titleAlign: 'center', rowspan: 1,colspan: 3},

            {fields: ['subtotal2'], title: '小计', titleAlign: 'center', rowspan: 2},
            {fields: ['Sinopec'], title: '中石化', titleAlign: 'center', rowspan: 2},
            {fields: ['CNOOC'], title: '中海油', titleAlign: 'center', rowspan: 2},
            {fields: ['yanchang'], title: '延长石油', titleAlign: 'center', rowspan:2},
            {fields: ['fanchengbao'], title: '反承包', titleAlign: 'center', rowspan: 2},
            {fields: ['other4'], title: '其它', titleAlign: 'center', rowspan: 2},
          ],
          //第四行
          [
            {fields: ['changqing2'], title: '长宁', titleAlign: 'center', rowspan: 1},
            {fields: ['dagang2'], title: '大港', titleAlign: 'center', rowspan: 1},
            {fields: ['other'], title: '其它', titleAlign: 'center', rowspan: 1},
            {fields: ['shanxi'], title: '山西', titleAlign: 'center', rowspan: 1},
            {fields: ['shanxi2'], title: '陕西', titleAlign: 'center', rowspan: 1},
            {fields: ['other2'], title: '其它', titleAlign: 'center', rowspan: 1},
            {fields: ['huabei2'], title: '华北', titleAlign: 'center', rowspan: 1},
            {fields: ['dagang3'], title: '大港', titleAlign: 'center', rowspan: 1},
            {fields: ['changqing3'], title: '长庆', titleAlign: 'center', rowspan: 1},
            {fields: ['xinan2'], title: '西南', titleAlign: 'center', rowspan: 1},
            {fields: ['xinjiang2'], title: '新疆', titleAlign: 'center', rowspan: 1},
            {fields: ['jiangsu'], title: '江苏', titleAlign: 'center', rowspan: 1},
            {fields: ['changning'], title: '长宁', titleAlign: 'center', rowspan: 1},
            {fields: ['weiyuan'], title: '威远', titleAlign: 'center', rowspan: 1},
            {fields: ['other3'], title: '其它', titleAlign: 'center', rowspan: 1},
          ],

        ],

      }
    },
    created(){
      this.tableHeight=window.innerHeight-30
    },
    mounted(){
      // this.$ruixin.setWebViewTitle({title:"2017钻井工作量-钻井进尺表"});
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
        if(field=="part"&&rowData[field]=="集团公司"){
          return {
            colSpan: 2,
            rowSpan: 1,
            content: '集团公司',
            componentName: ''
          }
        }
        if(field==='part'){
          let allorgs=rowData[field];
          //还没有合并该局级单位
          let num=0;  //记录这个局级单位有多少个
          for(let i=rowIndex;i<this.tableData.length;i++){
            if(this.tableData[i].part==allorgs){
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

<style lang="scss">
  #DrillOfNumYearly{
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
