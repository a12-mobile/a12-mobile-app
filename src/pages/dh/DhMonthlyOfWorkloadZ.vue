<template>
    <div ip="DhMonthlyOfWorkloadGN">
        <header>
            <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
            </mt-header>
        </header>
        <h5>井下作业工作量统计月报（总）</h5>
        <div class="oms2-datepicker-content">
        <vue-datepicker-local 
            v-model="date"
            inputClass='oms2-date-picker-monthly-input'
            format="YYYY-MM" />
        </div>
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
            even-bg-color="#F4F4F4"
            row-hover-color="#eee"
            row-click-color="#edF7FF"
    ></v-table>
    </div>
</template>


<script>
    import VueDatepickerLocal from 'vue-datepicker-local'
    import { Indicator } from 'mint-ui';
    import { getMonthlyOfWorkloadZ } from './../../service/dh/dhGetData'
    export default {
         data() {
            return {
                date: new Date(),
                columns: [
                    {field: 'jujiorgname', width: 80, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'testoilnum', width: 40, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'testnum', width: 40, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'taskmountnum', width: 40, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'tracknum', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'acidificationnum', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'bigrepairnum', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'sidedrillnum', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'totalsmallnum', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'totalrepnum', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'checkdumpnum', width: 60, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'newdrillnum', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'collapronum', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'otherworknum', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    
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
        watch:{
            date:function(newDate,oldDate){
                console.log("旧值"+oldDate)
                console.log("新值"+newDate)
                this.requestData()
            }
        },
        created(){
            this.requestData()
        },
        methods:{
            //请求数据方法
            requestData(){
                Indicator.open('加载中...')
                getMonthlyOfWorkloadZ("2018-05-22").then((data)=>{
                    Indicator.close()
                    this.tableData=data.body
                })
            },
            //返回按钮
            handleBack(){
                if(Indicator){
                    Indicator.close()
                }
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            }
        },
        components: {
            VueDatepickerLocal
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

</style>



