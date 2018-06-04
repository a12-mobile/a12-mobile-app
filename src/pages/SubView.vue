<template>
    <div id="DailyOfKeyWell1">
        <p>获取得参数为:<span>{{$route.query.username}}</span></p>
    </div>
</template>

<script>
    import DatePickerDaily from './../components/datepicker/DatePickerDaily'
    import { Indicator } from 'mint-ui';
    import timepicker from './../components/datepicker/timepicker'
    import { showToast,POSITION } from "./../service/utils/toast/toast.js"
    import { getDaliyOfKeyWell } from './../service/drill/drillGetData'
    export default {
         data() {
            return {
                tableHeight:0,   //表格高度
                suggestions:[],  //搜索井名时提示的数组
                date: timepicker.startTime,  //时间选择器使用
                baseData:[],     //对从服务器获取的数据进行备份，方便查询等操作，不许重复向服务器查询
                tableData: [],   //表格中显示的数据
                sgdwList:[],     //施工单位列表  用于查询使用
                jmList:[],       //井名列表  用于查询使用
                selectedRow:{},  //选中的行
                selectedJM:'',   //查询的井名
                selectedSGDW:'全部', //查询的施工单位
                columns: [
                    {field: 'sgdw', width: 40, columnAlign: 'left', isFrozen: true},
                    {field: 'jm', width: 85, columnAlign: 'left', isFrozen: true},
                    {field: 'dh', width: 70, columnAlign: 'left', isFrozen: false},
                    {field: 'wellSort', width: 70, columnAlign: 'left',isResize:true},
                    {field: 'wellType', width: 90, columnAlign: 'left',isResize:true},
                    {field: 'shigongquyu', width: 70, columnAlign: 'left',isResize:true},
                    {field: 'start1Date', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'designWellDepth', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'actualWellDepth', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'layername', width: 80, columnAlign: 'left',isResize:true},
                    {field: 'project', width: 70, columnAlign: 'left',isResize:true},
                    {field: 'workContent', width: 100, columnAlign: 'left',isResize:true},
                    {field: 'dailyDrilledFootage', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'monthPlannedDrillingFootage', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'cumulMonthDrilledFootage', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'cumulYearDrilledFootage', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'monthCompletion', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'yearFinish', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'bitSizeModel', width: 110, columnAlign: 'right',isResize:true},
                    {field: 'woba', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'deliveryVolume', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'onlydrill', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'drillRotateSpeed', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'pumpPressure', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'designMudPropDendity', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'mudPropDensity', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'mudPropViscosity', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'mudPropWaterLose', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'mudPropGrittyConsistence', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'cannulaSizeModel', width: 200, columnAlign: 'left',isResize:true},
                ],

                titleRows: [ //第一行
                             [{fields: ['sgdw'], title: '施工单位', titleAlign: 'center', rowspan: 3},
                              {fields: ['jm'], title: '井号', titleAlign: 'center', rowspan: 3},
                              {fields: ['dh'], title: '队号', titleAlign: 'center', rowspan: 3},
                              {fields: ['wellSort', 'wellType', 'shigongquyu','start1Date'], title: '基础信息', titleAlign: 'center', colspan: 4},
                              {fields: ['designWellDepth', 'actualWellDepth','layername','project','workContent'], title: '当日动态', titleAlign: 'center', colspan: 5},
                              {fields: ['dailyDrilledFootage','monthPlannedDrillingFootage','cumulMonthDrilledFootage','cumulYearDrilledFootage','monthCompletion','yearFinish'], title: '工作量', titleAlign: 'center', colspan: 6},
                              {fields: ['bitSizeModel','woba','deliveryVolume','onlydrill','drillRotateSpeed','pumpPressure'], title: '钻头及钻井参数', titleAlign: 'center', colspan: 6},
                              {fields: ['designMudPropDendity','mudPropDensity','mudPropViscosity','mudPropWaterLose','mudPropGrittyConsistence'], title: '钻井液性能', titleAlign: 'center', colspan: 5},
                              {fields: ['cannulaSizeModel',], title: '套管规格(mm*m)', titleAlign: 'center', rowspan: 3},
                             ],

                             //第二行
                             //基础信息
                             [{fields: ['wellSort'], title: '井别', titleAlign: 'center',rowspan: 2},
                              {fields: ['wellType'], title: '井型', titleAlign: 'center', rowspan: 2},
                              {fields: ['shigongquyu'], title: '施工区域', titleAlign: 'center', rowspan: 2},
                              {fields: ['start1Date'], title: '开钻日期', titleAlign: 'center', rowspan: 2},

                              //当日动态
                              {fields: ['designWellDepth'], title: '设计井深(m)', titleAlign: 'center',rowspan: 2},
                              {fields: ['actualWellDepth'], title: '当前井深(m)', titleAlign: 'center', rowspan: 2},
                              {fields: ['layername'], title: '钻达层位', titleAlign: 'center', rowspan: 2},
                              {fields: ['project'], title: '工况', titleAlign: 'center', rowspan: 2},
                              {fields: ['workContent'], title: '工作内容', titleAlign: 'center', rowspan: 2},

                              //工作量
                              {fields: ['dailyDrilledFootage','monthPlannedDrillingFootage','cumulMonthDrilledFootage','cumulYearDrilledFootage',], title: '进尺(m)', titleAlign: 'center',colspan:4},
                              {fields: ['monthCompletion','yearFinish'], title: '完井(口)', titleAlign: 'center', colspan:2},

                              //钻头及钻井参数
                              {fields: ['bitSizeModel'], title: '钻头尺寸型号', titleAlign: 'center', rowspan: 2},
                              {fields: ['woba'], title: '钻压(KN)', titleAlign: 'center', rowspan: 2},
                              {fields: ['deliveryVolume'], title: '排量(L/s)', titleAlign: 'center', rowspan: 2},
                              {fields: ['onlydrill'], title: '纯钻时间(h)', titleAlign: 'center', rowspan: 2},
                              {fields: ['drillRotateSpeed'], title: '转速(r/min)', titleAlign: 'center', rowspan: 2},
                              {fields: ['pumpPressure'], title: '泵压(MPa)', titleAlign: 'center', rowspan: 2},
                              {fields: ['designMudPropDendity','mudPropDensity'], title: '密度(g/cm3)', titleAlign: 'center', colspan:2},

                              {fields: ['mudPropViscosity'], title: '粘度(s)', titleAlign: 'center', rowspan: 2},
                              {fields: ['mudPropWaterLose'], title: '失水(ml)', titleAlign: 'center', rowspan: 2},
                              {fields: ['mudPropGrittyConsistence'], title: '含砂(%)', titleAlign: 'center', rowspan: 2},
                             ],

                              //第三行
                             [//进尺
                              {fields: ['dailyDrilledFootage'], title: '当日', titleAlign: 'center',rowspan: 1},
                              {fields: ['monthPlannedDrillingFootage'], title: '月计划', titleAlign: 'center', rowspan: 1},
                              {fields: ['cumulMonthDrilledFootage'], title: '月累', titleAlign: 'center', rowspan: 1},
                              {fields: ['cumulYearDrilledFootage'], title: '年累', titleAlign: 'center', rowspan: 1},

                              //完井
                              {fields: ['monthCompletion'], title: '月累', titleAlign: 'center', rowspan: 1},
                              {fields: ['yearFinish'], title: '年累', titleAlign: 'center', rowspan: 1},

                              //密度(g/cm3)
                              {fields: ['designMudPropDendity'], title: '设计', titleAlign: 'center', rowspan:1},
                              {fields: ['mudPropDensity'], title: '实际', titleAlign: 'center', rowspan:1},
                             ],
                    ],
                }
        },
        created(){
            //首次进入页面获取数据
            // console.log(this.$route)
            // this.requestDate();
            // this.$ruixinApi.hideWebViewTitle({});
            // this.tableHeight=window.innerHeight
        },
        methods:{
            /**
             * 向服务器获取数据的方法
             */
            requestDate() {
                Indicator.open('加载中...')
                getDaliyOfKeyWell(this.date.time)
                .then((data)=> {
                    Indicator.close()
                    if(data){
                        this.tableData=data.body
                        this.baseData=data.body
                        
                    }else{
                        this.tableData=[]
                    }
                })
                .catch(function(error) {
                    Indicator.close()
                    console.log(error)
                })
            },
            /**
             * 返回的方法
             */
            handleBack(){
                if(Indicator){
                    Indicator.close()
                }
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            },
            /**
             * 日期增加的方法
             */
            handleDateAdd(param){
                if (param.canAdd) {
                    this.requestDate();
                }
            },
            /**
             * 日期减少的方法
             */
            handleDateReduce(param){
                if (param.canReduce) {
                    this.requestDate();
                }
            },
            /**
             * 时间选择器时间发生改变时调用的方法
             */
            handleDateChange(date){
                this.requestDate();
            },
            /**
             * 设置表格列单元格样式
             * */
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
            /**
             * 点击查询按钮后的方法
             */
            handleSelect(){
                if(this.selectedJM.trim()!=''){
                    this.tableData=this.baseData.filter((item)=>{
                        return item.jm.toLowerCase()==this.selectedJM.toLowerCase()
                    })
                    if(this.tableData.length==0){
                        showToast("没有该井的数据",POSITION.middle,3000)
                    }
                }else{
                    this.tableData=this.baseData
                }
            },
            /**
             * 显示查询模态框时的方法
             */
            handleShowSelect(){
                $("#ModalSelect").modal('show')
                this.selectedJM=''
                //获取施工单位的列表
                let sgdws=new Set();
                if(this.baseData.length>0){
                    this.baseData.forEach((item)=>{
                        sgdws.add(item.sgdw)
                    })
                    this.sgdwList=[]
                    for(var sgdw of sgdws){
                        this.sgdwList.push(sgdw)
                    }
                    this.jmList=this.baseData
                }
            },
            /**
             * 搜索框自动完成
             */
            handleInstantChange(){
                this.suggestions=[]
                if(this.jmList.length>0){
                    this.jmList.forEach((item)=>{
                        if(item.jm.toLowerCase().indexOf(this.selectedJM.toLowerCase())!=-1){
                            this.suggestions.push({
                                original_title:item.jm
                            })
                        }
                    })
                }
            },
            /**
             * 表格行点击回掉
             */
            handleRowClick(rowIndex, rowData, column){
                this.selectedRow=rowData
                $("#ModalWellMessage").modal('show')
            }
        },
        watch:{
            selectedSGDW:function(){
                if(this.selectedSGDW=="全部"){
                    this.jmList=this.baseData
                }else{
                    this.jmList=this.baseData.filter((item)=>{
                        return item.sgdw==this.selectedSGDW
                    })
                    this.selectedJM=''
                }
            }
        },
        components: {
            'oms2-date-picker-daily': DatePickerDaily
        }
    }
</script>

<style lang="scss">
    #DailyOfKeyWell1{
            width:600px;
            height:360px;
            transform:rotate(90deg);
            -ms-transform:rotate(90deg); 	/* IE 9 */
            -moz-transform:rotate(90deg); 	/* Firefox */
            -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
            -o-transform:rotate(90deg); 	/* Opera */

            transform-origin:160px 160px;
            position:absolute;
            z-index:2000;

    }
    .oms2-list-item-content{
        text-align: left;
        padding-left:0px;
        padding-bottom:1rem;
    }
    .oms2-list-divider{
        text-align: center;
        padding-top:0px !important;
        padding-bottom:0px !important;
        margin-bottom:10px;
    }
    .oms2-right{
        text-align: right;
    }

    //改变搜索框样式
    .sbx-google{
        width:100% !important;
    }
    .sbx-google__submit{
        display: none;
    }
    .sbx-google__input{
        padding-right:11px;
    }
    .sbx-google__reset{
        right:10px;
    }
    //改变搜索框样式  end

</style>
