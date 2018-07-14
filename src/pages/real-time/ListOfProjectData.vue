<template>
    <div id='ListOfProjectData'>
        <div class="oms2-well-name">
            <i @click="handleBack" class="fa fa-chevron-left oms2-icon-back"></i>
             ( {{wellName}} )
             <i @click="handleRefresh" class="fa fa-refresh oms2-icon-refresh"></i> </div>
        <mt-navbar v-model="selected" style="background-color:#0E4F83;color:#fff">
            <mt-tab-item id="GC">工程数据列表</mt-tab-item>
            <mt-tab-item id="QK">气测数据列表</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="GC">
                <v-table 
                    is-horizontal-resize 
                    is-vertical-resize 
                    style="width:100%;font-size:12px;color:#fff;background-color:#0E4F83;margin-top:3px" 
                    :row-height=30
                    :columns="columnsGC" 
                    :table-data="tableDataGC" 
                    title-bg-color="#0E4F83" 
                    odd-bg-color="#165A92" 
                    even-bg-color="#0E4F83" 
                    row-hover-color="#3177B1"
                    row-click-color="#34383C"></v-table>
            </mt-tab-container-item>
            <mt-tab-container-item id="QK">
                <v-table 
                    is-horizontal-resize 
                    is-vertical-resize 
                    style="width:100%;font-size:12px;color:#fff;background-color:#0E4F83;margin-top:3px" 
                    :row-height=30
                    :columns="columnsQK" 
                    :table-data="tableDataQK" 
                    title-bg-color="#0E4F83" 
                    odd-bg-color="#165A92" 
                    even-bg-color="#0E4F83" 
                    row-hover-color="#3177B1"
                    row-click-color="#34383C"></v-table>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import myDatepicker from 'vue-datepicker'
    import {
        getCurrentTime
    } from './../../service/utils/date/date'
    import { setwellboreId} from './../../service/well/wellService'
    import {
        Toast
    } from "mint-ui"
    import { webSocketUrl } from './../../service/http/config'

    export default {
        data() {
            return {
                tableDataGC: [],
                tableDataQK: [],
                selected: "GC",
                wellName:'',
                wellboreId:'',
                isReceive:false,  //是否接收数据
                isRefresh:true,  //是否更新   第一次进入也算更新
                sessionId:'',   //sessionId
                websock: null,
                columnsGC: [{
                        field: 'time',
                        title: '时间',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isFrozen: true
                    },
                    {
                        field: 'jingshen',
                        title: '井深(m)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'zuantouweizhi',
                        title: '钻头位置(m)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'chidaojingshen',
                        title: '迟到井深(m)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'chidaoshijian',
                        title: '迟到时间(min)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'dagougaodu',
                        title: '大钩高度(m)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'dagoufuhe',
                        title: '大钩负荷(kN)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'zuanya',
                        title: '钻压(kN)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'zhuanpanzhuansu',
                        title: '转盘转速(Rpm)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'niuju',
                        title: '扭矩(kN.m)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'liguanyali',
                        title: '立管压力(MPa)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'taoguanyali',
                        title: '套管压力(MPa)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'zuanshi',
                        title: '钻压(min/m)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                ],
                columnsQK: [{
                        field: 'time',
                        title: '时间',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isFrozen: true
                    },
                    {
                        field: 'quanting',
                        title: '全烃(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'jiawan',
                        title: '甲烷(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'yiwan',
                        title: '乙烷(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'bingwan',
                        title: '丙烷(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'zhengdingwan',
                        title: '正丁烷(%)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'yidingwan',
                        title: '异丁烷(%)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'zhengwuwan',
                        title: '正戊烷(%)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'yiwuwan',
                        title: '异戊烷(%)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'co2',
                        title: '二氧化碳(%)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'h',
                        title: '氢(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'he',
                        title: '氦(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'liuhuaqing1',
                        title: '硫化氢1(ppm)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: 'liuhuaqing2',
                        title: '硫化氢2(ppm)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                ]
            }
        },
        beforeDestroy(){
            this.websock.close()
        },
        methods: {
            initWebSocket() { //初始化weosocket
                //ws地址
                const wsuri = webSocketUrl;
                this.websock = new WebSocket(wsuri);
                // var interval = setInterval(() => {
                //     if (this.websock.readyState == 1) {
                //         clearInterval(interval)
                //         this.websocketsend('0001')
                //     }
                // }, 500)
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;
            },
            //数据发送
            websocketsend(agentData) {
                this.websock.send(agentData);
            },
            //接受数据
            websocketonmessage(e) {
                if(!this.isReceive&&(this.wellboreId==''||!this.wellboreId)){
                    //如果没有井id则显示默认值
                    // this.$toast.showToast("获取井ID失败")
                    console.log("失败")
                }else if(!this.isReceive&&this.isRefresh){
                    this.isRefresh=false
                    this.sessionId=e.data
                    setwellboreId(this.wellboreId,this.sessionId).then((data)=>{
                        console.log(this.wellboreId,data.result)
                        if(data.result=='success'){
                            this.isReceive=true
                        }else{
                            this.$toast.showToast("设置井信息失败")
                        }
                    }).catch((err)=>{
                        this.$toast.showToast("设置井信息失败")
                    })
                }
                if(this.isReceive&&e.data[0]=='{'){
                    const redata = JSON.parse(e.data);
                    var item = this.convertJsonToBean(redata)
                    this.tableDataGC.unshift(item)

                    var item=this.convertJsonToQKBean(redata)
                    this.tableDataQK.unshift(item)
                }
            },
            //关闭
            websocketclose(e) {
                console.log("connection closed");
            },
            /**
             * 测试页面转换
             * 用的实时数据
             * @param {*} data 
             */
            convertJsonToBean(data) {
                var time = getCurrentTime();
                var item = {
                    "time": time,
                    "jingshen": this.getPropertityData(data["8004"]),
                    "zuantouweizhi": this.getPropertityData(data["8005"]),
                    "chidaojingshen": this.getPropertityData(data["8006"]),
                    "chidaoshijian": this.getPropertityData(data["8486"]),
                    "dagougaodu": this.getPropertityData(data["8008"]),
                    "dagoufuhe": this.getPropertityData(data["8010"]),
                    "zuanya": this.getPropertityData(data["8011"]),
                    "zhuanpanzhuansu": this.getPropertityData(data["8012"]),
                    "niuju": this.getPropertityData(data["8013"]),
                    "liguanyali": this.getPropertityData(data["8018"]),
                    "taoguanyali": this.getPropertityData(data["8019"]),
                    "zuanshi": this.getPropertityData(data["8020"])
                }
                return item;
            },
            convertJsonToQKBean(data) {
                var time = getCurrentTime();
                var item = {
                    "time": time,
                    "quanting": this.getPropertityData(data["8219"]),
                    "jiawan": this.getPropertityData(data["8212"]),
                    "yiwan": this.getPropertityData(data["8213"]),
                    "bingwan": this.getPropertityData(data["8214"]),
                    "zhengdingwan": this.getPropertityData(data["8215"]),
                    "yidingwan": this.getPropertityData(data["8216"]),
                    "zhengwuwan": this.getPropertityData(data["8217"]),
                    "yiwuwan": this.getPropertityData(data["8218"]),
                    "co2": this.getPropertityData(data["8204"]),
                    "h": this.getPropertityData(data["8205"]),
                    "he": this.getPropertityData(data["8206"]),
                    "liuhuaqing1": this.getPropertityData(data["8207"]),
                    "liuhuaqing2": this.getPropertityData(data["8208"])
                }
                return item;
            },
            //获取对象属性结果
            getPropertityData(object){
                for(var key in object){
                    if(key=='0'){
                        return 0
                    }
                    if(object[key]){
                        return object[key].toFixed(2)
                    }else{
                        return 0
                    }
                }
            },
            handleSelect(item) {
                this.selectNav = item;
            },
            handleBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$ruixin.closePage({});
                // this.$ruixin.closePage({});
            },
            handleRefresh(){
                this.$toast.showIndicator.open('刷新中...')
                this.websock.close()
                this.initWebSocket()   
                this.isReceive=false
                this.isRefresh=true
                setTimeout(()=>{
                    this.$toast.showIndicator.close()
                    this.$toast.showToast("刷新成功")
                },1000)
            }
        },
        created() {
            this.wellName=this.$route.query.wellName
            this.wellboreId=this.$route.query.wellboreId
            if(!this.wellName||this.wellName==''){
                // this.wellName='克深21'
                this.$toast.showToast("获取井名失败")
            }
            if(!this.wellboreId||this.wellboreId==''){
                this.$toast.showToast("获取井ID失败")
            }
            this.wellboreId="4e70a19b4f3148eca0c80b65b1d5e2ca"
            this.$ruixin.hideWebViewTitle({});
            this.initWebSocket()
        },
        watch:{
            // selected:function(val,oldval){
            //     if(val=='QK'){
            //         this.tableDataQK=[]
            //         this.$toast.showToast('暂无数据')
            //     }else{
            //         this.tableDataGC=this.tableDataGC.slice(0,20)
            //     }
            // },

        },
        components: {
            'date-picker': myDatepicker
        }
    }
</script>

<style lang="scss" >
    #ListOfProjectData {
        background: linear-gradient(to bottom,#0E4F83,#0E4F83,#0272CF);
        height: 100%;
        .oms2-icon-back{
            position:absolute;
            top:1.5rem;
            left:10px;
            font-size:20px;
        }
        .oms2-icon-refresh{
            position:absolute;
            top:1.5rem;
            right:10px;
            font-size:20px;
        }
        .oms2-well-name{
            font-size:20px;
            padding-top:1rem;
            padding-bottom:.5rem;
            text-align:center;
            color:aliceblue;
            border-bottom: 1px solid #e4e4e4;
        }
        .mint-tab-item{
            padding-top:1rem;
            padding-bottom:1rem;
            .mint-tab-item-label{
                font-size:14px !important;
            }
        }
        .mint-navbar .mint-tab-item.is-selected{
            color:#26a2ff !important;
        }
        
        .v-table-body-cell {
            border-style: none;
        }
        .v-table-title-cell{
            border-style: none;
        }
        .v-table-views{
            border-style: none;
        }
        
    }
</style>