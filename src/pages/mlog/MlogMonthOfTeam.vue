<template>
  <div >
    <header>
      <!-- <mt-header :title="$route.meta.title" fixed>
              <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
          </mt-header> -->
      <!-- <h5>录井服务队伍月报（国内）</h5> -->
      <oms2-date-picker-monthly :date=date @date-change="handleChange"></oms2-date-picker-monthly>
    </header>
    <v-table
      is-horizontal-resize
      is-vertical-resize
      :height=tablehight
      :title-row-height=30
      :row-height=30
      title-bg-color="#F6F6F6"
      style="width:100%;font-size:12px"
      :columns="columns" :title-rows="titleRows"
      :table-data="tableData"
      :cellMerge="cellMerge"
      :column-cell-class-name="columnCellClass"
      even-bg-color="#F4F4F4"
      row-hover-color="#eee"
      row-click-color="#edF7FF"></v-table>
    <div class='oms2-report-float-right'>数据来源于A7集团系统库录井服务队伍统计月报</div>
  </div>
</template>

<script>
    import DatePickerMonthly from './../../components/datepicker/DatePickerMonthly'
    import { Indicator } from 'mint-ui';
    import { getMlogMonthOfTeam } from './../../service/mlog/mlogGetData'
    import { formatDate,addMonth } from '../../service/utils/date/date'
    export default {
        data(){
          return{
            tablehight:0,
            date: {
              time:formatDate(new Date(),'yyyy-MM')
            },
            tableData: [],
            columns: [
              {field: 'jujorgName', width: 60, columnAlign: 'left', isFrozen: true},
              {field: 'cjorgName', width: 140, columnAlign: 'left',isFrozen: true},
              {field: 'totalActual', width: 40, columnAlign: 'right',isResize:true},
              {field: 'totalEmploy', width: 50, columnAlign: 'right',isResize:true},
              {field: 'totalRate', width: 60, columnAlign: 'right',isResize:true},
              {field: 'synthesizeWellActual', width: 40, columnAlign: 'right',isResize:true},
              {field: 'synthesizeWellEmploy', width: 40, columnAlign: 'right',isResize:true},
              {field: 'gasLogWellActual', width: 40, columnAlign: 'right',isResize:true},
              {field: 'gasLogWellEmploy', width: 40, columnAlign: 'right',isResize:true},
            ],

            titleRows: [ //第一行
              [{fields: ['jujorgName','cjorgName'], title: '<span class="title1">队伍类型</span><span class="title2">单位</span>', titleAlign: 'center', rowspan: 2,colspan: 2,titleCellClassName:'oms2-title-cell-duijiao'},
                //[{fields: ['jujorgName','cjorgName'], title: '单位', titleAlign: 'center', rowspan: 2,colspan: 2},
                {fields: ['totalActual','totalEmploy','totalRate'], title: '合计', titleAlign: 'center', colspan: 3},
                {fields: ['synthesizeWellActual','synthesizeWellEmploy'], title: '综合录井队', titleAlign: 'center', colspan: 2},
                {fields: ['gasLogWellActual','gasLogWellEmploy'], title: '气测录井队', titleAlign: 'center', colspan: 2},
              ],

              //第二行
              //基础信息
              [{fields: ['totalActual'], title: '实有(支)', titleAlign: 'center'},
                {fields: ['totalEmploy'], title: '动用(支)', titleAlign: 'center'},
                {fields: ['totalRate'], title: '动用率(%)', titleAlign: 'center'},
                {fields: ['synthesizeWellActual'], title: '实有(支)', titleAlign: 'center'},
                {fields: ['synthesizeWellEmploy'], title: '动用(支)', titleAlign: 'center'},
                {fields: ['gasLogWellActual'], title: '实有(支)', titleAlign: 'center'},
                {fields: ['gasLogWellEmploy'], title: '动用(支)', titleAlign: 'center'},
              ],
            ],
          }
        },
        created(){
          this.requestData();
          this.tablehight=window.innerHeight-80
        },
        methods:{
          //请求数据方法
          requestData(){
            Indicator.open('加载中...')
            let nextMonth=addMonth(this.date.time,1,'yyyy-MM')
            getMlogMonthOfTeam(this.date.time+'-01',nextMonth+'-01').then((data)=>{
              Indicator.close()
              if(data.body){
                this.tableData=data.body
                //检查是否含有所有地区jujorgName
                let jujorgNames=[{'jujorgName':'集团总计','cjorgName':''},
                  {'jujorgName':'大庆钻探','cjorgName':'小计'},
                  {'jujorgName':'大庆钻探','cjorgName':'录井一公司'},
                  {'jujorgName':'大庆钻探','cjorgName':'录井二公司'},
                  {'jujorgName':'西部钻探','cjorgName':'小计'},
                  {'jujorgName':'西部钻探','cjorgName':'吐哈录井工程公司'},
                  {'jujorgName':'西部钻探','cjorgName':'克拉玛依录井工程公司'},
                  {'jujorgName':'长城钻探','cjorgName':'小计'},
                  {'jujorgName':'长城钻探','cjorgName':'录井公司'},
                  {'jujorgName':'渤海钻探','cjorgName':'小计'},
                  {'jujorgName':'渤海钻探','cjorgName':'第一录井公司'},
                  {'jujorgName':'渤海钻探','cjorgName':'第二录井公司'},
                  {'jujorgName':'川庆钻探','cjorgName':'小计'},
                  {'jujorgName':'川庆钻探','cjorgName':'地研院'},
                  {'jujorgName':'中油测井','cjorgName':'小计'},
                  {'jujorgName':'中油测井','cjorgName':'长庆分公司'},
                ]
                //let jujorgNames=['集团总计','大庆钻探','西部钻探','长城钻探','渤海钻探','川庆钻探','中油测井']
                let jujorgNameFromDate=[]
                for (var date of this.tableData) {
                  jujorgNameFromDate.push({
                    'jujorgName':date.jujorgName,
                    'cjorgName':date.cjorgName
                  })
                }
                let include=false;  //判断是否存在
                for(var jujorgNa of jujorgNames) {
                  include = false;
                  for (var juji of jujorgNameFromDate) {
                    if (juji.jujorgName == jujorgNa.jujorgName && juji.cjorgName == jujorgNa.cjorgName) {
                      include = true
                    }
                  }
                  if (!include) {
                    //不存在需要添加
                    let newItem = {
                      'jujorgName': jujorgNa.jujorgName,
                      'cjorgName': jujorgNa.cjorgName,
                      remark: 'Not exist'
                    }
                    this.tableData.push(newItem)
                  }
                }
                //排序
                this.tableData.sort((pre,next)=>{
                  let preIndex=-1
                  let nextIndex=-1
                  let index=0;
                  for(var item of jujorgNames){
                    if(item.jujorgName==pre.jujorgName&&item.cjorgName==pre.cjorgName){
                      preIndex=index
                    }
                    if(item.jujorgName==next.jujorgName&&item.cjorgName==next.cjorgName){
                      nextIndex=index
                    }
                    if(preIndex!=-1&&nextIndex!=-1){
                      break
                    }
                    index++
                  }
                  return preIndex-nextIndex
                })
                //排序
                // this.tableData.sort((pre,next)=>{
                //   let preIndex=jujorgNames.indexOf(pre.jujorgName)
                //   let nextIndex=jujorgNames.indexOf(next.jujorgName)
                //   return preIndex-nextIndex
                // })
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
           if (field === 'jujorgName' && rowData[field] === '集团总计') {
             return {
               colSpan: 2,
               rowSpan: 1,
               content: '集团总计',
               componentName: ''
             }
           }
           if(field==='jujorgName') {
             let jujorgName = rowData[field]
             let jujorgNameList = []
             if (jujorgNameList.indexOf(jujorgName) == -1) {
               //还没有合并该局级单位
               let num = 0  //记录这个局级单位有多少个
               for (let i = rowIndex; i < this.tableData.length; i++) {
                 if (this.tableData[i].jujorgName == jujorgName) {
                   num++
                 }
               }
               if (num > 0) {
                 return {
                   colSpan: 1,
                   rowSpan: num,
                   content: jujorgName,
                   componentName: ''
                 }
               }
               jujorgNameList.push(jujorgName)
             }
           }
        },
        columnCellClass(rowIndex, columnName, rowData) {
          if(columnName=='jujorgName'&&this.tableData[rowIndex].remark=='Not exist'){
            return 'oms2-item-not-exist'
          }
          if(columnName=='cjorgName'&&this.tableData[rowIndex].remark=='Not exist'){
            return 'oms2-item-not-exist'
          }

        },
        },
        components: {
          'oms2-date-picker-monthly':DatePickerMonthly
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
    .oms2-item-not-exist{
      color:#f00;
    }
    .oms2-title-cell-duijiao:before {
      content: "";
      position: absolute;
      width: 1px;
      height: 208.8px;
      top: 0;
      left: 0;
      background-color: #E3E3E3;
      display: block;
      transform: rotate(-73.3deg);
      transform-origin: top;
      -ms-transform: rotate(-73.3deg);
      -ms-transform-origin: top;
    }
    .title1{
      position: absolute;
      top: 5px;
      right:10px;
    }
    .title2{
      position: absolute;
      top: 40px;
      left:10px;
    }

</style>
