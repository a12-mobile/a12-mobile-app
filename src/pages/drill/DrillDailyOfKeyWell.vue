<template>
    <div ip="DailyOfKeyWell">
        <header>
            <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
            </mt-header>
        </header>
        <oms2-date-picker-daily :date="date" @date-add="handleDateAdd" @date-reduce="handleDateReduce"  @date-change="handleChange"></oms2-date-picker-daily>
        <v-table
            is-horizontal-resize
            is-vertical-resize
            :title-row-height=25
            title-bg-color="#F6F6F6"
            style="width:98%;margin-left:1%;font-size:12px"
            :columns="columns"
            :title-rows="titleRows"
            :table-data="tableData"
            :column-cell-class-name="columnCellClass"
            even-bg-color="#F4F4F4"
            row-hover-color="#eee"
            row-click-color="#edF7FF"
    ></v-table>
    </div>
</template>


<script>
/////单位排序，然后设计井深排序
////////注意   施工区域字段未找到
    import DatePickerDaily from './../../components/DatePickerDaily'

    import { Indicator } from 'mint-ui';
    import timepicker from './../../assets/js/timepicker'
    import { Toast } from "mint-ui"
    export default {
         data() {
            return {
                date: timepicker.startTime,
                tableData: [],
                columns: [
                    {field: 'sgdw', width: 40, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'dh', width: 70, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'jm', width: 80, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'wellSort', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'wellType', width: 90, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'shigongquyu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'start1Date', width: 60, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'designWellDepth', width: 60, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'actualWellDepth', width: 60, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'layername', width: 80, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'project', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'workContent', width: 100, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'dailyDrilledFootage', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'monthPlannedDrillingFootage', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'cumulMonthDrilledFootage', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'cumulYearDrilledFootage', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'monthCompletion', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'yearFinish', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'bitSizeModel', width: 90, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'woba', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'deliveryVolume', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'onlydrill', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'drillRotateSpeed', width: 50, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    // {field: 'jixiezuansu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'pumpPressure', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'designMudPropDendity', width: 60, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'mudPropDensity', width: 60, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'mudPropViscosity', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'mudPropWaterLose', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'mudPropGrittyConsistence', width: 40, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'cannulaSizeModel', width: 200, columnAlign: 'center', columnAlign: 'center',isResize:true},
                ],

                titleRows: [ //第一行
                             [{fields: ['sgdw'], title: '施工单位', titleAlign: 'center', rowspan: 4},
                              {fields: ['dh'], title: '队号', titleAlign: 'center', rowspan: 4},
                              {fields: ['jm'], title: '井号', titleAlign: 'center', rowspan: 4},
                              {fields: ['wellSort', 'wellType', 'shigongquyu','start1Date'], title: '基础信息', titleAlign: 'center', colspan: 4},
                              {fields: ['designWellDepth', 'actualWellDepth','layername','project','workContent'], title: '当日动态', titleAlign: 'center', colspan: 5},
                              {fields: ['dailyDrilledFootage','monthPlannedDrillingFootage','cumulMonthDrilledFootage','cumulYearDrilledFootage','monthCompletion','yearFinish'], title: '工作量', titleAlign: 'center', colspan: 6},
                              {fields: ['bitSizeModel','woba','deliveryVolume','onlydrill','drillRotateSpeed','pumpPressure'], title: '钻头及钻井参数', titleAlign: 'center', colspan: 6},
                              {fields: ['designMudPropDendity','mudPropDensity','mudPropViscosity','mudPropWaterLose','mudPropGrittyConsistence'], title: '钻井液性能', titleAlign: 'center', colspan: 5},
                              {fields: ['cannulaSizeModel',], title: '套管及钻杆', titleAlign: 'center', rowspan: 4},
                             ],

                             //第二行
                             //基础信息
                             [{fields: ['wellSort'], title: '井别', titleAlign: 'center',rowspan:3},
                              {fields: ['wellType'], title: '井型', titleAlign: 'center', rowspan:3},
                              {fields: ['shigongquyu'], title: '施工区域', titleAlign: 'center', rowspan:3},
                              {fields: ['start1Date'], title: '开钻日期', titleAlign: 'center', rowspan:3},

                              //当日动态
                              {fields: ['designWellDepth'], title: '设计井深', titleAlign: 'center',rowspan:3},
                              {fields: ['actualWellDepth'], title: '当前井深', titleAlign: 'center', rowspan:3},
                              {fields: ['layername'], title: '钻打层位', titleAlign: 'center', rowspan:3},
                              {fields: ['project'], title: '工况', titleAlign: 'center', rowspan:3},
                              {fields: ['workContent'], title: '工作内容', titleAlign: 'center', rowspan:3},

                              //工作量
                              {fields: ['dailyDrilledFootage','monthPlannedDrillingFootage','cumulMonthDrilledFootage','cumulYearDrilledFootage',], title: '进尺(米)', titleAlign: 'center',colspan:4},
                              {fields: ['monthCompletion','yearFinish'], title: '完井(口)', titleAlign: 'center', colspan:2},

                              //钻头及钻井参数
                              {fields: ['bitSizeModel'], title: '钻头尺寸型号', titleAlign: 'center', rowspan:3},
                              {fields: ['woba'], title: '钻压(KN)', titleAlign: 'center', rowspan:3},
                              {fields: ['deliveryVolume'], title: '排量(L/s)', titleAlign: 'center', rowspan:3},
                              {fields: ['onlydrill'], title: '纯钻时间(h)', titleAlign: 'center', rowspan:3},
                              {fields: ['drillRotateSpeed'], title: '转速(r/min)', titleAlign: 'center', rowspan:3},
                            //   {fields: ['jixiezuansu'], title: '机械钻速(m/h)', titleAlign: 'center', rowspan:3},
                              {fields: ['pumpPressure'], title: '泵压(MPa)', titleAlign: 'center', rowspan:3},

                              //钻井液性能
                              {fields: ['designMudPropDendity','mudPropDensity','mudPropViscosity','mudPropWaterLose','mudPropGrittyConsistence'], title: '泥浆', titleAlign: 'center', colspan:5},

                            //   //套管及钻具
                            //   {fields: ['taoguanguige'], title: '套管规格(mmX米)', titleAlign: 'center', rowspan:3},
                            //   {fields: ['zuanjuzuhe'], title: '钻具组合', titleAlign: 'center', rowspan:3},
                             ],

                              //第三行
                             [//进尺
                              {fields: ['dailyDrilledFootage'], title: '当日', titleAlign: 'center',rowspan:2},
                              {fields: ['monthPlannedDrillingFootage'], title: '月计划', titleAlign: 'center', rowspan:2},
                              {fields: ['cumulMonthDrilledFootage'], title: '月累', titleAlign: 'center', rowspan:2},
                              {fields: ['cumulYearDrilledFootage'], title: '年累', titleAlign: 'center', rowspan:2},

                              //完井
                              {fields: ['monthCompletion'], title: '月累', titleAlign: 'center', rowspan:2},
                              {fields: ['yearFinish'], title: '年累', titleAlign: 'center', rowspan:2},

                              //密度(g/cm3)
                              {fields: ['designMudPropDendity','mudPropDensity'], title: '密度(g/cm3)', titleAlign: 'center', colspan:2},
                              {fields: ['mudPropViscosity'], title: '粘度(s)', titleAlign: 'center', rowspan:2},
                              {fields: ['mudPropWaterLose'], title: '失水', titleAlign: 'center', rowspan:2},
                              {fields: ['mudPropGrittyConsistence'], title: '含砂', titleAlign: 'center', rowspan:2},
                             ],

                              //第四行
                             [
                              {fields: ['designMudPropDendity'], title: '设计', titleAlign: 'center', rowspan:1},
                              {fields: ['mudPropDensity'], title: '实际', titleAlign: 'center', rowspan:1},
                             ]
                ],
                }
        },
        created(){
            this.requestDate();
        },
        methods:{
            requestDate() {
                Indicator.open('加载中...')
                this.$http('get','/mobile/drill/daily/keyWell',{
                    "token":"2f8c670a-5f42-4c41-a005-71bd565bd248",
                    "rx_token":"2f8c670a-5f42-4c41-a005-71bd565bd248",
                    "date":this.date.time
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
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            },
            handleDateAdd(param){
                if (param.canAdd) {
                    this.requestDate();
                }
            },
            handleDateReduce(param){
                if (param.canReduce) {
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
            }

        },
        components: {
            'oms2-date-picker-daily': DatePickerDaily
        }
    }

    //字段实际含义
      // "start1Date"   //开钻日期
  // "bsflag"       //删除标志
  // "jm"           //井名
  // "designWellDepth"  //设计井深
  // "dh"           //队号
  // "mudPropWaterLose"     //失水
  // "designMudPropDendity"  //设计密度
  // "workContent"         //工作内容
  // "project"             //工况
  // "layername"           //钻达层位
  // "dailyDrilledFootage"  //日进尺
  // "monthPlannedDrillingFootage  //月计划
  // "mudPropViscosity"     //粘度
  // "yearFinish"           //年完
  // "wellType"             //井型
  // "cannulaSizeModel"     //套管程序 或 钻具组合
  // "onlydrill"            //纯钻时间
  // "drillRotateSpeed"     //转速
  // "sgdw"     //施工单位
  // "woba"     //钻压
  // "mudPropGrittyConsistence"  //含砂
  // "monthCompletion"       //月完
  // "wellSort"       //井别
  // "actualWellDepth"  //当前井深
  // "pumpPressure"   //泵压
  // "dynamicId"      //主键
  // "deliveryVolume" //排量
  // "cumulYearDrilledFootage"  //年累
  // "bitSizeModel"   //钻头
  // "cumulMonthDrilledFootage"  //月累
  // "mudPropDensity"  //实际密度
</script>

<style lang="scss">

</style>



