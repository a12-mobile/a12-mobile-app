<template>
  <div>
    <oms2-header :title="$route.meta.title">
        <span slot="right" class=''>
            <i @click="handleGoToChart()" class="fa fa-area-chart oms2-icon oms2-vertical-divider"></i>
            <i @click="handleGoToList()" class="fa fa-list-alt oms2-icon"></i>
        </span>
    </oms2-header>
    <div id="DrillDailyList">
        <div class="card">
            <div class="card-body">
                <div style="display:inline">
                    <h5 class="card-title">{{wellName}}</h5>
                </div>
                <div class="card-content row">
                
                <p class="col-6">
                    <b>队号：</b>{{well.dh}}
                </p>
                <p class="col-6">
                    <b>施工单位：</b>{{well.sgdw}}
                </p>
                <p class="col-6">
                    <b>井型：</b>{{well.wellType}}
                </p>
                <p class="col-6">
                    <b>开钻日期：</b>{{well.start1Date}}
                </p>
                <p class="col-6">
                    <b>井别：</b>{{well.wellSort}}
                </p>
                <p class="col-6">
                    <b>施工区域：</b>{{well.shigongquyu}}
                </p>
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
            :height=tableHeight
            style="width:100%;font-size:12px;"
            :columns="columns" 
            :title-rows="titleRows" 
            :table-data="tableData" 
            :cell-merge="cellMerge"
            even-bg-color="#F4F4F4" row-hover-color="#eee" row-click-color="#edF7FF"></v-table>
        <div class='oms2-g-report-float-right'>数据来源于A7集团系统钻井重点井日报</div>


        <!-- 查询 Modal -->
        <div class="modal fade oms2-font-size" id="ModalSelect" tabindex="-1" role="dialog" aria-labelledby="ModalSelectTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">数据查询</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span style="font-size:32px" aria-hidden="true">&times;</span>
                                  </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group row">
                                <label class="col-4 col-form-label">施工单位:</label>
                                <div class="col-7">
                                    <select id="inputState" class="form-control  oms2-font-size" v-model="selectedSGDW">
                                        <option>全部</option>
                                        <option v-for="item in sgdwList">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-4 col-form-label">井号:</label>
                                <div class="col-7 input-group">
                                    <input type="text" class="form-control  oms2-font-size" placeholder="井号" v-model="selectedJM">
                                    <div class="input-group-append" @click="handleInputClean">
                                        <i class="fa fa-times input-group-text"></i>
                                        <!-- <span class="" id="basic-addon2">m</span> -->
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary  oms2-font-size" data-dismiss="modal">取消</button>
                            <button type="button" @click="handleSelect" data-dismiss="modal" class="btn btn-primary  oms2-font-size">查询</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- Modal 具体数据信息 -->
        <div class="modal fade oms2-font-size" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title" id="exampleModalLongTitle" style="font-size:18px;font-weight:blod">{{selectedRow.jm}}
                            <span style="padding-left:2rem;font-size:14px">(
                            {{selectedRow.dailyDate}})</span>
                            </p>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true" style="font-size:32px">&times;</span>
                                  </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="oms2-list-divider list-group-item list-group-item-dark">基础信息</div>
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
                            <div class="oms2-list-divider list-group-item list-group-item-dark">当日动态</div>
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
                            <div class="oms2-list-divider list-group-item list-group-item-dark ">工作量</div>
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
                            <div class="oms2-list-divider list-group-item list-group-item-dark ">钻井参数</div>
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
                            <div class="list-group-item list-group-item-dark oms2-list-divider">钻井液性能</div>
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
                            <div class="list-group-item list-group-item-dark oms2-list-divider">套管及钻具</div>
                            <div class="row">
                                <label class="col-6 oms2-right">套管规格(mm*m):</label>
                                <div>{{selectedRow.cannulaSizeModel}}</div>
                            </div>
                        
                        </form>
                        <div class="modal-footer">
                            <!-- <button type="button" data-dismiss="modal" class="btn btn-primary">返回</button> -->
                            <button type="button" @click="closeModel" class="btn btn-primary">返回</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import {dataMonitorUrl} from './../../service/http/config'
    import { Indicator } from 'mint-ui';
    import { getWellDaliyListByWellId } from './../../service/drill/drillGetData'
    import mixin from './../../service/utils/system/mixin'
    export default {
        //  mixins:[mixin.mixin_ruixin],
         data() {
            return {
                tableHeight:0,   //表格高度
                baseData:[],     //对从服务器获取的数据进行备份，方便查询等操作，不许重复向服务器查询
                tableData: [],   //表格中显示的数据
                sgdwList:[],     //施工单位列表  用于查询使用
                selectedRow:{},  //选中的行
                selectedJM:'',   //查询的井名
                selectedSGDW:'全部', //查询的施工单位
                well:{},      //该井信息
                wellId:undefined,
                wellName:"",
                wellboreId:"",
                columns: [
                    // {field: 'jm', width: 85, columnAlign: 'left', isFrozen: true},
                    {field: 'dailyDate', width: 80, columnAlign: 'left', isFrozen: true},
                    // {field: 'dh', width: 70, columnAlign: 'left', isFrozen: false},
                    // {field: 'wellSort', width: 70, columnAlign: 'left',isResize:true},
                    // {field: 'wellType', width: 90, columnAlign: 'left',isResize:true},
                    // {field: 'shigongquyu', width: 70, columnAlign: 'left',isResize:true},
                    // {field: 'start1Date', width: 60, columnAlign: 'right',isResize:true},
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
                             [
                                //  {fields: ['jm'], title: '井号', titleAlign: 'center', rowspan: 3},
                              {fields: ['dailyDate'], title: '日期', titleAlign: 'center', rowspan: 3},
                            //   {fields: ['dh'], title: '队号', titleAlign: 'center', rowspan: 3},
                            //   {fields: ['wellSort', 'wellType', 'shigongquyu','start1Date'], title: '基础信息', titleAlign: 'center', colspan: 4},
                              {fields: ['designWellDepth', 'actualWellDepth','layername','project','workContent'], title: '当日动态', titleAlign: 'center', colspan: 5},
                              {fields: ['dailyDrilledFootage','monthPlannedDrillingFootage','cumulMonthDrilledFootage','cumulYearDrilledFootage','monthCompletion','yearFinish'], title: '工作量', titleAlign: 'center', colspan: 6},
                              {fields: ['bitSizeModel','woba','deliveryVolume','onlydrill','drillRotateSpeed','pumpPressure'], title: '钻头及钻井参数', titleAlign: 'center', colspan: 6},
                              {fields: ['designMudPropDendity','mudPropDensity','mudPropViscosity','mudPropWaterLose','mudPropGrittyConsistence'], title: '钻井液性能', titleAlign: 'center', colspan: 5},
                              {fields: ['cannulaSizeModel',], title: '套管规格(mm*m)', titleAlign: 'center', rowspan: 3},
                             ],

                             //第二行
                             //基础信息
                             [
                            //      {fields: ['wellSort'], title: '井别', titleAlign: 'center',rowspan: 2},
                            //   {fields: ['wellType'], title: '井型', titleAlign: 'center', rowspan: 2},
                            //   {fields: ['shigongquyu'], title: '施工区域', titleAlign: 'center', rowspan: 2},
                            //   {fields: ['start1Date'], title: '开钻日期', titleAlign: 'center', rowspan: 2},

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
            this.tableHeight=window.innerHeight*0.6;

            this.wellId=this.$route.query.wellId
            this.wellName=decodeURI(this.$route.query.wellName)
            this.wellboreId=decodeURI(this.$route.query.wellboreId)
            this.requestDate()
            if(!this.wellId||this.wellId==''){
                this.$toast.showToast("获取井ID失败")
            }else{
                //请求数据
                

            }

        },
        methods:{
            /**
             * 向服务器获取数据的方法
             */
            requestDate() {
                Indicator.open('加载中...')
                getWellDaliyListByWellId(this.wellId)
                .then((data)=> {
                    Indicator.close()
                    if(data){
                        this.tableData=data.data
                        this.well=this.tableData[0]
                        this.baseData=data.data
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
             * 设计初衷：之所以用四个判断是为了减少baseData循环时判断的次数
             */
            handleSelect(){
                if(this.selectedJM.trim()!=''&&this.selectedSGDW=='全部'){
                    //搜索井名
                    this.tableData=this.baseData.filter((item)=>{
                        return item.jm.toLowerCase().includes(this.selectedJM.toLowerCase())
                    })
                }else if(this.selectedJM.trim()!=''&&this.selectedSGDW!='全部'){
                    //搜索该单位下的井名
                    this.tableData=this.baseData.filter((item)=>{
                        return item.jm.toLowerCase().includes(this.selectedJM.toLowerCase())&&item.sgdw==this.selectedSGDW
                    })
                }else if(this.selectedJM.trim()==''&&this.selectedSGDW!='全部'){
                    //搜索某单位下的井
                    this.tableData=this.baseData.filter((item)=>{
                        return item.sgdw==this.selectedSGDW
                    })
                }else{
                    //没有搜索
                    this.tableData=this.baseData
                }
                if(this.tableData.length==0){
                    this.$toast.showToast("没有该井的数据")
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
                }
            },
            /**
             * 输入框取消按钮
             */
            handleInputClean(){
                this.selectedJM=''
            },
            
            /**
             * 表格行点击回掉
             */
            handleRowClick(rowIndex, rowData, column){
                this.selectedRow=rowData
                $("#ModalWellMessage").modal('show')
            },
            closeModel(){
                $("#ModalWellMessage").modal('hide')
            },

            //进入实时数据列表
            handleGoToList() {
                this.$router.push({
                    path: '/real-time/list/project',
                    query: {
                        wellboreId: this.wellboreId,
                        wellName: this.wellName
                    }
                })
            },
            //进入实时曲线列表
            handleGoToChart() {
                location.href = dataMonitorUrl+'?wellBoreId='+this.wellboreId+"&wellName="+encodeURI(encodeURI(this.wellName))
            },
        },
    }
</script>

<style lang="scss">
    .oms2-title-icon{
        font-size:22px !important;
            // position:absolute;
            // right:1rem;
            // top:1rem;
    }
    .oms2-vertical-divider {
            padding-right: 15px; // border-right:1px solid #000;
        }
    .oms2-icon{
        font-size: 16px;
        padding: 3px;
    }
    #DrillDailyList{
        padding-top:$header-height;

        .card{
            box-shadow: 3px 3px 5px #e4e4e4;
            text-align: left;
            // margin-bottom:10px;
            .card-title{
                font-size:24px;
                font-weight: bold;
            }
            .card-content{
                // padding:10px;
                width: 99%
            }
        }
        
        .oms2-list-item-content{
            text-align: left;
            padding-left:0px;
            padding-bottom:10px; 
        }
        .oms2-list-divider{
            text-align: center;
            padding-top:0rem !important;
            padding-bottom:0rem !important;
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
    
    }

</style>