<template>
    <div ip="DailyOfKeyWell">
        <header>
            <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
            </mt-header>
        </header>
        <h4>井下作业工作量统计月报</h4>
        <h5>（国内）</h5>
        <!-- <oms2-daily-date-picker :date="date" @date-add="handleDateAdd" @date-reduce="handleDateReduce"  @change="change"></oms2-daily-date-picker> -->
        <h6>单位：中国石油</h6>
        <h6>统计日期：2018年3月26日--2018年4月25日</h6>
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
    // import DatePickerDaily from './../../components/DatePickerDaily'
    import { Indicator } from 'mint-ui';
    import timepicker from './../../assets/js/timepicker'
    import { Toast } from "mint-ui"
    export default {
         data() {
            return {
                date: timepicker.startTime,
                columns: [
                    {field: 'danwei', width: 100, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'ceng', width: 50, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'kou', width: 50, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'heji', width: 50, columnAlign: 'center', columnAlign: 'center'},
                    {field: 'yalie', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'suanhua', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'daxiu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'cezuan', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'xiaoji', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'xiaoji-weihu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'qizhongjianbeng-weihu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'xinjingtouchan', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'peihecuoshizuoye', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'qita', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    
                ],

                titleRows: [ //第一行
                             [{fields: ['danwei'], title: '单位', titleAlign: 'center', rowspan: 4},
                              {fields: ['ceng','kou'], title: '试油', titleAlign: 'center', colspan: 2},
                              {fields: ['heji','yalie','suanhua','daxiu','cezuan','xiaoji','xiaoji-weihu','qizhongjianbeng-weihu','xinjingtouchan','peihecuoshizuoye','qita'], title: '井下作业（井次）', titleAlign: 'center', colspan: 11},
                             ],

                             //第二行
                             //基础信息
                             [{fields: ['ceng'], title: '层', titleAlign: 'center',rowspan:3},
                              {fields: ['kou'], title: '口', titleAlign: 'center',rowspan:3},
                              {fields: ['heji'], title: '合计', titleAlign: 'center', rowspan:3},
                              {fields: ['yalie'], title: '压裂', titleAlign: 'center', rowspan:3},
                              {fields: ['suanhua'], title: '酸化', titleAlign: 'center', rowspan:3},
                              {fields: ['daxiu'], title: '大修', titleAlign: 'center', rowspan:3},
                              {fields: ['cezuan'], title: '侧钻', titleAlign: 'center', rowspan:3},
                              {fields: ['xiaoji','xiaoji-weihu','qizhongjianbeng-weihu','xinjingtouchan','peihecuoshizuoye','qita'], title: '小修', titleAlign: 'center', colspan:6},
                             ],

                              //第三行
                             [//进尺
                              {fields: ['xiaoji'], title: '小计', titleAlign: 'center',rowspan:2},
                              {fields: ['xiaoji-weihu','qizhongjianbeng-weihu'], title: '维护性工作量', titleAlign: 'center', colspan:2},
                              {fields: ['xinjingtouchan'], title: '新井投产', titleAlign: 'center', rowspan:2},
                              {fields: ['peihecuoshizuoye'], title: '配合措施作业', titleAlign: 'center', rowspan:2},
                              {fields: ['qita'], title: '其他', titleAlign: 'center', rowspan:2},
                             ],

                              //第四行
                             [
                              {fields: ['xiaoji-weihu'], title: '小计', titleAlign: 'center', rowspan:1},
                              {fields: ['qizhongjianbeng-weihu'], title: '其中检泵', titleAlign: 'center', rowspan:1},
                             ]
                ],
                tableData: [
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanjizuangan":"11","zuanjuzuhe":"11"},

                ],
                }
        },
        methods:{
            handleBack(){
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            },
            handleDateAdd(param){
                if (param.canAdd) {
                    Indicator.open('加载中...')
                    setTimeout(()=>{
                        Indicator.close()
                    },1000)
                }
            },
            handleDateReduce(date){
                Indicator.open('加载中...')
                    setTimeout(()=>{
                        Indicator.close()
                    },1000)
            },
            //设置列单元格样式
            columnCellClass(rowIndex,columnName,rowData){
                if(columnName==='shigongdanwei'||columnName==='duihao'||columnName==='jinghao'){
                    //return 'wu-column-cell-fixed'
                }

            },
            change(date){
                
            }

        },
        components: {
        }
    }
</script>

<style lang="scss">
    h6{
        font-size:12px;
        text-align: left;
        margin-left:10px;
    }
    
</style>



