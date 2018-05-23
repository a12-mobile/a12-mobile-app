<template>
    <div>
            <header>
                <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
                </mt-header>
            </header>
            <oms2-date-picker-daily :date="date" @date-add="handleDateAdd" @date-reduce="handleDateReduce" @change="change"></oms2-date-picker-daily>
           
            <v-table
                is-horizontal-resize
                is-vertical-resize
                style="width:98%,margin-left:1%;font-size:12px"
                :columns="columns"
                :table-data="tableData"
                :title-rows="titleRows"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                even-bg-color="#f4f4f4"
                :select-all="selectALL"
                :select-change="selectChange"
                :select-group-change="selectGroupChange"
        ></v-table>
            

    </div>
    
</template>

<script>
    import DatePickerDaily from './../components/datepicker/DatePickerDaily'
    import { Indicator } from 'mint-ui';
    import timepicker from './../components/datepicker/timepicker'
    import { Toast } from "mint-ui"

    export default{
        data() {
            return {
                    date: timepicker.startTime,
                    tableData: [
                        {"units":"赵伟","wellID":"156*****1987","wellLogId":"钢琴、书法、唱歌","wellType":"上海市黄浦区金陵东路569号17楼","wellDrillingId":"12345678"},
                        {"units":"李伟","wellID":"182*****1538","wellLogId":"钢琴、书法、唱歌","wellType":"上海市奉贤区南桥镇立新路12号2楼","wellDrillingId":"12345678"}
                        // {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                        // {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                        // {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                    ],
                    columns: [
                       // {width: 60, titleAlign: 'center',columnAlign:'center',type: 'selection'},
                        {field: 'units', width: 50, columnAlign: 'center',isResize:true, isFrozen: true},
                        {
                        field: 'serialNum', width: 50, titleAlign: 'center', columnAlign: 'center', 
                            formatter: function (rowData, index) {
                                return index < 3 ? '<span style="color:red;font-weight: bold;">' + (index + 1) + '</span>' : index + 1
                            }, isFrozen: true
                        },
                       // {field: 'serialNum', title: '序号', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true, isFrozen: true},
                        {field: 'wellID', width: 50, columnAlign: 'center',isResize:true, isFrozen: true},
                        {field: 'wellLogId', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'wellType', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'wellDrillingId', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'serviceName',  width: 50, columnAlign: 'left',isResize:true},
                        {field: 'startDate', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'startTime', width: 50, columnAlign: 'left',isResize:true},                
                        {field: 'wellDepth1', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'targetStratum', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'wellDepth2', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'position', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'density', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'viscosity', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'constructionBrief', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'amountGas', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'geology', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'block', width: 50, columnAlign: 'left',isResize:true}

                    ],
                    titleRows: [//第一行
                        [{fields: ['units'], title: '施工单位', titleAlign: 'center', rowspan: 2},
                        {fields: ['serialNum'], title: '序号', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellID'], title: '井号', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellLogId'], title: '录井队号', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellType'], title: '井别', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellDrillingId'], title: '钻井队号', titleAlign: 'center', rowspan: 2},
                        {fields: ['serviceName'], title: '服务名称', titleAlign: 'center', rowspan: 2},
                        {fields: ['startDate'], title: '作业开始日期', titleAlign: 'center', rowspan: 2},
                        {fields: ['startTime'], title: '上井日期', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellDepth1','targetStratum'], title: '设计', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['wellDepth2','position'], title: '钻达', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['density','viscosity'], title: '钻井液', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['constructionBrief'], title: '施工简况', titleAlign: 'center', rowspan: 2},
                        {fields: ['amountGas'], title: '气测全量(%)', titleAlign: 'center', rowspan: 2},
                        {fields: ['geology'], title: '地质情况', titleAlign: 'center', rowspan: 2},
                        {fields: ['block'], title: '区块', titleAlign: 'center', rowspan: 2}],
                        //第二行
                        //设计
                        [{fields: ['wellDepth1'], title: '井深(米)', titleAlign: 'center'},
                        {fields: ['targetStratum'], title: '目的层', titleAlign: 'center'},
                        //钻达
                        {fields: ['wellDepth2'], title: '井深(米)', titleAlign: 'center'},
                        {fields: ['position'], title: '层位', titleAlign: 'center'},
                        //钻井液
                        {fields: ['density'], title: '密度(g/cm3)', titleAlign: 'center'},
                        {fields: ['viscosity'], title: '粘度(秒)', titleAlign: 'center'}]

                    
                    ]
            }
        },
        methods:{
                handleBack(){
                    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
                },

                handleDateAdd(param){
                    if(param.canAdd){
                        Indicator.open('加载中...')
                        setTimeout(()=>{
                            Indicator.close()
                        },1000)
                    }
                },

                handleDateReduce(date){
                    Indicator.open('加载中...')
                        setTimeout(()=>{
                            Indicator.close()
                        },1000)
                },

                //设置列单元格样式
                columnCellClass(rowIndex,columnName,rowData){
                    if(columnName==='shigongdanwei'||columnName==='duihao'||columnName==='jinghao'){
                        //return 'wu-column-cell-fixed'
                    }
                },

                change(date){
                    alert("改变了"+date)
                },
                selectALL(selection){

                     console.log('select-aLL',selection);
                },

                selectChange(selection,rowData){
                     console.log('select-change',selection,rowData);
                },

                selectGroupChange(selection){
                     console.log('select-group-change',selection);
                }
        },
        components: {
            'oms2-date-picker-daily': DatePickerDaily
        }
    }
</script>