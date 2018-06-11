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
      :row-height=40
      :height=tableheight
      title-bg-color="#F6F6F6"
      :columns="columns"
      :table-data="tableData"
      :title-rows="titleRows"
      :cellMerge="cellMerge"
      :column-cell-class-name="columnCellClass"
      :footer="footer"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      even-bg-color="#f4f4f4"
    ></v-table>
    <div class='oms2-report-float-right'>数据来源于集团A7库录井工作量分单位月报</div>
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
          tableheight:0,
          date: {time:getCurrentDate('yyyy-MM')},
          tableData: [],
          columns: [
            {field: 'jujorgNam', width: 70, columnAlign: 'left', isResize: true, isFrozen: true},
            {field: 'cjorgName', width: 80, columnAlign: 'left',  isFrozen: true},
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
            [{fields: ['jujorgNam','cjorgName'], title: '<span class="title1">项目</span><span class="title2">单位</span>', titleAlign: 'center', rowspan: 2,colspan: 2,titleCellClassName:'oms2-title-cell-duijiao'},
             // {fields: ['jujorgNam', 'cjorgName'], title: '单位', titleAlign: 'center', rowspan:2, colspan: 2},
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
        this.tableheight=window.innerHeight-80
        // this.$ruixinApi.setWebViewTitle({ //设置导航条标题
        //   title:'录井分单位月报'
        // })
      },
      methods: {
          requestData(){
              Indicator.open('加载中...')
              getMonthLogOfMlogWellByCompany(this.date.time).then((data)=>{
                if (data) {
                  Indicator.close()
                  this.tableData = data.body
                  //检查是否含有所有地区
                  let jujiorgnames=[{'jujorgNam':'集团总计','cjorgName':''},
                    {'jujorgNam':'大庆钻探','cjorgName':'小计'},
                    {'jujorgNam':'大庆钻探','cjorgName':'录井一公司'},
                    {'jujorgNam':'大庆钻探','cjorgName':'录井二公司'},
                    {'jujorgNam':'西部钻探','cjorgName':'小计'},
                    {'jujorgNam':'西部钻探','cjorgName':'克拉玛依录井工程公司'},
                    {'jujorgNam':'西部钻探','cjorgName':'吐哈录井工程公司'},
                    {'jujorgNam':'长城钻探','cjorgName':'小计'},
                    {'jujorgNam':'长城钻探','cjorgName':'录井公司'},
                    {'jujorgNam':'渤海钻探','cjorgName':'小计'},
                    {'jujorgNam':'渤海钻探','cjorgName':'第一录井公司'},
                    {'jujorgNam':'渤海钻探','cjorgName':'第二录井公司'},
                    {'jujorgNam':'川庆钻探','cjorgName':'小计'},
                    {'jujorgNam':'川庆钻探','cjorgName':'地研院'},
                    {'jujorgNam':'中油测井','cjorgName':'小计'},
                    {'jujorgNam':'中油测井','cjorgName':'青海分公司'},
                  ]
                  let jujorgNamFromDate = []
                  for (var date of this.tableData) {
                    jujorgNamFromDate.push({
                      'jujorgNam':date.jujorgNam,
                      'cjorgName':date.cjorgName
                    })
                  }
                  let include=false;  //判断是否存在
                  for(var jujorgNam of jujiorgnames){
                    include=false;
                    for(var juji of jujorgNamFromDate){
                      if(juji.jujorgNam==jujorgNam.jujorgNam&&juji.cjorgName==jujorgNam.cjorgName){
                        include=true
                      }
                    }
                    if(!include){
                      //不存在需要添加
                      let newItem={
                        'jujorgNam':jujorgNam.jujorgNam,
                        'cjorgName':jujorgNam.cjorgName,
                        remark:'Not exist'
                      }
                      this.tableData.push(newItem)
                    }
                  }

                //排序
                this.tableData.sort((pre,next)=>{
                  let preIndex=-1
                  let nextIndex=-1
                  let index=0;
                  for(var item of jujiorgnames){
                    if(item.jujorgNam==pre.jujorgNam&&item.cjorgName==pre.cjorgName){
                      preIndex=index
                    }
                    if(item.jujorgNam==next.jujorgNam&&item.cjorgName==next.cjorgName){
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
              this.tableData=[]
            }
          })
              .catch(function(error) {
                Indicator.close()
                console.log(error)
              })
          },

        handleBack() {
              if(Indicator){
                Indicator.close()
              }
              window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
          },
        columnCellClass(rowIndex, columnName, rowData) {
            // console.log(rowData['cjorgName']+"    "+rowData['cjorgName'].length)
          if(rowData['cjorgName'].length>6&&columnName=='cjorgName'&&this.tableData[rowIndex].remark=='Not exist'){
            return 'column-cell-class-name-test-not-exist'
          }
          if(rowData['cjorgName'].length>6){
            return 'column-cell-class-name-test'
          }
          if(columnName=='jujorgNam'&&this.tableData[rowIndex].remark=='Not exist'){
            return 'oms2-item-not-exict'
          }
          if(columnName=='cjorgName'&&this.tableData[rowIndex].remark=='Not exist'){
            return 'oms2-item-not-exict'
          }

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
            // if (field === 'cjorgName' && rowData[field] === '克拉玛依录井工程公司') {
            //   return {
            //     colSpan: 1,
            //     rowSpan: 1,
            //     content: '<span style="word-warp:break-word;word-break:break-all" >克拉玛依录井工程公司</span>',
            //     componentName: ''
            //   }
            // }
            if(field==='jujorgNam'){
            let jujorgNam=rowData[field]
            let jujorgNamList=[]
            if(jujorgNamList.indexOf(jujorgNam)==-1){
              //还没有合并该局级单位
              let num=0;  //记录这个局级单位有多少个
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

    }
</script>

<style lang="scss">
  /*解决列数据过长换行问题 v-table-body-cell*/
  .column-cell-class-name-test {
    div{
      white-space: normal !important;
      line-height: 20px !important;
    }
  }
  .column-cell-class-name-test-not-exist {
    color: #ff0000;
    div{
      white-space: normal !important;
      line-height: 20px !important;
    }
  }

.oms2-title-cell-duijiao:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 158.1px;
    top: 0;
    left: 0;
    background-color: #E3E3E3;
    display: block;
    transform: rotate(-71.57deg);
    transform-origin: top;
    -ms-transform: rotate(-71.57deg);
    -ms-transform-origin: top;
  }
  .title1{
    position: absolute;
    top: 10px;
    right:10px;
  }
  .title2{
    position: absolute;
    top: 25px;
    left:10px;
  }
  .oms2-datepicker-content{
    margin-bottom:10px;
  }
  .oms2-date-picker-monthly-input{
    width:100px !important;
    font-size: 10px;
  }
  .oms2-item-not-exict{
    color: #ff0000;
  }
</style>
