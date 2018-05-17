<template>
    <div class="oms2-daily-date-picker">
        <button type="button" class="btn btn-sm btn-outline-primary margin" @click="handleDateReduce">前一天</button>
        <date-picker :date="date" :option="option" @change="handleChange"></date-picker>
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
     * @param {function} [change] - 选择日期后的回调函数  （参数后一天的日期  格式：yyyy-MM-dd）
     *
     * @example
     * <oms2-daily-date-picker :date="defaultDate" @date-add="handleDateAdd" @date-reduce="handleDateReduce"  @change="change"></oms2-daily-date-picker>
     * 
     * 
     *<script>
      import DailyDatePicker from './../components/DailyDatePicker'
      export default {
        data() {
          return {
            //一定要给绑定date，不然会报错
            defaultDate: {       //需要定义成这种对象的形式，因为父组件传值(对象)，子组件收到对象后可随意改变对象的属性，但不能改变对象本身。如果父组件传的不是对象，子组件直接修改父组件的值会报错。因此定义成这种形式
              time: '2018-01-01'
            }
          }
        },
        methods: {
          handleDateAdd(date) {   //与上面定义的defaultDate不同，此处参数date为String型，例如 2018-05-17
            alert("加一天:" + date)
          },
          handleDateReduce(date) {
            alert("减一天:" + date)
          },
          change(date){
            alert("选择日期的回掉："+date)
          },
        },
        components: {
          'oms2-daily-date-picker': DailyDatePicker
        }
      }
     < /script>
     */
    import myDatepicker from 'vue-datepicker'
    import {
        addDate,
        compareDate,
        getCurrentDate
    } from './../assets/js/date'
    import {
        Toast
    } from "mint-ui"
    export default {
        name: 'DailyDatePicker',
        data() {
            return {
                currentDate: getCurrentDate(),
                option: {
                    type: 'day',
                    week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    format: 'YYYY-MM-DD',
                    placeholder: '选择时间',
                    inputStyle: {
                        'display': 'inline-block',
                        'padding': '6px',
                        'line-height': '22px',
                        'font-size': '16px',
                        'border': '2px solid #fff',
                        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                        'border-radius': '2px',
                        'color': '#5F5F5F',
                        'width': '100px'
                    },
                    color: {
                        header: '#3F51B5',
                        headerText: '#fff'
                    },
                    buttons: {
                        ok: '确定',
                        cancel: '取消'
                    },
                    overlayOpacity: 0.5, // 0.5 as default
                    dismissible: true // as true as default
                },
            }
        },
        props: {
            date: {
                type: Object,
                default: {
                    time: getCurrentDate()
                }
            }
        },
        methods: {
            /**
             * 后一天回调函数
             */
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
                this.$emit("date-add", this.date.time)
            },
            /**
             * 前一天回调函数
             */
            handleDateReduce() {
                this.date.time = addDate(this.date.time, -1)
                this.$emit("date-reduce", this.date.time)
            },
            /**
             * 选择日期回调函数
             */
            handleChange(time) {
                this.$emit("change", time)
            }
        },
        components: {
            'date-picker': myDatepicker
        },
    }
</script>

<style>
    .oms2-daily-date-picker {
        margin: 10px;
    }
    .margin {
        padding-left: 20px;
        padding-right: 20px;
        margin-left: 10px;
        margin-right: 10px;
    }
</style>