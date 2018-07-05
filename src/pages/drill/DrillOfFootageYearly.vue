<template>
  <div id="DrillOfFootageYearly">
    <header>
      <!-- <mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" @click="handleBack"><i class="fa fa-search"></i></mt-button>
      </mt-header> -->
      <!--<h4>中油油服钻井工作量日报</h4>-->
      <!-- <p>钻机统计表</p> -->
      <!-- <div class='oms2-g-report-float-right' style="top:40px">数据来源于A7集团系统钻井综合日报</div> -->
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
    ></v-table>
    <div class='oms2-g-report-float-right'>数据来源于A7集团系统库钻井工作量--钻井进尺统计表</div>
  </div>
</template>

<script>
    import { transToHorizontalScreen } from './../../service/utils/system/screen'
    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import {formatDate,addMonth,getCurrentDate} from './../../service/utils/date/date'
    export default {
      name: "DrillOfFootageYearly",
      data() {
        return {
          date: {
            time:getCurrentDate('yyyy')-1,
          },
          tableHeight:0,
          tableData: [
            {"part":"集团公司","orgs":"","total":"4275.52","subtotal":"4029.59","daqing":"547.3","jilin":"169.59","liaohe":"169.45","huabei":"103.84","dagang":"120.53","jidong":"52.9","xinan":"19.47","changqing":"2019.82",'talimu':'99.31',"xinjiang":"264.78","tuha":"89.52",'qinghai':'119.97','yumen':'12.47','zhejiang':'27.42','nanfang':'15.03',
              'changqing2':'102.44','dagang2':'','other':'','shanxi':'59.55', 'shanxi2':'0.37','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'15.62','weiyuan':'14.15', 'other3':'6.06',
              'subtotal2':'21.86','Sinopec':'0.16','CNOOC':'','yanchang':'','fanchengbao':'15.45','other4':'6.25','subtotal3':'224.07','incompany':'91.81','outcompany':'132.26'},
            {"part":"内部","orgs":"小计","total":"2579.48","subtotal":"2333.55","daqing":"547.3","jilin":"160.69","liaohe":"169.45","huabei":"102.92","dagang":"120.53","jidong":"43.88","xinan":"19.47","changqing":"528.86",'talimu':'71.95',"xinjiang":"183.73","tuha":"85.69",'qinghai':'115.66','yumen':'12.47','zhejiang':'20.38','nanfang':'5.9',
              'changqing2':'102.44','dagang2':'','other':'','shanxi':'11.2', 'shanxi2':'0.37','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'10.45','weiyuan':'14.15', 'other3':'6.06',
              'subtotal2':'21.86','Sinopec':'0.16','CNOOC':'','yanchang':'','fanchengbao':'15.45','other4':'6.25','subtotal3':'224.07','incompany':'91.81','outcompany':'132.26'},
            {"part":"内部","orgs":"大庆钻探","total":"758.95","subtotal":"697.76","daqing":"541.39","jilin":"149.04","liaohe":"","huabei":"","dagang":"","jidong":"6.25","xinan":"","changqing":"",'talimu':'1.08',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'',
              'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
              'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'61.19','incompany':'42.42','outcompany':'18.77'},
            {"part":"内部","orgs":"西部钻探","total":"378.09","subtotal":"337.54","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"","jidong":"","xinan":"","changqing":"",'talimu':'11.4',"xinjiang":"179.35","tuha":"55.09",'qinghai':'80.71','yumen':'10.99','zhejiang':'','nanfang':'',
              'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
              'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'40.55','incompany':'','outcompany':'40.55'},
            {"part":"内部","orgs":"长城钻探","total":"372.57","subtotal":"287.21","daqing":"5.33","jilin":"11.65","liaohe":"169.45","huabei":"","dagang":"","jidong":"6.24","xinan":"","changqing":"27.36",'talimu':'1.11',"xinjiang":"","tuha":"10.93",'qinghai':'9.69','yumen':'','zhejiang':'7.29','nanfang':'',
              'changqing2':'31.43','dagang2':'','other':'','shanxi':'1.63', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'5.1', 'other3':'',
              'subtotal2':'6.16','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'3.03','other4':'3.13','subtotal3':'79.2','incompany':'43.2','outcompany':'36'},
            {"part":"内部","orgs":"渤海钻探","total":"440.37","subtotal":"399.04","daqing":"0.58","jilin":"","liaohe":"","huabei":"102.82","dagang":"119.99","jidong":"31.39","xinan":"","changqing":"18.7",'talimu':'30.13',"xinjiang":"","tuha":"19.67",'qinghai':'16.62','yumen':'1.48','zhejiang':'2.47','nanfang':'5.9',
              'changqing2':'36.16','dagang2':'','other':'','shanxi':'9.57', 'shanxi2':'0.37','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'3.09','weiyuan':'', 'other3':'',
              'subtotal2':'15.33','Sinopec':'0.09','CNOOC':'','yanchang':'','fanchengbao':'12.42','other4':'2.82','subtotal3':'26','incompany':'3.37','outcompany':'22.63'},
            {"part":"内部","orgs":"川庆钻探","total":"627.36","subtotal":"611.46","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"","jidong":"","xinan":"19.47","changqing":"482.8",'talimu':'28.23',"xinjiang":"4.38","tuha":"",'qinghai':'8.64','yumen':'','zhejiang':'10.62','nanfang':'',
              'changqing2':'34.85','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'7.36','weiyuan':'9.05', 'other3':'6.06',
              'subtotal2':'0.07','Sinopec':'0.07','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'15.83','incompany':'2.82','outcompany':'13.01'},
            {"part":"内部","orgs":"海洋公司","total":"2.14","subtotal":"0.54","daqing":"","jilin":"","liaohe":"","huabei":"","dagang":"0.54","jidong":"","xinan":"","changqing":"",'talimu':'',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'',
              'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
              'subtotal2':'0.3','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'0.3','subtotal3':'1.3','incompany':'','outcompany':'1.3'},
            {"part":"外部","orgs":"中石化","total":"34.22","subtotal":"34.22","daqing":"","jilin":"1.98","liaohe":"","huabei":"","dagang":"","jidong":"9.02","xinan":"","changqing":"",'talimu':'8.92',"xinjiang":"","tuha":"",'qinghai':'','yumen':'','zhejiang':'','nanfang':'9.13',
              'changqing2':'','dagang2':'','other':'','shanxi':'', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'5.17','weiyuan':'', 'other3':'',
              'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'','incompany':'','outcompany':''},
            {"part":"外部","orgs":"民营","total":"1661.82","subtotal":"34.22","daqing":"","jilin":"6.92","liaohe":"","huabei":"0.92","dagang":"","jidong":"","xinan":"","changqing":"1490.96",'talimu':'18.44',"xinjiang":"81.05","tuha":"3.83",'qinghai':'4.31','yumen':'','zhejiang':'7.04','nanfang':'',
              'changqing2':'','dagang2':'','other':'','shanxi':'48.35', 'shanxi2':'','other2':'','huabei2':'','dagang3':'','changqing3':'','xinan2':'','xinjiang2':'','jiangsu':'','changning':'','weiyuan':'', 'other3':'',
              'subtotal2':'','Sinopec':'','CNOOC':'','yanchang':'','fanchengbao':'','other4':'','subtotal3':'','incompany':'','outcompany':''},

          ],
          columns: [
            {field: 'part', width: 60, columnAlign: 'left', isFrozen: true,isResize: true},
            {field: 'orgs', width: 60, columnAlign: 'left', isFrozen: true,isResize: true},
            {field: 'total', width: 60, columnAlign: 'left', isResize: true},

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
        this.tableHeight=window.innerHeight-80
      },
      mounted(){
        this.$ruixin.setWebViewTitle({title:"2017钻井工作量-钻井进尺表"});
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

        //合并单位

      },
    }

</script>

<style scoped>

</style>
