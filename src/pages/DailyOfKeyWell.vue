<template>
    <div ip="DailyOfKeyWell">
        <header>
            <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
            </mt-header>
        </header>
        <div class="wu-frame">
            <!-- <span>日期：</span> -->
            <button type="button" class="btn btn-sm btn-outline-primary wu-margin" @click="handleDateReduce">前一天</button>
            <date-picker :date="date" :option="option"></date-picker>
            <button type="button" class="btn btn-sm btn-outline-primary wu-margin" @click="handleDateAdd">后一天</button>
        </div>
        <v-table
            is-horizontal-resize
            is-vertical-resize
            style="width:98%;margin-left:1%;font-size:12px"
            :columns="columns"
            :title-rows="titleRows"
            :table-data="tableData"
            :column-cell-class-name="columnCellClass"
            even-bg-color="#f4f4f4"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
    ></v-table>
    </div>
</template>


<script>
    import { Indicator } from 'mint-ui';
    import timepicker from './../assets/js/timepicker'
    import myDatepicker from 'vue-datepicker'
    import {addDate, compareDate, getCurrentDate} from './../assets/js/date'
    import { Toast } from "mint-ui"
    export default {
         data() {
            return {
                date: timepicker.startTime,
                currentDate:getCurrentDate(),
                option: timepicker.option,
                value:11,
                columns: [
                    {field: 'shigongdanwei', width: 50, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'duihao', width: 50, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'jinghao', width: 50, columnAlign: 'center', columnAlign: 'center', isFrozen: true},
                    {field: 'jingbie', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'jingxing', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'shigongquyu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'kaizuanriqi', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'shejijingshen', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'dangqianjingshen', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'zuandacengwei', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'gongkuang', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'gongzuoneirong', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'dangri', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'yuejihua', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'yuelei-jinchi', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'nianlei-jinchi', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'yuelei-wankou', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'nianlei-wankou', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'zuantouchicun', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'zuanya', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'pailiang', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'chunzuanshijian', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'zuansu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'jixiezuansu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'bengya', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'sheji', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'shiji', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'niandu', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'shishui', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'hansha', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'taoguanguige', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'zuanjuzuhe', width: 70, columnAlign: 'center', columnAlign: 'center',isResize:true},
                ],

                titleRows: [ //第一行
                             [{fields: ['shigongdanwei'], title: '施工单位', titleAlign: 'center', rowspan: 4,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['duihao'], title: '队号', titleAlign: 'center', rowspan: 4,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['jinghao'], title: '井号', titleAlign: 'center', rowspan: 4,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['jingbie', 'jingxing', 'shigongquyu','kaizuanriqi'], title: '基础信息', titleAlign: 'center', colspan: 4,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['shejijingshen', 'dangqianjingshen','zuandacengwei','gongkuang','gongzuoneirong'], title: '当日动态', titleAlign: 'center', colspan: 5,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['dangri','yuejihua','yuelei-jinchi','nianlei-jinchi','yuelei-wankou','nianlei-wankou'], title: '工作量', titleAlign: 'center', colspan: 6,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['zuantouchicun','zuanya','pailiang','chunzuanshijian','zuansu','jixiezuansu','bengya'], title: '钻头及钻井参数', titleAlign: 'center', colspan: 7,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['sheji','shiji','niandu','shishui','hansha'], title: '钻井液性能', titleAlign: 'center', colspan: 5,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['taoguanguige','zuanjuzuhe',], title: '套管及钻具', titleAlign: 'center', colspan: 2,titleCellClassName:'wu-title-cell-fixed'},
                             ],

                             //第二行
                             //基础信息
                             [{fields: ['jingbie'], title: '井别', titleAlign: 'center',rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['jingxing'], title: '井型', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['shigongquyu'], title: '施工区域', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['kaizuanriqi'], title: '开钻日期', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},

                              //当日动态
                              {fields: ['shejijingshen'], title: '设计井深', titleAlign: 'center',rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['dangqianjingshen'], title: '当前井深', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['zuandacengwei'], title: '钻打层位', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['gongkuang'], title: '工况', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['gongzuoneirong'], title: '工作内容', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},

                              //工作量
                              {fields: ['dangri','yuejihua','yuelei-jinchi','nianlei-jinchi',], title: '进尺(米)', titleAlign: 'center',colspan:4,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['yuelei-wankou','nianlei-wankou'], title: '完井(口)', titleAlign: 'center', colspan:2,titleCellClassName:'wu-title-cell-fixed'},

                              //钻头及钻井参数
                              {fields: ['zuantouchicun'], title: '钻头尺寸型号', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['zuanya'], title: '钻压(KN))', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['pailiang'], title: '排量(L/s)', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['chunzuanshijian'], title: '纯钻时间(h)', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['zuansu'], title: '转速(r/min)', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['jixiezuansu'], title: '机械钻速(m/h)', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['bengya'], title: '泵压(MPa)', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},

                              //钻井液性能
                              {fields: ['sheji','shiji','niandu','shishui','hansha'], title: '泥浆', titleAlign: 'center', colspan:5,titleCellClassName:'wu-title-cell-fixed'},

                              //套管及钻具
                              {fields: ['taoguanguige'], title: '套管规格(mmX米)', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['zuanjuzuhe'], title: '钻具组合', titleAlign: 'center', rowspan:3,titleCellClassName:'wu-title-cell-fixed'},
                             ],

                              //第三行
                             [//进尺
                              {fields: ['dangri'], title: '当日', titleAlign: 'center',rowspan:2,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['yuejihua'], title: '月计划', titleAlign: 'center', rowspan:2,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['yuelei-jinchi'], title: '月累', titleAlign: 'center', rowspan:2,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['nianlei-jinchi'], title: '年累', titleAlign: 'center', rowspan:2,titleCellClassName:'wu-title-cell-fixed'},

                              //完井
                              {fields: ['yuelei-wankou'], title: '月累', titleAlign: 'center', rowspan:2,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['nianlei-wankou'], title: '年累', titleAlign: 'center', rowspan:2,titleCellClassName:'wu-title-cell-fixed'},

                              //密度(g/cm3)
                              {fields: ['sheji','shiji'], title: '密度(g/cm3)', titleAlign: 'center', colspan:2,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['niandu'], title: '粘度(s)', titleAlign: 'center', rowspan:2,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['shishui'], title: '失水', titleAlign: 'center', rowspan:2,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['hansha'], title: '含砂', titleAlign: 'center', rowspan:2,titleCellClassName:'wu-title-cell-fixed'},
                             ],

                              //第四行
                             [
                              {fields: ['sheji'], title: '设计', titleAlign: 'center', rowspan:1,titleCellClassName:'wu-title-cell-fixed'},
                              {fields: ['shiji'], title: '实际', titleAlign: 'center', rowspan:1,titleCellClassName:'wu-title-cell-fixed'},
                             ]
                ],
                tableData: [
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},
                        {"shigongdanwei":"123","duihao":"111","jinghao":"123","jingbie":"123","jingxing":"12312","shigongquyu":"1111","kaizuanriqi":"11","shejijingshen":"11","dangqianjingshen":"11","dangqianjingshen":"11","zuandacengwei":"11","gongkuang":"11","gongzuoneirong":"11","dangri":"11","yuejihua":"11","yuelei-jinchi":"11","nianlei-jinchi":"11","yuelei-wankou":"11","nianlei-wankou":"11","zuantouchicun":"11","zuanya":"11","pailiang":"11","chunzuanshijian":"11","zuansu":"11","jixiezuansu":"11","bengya":"11","sheji":"11","shiji":"11","niandu":"11","shishui":"11","hansha":"11","taoguanguige":"11","zuanjuzuhe":"11"},

                ],
                }
        },
        methods:{
            handleBack(){
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            },
            handleDateAdd(){
                let compare=compareDate(this.date.time,this.currentDate)
                if(compare>=0){
                    Toast({
                        message:'当前为最新日期',
                        position: 'bottom',
                        duration: 3000,
                    })
                }else{
                    Indicator.open('加载中...')
                    setTimeout(()=>{
                        Indicator.close()
                    },1000)
                    this.date.time=addDate(this.date.time,1)
                }
            },
            handleDateReduce(){
                Indicator.open('加载中...')
                    setTimeout(()=>{
                        Indicator.close()
                    },1000)
                this.date.time=addDate(this.date.time,-1)
            },
            //设置列单元格样式
            columnCellClass(rowIndex,columnName,rowData){
                if(columnName==='shigongdanwei'||columnName==='duihao'||columnName==='jinghao'){
                    //return 'wu-column-cell-fixed'
                }

            },

        },
        components: {
            'date-picker': myDatepicker
        }
    }
</script>

<style lang="scss">
    .wu-title-cell-fixed{
        background-color: $table-title-cell-color-fixed;
    }
    .wu-title-cell-1{
        background-color: $table-title-cell-color-fixed;
    }
    .wu-title-cell-fixed{
        background-color: $table-title-cell-color-fixed;
    }
    .wu-column-cell-fixed{
        background-color:$table-title-cell-color-fixed;
    }

    .wu-frame{
        margin:10px;
    }
    .wu-margin{
        padding-left:25px;
        padding-right:25px;
        margin-left:10px;
        margin-right:10px;
    }

</style>



