<template>
  <div>
    <header>
      <mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" icon="back">返回</mt-button>
      </mt-header>
    </header>
    <v-table
      is-horizontal-resize
      style="width:100%"
      :columns="columns"
      :title-rows="titleRows"
      :table-data="tableData"
      even-bg-color="#f2f2f2"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        columns: [
          {field: 'company', width: 50, columnAlign: 'center', isFrozen: true, isResize: true},
          {field: 'day_progress', width: 50, columnAlign: 'center', isResize: true},
          {field: 'month_progress', width: 50, columnAlign: 'center', isResize: true},
          {field: 'year_progress', width: 70, columnAlign: 'center', isResize: true},
          {field: 'day_drilling', width: 70, columnAlign: 'center', isResize: true},
          {field: 'month_drilling', width: 70, columnAlign: 'center', isResize: true},
          {field: 'year_drilling', width: 70, columnAlign: 'center', isResize: true},
          {field: 'day_drilled', width: 70, columnAlign: 'center', isResize: true},
          {field: 'month_drilled', width: 70, columnAlign: 'center', isResize: true},
          {field: 'year_drilled', width: 70, columnAlign: 'center', isResize: true},
        ],

        titleRows: [ //第一行
          [{fields: ['company'], title: '施工单位', titleAlign: 'center', rowspan: 2},
            {
              fields: ['day_progress', 'month_progress', 'year_progress'],
              title: '进尺（米）',
              titleAlign: 'center',
              colspan: 3
            },
            {
              fields: ['day_drilling', 'month_drilling', 'year_drilling'],
              title: '开钻（口）',
              titleAlign: 'center',
              colspan: 3
            },
            {
              fields: ['day_drilled', 'month_drilled', 'year_drilled'],
              title: '完井（口）',
              titleAlign: 'center',
              colspan: 3
            },
          ],
          //第二行
          //基础信息
          [{fields: ['day_progress'], title: '当日', titleAlign: 'center'},
            {fields: ['month_progress'], title: '月累', titleAlign: 'center'},
            {fields: ['year_progress'], title: '年累', titleAlign: 'center'},

            {fields: ['day_drilling'], title: '当日', titleAlign: 'center'},
            {fields: ['month_drilling'], title: '月累', titleAlign: 'center'},
            {fields: ['year_drilling'], title: '年累', titleAlign: 'center'},

            {fields: ['day_drilled'], title: '当日', titleAlign: 'center'},
            {fields: ['month_drilled'], title: '月累', titleAlign: 'center'},
            {fields: ['year_drilled'], title: '年累', titleAlign: 'center'}
          ]
        ],
        tableData: [
          {
            "company": "长城",
            "day_progress": "111",
            "month_progress": "123",
            "year_progress": "123",
            "day_drilling": "12312",
            "month_drilling": "1111",
            "year_drilling": "11",
            "day_drilled": "11",
            "month_drilled": "11",
            "year_drilled": "11"
          },
          {
            "company": "渤海",
            "day_progress": "111",
            "month_progress": "123",
            "year_progress": "123",
            "day_drilling": "12312",
            "month_drilling": "1111",
            "year_drilling": "11",
            "day_drilled": "11",
            "month_drilled": "11",
            "year_drilled": "11"
          },
          {
            "company": "西部",
            "day_progress": "111",
            "month_progress": "123",
            "year_progress": "123",
            "day_drilling": "12312",
            "month_drilling": "1111",
            "year_drilling": "11",
            "day_drilled": "11",
            "month_drilled": "11",
            "year_drilled": "11"
          },
          {
            "company": "川庆",
            "day_progress": "111",
            "month_progress": "123",
            "year_progress": "123",
            "day_drilling": "12312",
            "month_drilling": "1111",
            "year_drilling": "11",
            "day_drilled": "11",
            "month_drilled": "11",
            "year_drilled": "11"
          },
        ],
      }
    }
  }
</script>

<style>

</style>



