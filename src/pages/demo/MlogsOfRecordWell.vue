<template>
    <div class='mlogs'>
        <!--<h4>录井分队日报</h4>-->
        <!--引入日期控件-->
        <div class="oms2-fixed">
            <oms2-date-picker-daily :date="date" @date-change="handleChange">
            </oms2-date-picker-daily>
        </div>
        <div class="main-body" ref="wrapper" :style="{'-webkit-overflow-scrolling': scrollMode,'overflow':'auto',height: wrapperHeight + 'px'}">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <div class="oms2-table-content">
                    <v-table is-horizontal-resize style="width:100%;font-size:12px" :title-row-height=30 :row-height=30 :columns="columns" :table-data="tableData" :title-rows="titleRows" row-hover-color="#eee" row-click-color="#edf7ff" even-bg-color="#f4f4f4" title-bg-color="#F6F6F6"></v-table>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import DatePickerDaily from './../../components/datepicker/DatePickerDaily' //导入日期控件
    import {
        Indicator
    } from 'mint-ui'; //导入加载动画插件
    import timepicker from './../../components/datepicker/timepicker' //导入时间插件，获取当前时间
    import {
        getDailyOfMlogByPage
    } from './../../service/mlog/mlogGetData' //导入axios封装函数，包含请求后台路径
    export default {
        data() {
            return {
                searchCondition: { //分页属性  
                    pageNo: 1,
                    pageSize: 30
                },
                wrapperHeight: 0,
                allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了  
                scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
                date: timepicker.startTime,
                tableData: [],
                baseData: [],
                columns: [{
                        field: 'jujname',
                        width: 60,
                        columnAlign: 'left',
                        isResize: true,
                        isFrozen: true
                    },
                    {
                        field: 'serialNum',
                        width: 30,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        formatter: function(rowData, index) {
                            return index + 1
                        },
                        isFrozen: true
                    },
                    {
                        field: 'wellName',
                        width: 100,
                        columnAlign: 'left',
                        isResize: true,
                        isFrozen: true
                    },
                    {
                        field: 'orgAbb',
                        width: 80,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'wellSortName',
                        width: 60,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'drillTeamId',
                        width: 80,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'servItemName',
                        width: 60,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'workStartDate',
                        width: 85,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'onsiteDate',
                        width: 82,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'designWellDepth',
                        width: 60,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'designFormation',
                        width: 50,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'drillDepth',
                        width: 60,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'uptoWellForm',
                        width: 50,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'mudDensity',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'mudViscosity',
                        width: 50,
                        columnAlign: 'right',
                        isResize: true
                    },
                    {
                        field: 'consSumm',
                        width: 150,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'gasPerSect',
                        width: 80,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'geologySummarize',
                        width: 250,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'blockName',
                        width: 100,
                        columnAlign: 'left',
                        isResize: true
                    },
                ],
                titleRows: [ //第一行
                    [{
                            fields: ['jujname'],
                            title: '施工单位',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['serialNum'],
                            title: '序号',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['wellName'],
                            title: '井号',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['orgAbb'],
                            title: '录井队号',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['wellSortName'],
                            title: '井别',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['drillTeamId'],
                            title: '钻井队号',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['servItemName'],
                            title: '服务名称',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['workStartDate'],
                            title: '作业开始日期',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['onsiteDate'],
                            title: '上井日期',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['designWellDepth', 'designFormation'],
                            title: '设计',
                            titleAlign: 'center',
                            rowspan: 1,
                            colspan: 2
                        },
                        {
                            fields: ['drillDepth', 'uptoWellForm'],
                            title: '钻达',
                            titleAlign: 'center',
                            rowspan: 1,
                            colspan: 2
                        },
                        {
                            fields: ['mudDensity', 'mudViscosity'],
                            title: '钻井液',
                            titleAlign: 'center',
                            rowspan: 1,
                            colspan: 2
                        },
                        {
                            fields: ['consSumm'],
                            title: '施工简况',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['gasPerSect'],
                            title: '气测全量(%)',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['geologySummarize'],
                            title: '地质情况',
                            titleAlign: 'center',
                            rowspan: 2
                        },
                        {
                            fields: ['blockName'],
                            title: '区块',
                            titleAlign: 'center',
                            rowspan: 2
                        }
                    ],
                    //第二行
                    //设计
                    [{
                            fields: ['designWellDepth'],
                            title: '井深(米)',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['designFormation'],
                            title: '目的层',
                            titleAlign: 'center'
                        },
                        //钻达
                        {
                            fields: ['drillDepth'],
                            title: '井深(米)',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['uptoWellForm'],
                            title: '层位',
                            titleAlign: 'center'
                        },
                        //钻井液
                        {
                            fields: ['mudDensity'],
                            title: '密度(g/cm3)',
                            titleAlign: 'center'
                        },
                        {
                            fields: ['mudViscosity'],
                            title: '粘度(秒)',
                            titleAlign: 'center'
                        }
                    ]
                ]
            }
        },
        methods: {
            loadingDate() {
                Indicator.open('加载中...')
                getDailyOfMlogByPage(this.date.time, this.searchCondition.pageNo, this.searchCondition.pageSize)
                    .then((data) => {
                        Indicator.close()
                        if (data.body) {
                            this.tableData = this.tableData.concat(data.body)
                        }
                        //判断是否还有数据
                        this.isHaveMore(data.isHaveMore)
                    })
                    .catch(function(error) {
                        Indicator.close()
                        console.log(error)
                    })
            },
            handleBack() {
                if (Indicator) {
                    Indicator.close()
                }
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            },
            
            handleChange(date) {
                this.tableData = []
                this.loadingDate();
            },
            //上拉加载
            loadBottom: function() {
                // 上拉加载  
                // 分页查询 
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1
                this.loadingDate()
                this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位  
            },
            //判断是否还能加载数据
            isHaveMore: function(isHaveMore) {
                // 是否还有下一页，如果没有就禁止上拉刷新  
                this.allLoaded = true; //true是禁止上拉加载  
                if (isHaveMore) {
                    this.allLoaded = false;
                } else if (isHaveMore == false) {
                    this.$toast.showToast('数据加载完毕')
                }
            }
        },
        created() {
            this.loadingDate(); //初次访问查询列表  
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        components: {
            'oms2-date-picker-daily': DatePickerDaily,
        }
    }
</script>
<style lang="scss">
    .oms2-fixed {
        top: 0px;
        background-color: white;
        width: 100%;
        height: 48px;
        position: fixed;
        z-index: 2;
    }
    .oms2-table-content {
        margin-top: 105px;
        .v-table-title-class {
            position: fixed;
            top: 47px;
        }
    }
</style>

