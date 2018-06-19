<template>
    <div id="DhMonthlyOfWorkloadGN">
        <!-- <h4>测井工作量统计表</h4> -->
        <oms2-date-picker-monthly :date=date @date-change="handleChange"></oms2-date-picker-monthly>
        <!-- Button trigger modal -->

        <v-table
           is-horizontal-resize
           is-vertical-resize
           :height=tableHeight
           :title-row-height=25
           :row-height=30
           :row-click="handleRowClick"
           style="width:100%;font-size:12px"
           :columns="columns"
           :title-rows="titleRows"
           :column-cell-class-name="columnCellClass"
           :table-data="tableData"
           :cell-merge="cellMerge"
           title-bg-color="#F6F6F6"
           even-bg-color="#F4F4F4"
           row-hover-color="#eee"
           row-click-color="#edF7FF"
        ></v-table>
        <div class='oms2-report-float-right'>数据来源于A7集团系统测井工作量月报</div>
        <!-- Modal 具体数据信息 -->
        <div class="modal fade oms2-font-size" id="ModalWellMessage" tabindex="-1" role="dialog" aria-labelledby="ModalWellMessageTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" style="font-size:14px" id="exampleModalLongTitle">{{selectedRow.juOrgabb}} <b>/</b> {{selectedRow.chuOrgabb}}<span style="padding-left:2rem;font-size:14px">(
                              {{date.time}})</span></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span style="font-size:20px;" aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="oms2-list-divider list-group-item list-group-item-dark">指标名称</div>
                  <div class="row">
                    <label class="col-5 oms2-right">总井次:</label>
                    <p>{{selectedRow.totalWellCount | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">完成井次:</label>
                    <p>{{selectedRow.completeWellCount | ifNumberIsNull}}</p>
                  </div>
                  <div class="oms2-list-divider list-group-item list-group-item-dark">裸眼测井(井次)</div>
                  <div class="row">
                    <label class="col-5 oms2-right">测井口数(口):</label>
                    <p>{{selectedRow.wjcjCount | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">合计:</label>
                    <p>{{selectedRow.lyTotal | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">测井井次:</label>
                    <p>{{selectedRow.wjcjWellcount | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">LWD:</label>
                    <p>{{selectedRow.numberSpare2 | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">其它:</label>
                    <p>{{selectedRow.lyOther | ifNumberIsNull}}</p>
                  </div>
                  <div class="oms2-list-divider list-group-item list-group-item-dark ">生产测井(井次)</div>
                  <div class="row">
                    <label class="col-5 oms2-right">合计:</label>
                    <p>{{selectedRow.scTotal | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">产出剖面:</label>
                    <p>{{selectedRow.ccCount | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">注入剖面:</label>
                    <p>{{selectedRow.zrCount | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">储层参数:</label>
                    <p>{{selectedRow.dcCount | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">其它:</label>
                    <p>{{selectedRow.sccjqt | ifNumberIsNull}}</p>
                  </div>
                  <div class="oms2-list-divider list-group-item list-group-item-dark ">工程测井(井次)</div>
                  <div class="row">
                    <label class="col-5 oms2-right">合计:</label>
                    <p>{{selectedRow.gcTotal | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">套损检测:</label>
                    <p>{{selectedRow.tsTest | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">固井质量检测:</label>
                    <p>{{selectedRow.gjQualityTest | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">其它:</label>
                    <p>{{selectedRow.projectOther | ifNumberIsNull}}</p>
                  </div>
                  <div class="oms2-list-divider list-group-item list-group-item-dark ">射孔(井次)</div>
                  <div class="row">
                    <label class="col-5 oms2-right">合计:</label>
                    <p>{{selectedRow.skTotal | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">油管传输射孔:</label>
                    <p>{{selectedRow.vittaTransfers | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">电缆射孔:</label>
                    <p>{{selectedRow.cableSk | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">特殊作业:</label>
                    <p>{{selectedRow.differentWork | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">射孔厚度(m):</label>
                    <p>{{selectedRow.thicknessSk | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">用弹量(万发):</label>
                    <p>{{selectedRow.bombCount | ifNumberIsNull}}</p>
                  </div>
                  <div class="list-group-item list-group-item-dark oms2-list-divider">无效井次</div>
                  <div class="row">
                    <label class="col-5 oms2-right">合计:</label>
                    <p>{{selectedRow.wxTotal | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">设备:</label>
                    <p>{{selectedRow.nullityEquipment | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">井况:</label>
                    <p>{{selectedRow.nullityWell | ifNumberIsNull}}</p>
                  </div>
                  <div class="row">
                    <label class="col-5 oms2-right">其它:</label>
                    <div>{{selectedRow.nullityOther | ifNumberIsNull}}</div>
                  </div>

                </form>
                <div class="modal-footer">
                  <button type="button" data-dismiss="modal" class="btn btn-primary">返回</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import { getMonthlyOfWorkload } from './../../service/log/logGetData'
    import {formatDate,addMonth,getCurrentDate} from './../../service/utils/date/date'
    export default {
         data() {
            return {
                tableHeight:0,   //表格高度
                selectedRow:{},  //选中的行
                selectedJuOrg:{},// 选中的局级单位
                selectedChuOrg:{},//选中的初级单位
                date: {
                    time:getCurrentDate('yyyy-MM')
                },

                columns: [
                    {field: 'juOrgabb', width:60, columnAlign: 'center', isFrozen: true,isResize:true},
                    {field: 'chuOrgabb', width: 110, columnAlign: 'center', isFrozen: true,isResize:true},
                    {field: 'totalWellCount', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'completeWellCount', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'wjcjCount', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'lyTotal', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'wjcjWellcount', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'numberSpare2', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'lyOther', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'scTotal', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'ccCount', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'zrCount', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'dcCount', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'sccjqt', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'gcTotal', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'tsTest', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'gjQualityTest', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'projectOther', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'skTotal', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'vittaTransfers', width: 80, columnAlign: 'right',isResize:true},
                    {field: 'cableSk', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'differentWork', width: 60, columnAlign: 'right',isResize:true},
                    {field: 'thicknessSk', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'bombCount', width: 50, columnAlign: 'right',isResize:true},
                    {field: 'wxTotal', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'nullityEquipment', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'nullityWell', width: 40, columnAlign: 'right',isResize:true},
                    {field: 'nullityOther', width: 40, columnAlign: 'right',isResize:true},
                ],

                titleRows: [ //第一行
                             [{fields: ['juOrgabb','chuOrgabb'], title: '单位名称', titleAlign: 'center', rowspan: 4,colspan:2, titleCellClassName:'wu-title-cell-duijiao'},
                              {fields: ['totalWellCount','completeWellCount','wjcjCount','lyTotal','wjcjWellcount','numberSpare2','lyOther','scTotal',
                              'ccCount','zrCount','dcCount','sccjqt','gcTotal','tsTest','gjQualityTest','projectOther',
                                        'skTotal','vittaTransfers','cableSk','differentWork','thicknessSk','bombCount','wxTotal','nullityEquipment',
                                        'nullityWell','nullityOther'], title: '指标名称', titleAlign: 'center', colspan: 26},
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
                              {fields: ['lyOther'], title: '其它', titleAlign: 'center', rowspan:2},

                              //生产测井（井次）
                              {fields: ['scTotal'], title: '合计', titleAlign: 'center', rowspan:2},//////============//
                              {fields: ['ccCount'], title: '产出剖面', titleAlign: 'center', rowspan:2},
                              {fields: ['zrCount'], title: '注入剖面', titleAlign: 'center', rowspan:2},
                              {fields: ['dcCount'], title: '储层参数', titleAlign: 'center', rowspan:2},
                              {fields: ['sccjqt'], title: '其它', titleAlign: 'center', rowspan:2},

                              //工程测井（井次）
                              {fields: ['gcTotal'], title: '合计', titleAlign: 'center', rowspan:2},//=============/
                              {fields: ['tsTest'], title: '套损检测', titleAlign: 'center', rowspan:2},
                              {fields: ['gjQualityTest'], title: '固井质量检测', titleAlign: 'center', rowspan:2},
                              {fields: ['projectOther'], title: '其它', titleAlign: 'center', rowspan:2},


                              //射孔
                              {fields: ['skTotal','vittaTransfers','cableSk','differentWork'], title: '射孔 (井次)', titleAlign: 'center', colspan:4},
                              {fields: ['thicknessSk'], title: '射孔厚度 (m)', titleAlign: 'center', rowspan:2},
                              {fields: ['bombCount'], title: '用弹量<br> (万发)', titleAlign: 'center', rowspan:2},

                              //无效井次
                              {fields: ['wxTotal'], title: '合计', titleAlign: 'center', rowspan:2},  /////=========/
                              {fields: ['nullityEquipment'], title: '设备', titleAlign: 'center', rowspan:2},
                              {fields: ['nullityWell'], title: '井况', titleAlign: 'center', rowspan:2},
                              {fields: ['nullityOther'], title: '其它', titleAlign: 'center', rowspan:2},
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
            this.tableHeight=window.innerHeight-80
        },
        mounted(){
            this.$ruixin.setWebViewTitle({title:'测井工作量月报'});
            setTimeout(()=>{
                this.$ruixin.supportAutorotate({});
            },200)
        },
        methods:{
            //请求数据方法
            requestData(){
                Indicator.open('加载中...')
                getMonthlyOfWorkload(this.date.time).then((data)=>{
                    Indicator.close()
                    if(data.data){
                        this.tableData=data.data
                        //检查是否含有所有地区
                        let jujiorgnames=[{'juOrgabb':'集团总计','chuOrgabb':null},
                                        {'juOrgabb':'长城钻探','chuOrgabb':'合计'},
                                        {'juOrgabb':'长城钻探','chuOrgabb':'国际测井公司'},
                                        {'juOrgabb':'渤海钻探','chuOrgabb':'合计'},
                                        {'juOrgabb':'渤海钻探','chuOrgabb':'井下作业公司'},
                                        {'juOrgabb':'渤海钻探','chuOrgabb':'油气井测试分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'合计'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'长庆分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'西南分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'新疆分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'大庆分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'辽河分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'天津分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'华北分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'青海分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'吐哈分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'塔里木分公司'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'国际事业部'},
                                        {'juOrgabb':'中油测井','chuOrgabb':'生产测井中心'},
                                        ]
                        let jujisFromData=[]
                        for(var date of this.tableData){
                            jujisFromData.push({
                                'juOrgabb':date.juOrgabb,
                                'chuOrgabb':date.chuOrgabb
                            })
                        }
                        let include=false;  //判断是否存在
                        for(var jujiorgname of jujiorgnames){
                            include=false;
                            for(var juji of jujisFromData){
                                if(juji.juOrgabb==jujiorgname.juOrgabb&&juji.chuOrgabb==jujiorgname.chuOrgabb){
                                    include=true
                                }
                            }
                            if(!include){
                                //不存在需要添加
                                let newItem={
                                    'juOrgabb':jujiorgname.juOrgabb,
                                    'chuOrgabb':jujiorgname.chuOrgabb,
                                    remark:'Not exist'
                                }
                                this.tableData.push(newItem)
                            }
                        }

                        //排序
                        this.tableData.sort((pre,next)=>{
                            let preIndex=-1
                            let nextIndex=-1
                            let index=0;
                            for(var item of jujiorgnames){
                                if(item.juOrgabb==pre.juOrgabb&&item.chuOrgabb==pre.chuOrgabb){
                                    preIndex=index
                                }
                                if(item.juOrgabb==next.juOrgabb&&item.chuOrgabb==next.chuOrgabb){
                                    nextIndex=index
                                }
                                if(preIndex!=-1&&nextIndex!=-1){
                                    break
                                }
                                index++
                            }
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
                if(rowIndex==0&&field=="juOrgabb"){
                    return {
                        colSpan: 2,
                        rowSpan: 1,
                        content: '集团总计',
                        componentName: ''
                    }
                }
                if(rowData[field]==-1){
                    return {
                        colSpan: 1,
                        rowSpan: 1,
                        content: '',
                        componentName: ''
                    }
                }
                if(field==='juOrgabb'){
                    let juOrgabb=rowData[field]
                    let juOrgList=[]
                    if(juOrgList.indexOf(juOrgabb)==-1){
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
                        juOrgList.push(juOrgabb)
                    }
                }
            },
            columnCellClass(rowIndex,columnName,rowData){
                if(this.tableData[rowIndex].remark=='Not exist'){
                    return 'oms2-item-not-exist'
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
    }
</script>

<style lang="scss">
    .oms2-list-item-content{
      text-align: left;
      padding-left:0rem;
      padding-bottom:1rem;
    }
    .oms2-list-divider{
      text-align: center;
      padding-top:0rem !important;
      padding-bottom:0rem !important;
      margin-bottom:1rem;
    }
    .oms2-right{
      text-align: right;
    }
</style>




