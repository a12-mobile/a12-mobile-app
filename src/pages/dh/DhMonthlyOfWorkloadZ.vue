<template>
    <div ip="DhMonthlyOfWorkloadZ">
        <header>
            <!-- <mt-header :title="$route.meta.title" fixed>
                    <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
                </mt-header> -->
            <h5>井下作业工作量统计月报（总）</h5>
            <oms2-date-picker-monthly :date=date @date-change="handleChange"></oms2-date-picker-monthly>
        </header>
        <v-table 
            is-horizontal-resize 
            is-vertical-resize 
            :title-row-height=25 
            :row-height=30 
            title-bg-color="#F6F6F6" 
            style="width:98%;margin-left:1%;font-size:12px" 
            :columns="columns" 
            :cell-merge="cellMerge"
            :title-rows="titleRows" 
            :table-data="tableData" 
            even-bg-color="#F4F4F4" 
            row-hover-color="#eee"
            row-click-color="#edF7FF"></v-table>
    </div>
</template>


<script>
    import DatePickerMonthly from './../../components/datepicker/DatePickerMonthly'
    import { Indicator } from 'mint-ui';
    import { getMonthlyOfWorkloadZ } from './../../service/dh/dhGetData'
    import { convertDateToString, addMonth } from '../../service/utils/date/date'
    export default {
         data() {
            return {
                date: {
                    time:convertDateToString(new Date(),'yyyy-MM')
                },
                columns: [
                    {field: 'jujiorgname', width: 80, columnAlign: 'center', isFrozen: true},
                    {field: 'testoilnum', width: 40, columnAlign: 'right'},
                    {field: 'testnum', width: 40, columnAlign: 'right'},
                    {field: 'taskmountnum', width: 50, columnAlign: 'right'},
                    {field: 'tracknum', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'acidificationnum', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'bigrepairnum', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'sidedrillnum', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'totalsmallnum', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'totalrepnum', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'checkdumpnum', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'newdrillnum', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'collapronum', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'otherworknum', width: 40, columnAlign: 'right',isResize:true},
                    
                ],

                titleRows: [ //第一行
                             [{fields: ['jujiorgname'], title: '单位', titleAlign: 'center', rowspan: 4,titleCellClassName:'wu-title-cell-duijiao'},
                              {fields: ['testoilnum','testnum'], title: '试油', titleAlign: 'center', colspan: 2},
                              {fields: ['taskmountnum','tracknum','acidificationnum','bigrepairnum','sidedrillnum','totalsmallnum','totalrepnum','checkdumpnum','newdrillnum','collapronum','otherworknum'], title: '井下作业（井次）', titleAlign: 'center', colspan: 11},
                             ],

                             //第二行
                             //基础信息
                             [{fields: ['testoilnum'], title: '层', titleAlign: 'center',rowspan:3},
                              {fields: ['testnum'], title: '口', titleAlign: 'center',rowspan:3},
                              {fields: ['taskmountnum'], title: '合计', titleAlign: 'center', rowspan:3},
                              {fields: ['tracknum'], title: '压裂', titleAlign: 'center', rowspan:3},
                              {fields: ['acidificationnum'], title: '酸化', titleAlign: 'center', rowspan:3},
                              {fields: ['bigrepairnum'], title: '大修', titleAlign: 'center', rowspan:3},
                              {fields: ['sidedrillnum'], title: '侧钻', titleAlign: 'center', rowspan:3},
                              {fields: ['totalsmallnum','totalrepnum','checkdumpnum','newdrillnum','collapronum','otherworknum'], title: '小修', titleAlign: 'center', colspan:6},
                             ],

                              //第三行
                             [//进尺
                              {fields: ['totalsmallnum'], title: '小计', titleAlign: 'center',rowspan:2},
                              {fields: ['totalrepnum','checkdumpnum'], title: '维护性工作量', titleAlign: 'center', colspan:2},
                              {fields: ['newdrillnum'], title: '新井投产', titleAlign: 'center', rowspan:2},
                              {fields: ['collapronum'], title: '配合措施作业', titleAlign: 'center', rowspan:2},
                              {fields: ['otherworknum'], title: '其他', titleAlign: 'center', rowspan:2},
                             ],

                              //第四行
                             [
                              {fields: ['totalrepnum'], title: '小计', titleAlign: 'center', rowspan:1},
                              {fields: ['checkdumpnum'], title: '其中检泵', titleAlign: 'center', rowspan:1},
                             ]
                ],
                tableData: [],
                }
        },
        created(){
            this.requestData()
            this.$ruixinApi.setWebViewTitle({ //设置导航条标题
                title:'井下月报'
            })
        },
        methods:{
            //请求数据方法
            requestData(){
                Indicator.open('加载中...')
                let nextMonth=addMonth(this.date.time,1,'yyyy-MM')
                getMonthlyOfWorkloadZ(this.date.time+'-01 00:00:00',nextMonth+'-01 00:00:00').then((data)=>{
                    Indicator.close()
                    if(data.body){
                        this.tableData=data.body
                    }else{
                        this.tableData=[]
                    }
                })
                .catch(function(error) {
                    Indicator.close()
                    console.log(error)
                })
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
            //设置列单元格样式
            cellMerge(rowIndex,rowData,field){
                if(rowData[field]==-1){
                    return {
                        colSpan: 1,
                        rowSpan: 1,
                        content: '',
                        componentName: ''
                    }
                }
            },
        },
        components: {
            'oms2-date-picker-monthly':DatePickerMonthly
        }
    }
</script>

<style lang="scss">

</style>



