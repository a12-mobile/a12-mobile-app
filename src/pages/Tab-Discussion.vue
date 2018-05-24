<template>
  <div>
    <oms2-date-picker-monthly
        :date=date
        @date-add="handleAdd"
        @date-reduce="handleReduce"
        @date-change="handleChange"
    ></oms2-date-picker-monthly>
  </div>
</template>

<script>
  import DatePickerMonthly from './../components/datepicker/DatePickerMonthly'
  export default {
    data() {
      return {
        date:{
          time:'2018-05'
        }
      }
    },
    methods: {
      handleAdd(date){
        console.log("月增加一天："+date)
      },
      handleReduce(date){
        console.log("月减少一天："+date)
      },
      handleChange(date){
        console.log("新值："+date)
      },
    },
    components:{
      'oms2-date-picker-monthly':DatePickerMonthly
    }
  }
</script>

<style>

</style>