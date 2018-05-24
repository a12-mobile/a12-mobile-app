<template>
    <div>
            <header>
                <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
                </mt-header>
            </header>
            <oms2-date-picker-daily :date="date" @date-add="handleDateAdd" @date-reduce="handleDateReduce" @change="handleChange"></oms2-date-picker-daily>

            <v-table
                is-horizontal-resize
                is-vertical-resize
                style="width:98%,margin-left:1%;font-size:12px"
                :title-row-height=30
                :row-height=30
                :columns="columns"
                :table-data="tableData"
                :title-rows="titleRows"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                even-bg-color="#f4f4f4"
                title-bg-color="#F6F6F6"

        ></v-table>


    </div>

</template>

<script>
    import DatePickerDaily from './../../components/datepicker/DatePickerDaily'
    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import { Toast } from "mint-ui"

    export default{
        data() {
            return {
                    date: timepicker.startTime,
                    tableData: [],
                    columns: [
                        {field: 'units', width: 50, columnAlign: 'center',isResize:true, isFrozen: true},
                        {
                        field: 'serialNum', width: 30, titleAlign: 'center', columnAlign: 'center',
                            formatter: function (rowData, index) {
                                return index + 1
                            }, isFrozen: true
                        },
                        {field: 'wellName', width: 100, columnAlign: 'center',isResize:true, isFrozen: true},
                        {field: 'workOrgName', width: 80, columnAlign: 'center',isResize:true},
                        {field: 'wellSortName', width: 60, columnAlign: 'center',isResize:true},
                        {field: 'wellDrillingId', width: 50, columnAlign: 'center',isResize:true},
                        {field: 'servItemName',  width: 60, columnAlign: 'center',isResize:true},
                        {field: 'workStartDate', width: 85, columnAlign: 'center',isResize:true},
                        {field: 'onsiteDate', width: 82, columnAlign: 'center',isResize:true},
                        {field: 'mlogWellSection', width: 60, columnAlign: 'center',isResize:true},
                        {field: 'mlogFormation', width: 50, columnAlign: 'center',isResize:true},
                        {field: 'drillDepth', width: 60, columnAlign: 'center',isResize:true},
                        {field: 'uptoWellForm', width: 50, columnAlign: 'center',isResize:true},
                        {field: 'mudDensity', width: 50, columnAlign: 'center',isResize:true},
                        {field: 'mudViscosity', width: 50, columnAlign: 'center',isResize:true},
                        {field: 'consSumm', width: 100, columnAlign: 'left',isResize:true},
                        {field: 'gasPerSect', width: 80, columnAlign: 'center',isResize:true},
                        {field: 'geologySummarize', width: 150, columnAlign: 'center',isResize:true},
                        {field: 'block', width: 50, columnAlign: 'center',isResize:true}

                    ],
                    titleRows: [//第一行
                        [{fields: ['units'], title: '施工单位', titleAlign: 'center', rowspan: 2},
                        {fields: ['serialNum'], title: '序号', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellName'], title: '井号', titleAlign: 'center', rowspan: 2},
                        {fields: ['workOrgName'], title: '录井队号', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellSortName'], title: '井别', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellDrillingId'], title: '钻井队号', titleAlign: 'center', rowspan: 2},
                        {fields: ['servItemName'], title: '服务名称', titleAlign: 'center', rowspan: 2},
                        {fields: ['workStartDate'], title: '作业开始日期', titleAlign: 'center', rowspan: 2},
                        {fields: ['onsiteDate'], title: '上井日期', titleAlign: 'center', rowspan: 2},
                        {fields: ['mlogWellSection','mlogFormation'], title: '设计', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['drillDepth','uptoWellForm'], title: '钻达', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['mudDensity','mudViscosity'], title: '钻井液', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['consSumm'], title: '施工简况', titleAlign: 'center', rowspan: 2},
                        {fields: ['gasPerSect'], title: '气测全量(%)', titleAlign: 'center', rowspan: 2},
                        {fields: ['geologySummarize'], title: '地质情况', titleAlign: 'center', rowspan: 2},
                        {fields: ['block'], title: '区块', titleAlign: 'center', rowspan: 2}],
                        //第二行
                        //设计
                        [{fields: ['mlogWellSection'], title: '井深(米)', titleAlign: 'center'},
                        {fields: ['mlogFormation'], title: '目的层', titleAlign: 'center'},
                        //钻达
                        {fields: ['drillDepth'], title: '井深(米)', titleAlign: 'center'},
                        {fields: ['uptoWellForm'], title: '层位', titleAlign: 'center'},
                        //钻井液
                        {fields: ['mudDensity'], title: '密度(g/cm3)', titleAlign: 'center'},
                        {fields: ['mudViscosity'], title: '粘度(秒)', titleAlign: 'center'}]


                    ]
            }
        },
        created(){
          this.requestDate();
        },
        methods:{
                requestDate() {
                  Indicator.open('加载中...')
                  //this.$axios.get("http://10.88.123.10:8080/mobile/logging/loggingWell?token=a735579b-93fa-4719-aa92-968191372004&rx_token=a735579b-93fa-4719-aa92-968191372004&date="+this.date.time)
                  this.$http('get','/mlog/daily/logWell',{
                    "date":"2018-05-22"
                  })
                    .then((data)=> {
                      Indicator.close()
                      if(data){
                        this.tableData=data
                      }else{
                        this.tableData=[]
                      }
                    })
                    .catch(function(error) {
                      Indicator.close()
                      console.log(error)
                    })
                },
                handleBack(){
                    if(Indicator){
                      Indicator.close()
                    }
                    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
                },

                handleDateAdd(param){
                    if(param.canAdd){
                        this.requestDate();
                    }
                },

                handleDateReduce(param){
                    if(param.canReduce){
                      this.requestDate();
                    }
                },

                //设置列单元格样式
                columnCellClass(rowIndex,columnName,rowData){
                    if(columnName==='shigongdanwei'||columnName==='duihao'||columnName==='jinghao'){
                        //return 'wu-column-cell-fixed'
                    }
                },

                handleChange(date){
                    this.requestDate();
                },

        },
        components: {
            'oms2-date-picker-daily': DatePickerDaily
        }
    }
</script>
