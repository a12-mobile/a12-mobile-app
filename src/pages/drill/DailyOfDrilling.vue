<template>
  <div id="dailyOfDrilling">
    <header>
      <!--<mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
      </mt-header>-->
      <!--<h4>中油油服钻井工作量日报</h4>-->
      <h5>钻井综合日报</h5>
      <div class='oms2-report-float-right' style="top:40px">数据来源于A7集团系统钻井综合日报</div>
      <oms2-date-picker-daily :date="date"
                  @date-change="handleChange">
        </oms2-date-picker-daily>
    </header>
    <v-table
      is-horizontal-resize
      is-vertical-resize
      style="width:100%;font-size:12px"
      :height="tableheight"
      :title-row-height=20
      :row-height=30
      :columns="columns"
      :title-rows="titleRows"
      :table-data="tableData"
      :column-cell-class-name="columnCellClass"
      title-bg-color="#F6F6F6"
      even-bg-color="#f2f2f2"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
    <div class='oms2-report-float-right'>数据来源于A7集团系统库钻井综合日报</div>
  </div>
</template>

<script>
  import { transToHorizontalScreen } from './../../service/utils/system/screen'
  import DatePickerDaily from './../../components/datepicker/DatePickerDaily'
  import { Indicator } from 'mint-ui';
  import timepicker from './../../components/datepicker/timepicker'
  import {getDaliyOfWorkload} from './../../service/drill/drillGetData'
  export default {
    data() {
      return {
        tableheight:0,
        date: timepicker.startTime,
        tableData: [],
        columns: [
          {field: 'sgdw', width: 80, columnAlign: 'left', isFrozen: true,isResize: true},
          {field: 'dailyDrilledFootage', width: 80, columnAlign: 'right', isResize: true},
          {field: 'cumulMonthDrilledFootage', width: 80, columnAlign: 'right', isResize: true},
          {field: 'cumulYearDrilledFootage', width: 80, columnAlign: 'right', isResize: true},
          {field: 'spuddedDayCumul', width: 50, columnAlign: 'right', isResize: true},
          {field: 'spuddedMonthCumul', width: 50, columnAlign: 'right', isResize: true},
          {field: 'spuddedYearCumul', width: 50, columnAlign: 'right', isResize: true},
          {field: 'deliverWellDay', width: 50, columnAlign: 'right', isResize: true},
          {field: 'deliverWellMonthCumul', width: 50, columnAlign: 'right', isResize: true},
          {field: 'deliverWellYearCumul', width: 50, columnAlign: 'right', isResize: true},
        ],

        titleRows: [ //第一行
          [{fields: ['sgdw'], title: '施工单位', titleAlign: 'center', rowspan: 2},
            {
              fields: ['dailyDrilledFootage', 'cumulMonthDrilledFootage', 'cumulYearDrilledFootage'],
              title: '进尺（米）',
              titleAlign: 'center',
              colspan: 3
            },
            {
              fields: ['spuddedDayCumul', 'spuddedMonthCumul', 'spuddedYearCumul'],
              title: '开钻（口）',
              titleAlign: 'center',
              colspan: 3
            },
            {
              fields: ['deliverWellDay', 'deliverWellMonthCumul', 'deliverWellYearCumul'],
              title: '完井（口）',
              titleAlign: 'center',
              colspan: 3
            },
          ],
          //第二行
          //基础信息
          [{fields: ['dailyDrilledFootage'], title: '当日', titleAlign: 'center'},
            {fields: ['cumulMonthDrilledFootage'], title: '月累', titleAlign: 'center'},
            {fields: ['cumulYearDrilledFootage'], title: '年累', titleAlign: 'center'},

            {fields: ['spuddedDayCumul'], title: '当日', titleAlign: 'center'},
            {fields: ['spuddedMonthCumul'], title: '月累', titleAlign: 'center'},
            {fields: ['spuddedYearCumul'], title: '年累', titleAlign: 'center'},

            {fields: ['deliverWellDay'], title: '当日', titleAlign: 'center'},
            {fields: ['deliverWellMonthCumul'], title: '月累', titleAlign: 'center'},
            {fields: ['deliverWellYearCumul'], title: '年累', titleAlign: 'center'}
          ]
        ],

      }
    },
    created() {
      this.requestDate();
      this.tableheight = window.innerHeight*0.94;
      // this.$ruixinApi.setWebViewTitle({ //设置导航条标题
      //   title:'钻井分井动态'
      // })
    },
    mounted(){
      transToHorizontalScreen('#dailyOfDrilling')
    },
    methods: {
      requestDate() {
        Indicator.open('加载中...')
        getDaliyOfWorkload(this.date.time)
          .then((data) => {
            Indicator.close()
            if (data) {
              this.tableData = data.body
              //检查是否含有所有地区
              let sgdws=['总计','大庆','西部','长城','渤海','川庆','海洋']
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
          return 'oms2-item-not-exict'
        }

      },
      handleChange(date) {
        this.requestDate();
      },
      //合并单位
      // cellMerge(rowIndex, rowData, field) {
      //   if (field === 'sgdw' && rowData[field] === '大庆') {
      //     return {
      //       colSpan: 1,
      //       rowSpan: 2,
      //       content: '<span >大庆钻探</span>',
      //       componentName: ''
      //     }
      //   }
      // }
    },
    components: {
      'oms2-date-picker-daily': DatePickerDaily
    },


  }
</script>

<style lang="scss">
  .oms2-item-not-exict{
    color: #ff0000;
  }
</style>



