<template>
    <div ip="DhMonthlyOfWorkloadGN">
        <header>
            <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
            </mt-header>
        </header>
        <h5>测井工作量统计表</h5>
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
    import { getMonthlyOfWorkload } from './../../service/log/logGetData'
    export default {
         data() {
            return {
                date: new Date(),
                columns: [
                    {field: 'danweimingcheng', width: 80, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'zongjingci', width: 40, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'wanchengjingci', width: 40, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'cejingkoushu', width: 100, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'lyheji', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'cejingjingci', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'lwd', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'lyqita', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'scheji', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'chanchupoumian', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'zhurupoumian', width: 60, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'chucengcanshu', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'scqita', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'gcheji', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'taosunjiance', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'gujingzhiliangjiance', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'gcqita', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'skheji1', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'youguanchuanshu', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'dianlan', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'teshuzuoye', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'shekonghoudu', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'yongdanliang', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'wxheji', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'shebei', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'jingkuang', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'wxqita', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},

                    
                ],

                titleRows: [ //第一行
                             [{fields: ['danweimingcheng'], title: '单位名称', titleAlign: 'center', rowspan: 4,colspan:1, titleCellClassName:'wu-title-cell-duijiao'},
                              {fields: ['zongjingci','wanchengjingci','cejingkoushu','lyheji','cejingjingci','lwd','lyqita','scheji',
                              'chanchupoumian','zhurupoumian','chucengcanshu','scqita','gcheji','taosunjiance','gujingzhiliangjiance','gcqita',
                                        'skheji1','youguanchuanshu','dianlan','teshuzuoye','shekonghoudu','yongdanliang','wxheji','shebei',
                                        'jingkuang','wxqita'], title: '井下作业（井次）', titleAlign: 'center', colspan: 26},
                             ],

                             //第二行
                             [{fields: ['zongjingci'], title: '总井次', titleAlign: 'center',rowspan:3},
                              {fields: ['wanchengjingci'], title: '完成井次', titleAlign: 'center',rowspan:3},
                              {fields: ['cejingkoushu','lyheji','cejingjingci','lwd','lyqita'], title: '裸眼测井 (井次)', titleAlign: 'center', colspan:5},
                              {fields: ['scheji','chanchupoumian','zhurupoumian','chucengcanshu','scqita'], title: '生产测井 (井次)', titleAlign: 'center', colspan:5},
                              {fields: ['gcheji','taosunjiance','gujingzhiliangjiance','gcqita'], title: '工程测井 (井次)', titleAlign: 'center', colspan:4},
                              {fields: ['skheji1','youguanchuanshu','dianlan','teshuzuoye','shekonghoudu','yongdanliang'], title: '射孔', titleAlign: 'center', colspan:6},
                              {fields: ['wxheji','shebei','jingkuang','wxqita'], title: '无效井次', titleAlign: 'center', colspan:4},

                             ],

                              //第三行
                             [//裸眼测井（井次）
                              {fields: ['cejingkoushu'], title: '测井口数 (口)', titleAlign: 'center', rowspan:2},
                              {fields: ['lyheji'], title: '合计', titleAlign: 'center', rowspan:2},
                              {fields: ['cejingjingci'], title: '测井井次', titleAlign: 'center', rowspan:2},
                              {fields: ['lwd'], title: 'LWD', titleAlign: 'center', rowspan:2},
                              {fields: ['lyqita'], title: '其他', titleAlign: 'center', rowspan:2},
                              
                              //生产测井（井次）
                              {fields: ['scheji'], title: '合计', titleAlign: 'center', rowspan:2},
                              {fields: ['chanchupoumian'], title: '产出剖面', titleAlign: 'center', rowspan:2},
                              {fields: ['zhurupoumian'], title: '注入剖面', titleAlign: 'center', rowspan:2},
                              {fields: ['chucengcanshu'], title: '储层参数', titleAlign: 'center', rowspan:2},
                              {fields: ['scqita'], title: '其他', titleAlign: 'center', rowspan:2},

                              //工程测井（井次）
                              {fields: ['gcheji'], title: '合计', titleAlign: 'center', rowspan:2},
                              {fields: ['taosunjiance'], title: '套损检测', titleAlign: 'center', rowspan:2},
                              {fields: ['gujingzhiliangjiance'], title: '固井质量检测', titleAlign: 'center', rowspan:2},
                              {fields: ['gcqita'], title: '其他', titleAlign: 'center', rowspan:2},
                              

                              //射孔
                              {fields: ['skheji1','youguanchuanshu','dianlan','teshuzuoye'], title: '射孔 (井次)', titleAlign: 'center', colspan:4},
                              {fields: ['shekonghoudu'], title: '射孔厚度 (m)', titleAlign: 'center', rowspan:2},
                              {fields: ['yongdanliang'], title: '用弹量 (万发)', titleAlign: 'center', rowspan:2},

                              //无效井次
                              {fields: ['wxheji'], title: '合计', titleAlign: 'center', rowspan:2},
                              {fields: ['shebei'], title: '设备', titleAlign: 'center', rowspan:2},
                              {fields: ['jingkuang'], title: '井况', titleAlign: 'center', rowspan:2},
                              {fields: ['wxqita'], title: '其他', titleAlign: 'center', rowspan:2},
                             ],

                              //第四行
                             [//射孔（井次）
                              {fields: ['skheji1'], title: '合计', titleAlign: 'center', rowspan:1},
                              {fields: ['youguanchuanshu'], title: '油管传输射孔', titleAlign: 'center', rowspan:1},
                              {fields: ['dianlan'], title: '电缆', titleAlign: 'center', rowspan:1},
                              {fields: ['teshuzuoye'], title: '特殊作业', titleAlign: 'center', rowspan:1},
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
                getMonthlyOfWorkload("2018-05-23").then((data)=>{
                    Indicator.close()
                    this.tableData=data.body
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



