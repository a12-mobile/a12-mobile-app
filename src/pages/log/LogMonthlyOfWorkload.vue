<template>
    <div ip="DhMonthlyOfWorkloadGN">
        <!-- <header>
            <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
            </mt-header>
        </header> -->
        <h4>测井工作量统计表</h4>
        <oms2-date-picker-monthly
            :date=date
            @date-change="handleChange"
        ></oms2-date-picker-monthly>
        <v-table
            is-horizontal-resize
            is-vertical-resize
            :title-row-height=25
            :row-height=30
            title-bg-color="#F6F6F6"
            style="width:98%;margin-left:1%;font-size:12px"
            :columns="columns"
            :title-rows="titleRows"
            :table-data="tableData"
            :cell-merge="cellMerge"
            even-bg-color="#F4F4F4"
            row-hover-color="#eee"
            row-click-color="#edF7FF"
    ></v-table>
    </div>
</template>


<script>
    import DatePickerMonthly from './../../components/datepicker/DatePickerMonthly'
    import { Indicator } from 'mint-ui';
    import { getMonthlyOfWorkload } from './../../service/log/logGetData'
    import {convertDateToString,addMonth,getCurrentDate} from './../../service/utils/date/date'
    export default {
         data() {
            return {
                date: {
                    time:getCurrentDate()
                },
                juOrgList:[],
                columns: [
                    {field: 'juOrgabb', width:60, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'chuOrgabb', width: 110, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'totalWellCount', width: 40, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'completeWellCount', width: 40, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'wjcjCount', width: 80, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'lyTotal', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'wjcjWellcount', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'numberSpare2', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'lyOther', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'scTotal', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'ccCount', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'zrCount', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'dcCount', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'sccjqt', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'gcTotal', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'tsTest', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'gjQualityTest', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'projectOther', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'skTotal', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'vittaTransfers', width: 80, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'cableSk', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'differentWork', width: 60, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'thicknessSk', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'bombCount', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'wxTotal', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'nullityEquipment', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'nullityWell', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'nullityOther', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                ],

                titleRows: [ //第一行
                             [{fields: ['juOrgabb','chuOrgabb'], title: '单位名称', titleAlign: 'center', rowspan: 4,colspan:2, titleCellClassName:'wu-title-cell-duijiao'},
                              {fields: ['totalWellCount','completeWellCount','wjcjCount','lyTotal','wjcjWellcount','numberSpare2','lyOther','scTotal',
                              'ccCount','zrCount','dcCount','sccjqt','gcTotal','tsTest','gjQualityTest','projectOther',
                                        'skTotal','vittaTransfers','cableSk','differentWork','thicknessSk','bombCount','wxTotal','nullityEquipment',
                                        'nullityWell','nullityOther'], title: '井下作业（井次）', titleAlign: 'center', colspan: 26},
                             ],

                             //第二行
                             [{fields: ['totalWellCount'], title: '总井次', titleAlign: 'center',rowspan:3},//=============/
                              {fields: ['completeWellCount'], title: '完成井次', titleAlign: 'center',rowspan:3},//==============/
                              {fields: ['wjcjCount','lyTotal','wjcjWellcount','numberSpare2','lyOther'], title: '裸眼测井 (井次)', titleAlign: 'center', colspan:5},
                              {fields: ['scTotal','ccCount','zrCount','dcCount','sccjqt'], title: '生产测井 (井次)', titleAlign: 'center', colspan:5},
                              {fields: ['gcTotal','tsTest','gjQualityTest','projectOther'], title: '工程测井 (井次)', titleAlign: 'center', colspan:4},
                              {fields: ['skTotal','vittaTransfers','cableSk','differentWork','thicknessSk','bombCount'], title: '射孔', titleAlign: 'center', colspan:6},
                              {fields: ['wxTotal','nullityEquipment','nullityWell','nullityOther'], title: '无效井次', titleAlign: 'center', colspan:4},

                             ],

                              //第三行
                             [//裸眼测井（井次）
                              {fields: ['wjcjCount'], title: '测井口数 (口)', titleAlign: 'center', rowspan:2},
                              {fields: ['lyTotal'], title: '合计', titleAlign: 'center', rowspan:2},   //===========/
                              {fields: ['wjcjWellcount'], title: '测井井次', titleAlign: 'center', rowspan:2},
                              {fields: ['numberSpare2'], title: 'LWD', titleAlign: 'center', rowspan:2},
                              {fields: ['lyOther'], title: '其他', titleAlign: 'center', rowspan:2},
                              
                              //生产测井（井次）
                              {fields: ['scTotal'], title: '合计', titleAlign: 'center', rowspan:2},//////============//
                              {fields: ['ccCount'], title: '产出剖面', titleAlign: 'center', rowspan:2},
                              {fields: ['zrCount'], title: '注入剖面', titleAlign: 'center', rowspan:2},
                              {fields: ['dcCount'], title: '储层参数', titleAlign: 'center', rowspan:2},
                              {fields: ['sccjqt'], title: '其他', titleAlign: 'center', rowspan:2},

                              //工程测井（井次）
                              {fields: ['gcTotal'], title: '合计', titleAlign: 'center', rowspan:2},//=============/
                              {fields: ['tsTest'], title: '套损检测', titleAlign: 'center', rowspan:2},
                              {fields: ['gjQualityTest'], title: '固井质量检测', titleAlign: 'center', rowspan:2},
                              {fields: ['projectOther'], title: '其他', titleAlign: 'center', rowspan:2},
                              

                              //射孔
                              {fields: ['skTotal','vittaTransfers','cableSk','differentWork'], title: '射孔 (井次)', titleAlign: 'center', colspan:4},
                              {fields: ['thicknessSk'], title: '射孔厚度 (m)', titleAlign: 'center', rowspan:2},
                              {fields: ['bombCount'], title: '用弹量 (万发)', titleAlign: 'center', rowspan:2},

                              //无效井次
                              {fields: ['wxTotal'], title: '合计', titleAlign: 'center', rowspan:2},  /////=========/
                              {fields: ['nullityEquipment'], title: '设备', titleAlign: 'center', rowspan:2},
                              {fields: ['nullityWell'], title: '井况', titleAlign: 'center', rowspan:2},
                              {fields: ['nullityOther'], title: '其他', titleAlign: 'center', rowspan:2},
                             ],

                              //第四行
                             [//射孔（井次）
                              {fields: ['skTotal'], title: '合计', titleAlign: 'center', rowspan:1},//===========/
                              {fields: ['vittaTransfers'], title: '油管传输射孔', titleAlign: 'center', rowspan:1},
                              {fields: ['cableSk'], title: '电缆', titleAlign: 'center', rowspan:1},
                              {fields: ['differentWork'], title: '特殊作业', titleAlign: 'center', rowspan:1},
                             ]
                ],
                tableData: [],
                }
        },
        created(){
            this.requestData()
            this.$ruixinApi.setWebViewTitle({ //设置导航条标题
                title:this.$route.meta.title
            })
        },
        methods:{
            //请求数据方法
            requestData(){
                Indicator.open('加载中...')
                getMonthlyOfWorkload(this.date.time).then((data)=>{
                    Indicator.close()
                    this.tableData=data.body
                })
                .catch(function(error) {
                    Indicator.close()
                    console.log(error)
                    
                })

            },
            handleMonthReduce(){
                console.log("月减少一天")
                this.date=new Date(addMonth(this.date,-1));
            },
            handleMonthAdd(){
                console.log("月增加一天")
                this.date=new Date(addMonth(this.date,1));

            },
            //返回按钮
            handleBack(){
                if(Indicator){
                    Indicator.close()
                }
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            },
            handleChange(){
                this.requestData()
            },
            //合并单元格
            cellMerge(rowIndex,rowData,field){ 
                if(field==='juOrgabb'){
                    let juOrgabb=rowData[field]
                    if(this.juOrgList.indexOf(juOrgabb)==-1){
                        //还没有合并该局级单位
                        let num=0  //记录这个局级单位有多少个
                        for(let i=rowIndex;i<this.tableData.length;i++){
                            if(this.tableData[i].juOrgabb==juOrgabb){
                                num++
                            }
                        }
                        if(num>0){
                            return {
                                colSpan: 1,
                                rowSpan: num,
                                content: juOrgabb,
                                componentName: ''
                            }
                        }
                        this.juOrgList.push(juOrgabb)
                    }
                }

            }
        },
        components: {
            'oms2-date-picker-monthly':DatePickerMonthly
        }
    }
</script>

<style lang="scss">
    .oms2-datepicker-content{
        margin-bottom:10px;
    }
    .oms2-date-picker-monthly-input{
        width:100px !important;
        font-size: 10px;
    }
    .oms2-icon{
        margin-left:20px;
        margin-right:20px;
        font-size:18px;
    }

</style>



