<template>
    <div class="oms2-date-picker-monthly">
        <a class="oms2-icon" @click="handleMonthReduce"><i class="fa fa-chevron-left"></i></a>
        <vue-datepicker-local 
            v-model="time" 
            inputClass='oms2-date-picker-monthly-input' 
            format="YYYY-MM" />
        <a class="oms2-icon" @click="handleMonthAdd"><i class="fa fa-chevron-right"></i></a>
    </div>
</template>

<script>
    /**
     * * oms2-date-picker-monthly
     * @module components/DatePickerMonthly
     * @desc 日报时间选择
     * @param {object} [defaultDate] - 输入框默认显示的日期
     * @param {function} [handleReduce] - 减一天的回掉函数  （参数前一天的日期  格式：yyyy-MM-dd）
     * @param {function} [handleAdd] - 加一个月的回掉函数  （参数后一天的日期  格式：yyyy-MM-dd）
     * @param {function} [handleChange] - 选择日期后的回调函数  （参数后一天的日期  格式：yyyy-MM-dd）
     * 
     * 注意：无论是加一个月还是减一个月都会调用date-change事件，所以可以把请求方法写在handleChange中
     *
     * 
     * 
     * example
     * 
  <template>
  <div>
    <oms2-date-picker-monthly
        :date=defaultDate
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
        defaultDate:{
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
    < /script>
     * 
     * 
     */
    import {
        Toast
    } from "mint-ui"
    import VueDatepickerLocal from 'vue-datepicker-local'
    import { formatDate,addMonth } from './../../service/utils/date/date'
    import {
        addDate,
        compareDate,
        getCurrentDate
    } from './../../service/utils/date/date'
    export default {
        name: 'DatePickerMonthly',
        data() {
            return {
                time:new Date(this.date.time)
            }
        },
        props: {
            date:{
                type:Object,
                default:{
                    time:getCurrentDate()
                }
            }
        },
        watch: {
            /**
             * 处理改变日期后的回掉
             * * oldDate  改变之前的值
             */
            time: function(newDate, oldDate) {
                let compare = compareDate(this.time, formatDate(new Date(),'yyyy-MM'))
                if (compare > 0) {
                    this.time=new Date(formatDate(new Date(),'yyyy-MM'))
                    Toast({
                        message: '尚未到达该月份',
                        position: 'bottom',
                        duration: 3000,
                    })
                } else {
                }
                this.date.time=formatDate(this.time,"yyyy-MM")
                this.$emit('date-change',formatDate(newDate,"yyyy-MM"))
            }
        },
        methods: {
            //减少一个月的回掉
            handleMonthReduce(){
                this.time=new Date(addMonth(this.time,-1))
                this.date.time=formatDate(this.time,"yyyy-MM")
                this.$emit("date-reduce",this.date.time)
            },
            //增加一个月的回掉
            handleMonthAdd(){
                let compare = compareDate(this.date.time, formatDate(new Date(),'yyyy-MM'))
                if (compare >= 0) {
                    Toast({
                        message: '不能再增加月',
                        position: 'bottom',
                        duration: 3000,
                    })
                } else {
                    this.time=new Date(addMonth(this.time,1))
                    this.date.time=formatDate(this.time,"yyyy-MM")
                    this.$emit("date-add",this.date.time)
                }
            },
        },
        components: {
            VueDatepickerLocal
        },
    }
</script>

<style scoped>
    .oms2-date-picker-monthly {
        padding: 10px;
        text-align: center;
    }
    .oms2-date-picker-monthly-input {
        width: 100px !important;
        font-size: 10px;
    }
    .oms2-icon{
        margin-left:20px;
        margin-right:20px;
        font-size:18px;
    }
</style>