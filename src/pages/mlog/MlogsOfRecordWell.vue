<template>
    <div>
            <!-- <header>
                <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
                </mt-header>
            </header> -->
            <h4>录井分井动态</h4>
            <!--引入日期控件-->
            <oms2-date-picker-daily :date="date"
                      @date-add="handleDateAdd"
                      @date-reduce="handleDateReduce"
                      @date-change="handleChange">
            </oms2-date-picker-daily>
            <v-table
                is-horizontal-resize
                is-vertical-resize
                style="width:98%;margin-left:1%;font-size:12px"
                :title-row-height=30
                :row-height=30
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
</template>

<script>

    import DatePickerDaily from './../../components/datepicker/DatePickerDaily'//导入日期控件
    import { Indicator } from 'mint-ui';//导入加载动画插件
    import timepicker from './../../components/datepicker/timepicker' //导入时间插件，获取当前时间
    import {getDailyOfMlogWell} from './../../service/mlog/mlogGetData'//导入axios封装函数，包含请求后台路径
    import { Toast } from "mint-ui"

    export default{
        data() {
            return {
                    date: timepicker.startTime,
                    tableData: [],
                    columns: [
                        {field: 'jujname', width: 60, columnAlign: 'center',isResize:true, isFrozen: true},
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
          this.requestDate();
        },
        methods:{
              requestDate() {
                  Indicator.open('加载中...')
                  //this.$axios.get("http://10.88.123.10:8080/mobile/logging/loggingWell?token=a735579b-93fa-4719-aa92-968191372004&rx_token=a735579b-93fa-4719-aa92-968191372004&date="+this.date.time)
                getDailyOfMlogWell(this.date.time)
                  .then((data)=> {
                      console.log("获取到了")
                    Indicator.close()
                    if(data){
                      this.tableData=data.body
                    }else{
                      this.tableData=[]
                    }
                  })
                  .catch(function(error) {
                    Indicator.close()
                    console.log(error)
                  })
                // this.$http('get','/mlog/daily/logWell',{
                //     "date":this.date.time
                //   })
                //     .then((data)=> {
                //       Indicator.close()
                //       if(data){
                //         this.tableData=data
                //       }else{
                //         this.tableData=[]
                //       }
                //     })
                //     .catch(function(error) {
                //       Indicator.close()
                //       console.log(error)
                //     })
              },
              handleBack(){
                  if(Indicator){
                    Indicator.close()
                  }
                  window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
              },

              handleDateAdd(param){
                  if(param.canAdd){
                      this.requestDate();
                  }
              },

              handleDateReduce(param){
                  if(param.canReduce){
                    this.requestDate();
                  }
              },

              //设置列单元格样式
              columnCellClass(rowIndex,columnName,rowData){
                  // if(columnName==='shigongdanwei'||columnName==='duihao'||columnName==='jinghao'){
                  //     //return 'wu-column-cell-fixed'
                  // }
              },

              handleChange(date){
                  this.requestDate();
              },
              //合并单元格
              cellMerge(rowIndex,rowData,field){
                if(field==='jujname'){
                  let jujname=rowData[field]
                  let jujnameList=[]
                  if(jujnameList.indexOf(jujname)==-1){
                    //还没有合并该局级单位
                    let num=0  //记录这个局级单位有多少个
                    for(let i=rowIndex;i<this.tableData.length;i++){
                      if(this.tableData[i].jujname==jujname){
                        num++
                      }
                    }
                    if(num>0){
                      return {
                        colSpan: 1,
                        rowSpan: num,
                        content: jujname,
                        componentName: ''
                      }
                    }
                    jujnameList.push(jujname)
                  }
                }
              }

        },
        components: {
            'oms2-date-picker-daily': DatePickerDaily
        }
    }
</script>
