<template>
    <div class="oms2-daily-date-picker">
        <button type="button" class="btn btn-sm btn-outline-primary margin" @click="handleDateReduce">前一天</button>
        <date-picker :date="date" :option="option"></date-picker>
        <button type="button" class="btn btn-sm btn-outline-primary margin" @click="handleDateAdd">后一天</button>
    </div>
</template>

<script>
/**
 * oms2-daily-date-picker
 * @module components/DailyDatePicker
 * @desc 日报时间选择
 * @param {function} [handleDateReduce] - 前一天的回掉函数  （参数前一天的日期  格式：yyyy-MM-dd）
 * @param {function} [handleDateAdd] - 后一天的回掉函数  （参数后一天的日期  格式：yyyy-MM-dd）
 *
 * @example
 * <oms2-daily-date-picker @date-add="handleDateAdd" @date-reduce="handleDateReduce"></oms2-daily-date-picker>
 * 
 * 
 * <script>
 *     import DailyDatePicker from './../components/DailyDatePicker'
 *     export default{
 *         methods: {
              handleDateAdd(date){
                  alert("加一天:"+date)
              },
              handleDateReduce(date){
                  alert("减一天:"+date)
              }
           },
           components:{
              'oms2-daily-date-picker':DailyDatePicker
           }
 *     }
 * < /script>
 */

    import timepicker from './../assets/js/timepicker'
    import myDatepicker from 'vue-datepicker'
    import { addDate, compareDate, getCurrentDate } from './../assets/js/date'
    import { Toast } from "mint-ui"
    export default {
        name: 'DailyDatePicker',
        data() {
            return {
                date: timepicker.startTime,
                currentDate: getCurrentDate(),
                option: timepicker.option,
            }
        },
        methods: {
            handleDateAdd() {
                let compare = compareDate(this.date.time, this.currentDate)
                if (compare >= 0) {
                    Toast({
                        message: '当前为最新日期',
                        position: 'bottom',
                        duration: 3000,
                    })
                } else {
                    this.date.time = addDate(this.date.time, 1)
                }
                this.$emit("date-add",this.date.time)
            },
            handleDateReduce() {
                this.date.time = addDate(this.date.time, -1)
                this.$emit("date-reduce",this.date.time)
            },
        },
        components:{
            'date-picker': myDatepicker
        }
    }
</script>

<style>
    .daily-date-picker{
        margin:10px;
    }
    .margin{
        padding-left:20px;
        padding-right:20px;
        margin-left:10px;
        margin-right:10px;
    }

</style>