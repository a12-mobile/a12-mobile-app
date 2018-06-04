<template>
    <div>
            <!-- <header>
                <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
                </mt-header>
            </header> -->
            <!--<h4>录井分队日报</h4>-->
            <!--引入日期控件-->
            <div class="oms2-fixed">
              <oms2-date-picker-daily :date="date"
                        @date-change="handleChange">
              </oms2-date-picker-daily><span class='oms2-search' @click="handleShowSelect"><i class="fa fa-search"></i></span>
            </div>
            <!-- 查询 Modal -->
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
                      <div class="form-group row">
                        <label class="col-4 col-form-label">施工单位:</label>
                        <div class="col-7">
                          <select id="inputState" class="form-control" v-model="selectedSGDW">
                            <option>全部</option>
                            <option v-for="item in jujnameList">{{item}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-4 col-form-label">井号:</label>
                        <div class="col-7 input-group">
                          <input type="text" class="form-control" placeholder="井号" v-model="selectedJM">
                          <div class="input-group-append" @click="handleInputClean">
                            <i class="fa fa-times input-group-text"></i>
                            <!-- <span class="" id="basic-addon2">m</span> -->
                          </div>
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
            <div class="main-body" ref="wrapper" :style="{'-webkit-overflow-scrolling': scrollMode,'overflow':'auto',height: wrapperHeight + 'px'}">
              <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <div class="oms2-table-content">
                  <v-table
                      is-horizontal-resize
                      is-vertical-resize
                      style="width:100%;font-size:12px"
                      :title-row-height=30
                      :row-height=30
                      :height=tableHeight
                      :columns="columns"
                      :table-data="tableData"
                      :title-rows="titleRows"
                      :cellMerge="cellMerge"
                      row-hover-color="#eee"
                      row-click-color="#edf7ff"
                      even-bg-color="#f4f4f4"
                      title-bg-color="#F6F6F6"
                  ></v-table>
                </div>
              </mt-loadmore>
            </div>
      <div class='oms2-report-float-right'>数据来源于A7集团系统钻井综合日报</div>
    </div>
</template>

<script>

    import DatePickerDaily from './../../components/datepicker/DatePickerDaily'//导入日期控件
    import { Indicator } from 'mint-ui';//导入加载动画插件
    import timepicker from './../../components/datepicker/timepicker' //导入时间插件，获取当前时间
    import { showToast,POSITION } from "./../../service/utils/toast/toast.js"
    import {getDailyOfMlogByPage} from './../../service/mlog/mlogGetData'//导入axios封装函数，包含请求后台路径
    import { Toast } from "mint-ui"

    export default{
        data() {
            return {
                    tableHeight:0,   //表格高度
                    searchCondition: { //分页属性和查询条件
                      pageNo: 1,
                      pageSize: 30,
                    },
                    wrapperHeight: 0,
                    allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                    scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
                    date: timepicker.startTime,
                    tableData: [],
                    baseData: [],
                    jujnameList:[],     //施工单位列表  用于查询使用
                    jmList:[],       //井名列表  用于查询使用
                    selectedRow:{},  //选中的行
                    selectedJM:'',   //查询的井名
                    selectedSGDW:'全部', //查询的施工单位
                    columns: [
                        {field: 'jujname', width: 60, columnAlign: 'left',isResize:true, isFrozen: true},
                        {
                        field: 'serialNum', width: 30, titleAlign: 'center', columnAlign: 'center',
                            formatter: function (rowData, index) {
                                return index + 1
                            }, isFrozen: true
                        },
                        {field: 'wellName', width: 90, columnAlign: 'left',isResize:true, isFrozen: true},
                        {field: 'orgAbb', width: 80, columnAlign: 'left',isResize:true},
                        {field: 'wellSortName', width: 60, columnAlign: 'left',isResize:true},
                        {field: 'drillTeamId', width: 80, columnAlign: 'left',isResize:true},
                        {field: 'servItemName',  width: 60, columnAlign: 'left',isResize:true},
                        {field: 'workStartDate', width: 85, columnAlign: 'right',isResize:true},
                        {field: 'onsiteDate', width: 82, columnAlign: 'right',isResize:true},
                        {field: 'designWellDepth', width: 60, columnAlign: 'right',isResize:true},
                        {field: 'designFormation', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'drillDepth', width: 60, columnAlign: 'right',isResize:true},
                        {field: 'uptoWellForm', width: 50, columnAlign: 'left',isResize:true},
                        {field: 'mudDensity', width: 50, columnAlign: 'right',isResize:true},
                        {field: 'mudViscosity', width: 50, columnAlign: 'right',isResize:true},
                        {field: 'consSumm', width: 150, columnAlign: 'left',isResize:true},
                        {field: 'gasPerSect', width: 80, columnAlign: 'left',isResize:true},
                        {field: 'geologySummarize', width: 250, columnAlign: 'left',isResize:true},
                        {field: 'blockName', width: 100, columnAlign: 'left',isResize:true},
                    ],
                    titleRows: [//第一行
                        [{fields: ['jujname'], title: '施工单位', titleAlign: 'center', rowspan: 2},
                        {fields: ['serialNum'], title: '序号', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellName'], title: '井号', titleAlign: 'center', rowspan: 2},
                        {fields: ['orgAbb'], title: '录井队号', titleAlign: 'center', rowspan: 2},
                        {fields: ['wellSortName'], title: '井别', titleAlign: 'center', rowspan: 2},
                        {fields: ['drillTeamId'], title: '钻井队号', titleAlign: 'center', rowspan: 2},
                        {fields: ['servItemName'], title: '服务名称', titleAlign: 'center', rowspan: 2},
                        {fields: ['workStartDate'], title: '作业开始日期', titleAlign: 'center', rowspan: 2},
                        {fields: ['onsiteDate'], title: '上井日期', titleAlign: 'center', rowspan: 2},
                        {fields: ['designWellDepth','designFormation'], title: '设计', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['drillDepth','uptoWellForm'], title: '钻达', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['mudDensity','mudViscosity'], title: '钻井液', titleAlign: 'center', rowspan: 1,colspan: 2},
                        {fields: ['consSumm'], title: '施工简况', titleAlign: 'center', rowspan: 2},
                        {fields: ['gasPerSect'], title: '气测全量(%)', titleAlign: 'center', rowspan: 2},
                        {fields: ['geologySummarize'], title: '地质情况', titleAlign: 'center', rowspan: 2},
                        {fields: ['blockName'], title: '区块', titleAlign: 'center', rowspan: 2}],
                        //第二行
                        //设计
                        [{fields: ['designWellDepth'], title: '井深(米)', titleAlign: 'center'},
                        {fields: ['designFormation'], title: '目的层', titleAlign: 'center'},
                        //钻达
                        {fields: ['drillDepth'], title: '井深(米)', titleAlign: 'center'},
                        {fields: ['uptoWellForm'], title: '层位', titleAlign: 'center'},
                        //钻井液
                        {fields: ['mudDensity'], title: '密度(g/cm3)', titleAlign: 'center'},
                        {fields: ['mudViscosity'], title: '粘度(秒)', titleAlign: 'center'}]
                    ]
            }
        },
        created(){
          this.loadingDate();
          this.tableHeight=window.innerHeight-80
        },
        methods:{
                loadingDate() {
                  Indicator.open('加载中...')
                  //this.$axios.get("http://10.88.123.10:8080/mobile/logging/loggingWell?token=a735579b-93fa-4719-aa92-968191372004&rx_token=a735579b-93fa-4719-aa92-968191372004&date="+this.date.time)
                getDailyOfMlogByPage(this.date.time,this.searchCondition.pageNo,this.searchCondition.pageSize)
                  .then((data)=> {
                    Indicator.close()
                    if(data){
                      if (data.body) {
                        this.tableData=this.tableData.concat(data.body)
                        this.baseData=this.baseData.concat(data.body)
                        //console.log(this.baseData.length)
                      }
                      // if(data.baseData){
                      //   this.baseData=data.baseData
                      //   console.log(this.baseData.length)
                      // }
                      // this.tableData=data.body
                      // this.baseData=data.body
                      //判断是否还有数据
                      this.isHaveMore(data.isHaveMore)
                    }else{
                      this.tableData=[]
                    }
                  })
                  .catch(function(error) {
                    Indicator.close()
                    console.log(error)
                  })
                // getMlogByCondition(this.date.time,this.searchCondition.pageNo,this.searchCondition.pageSize,this.selectedJM.trim(),this.selectedSGDW().trim())
                //   .then((data)=> {
                //       Indicator.close()
                //       if(data){
                //         if (data.body) {
                //           this.tableData=this.tableData.concat(data.body)
                //           this.baseData=this.baseData.concat(data.body)
                //           //console.log(this.baseData.length)
                //         }
                //         this.isHaveMore(data.isHaveMore)
                //       }else{
                //         this.tableData=[]
                //       }
                //   })
                //   .catch(function(error) {
                //     Indicator.close()
                //     console.log(error)
                //   })
              },
              handleBack(){
                  if(Indicator){
                    Indicator.close()
                  }
                  window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
              },
              //上拉加载
              loadBottom: function() {
                // 上拉加载
                // 分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1
                this.loadingDate()
                this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
              },
              //判断是否还能加载数据
              isHaveMore: function(isHaveMore) {
                // 是否还有下一页，如果没有就禁止上拉刷新
                this.allLoaded = true; //true是禁止上拉加载
                if (isHaveMore) {
                  this.allLoaded = false;
                }else if(isHaveMore==false){
                  showToast('数据加载完毕')
                }
              },

              //设置列单元格样式
              columnCellClass(rowIndex,columnName,rowData){
                  // if(columnName==='shigongdanwei'||columnName==='duihao'||columnName==='jinghao'){
                  //     //return 'wu-column-cell-fixed'
                  // }
              },

              handleChange(date){
                this.tableData=[];
                  this.loadingDate();
              },
              /**
               * 点击查询按钮后的方法
               * 设计初衷：之所以用四个判断是为了减少baseData循环时判断的次数
               */
              handleSelect(){
                if(this.selectedJM.trim()!=''&&this.selectedSGDW=='全部'){
                  //this.loadingDate();
                  //搜索井名
                  this.tableData=this.baseData.filter((item)=>{
                    return item.wellName.toLowerCase().includes(this.selectedJM.toLowerCase())
                  })
                }else if(this.selectedJM.trim()!=''&&this.selectedSGDW!='全部'){
                  //搜索该单位下的井名
                  this.tableData=this.baseData.filter((item)=>{
                    return item.wellName.toLowerCase().includes(this.selectedJM.toLowerCase())&&item.jujname==this.selectedSGDW
                  })
                }else if(this.selectedJM.trim()==''&&this.selectedSGDW!='全部'){
                  //搜索某单位下的井
                  this.tableData=this.baseData.filter((item)=>{
                    return item.jujname==this.selectedSGDW
                  })
                }else{
                  //没有搜索
                  // this.baseData=[];
                  // this.loadingDate();
                  this.tableData=this.baseData
                }
                if(this.tableData.length==0){
                  showToast("没有该井的数据",POSITION.middle,3000)
                }
              },
              /**
               * 显示查询模态框时的方法
               */
              handleShowSelect(){
                $("#ModalSelect").modal('show')
                this.selectedJM=''
                //获取施工单位的列表
                let jujnames=new Set();
                if(this.baseData.length>0){
                  this.baseData.forEach((item)=>{
                    jujnames.add(item.jujname)
                  })
                  this.jujnameList=[]
                  for(var jujname of jujnames){
                    this.jujnameList.push(jujname)
                  }
                  this.jmList=this.baseData
                }
              },
              /**
               * 输入框取消按钮
               */
              handleInputClean(){
                this.selectedJM=''
              },
              //合并单元格
              cellMerge(rowIndex,rowData,field){

              }

        },
        watch:{
          selectedSGDW:function(){
            if(this.selectedSGDW=="全部"){
              this.jmList=this.baseData
            }else{
              this.jmList=this.baseData.filter((item)=>{
                return item.jujname==this.selectedSGDW
              })
              this.selectedJM=''
            }
          }
        },
        mounted() {
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-60;
        },
        components: {
            'oms2-date-picker-daily': DatePickerDaily
        }
    }
</script>

<style lang="scss">
  .oms2-fixed {
    top: 0px;
    background-color: white;
    width: 100%;
    height: 48px;
    position: fixed;
    z-index: 2;
  }
  .oms2-table-content {
    margin-top: 105px;
    .v-table-title-class {
      position: fixed;
      top: 47px;
    }
  }
  .oms2-search{
    position:absolute;
    right:10px;
    top:10px;
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
