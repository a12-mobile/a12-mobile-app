<template>
  <div>
    <header>
      <!--<mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
      </mt-header>-->
    </header>
    <!--<h5>录井工作量分单位月报</h5>-->
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
      style="width:100%;font-size:12px" 
      :title-row-height=25
      :row-height=30
      title-bg-color="#F6F6F6"
      :columns="columns"
      :table-data="tableData"
      :title-rows="titleRows"
      :cellMerge="cellMerge"
      :footer="footer"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      even-bg-color="#f4f4f4"
    ></v-table>
    <div class='oms2-report-float-right'>数据来源于集团A7录井工作量分单位月报</div>


  </div>
</template>

<script>
    import DatePickerMonthly from './../../components/datepicker/DatePickerMonthly'
    import { Indicator } from 'mint-ui';
    import { getMonthLogOfMlogWellByCompany } from './../../service/mlog/mlogGetData'
    import { getCurrentDate } from '../../service/utils/date/date'
    export default {
      name: "MonthLogOfLogWellByCompany",
      data: function () {
        return {
          date: {time:getCurrentDate()},
          tableData: [],
          columns: [
            {field: 'jujorgNam', width: 70, columnAlign: 'left', isResize: true, isFrozen: true},
            {field: 'cjorgName', width: 140, columnAlign: 'left', isResize: true, isFrozen: true},
            {field: 'logWellTotalNum', width: 50, columnAlign: 'right', isResize: true},
            {field: 'logWellTotalNum2', width: 50, columnAlign: 'right', isResize: true},
            {field: 'ewellNum', width: 50, columnAlign: 'right', isResize: true},
            {field: 'dwellNum', width: 50, columnAlign: 'right', isResize: true},
            {field: 'synthesizeWell', width: 50, columnAlign: 'right', isResize: true},
            {field: 'gasLogWell', width: 50, columnAlign: 'right', isResize: true},
            {field: 'geologicalLogWell', width: 50, columnAlign: 'right', isResize: true},
            {field: 'geochemicalLogWell2', width: 50, columnAlign: 'right', isResize: true},
            {field: 'quantitativeFluorescence', width: 50, columnAlign: 'right', isResize: true},
            {field: 'nmrLogWell', width: 50, columnAlign: 'right', isResize: true},
            {field: 'imaging', width: 50, columnAlign: 'right', isResize: true},
            {field: 'elementsLogWell', width: 50, columnAlign: 'right', isResize: true},
            {field: 'logWellGuide', width: 50, columnAlign: 'right', isResize: true},
            {field: 'teleransission', width: 50, columnAlign: 'right', isResize: true},
            {field: 'tryOilLogWell', width: 50, columnAlign: 'right', isResize: true},
            {field: 'countNum', width: 50, columnAlign: 'right', isResize: true},
            {field: 'spare1', width: 50, columnAlign: 'right', isResize: true},
            {field: 'engineeringAnomalyForecast', width: 50, columnAlign: 'right', isResize: true},
            {field: 'inlandLogWell', width: 50, columnAlign: 'right', isResize: true},
            {field: 'foreignLogWell', width: 50, columnAlign: 'right', isResize: true}
          ],
          titleRows: [
            //第一行
            [{fields: ['jujorgNam', 'cjorgName'], title: '单位', titleAlign: 'center', rowspan:2, colspan: 2},
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
          ],
          footer: []
        }
      },
      created(){
        this.requestData()
        // this.$ruixinApi.setWebViewTitle({ //设置导航条标题
        //   title:'录井分单位月报'
        // })
      },
      methods: {
          requestData(){
              Indicator.open('加载中...')
              getMonthLogOfMlogWellByCompany(this.date.time).then((data)=>{
                Indicator.close()
                this.tableData=data.body
              })
              .catch(function(error) {
                Indicator.close()
                console.log(error)
              })
          },
          setFooterData(){

            let result = [],
              amounts1 = this.tableData.map(item => {
                return item.amount1
              }),
              amounts2 = this.tableData.map(item => {
                return item.amount2
              });

            let minVal = ['最小值'];
            minVal.push(Math.min.apply(null, amounts1)+' ￥');
            minVal.push(Math.min.apply(null, amounts2)+' ￥');
            minVal.push('-');


            let sumVal = ['求和'];
            sumVal.push(
              amounts1.reduce((prev, curr) => {

                return parseInt(prev) + parseInt(curr);
              }, 0)+' ￥'
            )

            sumVal.push(
              amounts2.reduce((prev, curr) => {

                return parseInt(prev) + parseInt(curr);
              }, 0)+' ￥'
            )

            sumVal.push('-');


            result.push(minVal);
            result.push(sumVal);

            this.footer = result;
          },

        handleBack() {
              if(Indicator){
                Indicator.close()
              }
              window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
          },
        handleChange(){
          this.requestData()
        },
        cellMerge(rowIndex,rowData,field){
          if (field === 'jujorgNam' && rowData[field] === '集团总计') {
            return {
              colSpan: 2,
              rowSpan: 1,
              content: '总计',
              componentName: ''
            }
          }
            if(field==='jujorgNam'){
            let jujorgNam=rowData[field]
            let jujorgNamList=[]
            if(jujorgNamList.indexOf(jujorgNam)==-1){
              //还没有合并该局级单位
              let num=0  //记录这个局级单位有多少个
              for(let i=rowIndex;i<this.tableData.length;i++){
                if(this.tableData[i].jujorgNam==jujorgNam){
                  num++
                }
              }
              if(num>0){
                return {
                  colSpan: 1,
                  rowSpan: num,
                  content: jujorgNam,
                  componentName: ''
                }
              }
              jujorgNamList.push(jujorgNam)
            }
          }

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
        //   }
    }
</script>

<style scoped>

</style>
