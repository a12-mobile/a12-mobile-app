<template>
    <div class="oms2-date-picker-monthly">
        <vue-datepicker-local 
            v-model="time"
            inputClass='oms2-date-picker-monthly-input'
            format="YYYY-MM" />
    </div>
</template>

<script>
    import VueDatepickerLocal from 'vue-datepicker-local'
    import {
        addDate,
        compareDate,
        getCurrentDate
    } from './../../service/utils/date/date'
    export default {
        data() {
            return {
                time:date.time
            }
        },
        props: {
            date: {
                type: Object,
                default: {
                    time:getCurrentDate()
                },
            }
        },
        watch:{
            time:function(oldDate,newDate){
                console.log("旧值"+oldDate)
                console.log("新值"+newDate)

            }

        },
        methods: {
            /**
             * 处理改变日期后的回掉
             * * oldDate  改变之前的值
             * * type 类型，start 起始日期改变  end 终止日期改变
             */
            handleChange() {
                this.$emit("change", {
                    date: this.date.time,
                })
            }
        },
        components: {
            VueDatepickerLocal
        },
    }
</script>

<style>
    .oms2-date-picker-monthly {
        margin: 10px;
    }
    .oms2-date-picker-monthly-input{
        width:100px !important;
        font-size: 10px;
    }
</style>