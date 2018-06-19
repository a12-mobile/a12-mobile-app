<template>
  <div>
    <header>
      <mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
      </mt-header>
    </header>
    <oms2-date-picker-daily :date="date" @change="change"></oms2-date-picker-daily>

    <v-table
      is-horizontal-resizenpm
      is-vertical-resize
      style="width:100%;font-size:12px" 
      :columns="columns"
      :table-data="tableData"
      :title-rows="titleRows"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      even-bg-color="#f4f4f4"
    ></v-table>


  </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import { Toast } from "mint-ui"
    export default {
      name: "MonthLogOfWellWorkload",
      created(){
        this.$ruixin.supportAutorotate({});
      },
      mounted(){
        this.$ruixin.setWebViewTitle({title:'录井分单位月报'});
      },
      data: function () {
        return {
          date: timepicker.startTime,
          tableData: [
            {
              "logWellTotalNum": "15",
              "logWellTotalNum2": "20",
              "prospectingWell": "124",
              "developmentWell": "45",
              "synthesizeWell": "150"
            },
            {
              "logWellTotalNum": "15",
              "logWellTotalNum2": "20",
              "prospectingWell": "124",
              "developmentWell": "45",
              "synthesizeWell": "150"
            },
            {
              "logWellTotalNum": "15",
              "logWellTotalNum2": "20",
              "prospectingWell": "124",
              "developmentWell": "45",
              "synthesizeWell": "150"
            },
            {
              "logWellTotalNum": "15",
              "logWellTotalNum2": "20",
              "prospectingWell": "124",
              "developmentWell": "45",
              "synthesizeWell": "150"
            },

            {
              "logWellTotalNum": "20",
              "logWellTotalNum2": "67",
              "prospectingWell": "56",
              "developmentWell": "89",
              "synthesizeWell": "99"
            }

          ],
          columns: [
            {field: 'marketDistribution', width: 50, columnAlign: 'center', isResize: true, isFrozen: true},
            {field: 'project', width: 50, columnAlign: 'left', isResize: true},
            {field: 'logWellTotalNum', width: 50, columnAlign: 'left', isResize: true},
            {field: 'logWellTotalNum2', width: 50, columnAlign: 'left', isResize: true},
            {field: 'prospectingWell', width: 50, columnAlign: 'left', isResize: true},
            {field: 'developmentWell', width: 50, columnAlign: 'left', isResize: true},
            {field: 'synthesizeWell', width: 50, columnAlign: 'left', isResize: true},
            {field: 'gasLogWell', width: 50, columnAlign: 'left', isResize: true},
            {field: 'geologicalLogWell', width: 50, columnAlign: 'left', isResize: true},
            {field: 'geochemicalLogWell2', width: 50, columnAlign: 'left', isResize: true},
            {field: 'quantitativeFluorescence', width: 50, columnAlign: 'left', isResize: true},
            {field: 'nmrLogWell', width: 50, columnAlign: 'left', isResize: true},
            {field: 'imaging', width: 50, columnAlign: 'left', isResize: true},
            {field: 'elementsLogWell', width: 50, columnAlign: 'left', isResize: true},
            {field: 'logWellGuide', width: 50, columnAlign: 'left', isResize: true},
            {field: 'teleransission', width: 50, columnAlign: 'left', isResize: true},
            {field: 'tryOilLogWell', width: 50, columnAlign: 'left', isResize: true},
            {field: 'engineeringAnomalyForecast', width: 50, columnAlign: 'left', isResize: true},
            {field: 'countNum', width: 50, columnAlign: 'left', isResize: true},
            {field: 'trueLength', width: 50, columnAlign: 'left', isResize: true},
            {field: 'inland', width: 50, columnAlign: 'left', isResize: true},
            {field: 'foreign', width: 50, columnAlign: 'left', isResize: true},
            {field: 'inGroup', width: 50, columnAlign: 'left', isResize: true},
            {field: 'outGroup', width: 50, columnAlign: 'left', isResize: true},
            {field: 'subtotal', width: 50, columnAlign: 'left', isResize: true},
            {field: 'daqing', width: 50, columnAlign: 'left', isResize: true},
            {field: 'liaohe', width: 50, columnAlign: 'left', isResize: true},
            {field: 'jilin', width: 50, columnAlign: 'left', isResize: true},
            {field: 'huabei', width: 50, columnAlign: 'left', isResize: true},
            {field: 'dagang', width: 50, columnAlign: 'left', isResize: true},
            {field: 'xinan', width: 50, columnAlign: 'left', isResize: true},
            {field: 'changqing', width: 50, columnAlign: 'left', isResize: true},
            {field: 'xinjiang', width: 50, columnAlign: 'left', isResize: true},
            {field: 'tuha', width: 50, columnAlign: 'left', isResize: true},
            {field: 'talimu', width: 50, columnAlign: 'left', isResize: true},
            {field: 'qinghai', width: 50, columnAlign: 'left', isResize: true},
            {field: 'yumen', width: 50, columnAlign: 'left', isResize: true},
            {field: 'jidong', width: 50, columnAlign: 'left', isResize: true},
            {field: 'zhejiang', width: 50, columnAlign: 'left', isResize: true},
            {field: 'nanfang', width: 50, columnAlign: 'left', isResize: true},
            {field: 'zhongyoumei', width: 50, columnAlign: 'left', isResize: true},
            {field: 'sulige', width: 50, columnAlign: 'left', isResize: true},
            {field: 'subtotal2', width: 50, columnAlign: 'left', isResize: true},
            {field: 'sinopec', width: 50, columnAlign: 'left', isResize: true},
            {field: 'cnooc', width: 50, columnAlign: 'left', isResize: true},
            {field: 'reverseContract', width: 50, columnAlign: 'left', isResize: true},
            {field: 'otherDomestic', width: 50, columnAlign: 'left', isResize: true},
            {field: 'subtotal3', width: 50, columnAlign: 'left', isResize: true},
            {field: 'inCompany', width: 50, columnAlign: 'left', isResize: true},
            {field: 'outCompany', width: 50, columnAlign: 'left', isResize: true},
            {field: 'total', width: 50, columnAlign: 'left', isResize: true},

          ],
          titleRows: [
              //第一行
              [//{fields: ['marketDistribution'], title: '市场分布', titleAlign: 'center', rowspan: 2},
              {fields: ['inland','inGroup','subtotal'], title: '项目', titleAlign: 'center', rowspan: 2, colspan:3},
              {fields: ['logWellTotalNum'], title: '录井总井次', titleAlign: 'center', rowspan: 2},
              {fields: ['logWellTotalNum2'], title: '录井总口数', titleAlign: 'center', rowspan: 2},
              {fields: ['prospectingWell '], title: '探井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['developmentWell'], title: '开发井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['synthesizeWell'], title: '综合录井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['gasLogWell'], title: '气测录井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['geologicalLogWell'], title: '地质录井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['geochemicalLogWell2'], title: '地化录井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['quantitativeFluorescence'], title: '定量荧光(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['nmrLogWell'], title: '核磁录井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['imaging'], title: '成像(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['elementsLogWell'], title: '元素录井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['logWellGuide'], title: '录井导向(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['teleransission'], title: '远程传输(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['tryOilLogWell'], title: '试油录井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['countNum','trueLength'], title: '钻井取心', titleAlign: 'center', rowspan:1, colspan:2},
              {fields: ['engineeringAnomalyForecast'], title: '工程异常预报(次)', titleAlign: 'center', rowspan: 2}],

              //第二行
              //设计
              [{fields: ['countNum'], title: '口数', titleAlign: 'center', rowspan:1},
              {fields: ['trueLength'], title: '实长(m)', titleAlign: 'center', rowspan:1}],

              //第三行
              [{fields: ['inland'], title: '国内', titleAlign: 'center',rowspan:23},
              {fields: ['inGroup'], title: '集团内', titleAlign: 'center',rowspan:18},
              {fields: ['subtotal'], title: '小计', titleAlign: 'center', rowspan:1}],

              //第四行
              [{fields: ['daqing'], title: '大庆', titleAlign: 'center', rowspan:1}],
              //5
              [{fields: ['liaohe'], title: '辽河', titleAlign: 'center', rowspan:1}],
              //6
              [{fields: ['jilin'], title: '吉林', titleAlign: 'center', rowspan:1}],
              //7
              [{fields: ['huabei'], title: '华北', titleAlign: 'center', rowspan:1}],
              //8
              [{fields: ['dagang'], title: '大港', titleAlign: 'center', rowspan:1}],
              //9
              [{fields: ['xinan'], title: '西南', titleAlign: 'center', rowspan:1}],
              //10
              [{fields: ['changqing'], title: '长庆', titleAlign: 'center', rowspan:1}],
              //11
              [{fields: ['xinjiang'], title: '新疆', titleAlign: 'center', rowspan:1}],
              //12
              [{fields: ['tuha'], title: '吐哈', titleAlign: 'center', rowspan:1}],
              //13
              [{fields: ['talimu'], title: '塔里木', titleAlign: 'center', rowspan:1}],
              //14
              [{fields: ['qinghai'], title: '青海', titleAlign: 'center', rowspan:1}],
              //15
              [{fields: ['yumen'], title: '玉门', titleAlign: 'center', rowspan:1}],
              //16
              [{fields: ['jidong'], title: '冀东', titleAlign: 'center', rowspan:1}],
              //17
              [{fields: ['zhejiang'], title: '浙江', titleAlign: 'center', rowspan:1}],
              //18
              [{fields: ['nanfang'], title: '南方', titleAlign: 'center', rowspan:1}],
              //19
              [{fields: ['zhongyoumei'], title: '中油煤', titleAlign: 'center', rowspan:1}],
              //20
              [{fields: ['sulige'], title: '苏里格', titleAlign: 'center', rowspan:1}],
              //21
              [{fields: ['outGroup'], title: '集团外', titleAlign: 'center',rowspan:5},
              {fields: ['subtotal2'], title: '小计', titleAlign: 'center', rowspan:1}],
              //22
              [{fields: ['sinopec'], title: '中石化', titleAlign: 'center', rowspan:1}],
              //23
              [{fields: ['cnooc'], title: '中海油', titleAlign: 'center', rowspan:1}],
              //24
              [{fields: ['reverseContract'], title: '反承包', titleAlign: 'center', rowspan:1}],
              //25
              [{fields: ['otherDomestic'], title: '国内其它', titleAlign: 'center', rowspan:1}],
              //26
              [{fields: ['foreign'], title: '国外', titleAlign: 'center', rowspan:3},
              {fields: ['subtotal3'], title: '小计', titleAlign: 'center', rowspan:1, colspan:2}],
              //27
              [{fields: ['inCompany'], title: '集团内', titleAlign: 'center', rowspan:1, colspan:2}],
              //28
              [{fields: ['outCompany'], title: '集团外', titleAlign: 'center', rowspan:1, cosplan:2}],
              //29
              [{fields: ['jilin'], title: '合  计', titleAlign: 'center', rowspan:1, colspan:3}]


          ]
        }
      },
      methods:{
        handleBack(){
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },

        //设置列单元格样式
        columnCellClass(rowIndex,columnName,rowData){
          if(columnName==='shigongdanwei'||columnName==='duihao'||columnName==='jinghao'){
            //return 'wu-column-cell-fixed'
          }
        },

        change(date){
          alert("改变了"+date)
        }

      },
    }
</script>

<style scoped>

</style>
