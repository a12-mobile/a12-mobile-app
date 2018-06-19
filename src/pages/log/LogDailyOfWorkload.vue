<template>
    <div id="LogDailyOfWorkload">
      <!-- <h4>测井工作量日报</h4> -->
      <oms2-date-picker-daily :date="date"
                              @date-change="handleChange">
      </oms2-date-picker-daily>
     <!-- <oms2-date-picker-monthly :date=date @date-change="handleChange"></oms2-date-picker-monthly>-->
      <!-- Button trigger modal -->

      <v-table
        is-horizontal-resize
        is-vertical-resize
        :title-row-height=25
        :row-height=30
        title-bg-color="#F6F6F6"
        style="width:100%;font-size:12px"
        :columns="columns"
        :title-rows="titleRows"
        :column-cell-class-name="columnCellClass"
        :table-data="tableData"
        :cell-merge="cellMerge"
        even-bg-color="#F4F4F4"
        row-hover-color="#eee"
        row-click-color="#edF7FF"
      ></v-table>
      <div class='oms2-report-float-right'>数据来源于A7集团系统测井工作量日报</div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import { getDailyOfWorkload } from './../../service/log/logGetData'

    export default {
        data() {
          return {
            date: timepicker.startTime,
            tableData: [],
            columns: [
              {field: 'jjOrgAbb', width:60, columnAlign: 'left', isFrozen: true,isResize:true},
              {field: 'orgAbb', width: 80, columnAlign: 'left', isFrozen: true,isResize:true},
              {field: 'allTimes', width: 40, columnAlign: 'right',isResize:true},
              {field: 'wcTimes', width: 40, columnAlign: 'right',isResize:true},

              {field: 'wjcjWellNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'lyTimes', width: 40, columnAlign: 'right',isResize:true},
              {field: 'wjcjNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'accidentWellNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'sbcxNums', width: 40, columnAlign: 'right',isResize:true},

              {field: 'scTimes', width: 40, columnAlign: 'right',isResize:true},
              {field: 'dcxNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'jcojsNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'zlgyNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'cxcjqtNums', width: 40, columnAlign: 'right',isResize:true},

              {field: 'gcTimes', width: 40, columnAlign: 'right',isResize:true},
              {field: 'hcgzNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'sfcWellNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'cxcjTotals', width: 40, columnAlign: 'right',isResize:true},

              {field: 'skTimes', width: 40, columnAlign: 'right',isResize:true},
              {field: 'spjcjNums', width: 80, columnAlign: 'right',isResize:true},
              {field: 'qphcjNums', width: 60, columnAlign: 'right',isResize:true},
              {field: 'dldccjNums', width: 60, columnAlign: 'right',isResize:true},
              {field: 'xzsqxNums', width: 50, columnAlign: 'right',isResize:true},
              {field: 'zjsqxNums', width: 50, columnAlign: 'right',isResize:true},

              {field: 'wxTimes', width: 40, columnAlign: 'right',isResize:true},
              {field: 'jbqxNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'lycjqtNums', width: 40, columnAlign: 'right',isResize:true},
              {field: 'tgjcjNums', width: 40, columnAlign: 'right',isResize:true},
            ],

            titleRows: [ //第一行
              [{fields: ['jjOrgAbb','orgAbb'], title: '单位名称', titleAlign: 'center', rowspan: 4,colspan:2, titleCellClassName:'wu-title-cell-duijiao'},
                {fields: ['allTimes','wcTimes','wjcjWellNums','lyTimes','wjcjNums','accidentWellNums','sbcxNums','scTimes',
                    'dcxNums','jcojsNums','zlgyNums','cxcjqtNums','gcTimes','hcgzNums','sfcWellNums','cxcjTotals',
                    'skTimes','spjcjNums','qphcjNums','dldccjNums','xzsqxNums','zjsqxNums','wxTimes','jbqxNums',
                    'lycjqtNums','tgjcjNums'], title: '指标名称', titleAlign: 'center', colspan: 26},
              ],

              //第二行
              [{fields: ['allTimes'], title: '总井次', titleAlign: 'center',rowspan:3},//=============/
                {fields: ['wcTimes'], title: '完成井次', titleAlign: 'center',rowspan:3},//==============/
                {fields: ['wjcjWellNums','lyTimes','wjcjNums','accidentWellNums','sbcxNums'], title: '裸眼测井 (井次)', titleAlign: 'center', colspan:5},
                {fields: ['scTimes','dcxNums','jcojsNums','zlgyNums','cxcjqtNums'], title: '生产测井 (井次)', titleAlign: 'center', colspan:5},
                {fields: ['gcTimes','hcgzNums','sfcWellNums','cxcjTotals'], title: '工程测井 (井次)', titleAlign: 'center', colspan:4},
                {fields: ['skTimes','spjcjNums','qphcjNums','dldccjNums','xzsqxNums','zjsqxNums'], title: '射孔', titleAlign: 'center', colspan:6},
                {fields: ['wxTimes','jbqxNums','lycjqtNums','tgjcjNums'], title: '无效井次', titleAlign: 'center', colspan:4},

              ],

              //第三行
              [//裸眼测井（井次）
                {fields: ['wjcjWellNums'], title: '测井口数 (口)', titleAlign: 'center', rowspan:2},
                {fields: ['lyTimes'], title: '合计', titleAlign: 'center', rowspan:2},   //===========/
                {fields: ['wjcjNums'], title: '测井井次', titleAlign: 'center', rowspan:2},
                {fields: ['accidentWellNums'], title: 'LWD', titleAlign: 'center', rowspan:2},
                {fields: ['sbcxNums'], title: '其它', titleAlign: 'center', rowspan:2},

                //生产测井（井次）
                {fields: ['scTimes'], title: '合计', titleAlign: 'center', rowspan:2},//////============//
                {fields: ['dcxNums'], title: '产出剖面', titleAlign: 'center', rowspan:2},
                {fields: ['jcojsNums'], title: '注入剖面', titleAlign: 'center', rowspan:2},
                {fields: ['zlgyNums'], title: '储层参数', titleAlign: 'center', rowspan:2},
                {fields: ['cxcjqtNums'], title: '其它', titleAlign: 'center', rowspan:2},

                //工程测井（井次）
                {fields: ['gcTimes'], title: '合计', titleAlign: 'center', rowspan:2},//=============/
                {fields: ['hcgzNums'], title: '套损检测', titleAlign: 'center', rowspan:2},
                {fields: ['sfcWellNums'], title: '固井质量检测', titleAlign: 'center', rowspan:2},
                {fields: ['cxcjTotals'], title: '其它', titleAlign: 'center', rowspan:2},


                //射孔
                {fields: ['skTimes','spjcjNums','qphcjNums','dldccjNums'], title: '射孔 (井次)', titleAlign: 'center', colspan:4},
                {fields: ['xzsqxNums'], title: '射孔厚度 (m)', titleAlign: 'center', rowspan:2},
                {fields: ['zjsqxNums'], title: '用弹量<br> (万发)', titleAlign: 'center', rowspan:2},

                //无效井次
                {fields: ['wxTimes'], title: '合计', titleAlign: 'center', rowspan:2},  /////=========/
                {fields: ['jbqxNums'], title: '设备', titleAlign: 'center', rowspan:2},
                {fields: ['lycjqtNums'], title: '井况', titleAlign: 'center', rowspan:2},
                {fields: ['tgjcjNums'], title: '其它', titleAlign: 'center', rowspan:2},
              ],

              //第四行
              [//射孔（井次）
                {fields: ['skTimes'], title: '合计', titleAlign: 'center', rowspan:1},//
                {fields: ['spjcjNums'], title: '油管传输射孔', titleAlign: 'center', rowspan:1},
                {fields: ['qphcjNums'], title: '电缆射孔', titleAlign: 'center', rowspan:1},
                {fields: ['dldccjNums'], title: '特殊作业', titleAlign: 'center', rowspan:1},
              ]
            ],

          }
        },
        created(){
          this.requestData();
        },
        mounted(){
          this.$ruixin.setWebViewTitle({title:'测井工作量日报'});
          setTimeout(()=>{
            this.$ruixin.supportAutorotate({});
          },200)
        },
        methods:{
          //请求数据方法
          requestData(){
            Indicator.open('加载中...')
            getDailyOfWorkload(this.date.time).then((data)=>{
              Indicator.close()
              if(data.data){
                this.tableData=data.data
                //检查是否含有所有地区
                let jjOrgAbbnames=[{'jjOrgAbb':'集团总计','orgAbb':null},
                  // {'jjOrgAbb':'长城钻探','orgAbb':'合计'},
                  // {'jjOrgAbb':'长城钻探','orgAbb':'国际测井公司'},
                  // {'jjOrgAbb':'渤海钻探','orgAbb':'合计'},
                  // {'jjOrgAbb':'渤海钻探','orgAbb':'井下作业公司'},
                  // {'jjOrgAbb':'渤海钻探','orgAbb':'油气井测试分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'合计'},
                  {'jjOrgAbb':'中油测井','orgAbb':'长庆分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'西南分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'新疆分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'大庆分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'辽河分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'天津分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'华北分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'青海分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'吐哈分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'塔里木分公司'},
                  {'jjOrgAbb':'中油测井','orgAbb':'国际事业部'},
                  {'jjOrgAbb':'中油测井','orgAbb':'生产测井中心'},
                ]
                let jjOrgAbbFromData=[]
                for(var date of this.tableData){
                  jjOrgAbbFromData.push({
                    'jjOrgAbb':date.jjOrgAbb,
                    'orgAbb':date.orgAbb
                  })
                }
                let include=false;  //判断是否存在
                for(var jjOrgAbbname of jjOrgAbbnames){
                  include=false;
                  for(var juji of jjOrgAbbFromData){
                    if(juji.orgAbb==jjOrgAbbname.orgAbb&&juji.jjOrgAbb==jjOrgAbbname.jjOrgAbb){
                      include=true
                    }
                  }
                  if(!include){
                    //不存在需要添加
                    let newItem={
                      'orgAbb':jjOrgAbbname.orgAbb,
                      'jjOrgAbb':jjOrgAbbname.jjOrgAbb,
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
                  for(var item of jjOrgAbbnames){
                    if(item.orgAbb==pre.orgAbb&&item.jjOrgAbb==pre.jjOrgAbb){
                      preIndex=index
                    }
                    if(item.orgAbb==next.orgAbb&&item.jjOrgAbb==next.jjOrgAbb){
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
            if(rowIndex==0&&field=="jjOrgAbb"){
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
            if(field==='jjOrgAbb'){
              let jjOrgAbb=rowData[field]
              let jjOrgAbbList=[]
              if(jjOrgAbbList.indexOf(jjOrgAbb)==-1){
                //还没有合并该局级单位
                let num=0  //记录这个局级单位有多少个
                for(let i=rowIndex;i<this.tableData.length;i++){
                  if(this.tableData[i].jjOrgAbb==jjOrgAbb){
                    num++
                  }
                }
                if(num>0){
                  return {
                    colSpan: 1,
                    rowSpan: num,
                    content: jjOrgAbb,
                    componentName: ''
                  }
                }
                jjOrgAbbList.push(jjOrgAbb)
              }
            }
          },
          columnCellClass(rowIndex,columnName,rowData){
            if(this.tableData[rowIndex].remark=='Not exist'){
              return 'oms2-item-not-exist'
            }
          }
        },
    }
</script>

<style lang="scss" scoped>
    .oms2-icon{
      margin-left:20px;
      margin-right:20px;
      font-size:18px;
    }
</style>
