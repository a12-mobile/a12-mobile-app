<template>
    <div id="DrillDailyOfZH">
        <header>
            <h5>钻井综合日报</h5>
            <div class='oms2-report-float-right' style="top:40px">数据来源于集团A7中油油服钻井工作量日报</div>
            <oms2-date-picker-daily :date="date" @date-add="handleDateAdd" @date-reduce="handleDateReduce" @date-change="handleChange">
            </oms2-date-picker-daily>
        </header>
        <v-table is-horizontal-resize is-vertical-resize style="width:100%;font-size:12px" :title-row-height=20 :row-height=30 :columns="columns" :title-rows="titleRows" :table-data="tableData" :column-cell-class-name="columnCellClass" :height=tableHeight title-bg-color="#F6F6F6"
            even-bg-color="#f2f2f2" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
    </div>
</template>

<script>
    import DatePickerDaily from './../../components/datepicker/DatePickerDaily'
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
                tableHeight: 0,
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
            this.$ruixinApi.hideWebViewTitle({});
            this.tableHeight = 600
            //   this.tableHeight=window.innerHeight-10
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
                            let sgdws = ['总计', '大庆', '西部', '长城', '渤海', '川庆', '海洋']
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
                            if (this.tableData.length > 0) {
                                this.tableData = []
                            }
                        }
                    })
                    .catch((error) => {
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
                if (columnName == 'sgdw' && this.tableData[rowIndex].remark == 'Not exist') {
                    return 'oms2-item-not-exict'
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
    #DrillDailyOfZH {
        width: 600px;
        height: 400px;
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        /* IE 9 */
        -moz-transform: rotate(90deg);
        /* Firefox */
        -webkit-transform: rotate(90deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(90deg);
        /* Opera */
        transform-origin: 170px 170px;
        position: absolute;
        margin-top: 10px;
    }
    .oms2-item-not-exict {
        color: #ff0000;
    }
</style>