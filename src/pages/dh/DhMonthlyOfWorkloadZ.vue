<template>
    <div id="DhMonthlyOfWorkloadZ">
        <header>
            <!-- <mt-header :title="$route.meta.title" fixed>
                    <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
                </mt-header> -->
            <!-- <h5>井下作业工作量统计月报（总）</h5> -->
            <oms2-date-picker-monthly :date=date @date-change="handleChange"></oms2-date-picker-monthly>
        </header>
        <v-table 
            is-horizontal-resize 
            is-vertical-resize 
            :title-row-height=25 
            :row-height=30 
            title-bg-color="#F6F6F6" 
            :height=tableHeight
            style="width:100%;font-size:12px"
            :columns="columns" 
            :cell-merge="cellMerge"
            :title-rows="titleRows" 
            :table-data="tableData" 
            :column-cell-class-name="columnCellClass"
            even-bg-color="#F4F4F4" 
            row-hover-color="#eee"
            row-click-color="#edF7FF"></v-table>
            <div class='oms2-report-float-right'>数据来源于A7集团系统井下作业工作量统计月报（总）</div>
    </div>
</template>


<script>
    import DatePickerMonthly from './../../components/datepicker/DatePickerMonthly'
    import { Indicator } from 'mint-ui';
    import { getMonthlyOfWorkloadZ } from './../../service/dh/dhGetData'
    import { getCurrentDate, addMonth } from '../../service/utils/date/date'
    export default {
         data() {
            return {
                date: {
                    time:getCurrentDate('yyyy-MM')
                },
                tableHeight:0,   //表格高度
                columns: [
                    {field: 'jujiorgname', width: 90, columnAlign: 'center', isFrozen: true},
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
                            //  [{fields: ['jujiorgname'], title: '<span class="title1">作业内容</span><span class="title2">单位</span>', titleAlign: 'center', rowspan: 4,titleCellClassName:'oms2-title-cell-duijiao'},
                              [{fields: ['jujiorgname'], title: '单位', titleAlign: 'center', rowspan: 4},
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
            this.tableHeight=window.innerHeight-80
        },
        mounted(){
            this.$ruixin.supportAutorotate({});
            this.$ruixin.setWebViewTitle({title:'井下工作量月报总'});
        },
        methods:{
            //请求数据方法
            requestData(){
                Indicator.open('加载中...')
                let nextMonth=addMonth(this.date.time,1,'yyyy-MM')
                getMonthlyOfWorkloadZ(this.date.time+'-01 00:00:00',nextMonth+'-01 00:00:00').then((data)=>{
                    Indicator.close()
                    if(data.data){
                        this.tableData=data.data

                        //检查是否含有所有地区
                        let jujiorgnames=['集团合计','川庆钻探','大庆钻探','长城钻探','渤海钻探','西部钻探','海洋工程公司','大庆油田','吉林油田','辽河油田','冀东油田','大港油田',
                                    '华北油田','长庆油田','玉门油田','青海油田','吐哈油田','新疆油田']
                        let jujisFromData=[]
                        for(var date of this.tableData){
                            jujisFromData.push(date.jujiorgname)
                        }
                        for(var jujiorgname of jujiorgnames){
                            if(!jujisFromData.includes(jujiorgname)){
                                //不存在需要添加
                                let newItem={
                                    jujiorgname:jujiorgname,
                                    remark:'Not exist'
                                }
                                this.tableData.push(newItem)
                            }
                        }
                        //排序
                        this.tableData.sort((pre,next)=>{
                            let preIndex=jujiorgnames.indexOf(pre.jujiorgname)
                            let nextIndex=jujiorgnames.indexOf(next.jujiorgname)
                            return preIndex-nextIndex
                        })
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
            columnCellClass(rowIndex,columnName,rowData){
                if(columnName=='jujiorgname'&&this.tableData[rowIndex].remark=='Not exist'){
                    return 'oms2-item-not-exist'
                }
            }

        },
        components: {
            'oms2-date-picker-monthly':DatePickerMonthly
        }
    }
</script>

<style lang="scss">
    .oms2-item-not-exist{
        color:#f00;
    }
    .oms2-title-cell-duijiao:before {
            content: "";
            position: absolute;
            width: 1px;
            height: 134.5px;
            top: 0;
            left: 0;
            background-color: #E3E3E3;
            display: block;
            transform: rotate(-41.99deg);
            transform-origin: top;
            -ms-transform: rotate(-41.996deg);
            -ms-transform-origin: top;
        }
    .title1{
        position: absolute;
        top: 5px;
        right:10px;
        }
    .title2{
        position: absolute;
        top: 80px;
        left:10px;
    }

</style>



