<template>
    <div ip="DailyOfKeyWell">
        <!-- <header>
                <mt-header :title="$route.meta.title" fixed>
                    <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
                </mt-header>
            </header> -->
        <oms2-date-picker-daily :date="date" @date-add="handleDateAdd" @date-reduce="handleDateReduce"  @date-change="handleChange"></oms2-date-picker-daily><span class='oms2-search' @click="handleShowSelect"><i class="fa fa-search"></i></span>
        <!-- <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#ModalSelect"><i class="fa fa-search"></i></button> -->
        <!-- Modal -->
        <div class="modal fade" id="ModalSelect" tabindex="-1" role="dialog" aria-labelledby="ModalSelectTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">数据查询</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <!-- <div class="form-group row">
                                <label for="staticEmail" class="col-3 col-form-label">日期:</label>
                                <div class="col-7 center">
                                    <oms2-date-picker-daily :date="date"></oms2-date-picker-daily>
                                </div>
                            </div> -->
                            <div class="form-group row">
                                <label class="col-4 col-form-label">施工单位:</label>
                                <div class="col-7">
                                    <select id="inputState" class="form-control" v-model="selectedSGDW">
                                        <option>全部</option>
                                        <option v-for="item in sgdwList">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-4 col-form-label">井号:</label>
                                <div class="col-7">
                                    <select id="inputState" class="form-control" v-model="selectedJM">
                                        <option>全部</option>
                                        <option v-for="item in jmList">{{item.jm}}</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="button" @click="handleSelect" data-dismiss="modal" class="btn btn-primary">查询</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-table 
            is-horizontal-resize 
            is-vertical-resize 
            :title-row-height=20 
            :row-height=30 
            :row-click="handleRowClick"
            title-bg-color="#F6F6F6" 
            style="width:100%;font-size:12px" 
            :columns="columns" 
            :title-rows="titleRows" 
            :table-data="tableData" 
            :cell-merge="cellMerge"
            even-bg-color="#F4F4F4" row-hover-color="#eee" row-click-color="#edF7FF"></v-table>




        <!-- Modal 具体数据信息 -->
        <div class="modal fade" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{{selectedRow.jm}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <a href="#" class="oms2-list-divider list-group-item list-group-item-dark">基础信息</a>
                            <div class="row">
                                <label class="col-5 oms2-right">施工单位:</label>
                                <p>{{selectedRow.sgdw}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">队号:</label>
                                <p>{{selectedRow.dh}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">井别:</label>
                                <p>{{selectedRow.wellSort}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">井型:</label>
                                <p>{{selectedRow.wellType}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">开钻日期:</label>
                                <p>{{selectedRow.start1Date}}</p>
                            </div>
                            <a href="#" class="oms2-list-divider list-group-item list-group-item-dark">当日动态</a>
                            <div class="row">
                                <label class="col-5 oms2-right">设计井深(m):</label>
                                <p>{{selectedRow.designWellDepth}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">当前井深(m):</label>
                                <p>{{selectedRow.actualWellDepth}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻达层位:</label>
                                <p>{{selectedRow.layername}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">工况:</label>
                                <p>{{selectedRow.project}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">工作内容:</label>
                                <div class="col-7 oms2-list-item-content">{{selectedRow.workContent}}</div>
                            </div>
                            <a href="#" class="oms2-list-divider list-group-item list-group-item-dark ">工作量</a>
                            <div class="row">
                                <label class="col-5 oms2-right">进尺-当日(m):</label>
                                <p>{{selectedRow.dailyDrilledFootage | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-6 oms2-right">进尺-月计划(m):</label>
                                <p>{{selectedRow.monthPlannedDrillingFootage | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">进尺-月累(m):</label>
                                <p>{{selectedRow.cumulMonthDrilledFootage | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">进尺-年累(m):</label>
                                <p>{{selectedRow.cumulYearDrilledFootage | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">完井-月累(口):</label>
                                <p>{{selectedRow.monthCompletion | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">完井-年累(口):</label>
                                <p>{{selectedRow.yearFinish | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻头尺寸型号:</label>
                                <p>{{selectedRow.bitSizeModel}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻压(KN):</label>
                                <p>{{selectedRow.woba | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">排量(L/s):</label>
                                <p>{{selectedRow.deliveryVolume | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">纯钻时间(h):</label>
                                <p>{{selectedRow.onlydrill | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">钻速(r/min):</label>
                                <p>{{selectedRow.drillRotateSpeed}}</p>
                            </div>
                            <div class="row">
                                <label class="col-5 oms2-right">泵压(MPa):</label>
                                <p>{{selectedRow.pumpPressure | ifNumberIsNull}}</p>
                            </div>
                            <a href="#" class="list-group-item list-group-item-dark oms2-list-divider">钻井液性能</a>
                            <div class="row">
                                <label class="col-6 oms2-right">密度-设计(g/cm3):</label>
                                <p>{{selectedRow.designMudPropDendity | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-6 oms2-right">密度-实际(g/cm3):</label>
                                <p>{{selectedRow.mudPropDensity | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-6 oms2-right">粘度(s):</label>
                                <p>{{selectedRow.mudPropViscosity | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-6 oms2-right">失水(ml):</label>
                                <p>{{selectedRow.mudPropWaterLose | ifNumberIsNull}}</p>
                            </div>
                            <div class="row">
                                <label class="col-6 oms2-right">含沙(%):</label>
                                <p>{{selectedRow.mudPropGrittyConsistence | ifNumberIsNull}}</p>
                            </div>
                            <a href="#" class="list-group-item list-group-item-dark oms2-list-divider">套管及钻具</a>
                            <div class="row">
                                <label class="col-6 oms2-right">套管规格(mm*m):</label>
                                <div>{{selectedRow.cannulaSizeModel}}</div>
                            </div>
                        
                        </form>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-primary">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/////单位排序，然后设计井深排序
////////注意   施工区域字段未找到
    import DatePickerDaily from './../../components/datepicker/DatePickerDaily'

    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import { Toast } from "mint-ui"
    import { getDaliyOfKeyWell } from './../../service/drill/drillGetData'
    export default {
         data() {
            return {
                // ruixinApi:new RuixinOpenAPI(),
                date: timepicker.startTime,
                //用于存储井名，查询使用
                baseData:[],
                tableData: [],
                sgdwList:[],
                jmList:[],
                selectedRow:{},
                selectedJM:'全部',
                selectedSGDW:'全部',
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
                    // {field: 'jixiezuansu', width: 70, columnAlign: 'right',isResize:true},
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
                            //   {fields: ['jixiezuansu'], title: '机械钻速(m/h)', titleAlign: 'center', rowspan: 2},
                              {fields: ['pumpPressure'], title: '泵压(MPa)', titleAlign: 'center', rowspan: 2},
                              {fields: ['designMudPropDendity','mudPropDensity'], title: '密度(g/cm3)', titleAlign: 'center', colspan:2},

                              {fields: ['mudPropViscosity'], title: '粘度(s)', titleAlign: 'center', rowspan: 2},
                              {fields: ['mudPropWaterLose'], title: '失水(ml)', titleAlign: 'center', rowspan: 2},
                              {fields: ['mudPropGrittyConsistence'], title: '含砂(%)', titleAlign: 'center', rowspan: 2},
                            //   //套管及钻具
                            //   {fields: ['taoguanguige'], title: '套管规格(mmX米)', titleAlign: 'center', rowspan: 2},
                            //   {fields: ['zuanjuzuhe'], title: '钻具组合', titleAlign: 'center', rowspan: 2},
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
            this.requestDate();
        },
        methods:{
            requestDate() {
                Indicator.open('加载中...')
                // getDaliyOfKeyWell(this.date.time)
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
            handleBack(){
                if(Indicator){
                    Indicator.close()
                }
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
            cellMerge(rowIndex,rowData,field){
                if(rowData[field]==-1){
                    return {
                        colSpan: 1,
                        rowSpan: 1,
                        content: '',
                        componentName: ''
                    }
                }
                // if(field==='sgdw'){
                //     let juOrgabb=rowData[field]
                //     let juOrgList=[]
                //     if(juOrgList.indexOf(juOrgabb)==-1){
                //         //还没有合并该局级单位
                //         let num=0  //记录这个局级单位有多少个
                //         for(let i=rowIndex;i<this.tableData.length;i++){
                //             if(this.tableData[i].sgdw==juOrgabb){
                //                 num++
                //             }
                //         }
                //         if(num>0){
                //             return {
                //                 colSpan: 1,
                //                 rowSpan: num,
                //                 content: juOrgabb,
                //                 componentName: ''
                //             }
                //         }
                //         juOrgList.push(juOrgabb)
                //     }
                // }
            },
            handleChange(date){
                this.requestDate();
            },
            handleSelect(){
                    if(this.selectedJM!='全部'){
                        this.tableData=this.baseData.filter((item)=>{
                            return item.jm==this.selectedJM
                        })
                    }else{
                        this.tableData=this.baseData
                    }
            },
            handleShowSelect(){
                $("#ModalSelect").modal('show')
                //获取施工单位的列表
                let sgdws=new Set();
                this.baseData.forEach((item)=>{
                    sgdws.add(item.sgdw)
                })
                this.sgdwList=[]
                for(var sgdw of sgdws){
                    this.sgdwList.push(sgdw)
                }
                this.jmList=this.baseData
            },
            //行点击回掉
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
                    this.selectedJM='全部'
                }
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
    .oms2-search{
        position:absolute;
        right:10px;
        top:10px;
    }
    .oms2-column-cell-calss{
        // overflow:hidden !important;
        // text-overflow:ellipsis !important;
        // display:-webkit-box;
        // -webkit-box-orient:vertical !important;
        // -webkit-line-clamp:2 !important; 
    }
    .oms2-list-item-content{
        text-align: left;
        padding-left:0px;
        padding-bottom:1rem;
    }
    .oms2-list-divider{
        padding-top:0px;
        padding-bottom:0px;
        margin-bottom:10px;
    }
    .oms2-right{
        text-align: right;
    }

</style>




