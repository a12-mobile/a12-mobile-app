<template>
  <div>
    <header>
      <mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
      </mt-header>
    </header>
    <h5>录井工作量分单位月报</h5>
    <oms2-date-picker-monthly
      :date=date
      @date-change="handleChange"
    ></oms2-date-picker-monthly>

    <!--<div class="oms2-datepicker-content">-->
      <!--<vue-datepicker-local-->
        <!--v-model="date"-->
        <!--inputClass='oms2-date-picker-monthly-input'-->
        <!--format="YYYY-MM" />-->
    <!--</div>-->
    <v-table
      is-horizontal-resize
      is-vertical-resize
      style="width:98%;margin-left:1%;font-size:12px"
      :title-row-height=25
      :row-height=30
      title-bg-color="#F6F6F6"
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
    import DatePickerMonthly from './../../components/datepicker/DatePickerMonthly'
    import { Indicator } from 'mint-ui';
    import { getMonthlyOfWorkloadGN } from './../../service/dh/dhGetData'
    import { getCurrentDate } from '../../service/utils/date/date'
    export default {
      name: "MonthLogOfLogWellByCompany",
      data: function () {
        return {
          date: {time:getCurrentDate()},
          tableData: [
            // {
            //   "market1": "大庆钻探",
            //   "market2": "小计",
            //   //"market3": "小计",
            //   "logWellTotalNum": "620",
            //   "logWellTotalNum2": "178",
            //   "prospectingWell": "14",
            //   "developmentWell": "104",
            //   "synthesizeWell": "36",
            //   "gasLogWell":"29",
            //   "geologicalLogWell":"113",
            //   "geochemicalLogWell2":"246",
            //   "quantitativeFluorescence":"35",
            //   "nmrLogWell":"15",
            //   "imaging":"102",
            //   "elementsLogWell":"124",
            //   "logWellGuide":"12",
            //   "teleransission":"32",
            //   //"tryOilLogWell":"124",
            //   "countNum":"13",
            //   "trueLength":"937.44",
            //   "engineeringAnomalyForecast":"19",
            //   "inlandLogWell":"178",
            //   "foreignLogWell":"124",
            // },
            // {
            //   "market1": "大庆钻探",
            //   "market2": "录井一公司",
            //   //"market3": "大庆",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "20",
            //   "prospectingWell": "234",
            //   "developmentWell": "45",
            //   "synthesizeWell": "577"
            // },
            // {
            //   "market1": "大庆钻探",
            //   "market2": "录井二公司",
            //   //"market3": "辽河",
            //   "logWellTotalNum": "657",
            //   "logWellTotalNum2": "20",
            //   "prospectingWell": "944",
            //   "developmentWell": "45",
            //   "synthesizeWell": "670"
            // },
            // {
            //   "market1": "西部钻探",
            //   "market2": "小计",
            //   //"market3": "吉林",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "20",
            //   "prospectingWell": "124",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "西部钻探",
            //   "market2": "克拉玛依录井工程公司",
            //   //"market3": "华北",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "20",
            //   "prospectingWell": "456",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "西部钻探",
            //   "market2": "吐哈录井工程公司",
            //   //"market3": "大港",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "20",
            //   "prospectingWell": "124",
            //   "developmentWell": "112",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "长城钻探",
            //   "market2": "小计",
            //   //"market3": "西南",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "234",
            //   "prospectingWell": "124",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "长城钻探",
            //   "market2": "录井公司",
            //   //"market3": "长庆",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "20",
            //   "prospectingWell": "278",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "渤海钻探",
            //   "market2": "小计",
            //   //"market3": "新疆",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "220",
            //   "prospectingWell": "124",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "渤海钻探",
            //   "market2": "第一录井公司",
            //   //"market3": "吐哈",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "568",
            //   "prospectingWell": "124",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "渤海钻探",
            //   "market2": "第二录井公司",
            //   //"market3": "塔里木",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "943",
            //   "prospectingWell": "124",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "川庆钻探",
            //   "market2": "小计",
            //   //"market3": "青海",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "20",
            //   "prospectingWell": "124",
            //   "developmentWell": "456",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "川庆钻探",
            //   "market2": "地研院",
            //   //"market3": "玉门",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "20",
            //   "prospectingWell": "838",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "中油测井",
            //   "market2": "小计",
            //   //"market3": "冀东",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "647",
            //   "prospectingWell": "124",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "中油测井",
            //   "market2": "青海分公司",
            //   //"market3": "浙江",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "765",
            //   "prospectingWell": "124",
            //   "developmentWell": "45",
            //   "synthesizeWell": "150"
            // },
            // {
            //   "market1": "总计",
            //   // "market2": "集团内",
            //   // "market3": "南方",
            //   "logWellTotalNum": "15",
            //   "logWellTotalNum2": "557",
            //   "prospectingWell": "124",
            //   "developmentWell": "248",
            //   "synthesizeWell": "150"
            // },


          ],
          columns: [
            {field: 'jujorgNam', width: 70, columnAlign: 'center', isResize: true, isFrozen: true},
            {field: 'cjorgName', width: 140, columnAlign: 'center', isResize: true, isFrozen: true},
            {field: 'logWellTotalNum', width: 50, columnAlign: 'center', isResize: true},
            {field: 'logWellTotalNum2', width: 50, columnAlign: 'center', isResize: true},
            {field: 'ewellNum', width: 50, columnAlign: 'center', isResize: true},
            {field: 'dwellNum', width: 50, columnAlign: 'center', isResize: true},
            {field: 'synthesizeWell', width: 50, columnAlign: 'center', isResize: true},
            {field: 'gasLogWell', width: 50, columnAlign: 'center', isResize: true},
            {field: 'geologicalLogWell', width: 50, columnAlign: 'center', isResize: true},
            {field: 'geochemicalLogWell2', width: 50, columnAlign: 'center', isResize: true},
            {field: 'quantitativeFluorescence', width: 50, columnAlign: 'center', isResize: true},
            {field: 'nmrLogWell', width: 50, columnAlign: 'center', isResize: true},
            {field: 'imaging', width: 50, columnAlign: 'center', isResize: true},
            {field: 'elementsLogWell', width: 50, columnAlign: 'center', isResize: true},
            {field: 'logWellGuide', width: 50, columnAlign: 'center', isResize: true},
            {field: 'teleransission', width: 50, columnAlign: 'center', isResize: true},
            {field: 'tryOilLogWell', width: 50, columnAlign: 'center', isResize: true},
            {field: 'countNum', width: 50, columnAlign: 'center', isResize: true},
            {field: 'spare1', width: 50, columnAlign: 'center', isResize: true},
            {field: 'engineeringAnomalyForecast', width: 50, columnAlign: 'center', isResize: true},
            {field: 'inlandLogWell', width: 50, columnAlign: 'center', isResize: true},
            {field: 'foreignLogWell', width: 50, columnAlign: 'center', isResize: true}

          ],
          titleRows: [
            //第一行
            [{fields: ['jujorgNam', 'cjorgName'], title: '市场分布', titleAlign: 'center', rowspan:2, colspan: 2},
              {fields: ['logWellTotalNum'], title: '录井总井次', titleAlign: 'center', rowspan: 2},
              {fields: ['logWellTotalNum2'], title: '录井总口数', titleAlign: 'center', rowspan: 2},
              {fields: ['ewellNum'], title: '探井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['dwellNum'], title: '开发井(口)', titleAlign: 'center', rowspan: 2},
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
              {fields: ['countNum', 'spare1'], title: '钻井取心', titleAlign: 'center', rowspan: 1, colspan: 2},
              {fields: ['engineeringAnomalyForecast'], title: '工程异常预报(次)', titleAlign: 'center', rowspan: 2},
              {fields: ['inlandLogWell'], title: '国内录井(口)', titleAlign: 'center', rowspan: 2},
              {fields: ['foreignLogWell'], title: '国外录井(口)', titleAlign: 'center', rowspan: 2}],

            //第二行
            //设计
            [{fields: ['countNum'], title: '口数', titleAlign: 'center', rowspan: 1},
            {fields: ['spare1'], title: '实长(m)', titleAlign: 'center', rowspan: 1}],
          ]
        }
      },
      created(){
        this.requestData()
      },
      methods: {
          requestData(){
            Indicator.open('加载中...')
            this.$http('GET', '/mlog/month/byCompany', {
              "date": this.date.time
            })
              .then((data) => {
                Indicator.close()
                if (data) {
                  this.tableData = data
                } else {
                  this.tableData = []
                }
              })
              .catch(function (error) {
                Indicator.close()
                console.log(error)
              })
            // getMonthlyOfWorkloadGN(this.date.time).then((data)=>{
            //   Indicator.close()
            //   this.tableData=data.body
            // })
            //   .catch(function(error) {
            //     Indicator.close()
            //     console.log(error)
            //   })

          },
          handleBack() {
              if(Indicator){
                Indicator.close()
              }
              window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
          },
          handleChange(){
            this.requestData()
          }

      },
      components: {
        'oms2-date-picker-monthly':DatePickerMonthly
      }

        // cellMerge(rowIndex, rowData, field) {
        //   if (field === 'market1' && rowData[field] === '大庆钻探') {
        //     return {
        //       colSpan: 1,
        //       rowSpan: 3,
        //       content: '<span >大庆钻探</span>',
        //       componentName: ''
        //     }
        //   } else if (field === 'market1' &&  rowData[field] === '西部钻探') {
        //     return {
        //       colSpan: 1,
        //       rowSpan: 3,
        //       content: '<span >西部钻探</span>',
        //       componentName: ''
        //     }
        //   } else if (field === 'market1' && rowData[field] === '长城钻探') {
        //     return {
        //       colSpan: 1,
        //       rowSpan: 2,
        //       content: '<span >长城钻探</span>',
        //       componentName: '',
        //     }
        //   }else if (field === 'market1' && rowData[field] === '渤海钻探') {
        //     return {
        //       colSpan: 1,
        //       rowSpan: 3,
        //       content: '<span >集团外</span>',
        //       componentName: '',
        //     }
        //   }else if (field === 'market1' && rowData[field] === '川庆钻探') {
        //     return {
        //       colSpan: 1,
        //       rowSpan: 2,
        //       content: '<span >川庆钻探</span>',
        //       componentName: '',
        //     }
        //   }else if (field === 'market1' && rowData[field] === '中油测井') {
        //     return {
        //       colSpan: 1,
        //       rowSpan: 2,
        //       content: '<span style="text-align: center">中油测井</span>',
        //       componentName: '',
        //     }
        //   }else if (field === 'market1' && rowData[field] === '总计') {
        //     return {
        //       colSpan: 2,
        //       rowSpan: 1,
        //       content: '<span >总计</span>',
        //       componentName: '',
        //     }
        //   }else if (field === 'market1' && rowData[field] === '合计') {
        //     return {
        //       colSpan: 3,
        //       rowSpan: 1,
        //       content: '<span >合    计</span>',
        //       componentName: '',
        //     }
        //   }
        // }
      // }
    }
</script>

<style scoped>

</style>
