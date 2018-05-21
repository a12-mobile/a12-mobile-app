<template>
    <div class="oms2-date-picker-monthly componentClass" @click="click">
        <!-- <span class='oms2-span-title'>统计日期：</span> -->
        <slot></slot>
        <date-picker 
          :date="startDate" 
          :option="option"
          :limit="startLimit"
          @change="handleChange('start')"
          ></date-picker>
          <span>--</span>

        <date-picker 
          :date="endDate" 
          :option="option"
          :limit="endLimit"
          @change="handleChange('end')"
          ></date-picker>
    </div>
</template>

<script>
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
        name: 'DatePickerMonthly',
        data() {
            return {
                startDateCopy:{
                    time:""
                },
                endDateCopy:{
                    time:""
                },
                option: {
                    type: 'day',
                    week: ['一', '二', '三', '四', '五', '六', '日'],
                    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format: 'YYYY-MM-DD',
                    placeholder: '选择时间',
                    inputClass:'oms2-date-picker',
                    inputStyle: {
                        'display': 'inline-block',
                        'padding': '2px',
                        'line-height': '12px',
                        'font-size': '12px',
                        'border': '2px solid #fff',
                        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                        'border-radius': '2px',
                        'color': '#5F5F5F',
                        'width': '80px'
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
                startLimit: [
                    {
                        type: 'fromto',
                        from: addDate(this.limitStartDate, -1),
                        to: addDate(this.limitEndDate, 1)
                    }
                ],
                endLimit:[
                    {
                        type: 'fromto',
                        from: addDate(this.limitStartDate, -1),
                        to: addDate(this.limitEndDate, 1)
                    }
                ]
            }
        },
        props: {
            startDate: {
                type: Object,
                default: {
                    time: getCurrentDate()
                }
            },
            endDate:{
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
            componentClass:{
                type:String,
            }
        },
        methods: {
            /**
             * 当点击组件时记录下当前的起始日期和终止日期，用于日期选错后显示之前的日期
             */
            click(){
                this.startDateCopy.time=this.startDate.time
                this.endDateCopy.time=this.endDate.time
            },
            /**
             * 处理改变日期后的回掉
             * * oldDate  改变之前的值
             * * type 类型，start 起始日期改变  end 终止日期改变
             */
            handleChange(type){
                let compare = compareDate(this.startDate.time, this.endDate.time)
                if(compare>=0){
                    if(type=='start'){
                        this.startDate.time=this.startDateCopy.time;
                    }else if(type=='end'){
                        this.endDate.time=this.endDateCopy.time;
                    }
                    Toast({
                        message: '起始时间必须小于终止时间',
                        position: 'bottom',
                        duration: 3000,
                    })
                }else{
                    this.$emit("change", {
                        startDate:this.startDate.time,
                        endDate:this.endDate.time,
                    })
                }

            }
            
        },
        components: {
            'date-picker': myDatepicker
        },
    }
</script>

<style>
    .oms2-date-picker-monthly {
        margin: 10px;
        text-align:left;
        margin-left:10px;
    }
    .oms2-date-picker{
        padding:0px !important;
        border:none !important;
        font-size:10px;

    }
</style>