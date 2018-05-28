<template>
  <div>
    <header>
      <!--<mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
      </mt-header>-->
      <h4>中油油服钻井工作量日报</h4>
      <oms2-date-picker-daily :date="date"
                  @date-add="handleDateAdd"
                  @date-reduce="handleDateReduce"
                  @date-change="handleChange">
        </oms2-date-picker-daily>
    </header>
    <v-table
      is-horizontal-resize
      is-vertical-resize
      style="width:98%;margin-left:1%;font-size:12px"
      :title-row-height=20
      :row-height=30
      :columns="columns"
      :title-rows="titleRows"
      :table-data="tableData"
      :multiple-sort="multipleSort"
      title-bg-color="#F6F6F6"
      even-bg-color="#f2f2f2"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
  </div>
</template>

<script>
  import DatePickerDaily from './../../components/datepicker/DatePickerDaily'
  import { Indicator } from 'mint-ui';
  import timepicker from './../../components/datepicker/timepicker'
  import {getDaliyOfWorkload} from './../../service/drill/drillGetData'
  export default {
    data() {
      return {
        date: timepicker.startTime,
        tableData: [],
        multipleSort:false,
        columns: [
          {field: 'sgdw', width: 80, columnAlign: 'center', isFrozen: true, orderBy:'asc',isResize: true},
          {field: 'dailyDrilledFootage', width: 70, columnAlign: 'right', isResize: true},
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
    },
    methods: {
      requestDate() {
        Indicator.open('加载中...')
        getDaliyOfWorkload(this.date.time)
          .then((data) => {
            Indicator.close()
            if (data) {
              this.tableData = data.body
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
      handleDateAdd(param) {
        if (param.canAdd) {
          this.requestDate();
        }
      },
      handleDateReduce(param) {
        if (param.canReduce) {
          this.requestDate();
        }
      },
      //设置列单元格样式
      columnCellClass(rowIndex, columnName, rowData) {
        // if (columnName === 'shigongdanwei' || columnName === 'duihao' || columnName === 'jinghao') {
        //   //return 'wu-column-cell-fixed'
        // }

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
      //   } else if (field === 'sgdw' && rowData[field] === '西部') {
      //     return {
      //       colSpan: 1,
      //       rowSpan: 2,
      //       content: '<span >西部钻探</span>',
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

<style>

</style>



