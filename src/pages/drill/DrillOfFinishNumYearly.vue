<template>
  <div id="DrillOfFinishNumYearly">
    <header>
      <!-- <mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" @click="handleBack"><i class="fa fa-search"></i></mt-button>
      </mt-header> -->
      <!--<h4>中油油服钻井工作量日报</h4>-->
      <!-- <p>钻机统计表</p> -->
      <!-- <div class='oms2-report-float-right' style="top:40px">数据来源于A7集团系统钻井综合日报</div> -->
      <!--<oms2-date-picker-daily :date="date"
                              @date-change="handleChange">
      </oms2-date-picker-daily> -->
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
    <div class='oms2-g-report-float-right'>数据来源于A7集团系统库钻井工作量--完井口数统计表</div>

    <!-- Modal 具体数据信息 -->
        <div class="modal fade oms2-font-size" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" style="font-size:18px" id="exampleModalLongTitle">{{selectedRow.part}} <b>/</b> {{selectedRow.orgs}} <b>/</b><span style="padding-left:1rem;font-size:14px">({{date.time}})</span></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span style="font-size:32px;" aria-hidden="true">&times;</span>
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
                                <p>{{selectedRow.subtotal}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">大庆:</label>
                                <p>{{selectedRow.daqing}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">吉林:</label>
                                <p>{{selectedRow.jilin}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">辽河:</label>
                                <p>{{selectedRow.liaohe}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">华北:</label>
                                <p>{{selectedRow.huabei}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">大港:</label>
                                <p>{{selectedRow.dagang}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">冀东:</label>
                                <p>{{selectedRow.jidong}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">西南:</label>
                                <p>{{selectedRow.xinan}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">长庆:</label>
                                <p>{{selectedRow.changqing}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">塔里木:</label>
                                <p>{{selectedRow.talimu}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">新疆:</label>
                                <p>{{selectedRow.xinjiang}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">吐哈:</label>
                                <p>{{selectedRow.tuha}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">青海:</label>
                                <p>{{selectedRow.qinghai}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">玉门:</label>
                                <p>{{selectedRow.yumen}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">浙江:</label>
                                <p>{{selectedRow.zhejiang}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">南方:</label>
                                <p>{{selectedRow.nanfang}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 80%;position: center;left: 10%">合作(自营)区块</div>
                            <div class="row">
                                <label class="col-5 oms2-right">长庆:</label>
                                <p>{{selectedRow.changqing2}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">大港:</label>
                                <p>{{selectedRow.dagang2}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">其他:</label>
                                <p>{{selectedRow.other}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 80%;position: center;left: 10%">煤层气</div>
                            <div class="row">
                                <label class="col-5 oms2-right">山西:</label>
                                <p>{{selectedRow.shanxi}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">陕西:</label>
                                <p>{{selectedRow.shanxi2}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">其他:</label>
                                <p>{{selectedRow.other2}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 80%;position: center;left: 10%">储气库</div>
                            <div class="row">
                                <label class="col-5 oms2-right">华北:</label>
                                <p>{{selectedRow.huabei2}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">大港:</label>
                                <p>{{selectedRow.dagang3}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">长庆:</label>
                                <p>{{selectedRow.changqing3}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">西南:</label>
                                <p>{{selectedRow.xinan2}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">新疆:</label>
                                <p>{{selectedRow.xinjiang2}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">江苏:</label>
                                <p>{{selectedRow.jiangsu}}</p>
                            </div>
                            <div class="oms2-list-divider list-group-item list-group-item-dark" style="width: 80%;position: center;left: 10%">页岩气</div>
                            <div class="row">
                                <label class="col-5 oms2-right">长宁:</label>
                                <p>{{selectedRow.changning}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">威远:</label>
                                <p>{{selectedRow.weiyuan}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">其他:</label>
                                <p>{{selectedRow.dagang3}}</p>
                            </div>
                            
                            <div class="oms2-list-divider list-group-item list-group-item-dark">国内集团外</div>
                            <div class="row">
                                <label class="col-5 oms2-right">小计:</label>
                                <p>{{selectedRow.subtotal2}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">中石化:</label>
                                <p>{{selectedRow.Sinopec}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">中海油:</label>
                                <p>{{selectedRow.CNOOC}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">延长石油:</label>
                                <p>{{selectedRow.yanchang}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">反承包:</label>
                                <p>{{selectedRow.fanchengbao}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">其他:</label>
                                <p>{{selectedRow.other4}}</p>
                            </div>
                            
                            <div class="oms2-list-divider list-group-item list-group-item-dark ">国外</div>
                            <div class="row">
                                <label class="col-5 oms2-right">小计:</label>
                                <p>{{selectedRow.subtotal3}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">国外集团内:</label>
                                <p>{{selectedRow.incompany}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">国外集团外:</label>
                                <p>{{selectedRow.outcompany}}</p>
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
    name: "DrillFinishOfNumYearly",
    data() {
      return {
        selectedRow:{},  //选中的行
        date: {
          time:getCurrentDate('yyyy')-1,
        },
        tableHeight:0,
        tableData: [
          {"part":"内部","orgs":"大庆钻探","total":"4674","subtotal":"4482","daqing":"3649","jilin":"813","liaohe":"","huabei":"","dagang":"","jidong":"18","xinan":"","changqing":"",'talimu':'2',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'',
            'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
            'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'192','incompany':'156','outcompany':'36'},
          {"part":"内部","orgs":"西部钻探","total":"1668","subtotal":"1418","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"","jidong":"","xinan":"","changqing":"",'talimu':'19',"xinjiang":"786","tuha":"178",'qinghai':'413','yumen':'22','zhejiang':'','nanfang':'',
            'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
            'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'250','incompany':'','outcompany':'250'},
          {"part":"内部","orgs":"长城钻探","total":"1544","subtotal":"1241","daqing":"22","jilin":"39","liaohe":"877","huabei":"","dagang":"","jidong":"18","xinan":"","changqing":"92",'talimu':'3',"xinjiang":"","tuha":"36",'qinghai':'45','yumen':'','zhejiang':'14','nanfang':'',
            'changqing2':'80','dagang2':'','other':'','shanxi':'7', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'8', 'other3':'',
            'subtotal2':'16','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'8','other4':'8','subtotal3':'287','incompany':'170','outcompany':'117'},
          {"part":"内部","orgs":"渤海钻探","total":"1583","subtotal":"1446","daqing":"1","jilin":"","liaohe":"","huabei":"358","dagang":"490","jidong":"87","xinan":"","changqing":"55",'talimu':'43',"xinjiang":"","tuha":"60",'qinghai':'172','yumen':'3','zhejiang':'7','nanfang':'18',
            'changqing2':'100','dagang2':'','other':'','shanxi':'48', 'shanxi2':'2','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'2','weiyuan':'', 'other3':'',
            'subtotal2':'40','Sinopec':'1','CNOOC':'','yanchang':'','fanchengbao':'32','other4':'7','subtotal3':'97','incompany':'13','outcompany':'84'},
          {"part":"内部","orgs":"川庆钻探","total":"2203","subtotal":"2153","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"","jidong":"","xinan":"23","changqing":"1884",'talimu':'60',"xinjiang":"9","tuha":"",'qinghai':'27','yumen':'','zhejiang':'20','nanfang':'',
            'changqing2':'93','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'14','weiyuan':'13', 'other3':'10',
            'subtotal2':'1','Sinopec':'1','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'49','incompany':'11','outcompany':'38'},
          {"part":"内部","orgs":"海洋公司","total":"15","subtotal":"3","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"3","jidong":"","xinan":"","changqing":"",'talimu':'',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'',
            'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
            'subtotal2':'7','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'7','subtotal3':'5','incompany':'','outcompany':'5'},
          {"part":"内部","orgs":"小计","total":"11687","subtotal":"10743","daqing":"3672","jilin":"852","liaohe":"877","huabei":"358","dagang":"493","jidong":"123","xinan":"23","changqing":"2031",'talimu':'127',"xinjiang":"795","tuha":"274",'qinghai':'657','yumen':'25','zhejiang':'41','nanfang':'18',
            'changqing2':'273','dagang2':'','other':'','shanxi':'55', 'shanxi2':'2','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'16','weiyuan':'21', 'other3':'10',
            'subtotal2':'64','Sinopec':'2','CNOOC':'','yanchang':'','fanchengbao':'40','other4':'22','subtotal3':'880','incompany':'350','outcompany':'530'},
          {"part":"外部","orgs":"中石化","total":"83","subtotal":"83","daqing":"","jilin":"6","liaohe":"","huabei":"","dagang":"","jidong":"25","xinan":"","changqing":"",'talimu':'15',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'27',
            'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'10','weiyuan':'', 'other3':'',
            'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'','incompany':'','outcompany':''},
          {"part":"外部","orgs":"民营","total":"7542","subtotal":"7542","daqing":"","jilin":"24","liaohe":"","huabei":"7","dagang":"","jidong":"","xinan":"","changqing":"6120",'talimu':'25',"xinjiang":"859","tuha":"14",'qinghai':'28','yumen':'','zhejiang':'76','nanfang':'',
            'changqing2':'','dagang2':'','other':'','shanxi':'389', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
            'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'','incompany':'','outcompany':''},
          {"part":"集团公司","orgs":"集团公司","total":"19312","subtotal":"18368","daqing":"3672","jilin":"882","liaohe":"877","huabei":"365","dagang":"493","jidong":"148","xinan":"23","changqing":"8151",'talimu':'167',"xinjiang":"1654","tuha":"288",'qinghai':'685','yumen':'25','zhejiang':'117','nanfang':'45',
            'changqing2':'273','dagang2':'','other':'','shanxi':'444', 'shanxi2':'2','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'26','weiyuan':'21', 'other3':'10',
            'subtotal2':'64','Sinopec':'2','CNOOC':'','yanchang':'','fanchengbao':'40','other4':'22','subtotal3':'880','incompany':'350','outcompany':'530'},

        ],
        columns: [
          {field: 'part', width: 60, columnAlign: 'center', isFrozen: true,isResize: true},
          {field: 'orgs', width: 60, columnAlign: 'center', isFrozen: true,isResize: true},
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
                'other3','subtotal2','Sinopec','CNOOC','yanchang','fanchengbao','other4'], title: '国内', titleAlign: 'center',colspan:37},
            {fields: ['subtotal3','incompany','outcompany'], title: '国外', titleAlign: 'center',colspan:3},
          ],
          //第二行
          [
            {fields: ['subtotal','daqing','jilin','liaohe','huabei','dagang','jidong','xinan','changqing','talimu',
                'xinjiang','tuha','qinghai','yumen','zhejiang','nanfang','changqing2','dagang2','other','shanxi',
                'shanxi2','other2','huabei2','dagang3','changqing3','xinan2','xinjiang2','jiangsu','changning','weiyuan',
                'other3'], title: '集团内', titleAlign: 'center',colspan:31},
            {fields: ['subtotal2',
                'Sinopec','CNOOC','yanchang','fanchengbao','other4'], title: '集团外', titleAlign: 'center',colspan:6},
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

            {fields: ['changqing2','dagang2','other'], title: '合作（自营）区块', titleAlign: 'center',colspan:3},
            {fields: ['shanxi','shanxi2','other2'], title: '煤层气', titleAlign: 'center',colspan: 3},
            {fields: ['huabei2','dagang3','changqing3','xinan2','xinjiang2','jiangsu'], title: '储气库', titleAlign: 'center',colspan: 6},
            {fields: ['changning','weiyuan','other3'], title: '页岩气', titleAlign: 'center',colspan: 3},

            {fields: ['subtotal2'], title: '小计', titleAlign: 'center', rowspan: 2},
            {fields: ['Sinopec'], title: '中石化', titleAlign: 'center', rowspan: 2},
            {fields: ['CNOOC'], title: '中海油', titleAlign: 'center', rowspan: 2},
            {fields: ['yanchang'], title: '延长石油', titleAlign: 'center', rowspan:2},
            {fields: ['fanchengbao'], title: '反承包', titleAlign: 'center', rowspan: 2},
            {fields: ['other4'], title: '其它', titleAlign: 'center', rowspan: 2},
          ],
          //第四行
          [
            {fields: ['changqing2'], title: '长庆', titleAlign: 'center'},
            {fields: ['dagang2'], title: '大港', titleAlign: 'center'},
            {fields: ['other'], title: '其它', titleAlign: 'center'},
            {fields: ['shanxi'], title: '山西', titleAlign: 'center'},
            {fields: ['shanxi2'], title: '陕西', titleAlign: 'center'},
            {fields: ['other2'], title: '其它', titleAlign: 'center'},
            {fields: ['huabei2'], title: '华北', titleAlign: 'center'},
            {fields: ['dagang3'], title: '大港', titleAlign: 'center'},
            {fields: ['changqing3'], title: '长庆', titleAlign: 'center'},
            {fields: ['xinan2'], title: '西南', titleAlign: 'center'},
            {fields: ['xinjiang2'], title: '新疆', titleAlign: 'center'},
            {fields: ['jiangsu'], title: '江苏', titleAlign: 'center'},
            {fields: ['changning'], title: '长宁', titleAlign: 'center'},
            {fields: ['weiyuan'], title: '威远', titleAlign: 'center'},
            {fields: ['other3'], title: '其它', titleAlign: 'center'},
          ],

        ],

      }
    },
    created(){
      this.tableHeight=window.innerHeight-80
    },
    mounted(){
      this.$ruixin.setWebViewTitle({title:"2017钻井工作量统计-完井口数统计表"});
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
  #DrillOfFinishNumYearly{
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
