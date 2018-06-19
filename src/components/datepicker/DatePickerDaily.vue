<template>
    <div class="oms2-date-picker-daily">
        <slot></slot>
        <a class="oms2-icon-left" @click="handleDateReduce"><i class="fa fa-chevron-left"></i></a>
        <date-picker :date="date" :option="option" @change="handleChange" :limit="limit"></date-picker>
        <a class="oms2-icon-right" @click="handleDateAdd"><i class="fa fa-chevron-right"></i></a>
    </div>
</template>

<script>
    /**
     * oms2-date-picker-daily
     * @module components/DatePickerDaily
     * @desc 日报时间选择
     * @param {object} [defaultDate] - 输入框默认显示的日期
     * @param {string} [limitStartDate] - 时间选择限制的起始日期   默认 2000-01-01 （包含2000-01-01当天）
     * @param {string} [limitEndDate] - 时间选择限制的终止日期   默认为当前日期 (包含当天日期)
     * @param {function} [handleChange] - 日期改变后的回调函数  （参数后一天的日期  格式：yyyy-MM-dd）
     *
     * 
     * Props:
     *   @param {Object}  date 日期 对象中包含一个time类型的属性，time为String型 日期的格式  如'2018-01-01'
     *   @param {String}  limitStartDate 限制起始日期  日期的格式  如'2018-01-01'
     *   @param {String}  limitEndDate 限制结束日期  日期的格式  如'2018-01-01'
     *   @param {Boolean}  hiddenButton 是否显示前一天，后一天按钮
     * 
     * 
     * 事件：
     *   @param {function}  date-change 改变日期回掉函数 
     * 
     * 
     * date: {
                type: Object,
                default: {
                    time: getCurrentDate()
                }
            },
            limitStartDate:{
                type:String,
                default:'2000-01-01'
            },
            limitEndDate:{
                type:String,
                default:getCurrentDate()
            },
            hiddenButton:{
                type:Boolean,
                default:false,
            }
     * 
     * @example
     * <oms2-daily-date-picker :date="defaultDate" :limitStartDate="limitStartDate" :limitEndDate="limitEndDate" @date-change="handleChange"></oms2-daily-date-picker>
     * 
     * 
     *<script>
      import DatePickerDaily from './../components/DatePickerDaily'
      export default {
        data() {
          return {
            //一定要给绑定date，不然会报错
            defaultDate: {       //需要定义成这种对象的形式，因为父组件传值(对象)，子组件收到对象后可随意改变对象的属性，但不能改变对象本身。如果父组件传的不是对象，子组件直接修改父组件的值会报错。因此定义成这种形式
              time: '2018-01-01'
            },
            limitStartDate:"2001-01-01",
            limitEndDate:"2018-01-01",
          }
        },
        methods: {
          handleChange(date){
            console.log("选择日期的回掉结果："+date)
          },
        },
        components: {
          'oms2-date-picker-daily': DatePickerDaily
        }
      }
     < /script>
     */
    import myDatepicker from 'vue-datepicker'
    import {
        addDate,
        compareDate,
        getCurrentDate
    } from './../../service/utils/date/date'
    import {
        Toast
    } from "mint-ui"
    export default {
        name: 'DatePickerDaily',
        data() {
            return {
                currentDate: getCurrentDate(),
                option: {
                    type: 'day',
                    week: ['一', '二', '三', '四', '五', '六', '日'],
                    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format: 'YYYY-MM-DD',
                    placeholder: '选择时间',
                    inputStyle: {
                        'display': 'inline-block',
                        'padding': '3px',
                        'line-height': '22px',
                        'text-align':'center',
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
                        // ok: '确定',
                        // cancel: '取消'
                    },
                    overlayOpacity: 0.5, // 0.5 as default
                    dismissible: true // as true as default
                },
                limit: [
                    {
                        type: 'fromto',
                        from: addDate(this.limitStartDate, -1),
                        to: addDate(this.limitEndDate, 1)
                    }
                ]
            }
        },
        props: {
            date: {
                type: Object,
                default: {
                    time: getCurrentDate()
                }
            },
            limitStartDate:{
                type:String,
                default:'2000-01-01'
            },
            limitEndDate:{
                type:String,
                default:getCurrentDate()
            },
            hiddenButton:{
                type:Boolean,
                default:false,
            }
        },
        methods: {
            /**
             * 后一天回调函数
             */
            handleDateAdd() {
                let compare = compareDate(this.date.time, this.limitEndDate)
                if (compare >= 0) {
                    Toast({
                        message: '最终时间为：'+this.limitEndDate,
                        position: 'bottom',
                        duration: 3000,
                    })
                } else {
                    this.date.time = addDate(this.date.time, 1)
                    this.$emit("date-change",this.date.time)
                }
            },
            /**
             * 前一天回调函数
             */
            handleDateReduce() {
                let compare = compareDate(this.limitStartDate,this.date.time)
                if (compare >= 0) {
                    Toast({
                        message: '最早时间为：'+this.limitStartDate,
                        position: 'bottom',
                        duration: 3000,
                    })
                } else {
                    this.date.time = addDate(this.date.time, -1)
                    this.$emit("date-change",this.date.time)
                }
            },
            /**
             * 选择日期回调函数
             */
            handleChange(time) {
                let compare = compareDate(this.date.time, this.currentDate)
                if (compare >= 0) {
                    this.date.time=this.currentDate
                    Toast({
                        message: '最新日期为：'+this.currentDate,
                        position: 'bottom',
                        duration: 3000,
                    })
                }
                this.$emit("date-change", time)
            }
        },
        components: {
            'date-picker': myDatepicker
        },
    }
</script>

<style>
    .oms2-date-picker-daily {
        padding-top: 10px;
        padding-bottom: 5px;
        text-align: center;
    }
    .oms2-icon-left{
        margin-right:15px;
        font-size:18px;
    }
    .oms2-icon-right{
        margin-left:15px;
        font-size:18px;
    }
    .margin {
        padding-left: 20px;
        padding-right: 20px;
        margin-left: 10px;
        margin-right: 10px;
    }
</style>