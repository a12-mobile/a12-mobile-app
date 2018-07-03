<template>
  <div id="DrillOfRigstatistics">
    <header>
      <!-- <mt-header :title="$route.meta.title" fixed>
        <mt-button slot="left" @click="handleBack"><i class="fa fa-search"></i></mt-button>
      </mt-header> -->
      <!--<h4>中油油服钻井工作量日报</h4>-->
      <!-- <p>钻机统计表</p> -->
      <!-- <div class='oms2-report-float-right' style="top:40px">数据来源于A7集团系统钻井综合日报</div> -->
      <oms2-date-picker-daily :date="date"
                              @date-change="handleChange">
      </oms2-date-picker-daily>
    </header>
    <v-table
      is-horizontal-resize
      is-vertical-resize
      style="width:100%;font-size:12px"
      :title-row-height=25
      :row-height=30
      :height=tableHeight
      :columns="columns"
      :title-rows="titleRows"
      :table-data="tableData"
      :cellMerge="cellMerge"
      title-bg-color="#F6F6F6"
      even-bg-color="#F4F4F4"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
    <div class='oms2-report-float-right'>数据来源于A7集团系统库钻机统计表</div>
  </div>
</template>

<script>
    import { transToHorizontalScreen } from './../../service/utils/system/screen'
    import { Indicator } from 'mint-ui';
    import timepicker from './../../components/datepicker/timepicker'
    import {formatDate,addMonth,getCurrentDate} from './../../service/utils/date/date'
    export default {
        name: "DrillOfRigstatistics",
      data() {
        return {
          date: {
            time:getCurrentDate('yyyy')-1,
          },
          tableHeight:0,
          tableData: [
            {"orgs":"集团","drivingType":"小计","subtotal":"1212","num1500":"50","num2000":"44","num3000":"204","num3200":"38","num4000":"227","num4500":"4","num5000":"336","num6000":"1","num7000":"290","num8000":"10","num9000":"8"},
            {"orgs":"集团","drivingType":"车装","subtotal":"90","num1500":"","num2000":"19","num3000":"67","num3200":"","num4000":"4","num4500":"","num5000":"","num6000":"","num7000":"","num8000":"","num9000":""},
            {"orgs":"集团","drivingType":"电动","subtotal":"587","num1500":"47","num2000":"14","num3000":"89","num3200":"","num4000":"58","num4500":"","num5000":"148","num6000":"1","num7000":"212","num8000":"10","num9000":"8"},
            {"orgs":"集团","drivingType":"机械","subtotal":"535","num1500":"3","num2000":"11","num3000":"48","num3200":"38","num4000":"165","num4500":"4","num5000":"188","num6000":"","num7000":"78","num8000":"","num9000":""},
            {"orgs":"大庆","drivingType":"小计","subtotal":"231","num1500":"50","num2000":"21","num3000":"78","num3200":"","num4000":"23","num4500":"","num5000":"32","num6000":"","num7000":"27","num8000":"","num9000":""},
            {"orgs":"大庆","drivingType":"车装","subtotal":"4","num1500":"","num2000":"","num3000":"2","num3200":"","num4000":"2","num4500":"","num5000":"","num6000":"","num7000":"","num8000":"","num9000":""},
            {"orgs":"大庆","drivingType":"电动","subtotal":"215","num1500":"47","num2000":"14","num3000":"76","num3200":"","num4000":"21","num4500":"","num5000":"32","num6000":"","num7000":"25","num8000":"","num9000":""},
            {"orgs":"大庆","drivingType":"机械","subtotal":"12","num1500":"3","num2000":"7","num3000":"","num3200":"","num4000":"","num4500":"","num5000":"","num6000":"","num7000":"2","num8000":"","num9000":""},
            {"orgs":"西部","drivingType":"小计","subtotal":"247","num1500":"","num2000":"19","num3000":"45","num3200":"","num4000":"42","num4500":"","num5000":"87","num6000":"","num7000":"50","num8000":"2","num9000":"2"},
            {"orgs":"西部","drivingType":"车装","subtotal":"52","num1500":"","num2000":"17","num3000":"35","num3200":"","num4000":"","num4500":"","num5000":"","num6000":"","num7000":"","num8000":"","num9000":""},
            {"orgs":"西部","drivingType":"电动","subtotal":"71","num1500":"","num2000":"","num3000":"3","num3200":"","num4000":"","num4500":"","num5000":"27","num6000":"","num7000":"37","num8000":"2","num9000":"2"},
            {"orgs":"西部","drivingType":"机械","subtotal":"124","num1500":"","num2000":"2","num3000":"7","num3200":"","num4000":"42","num4500":"","num5000":"60","num6000":"","num7000":"13","num8000":"","num9000":""},
            {"orgs":"长城","drivingType":"小计","subtotal":"206","num1500":"","num2000":"2","num3000":"31","num3200":"4","num4000":"56","num4500":"3","num5000":"65","num6000":"","num7000":"44","num8000":"","num9000":"1"},
            {"orgs":"长城","drivingType":"车装","subtotal":"34","num1500":"","num2000":"2","num3000":"30","num3200":"","num4000":"2","num4500":"","num5000":"","num6000":"","num7000":"","num8000":"","num9000":""},
            {"orgs":"长城","drivingType":"电动","subtotal":"105","num1500":"","num2000":"","num3000":"","num3200":"","num4000":"24","num4500":"","num5000":"37","num6000":"","num7000":"43","num8000":"","num9000":"1"},
            {"orgs":"长城","drivingType":"机械","subtotal":"67","num1500":"","num2000":"","num3000":"1","num3200":"4","num4000":"30","num4500":"3","num5000":"28","num6000":"","num7000":"1","num8000":"","num9000":""},
            {"orgs":"渤海","drivingType":"小计","subtotal":"210","num1500":"","num2000":"1","num3000":"9","num3200":"5","num4000":"50","num4500":"1","num5000":"70","num6000":"","num7000":"67","num8000":"4","num9000":"3"},
            {"orgs":"渤海","drivingType":"电动","subtotal":"91","num1500":"","num2000":"","num3000":"1","num3200":"","num4000":"9","num4500":"","num5000":"23","num6000":"","num7000":"51","num8000":"4","num9000":"3"},
            {"orgs":"渤海","drivingType":"机械","subtotal":"119","num1500":"","num2000":"1","num3000":"8","num3200":"5","num4000":"41","num4500":"1","num5000":"47","num6000":"","num7000":"16","num8000":"","num9000":""},
            {"orgs":"川庆","drivingType":"小计","subtotal":"318","num1500":"","num2000":"1","num3000":"41","num3200":"29","num4000":"56","num4500":"","num5000":"82","num6000":"1","num7000":"102","num8000":"4","num9000":"2"},
            {"orgs":"川庆","drivingType":"电动","subtotal":"105","num1500":"","num2000":"","num3000":"9","num3200":"","num4000":"4","num4500":"","num5000":"29","num6000":"1","num7000":"56","num8000":"4","num9000":"2"},
            {"orgs":"川庆","drivingType":"机械","subtotal":"213","num1500":"","num2000":"1","num3000":"32","num3200":"29","num4000":"52","num4500":"","num5000":"53","num6000":"","num7000":"46","num8000":"","num9000":""},
          ],
          columns: [
            {field: 'orgs', width: 40, columnAlign: 'left', isFrozen: true,isResize: true},
            {field: 'drivingType', width: 40, columnAlign: 'left', isFrozen: true,isResize: true},
            {field: 'subtotal', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num1500', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num2000', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num3000', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num3200', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num4000', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num4500', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num5000', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num6000', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num7000', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num8000', width: 50, columnAlign: 'right', isResize: true},
            {field: 'num9000', width: 50, columnAlign: 'right', isResize: true},
          ],

          titleRows: [ //第一行
            [{fields: ['orgs'], title: '单位', titleAlign: 'center', rowspan: 2},
             {fields: ['drivingType'], title: '驱动类型', titleAlign: 'center', rowspan: 2},
             {fields: ['subtotal'], title: '小计', titleAlign: 'center', rowspan: 2},
             {fields: ['num1500'], title: '1500', titleAlign: 'center', rowspan: 2},
             {fields: ['num2000'], title: '2000', titleAlign: 'center', rowspan: 2},
             {fields: ['num3000'], title: '3000', titleAlign: 'center', rowspan: 2},
             {fields: ['num3200'], title: '3200', titleAlign: 'center', rowspan: 2},
             {fields: ['num4000'], title: '4000', titleAlign: 'center', rowspan: 2},
             {fields: ['num4500'], title: '4500', titleAlign: 'center', rowspan: 2},
             {fields: ['num5000'], title: '5000', titleAlign: 'center', rowspan: 2},
             {fields: ['num6000'], title: '6000', titleAlign: 'center', rowspan: 2},
             {fields: ['num7000'], title: '7000', titleAlign: 'center', rowspan: 2},
             {fields: ['num8000'], title: '8000', titleAlign: 'center', rowspan: 2},
             {fields: ['num9000'], title: '9000', titleAlign: 'center', rowspan: 2},
            ],

          ],

        }
      },
      created(){
        this.tableHeight=window.innerHeight-80
      },
      mounted(){
        this.$ruixin.setWebViewTitle({title:"钻机统计表2017年报"});
        setTimeout(()=>{
          this.$ruixin.supportAutorotate({});
        },200)
      },
      methods: {
        handleBack() {
          if (Indicator) {
            Indicator.close()
          }
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },
        cellMerge(rowIndex, rowData, field) {
          if(field==='orgs'){
            let allorgs=rowData[field];
            //还没有合并该局级单位
            let num=0;  //记录这个局级单位有多少个
            for(let i=rowIndex;i<this.tableData.length;i++){
              if(this.tableData[i].orgs==allorgs){
                num++
              }else{
                break
              }
            }
            if(num>0){
              return {
                colSpan: 1,
                rowSpan: num,
                content: allorgs,
                componentName: ''
              }
            }
          }
        },
        handleChange(date) {

        },
        //合并单位

      },
    }
</script>

<style scoped>

</style>
