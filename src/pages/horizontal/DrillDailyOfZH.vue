<template>
    <div id="horizontal">
        <i @click='handleBack' class='fa fa-arrow-left oms2-g-horizontal-back'></i>
        <header>
            <h5>钻井综合日报</h5>
            <div class='oms2-g-report-float-right' style="top:40px">数据来源于A7集团系统钻井工作量日报</div>
            <oms2-date-picker-daily :date="date" @date-change="handleChange">
            </oms2-date-picker-daily>
        </header>
            <v-table is-horizontal-resize is-vertical-resize style="width:100%;font-size:12px" :title-row-height=20 :row-height=30 :columns="columns" :title-rows="titleRows" :table-data="tableData" :column-cell-class-name="columnCellClass" :height=tableHeight  title-bg-color="#F6F6F6"
                even-bg-color="#f2f2f2" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
    </div>
</template>

<script>
    
    import DatePickerDaily from './../../components/datepicker/DatePickerDaily'
    import {transToHorizontalScreen} from './../../service/utils/system/screen'
    import {
        Indicator
    } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import {
        getDaliyOfWorkload
    } from './../../service/drill/drillGetData'
    export default {
        data() {
            return {
                date: timepicker.startTime,
                tableData: [],
                tableHeight: 1000,
                columns: [{
                        field: 'sgdw',
                        width: 60,
                        columnAlign: 'left',
                        isFrozen: true,
                        isResize: true
                    },
                    {
                        field: 'dailyDrilledFootage',
                        width: 60,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'cumulMonthDrilledFootage',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'cumulYearDrilledFootage',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'spuddedDayCumul',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'spuddedMonthCumul',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'spuddedYearCumul',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'deliverWellDay',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'deliverWellMonthCumul',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'deliverWellYearCumul',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                ],
                titleRows: [ //第一行
                    [{
                            fields: ['sgdw'],
                            title: '施工单位',
                            titleAlign: 'center',
                            rowspan: 2
                        },
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
                    [{
                            fields: ['dailyDrilledFootage'],
                            title: '当日',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['cumulMonthDrilledFootage'],
                            title: '月累',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['cumulYearDrilledFootage'],
                            title: '年累',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['spuddedDayCumul'],
                            title: '当日',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['spuddedMonthCumul'],
                            title: '月累',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['spuddedYearCumul'],
                            title: '年累',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['deliverWellDay'],
                            title: '当日',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['deliverWellMonthCumul'],
                            title: '月累',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['deliverWellYearCumul'],
                            title: '年累',
                            titleAlign: 'center'
                        }
                    ]
                ],
            }
        },
        created() {
            this.requestDate()
            this.$ruixin.hideWebViewTitle({});
            this.tableHeight = window.innerHeight*0.94
        },
        mounted(){
            transToHorizontalScreen("#horizontal")
        },
        methods: {
            requestDate() {
                Indicator.open('加载中...')
                getDaliyOfWorkload(this.date.time)
                    .then((data) => {
                        Indicator.close()
                        if (data.body) {
                            this.tableData = data.body
                            //检查是否含有所有地区
                            let sgdws = ['总计', '大庆钻探', '西部钻探', '长城钻探', '渤海钻探', '川庆钻探', '海洋钻探']
                            let sgdwsFromDate = []
                            for (var date of this.tableData) {
                                sgdwsFromDate.push(date.sgdw)
                            }
                            for (var sgdw of sgdws) {
                                if (!sgdwsFromDate.includes(sgdw)) {
                                    //不存在需要添加
                                    let newItem = {
                                        sgdw: sgdw,
                                        remark: 'Not exist'
                                    }
                                    this.tableData.push(newItem)
                                }
                            }
                            //排序
                            this.tableData.sort((pre, next) => {
                                let preIndex = sgdws.indexOf(pre.sgdw)
                                let nextIndex = sgdws.indexOf(next.sgdw)
                                return preIndex - nextIndex
                            })
                        } else {
                            // alert("成功但失败")
                            if (this.tableData.length > 0) {
                                this.tableData = []
                            }
                        }
                    })
                    .catch((error) => {
                        // alert('失败')
                        Indicator.close()
                        if (this.tableData.length > 0) {
                            this.tableData = []
                        }
                    })
            },
            handleBack() {
                if (Indicator) {
                    Indicator.close()
                }
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
                this.$ruixin.closePage({});
            },
            
            //设置列单元格样式
            columnCellClass(rowIndex, columnName, rowData) {
                if (columnName == 'sgdw' && this.tableData[rowIndex].remark == 'Not exist') {
                    return 'oms2-g-item-not-exist'
                }
            },
            handleChange(date) {
                this.requestDate();
            },
        },
        components: {
            'oms2-date-picker-daily': DatePickerDaily
        },
    }
</script>

<style lang="scss">
    #horizontal{
        .cov-date-body{
            height:300px!important;
                font-size: 14px;
        }
        .cov-date-body[data-v-2537a1f8]{
            top:25%;
        }
        .cov-date-monthly > div[data-v-2537a1f8]{
            height:80px !important;

        }
        .cov-date-caption[data-v-2537a1f8]{
            padding:0px !important;
        }
        .cov-picker-box[data-v-2537a1f8]{
            padding:10px !important;

        }
        .day[data-v-2537a1f8]{
            height:28px !important;
        }
        .cov-date-monthly[data-v-2537a1f8]{
            height:auto !important;
        }
    }
    .oms2-g-item-not-exist {
        color: #ff0000;
    }
</style>