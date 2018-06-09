<template>
  <div id="dRDailyOfRigDynamic">
    <header>
      <!--<mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
      </mt-header>-->
      <!--<h4>钻机动态日报</h4>-->
      <p>钻机动态日报</p>
      <div class='oms2-report-float-right' style="top:40px">数据来源于A7集团系统钻机动态日报</div>
      <oms2-date-picker-daily :date="date"
                              @date-change="handleChange">
      </oms2-date-picker-daily>
    </header>
    <v-table
      is-horizontal-resize
      is-vertical-resize
      style="width:100%;font-size:12px"
      :height="tableheight"
      :title-row-height=40
      :row-height=30
      :columns="columns"
      :title-rows="titleRows"
      :table-data="tableData"
      :cellMerge="cellMerge"
      :column-cell-class-name="columnCellClass"
      title-bg-color="#F6F6F6"
      even-bg-color="#f2f2f2"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
    <!--<div class='oms2-report-float-right'>数据来源于A7集团系统库钻机动态日报</div>-->
  </div>
</template>

<script>
    import { transToHorizontalScreen } from './../../service/utils/system/screen'
    import DatePickerDaily from './../../components/datepicker/DatePickerDaily'
    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import {getDaliyOfRigDynamic} from './../../service/drill/drillGetData'
    export default {
      data() {
        return {
          date: timepicker.startTime,
          tableheight:0,
          tableData: [],
          columns: [
            {field: 'sgdw', width: 60, columnAlign: 'left', isFrozen: true,isResize: true},
            {field: 'rigTotal', width: 40, columnAlign: 'right', isResize: true},
            {field: 'workStop', width: 40, columnAlign: 'right', isResize: true},
            {field: 'complex', width: 40, columnAlign: 'right', isResize: true},
            {field: 'accident', width: 40, columnAlign: 'right', isResize: true},
            {field: 'removal', width: 40, columnAlign: 'right', isResize: true},
            {field: 'moveto', width: 40, columnAlign: 'right', isResize: true},
            {field: 'wellFinsh', width: 40, columnAlign: 'right', isResize: true},
            {field: 'drilling', width: 40, columnAlign: 'right', isResize: true},
            {field: 'overhaul', width: 40, columnAlign: 'right', isResize: true},
            {field: 'sidetrack', width: 40, columnAlign: 'right', isResize: true},
            {field: 'testNum', width: 40, columnAlign: 'right', isResize: true},
            {field: 'productionStop', width: 40, columnAlign: 'right', isResize: true},
            {field: 'otherNum', width: 40, columnAlign: 'right', isResize: true},
            {field: 'movedown', width: 40, columnAlign: 'right', isResize: true},
            {field: 'minorRepair', width: 40, columnAlign: 'right', isResize: true},
            {field: 'mlog', width: 40, columnAlign: 'right', isResize: true},
            {field: 'wellCementation', width: 40, columnAlign: 'right', isResize: true},
            {field: 'assist', width: 40, columnAlign: 'right', isResize: true},
            {field: 'rigTest', width: 70, columnAlign: 'right', isResize: true},
          ],

          titleRows: [ //第一行
            [
              {fields: ['sgdw'], title: '施工单位', titleAlign: 'center', rowspan: 1},
              {fields: ['rigTotal'], title: '钻机总数', titleAlign: 'center', rowspan:1},
              {fields: ['workStop'], title: '停工数量', titleAlign: 'center', rowspan:1},
              {fields: ['complex'], title: '复杂数量', titleAlign: 'center', rowspan:1},
              {fields: ['accident'], title: '事故数量', titleAlign: 'center', rowspan: 1},
              {fields: ['removal'], title: '搬迁数量', titleAlign: 'center', rowspan:1},
              {fields: ['moveto'], title: '搬安数量', titleAlign: 'center', rowspan: 1},
              {fields: ['wellFinsh'], title: '完井数量', titleAlign: 'center', rowspan:1},
              {fields: ['drilling'], title: '钻进数量', titleAlign: 'center', rowspan:1},
              {fields: ['overhaul'], title: '大修数量', titleAlign: 'center', rowspan:1},
              {fields: ['sidetrack'], title: '侧钻数量', titleAlign: 'center', rowspan: 1},
              {fields: ['testNum'], title: '测试数量', titleAlign: 'center', rowspan: 1},
              {fields: ['productionStop'], title: '停产数量', titleAlign: 'center', rowspan: 1},
              {fields: ['otherNum'], title: '其他数量', titleAlign: 'center', rowspan: 1},
              {fields: ['movedown'], title: '拆搬数量', titleAlign: 'center', rowspan: 1},
              {fields: ['minorRepair'], title: '小修数量', titleAlign: 'center', rowspan: 1},
              {fields: ['mlog'], title: '测井数量', titleAlign: 'center', rowspan: 1},
              {fields: ['wellCementation'], title: '固井数量', titleAlign: 'center', rowspan: 1},
              {fields: ['assist'], title: '辅助数量', titleAlign: 'center', rowspan: 1},
              {fields: ['rigTest'], title: '原钻机试油数量', titleAlign: 'center', rowspan: 1},
            ]
          ],
        }
      },
      created() {
        this.requestDate();
        this.tableheight=window.innerHeight*0.94;
        this.$ruixin.hideWebViewTitle({});
      },
      mounted(){
        transToHorizontalScreen('#dRDailyOfRigDynamic')
      },
      methods: {
        requestDate() {
          Indicator.open('加载中...')
          getDaliyOfRigDynamic(this.date.time)
            .then((data) => {
              Indicator.close()
              if (data) {
                this.tableData = data.body
                //检查是否含有所有地区
                let sgdws=['合计','大庆','西部','长城','渤海','川庆','海洋']
                let sgdwsFromDate=[]
                for(var date of this.tableData){
                  sgdwsFromDate.push(date.sgdw)
                }
                for(var sgdw of sgdws){
                  if(!sgdwsFromDate.includes(sgdw)){
                    //不存在需要添加
                    let newItem={
                      sgdw:sgdw,
                      remark:'Not exist'
                    }
                    this.tableData.push(newItem)
                  }
                }
                //排序
                this.tableData.sort((pre,next)=>{
                    let preIndex=sgdws.indexOf(pre.sgdw)
                    let nextIndex=sgdws.indexOf(next.sgdw)
                    return preIndex-nextIndex
                })
              } else {
                this.tableData = []
              }
            })
            .catch(function (error) {
              Indicator.close()
              console.log(error)
            })
        },
        handleBack() {
          if (Indicator) {
            Indicator.close()
          }
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },

        //设置列单元格样式
        columnCellClass(rowIndex, columnName, rowData) {
          if(columnName=='sgdw'&&this.tableData[rowIndex].remark=='Not exist'){
            return 'oms2-item-not-exist'
          }

        },
        handleChange(date) {
          this.requestDate();
        },
        //合并单位
        cellMerge(rowIndex, rowData, field) {
          if (field === 'sgdw' && rowData[field] === '大庆') {
            return {
              colSpan: 1,
              rowSpan: 1,
              content: '大庆钻探',
              componentName: ''
            }
          }else if (field === 'sgdw' && rowData[field] === '西部') {
            return {
              colSpan: 1,
              rowSpan: 1,
              content: '西部钻探',
              componentName: ''
            }
          }else if (field === 'sgdw' && rowData[field] === '长城') {
            return {
              colSpan: 1,
              rowSpan: 1,
              content: '长城钻探',
              componentName: ''
            }
          }else if (field === 'sgdw' && rowData[field] === '渤海') {
            return {
              colSpan: 1,
              rowSpan: 1,
              content: '渤海钻探',
              componentName: ''
            }
          }else if (field === 'sgdw' && rowData[field] === '川庆') {
            return {
              colSpan: 1,
              rowSpan: 1,
              content: '川庆钻探',
              componentName: ''
            }
          }else if (field === 'sgdw' && rowData[field] === '海洋') {
            return {
              colSpan: 1,
              rowSpan: 1,
              content: '海洋工程',
              componentName: ''
            }
          }else if (field === 'sgdw' && rowData[field] === '中油') {
            return {
              colSpan: 1,
              rowSpan: 1,
              content: '中油测井',
              componentName: ''
            }
          }
        }
      },
      components: {
        'oms2-date-picker-daily': DatePickerDaily
      },
    }
</script>

<style lang="scss" scoped>
  .oms2-icon{
    margin-left:20px;
    margin-right:20px;
    font-size:18px;
  }
</style>
