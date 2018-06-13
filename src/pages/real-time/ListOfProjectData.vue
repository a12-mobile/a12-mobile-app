<template>
    <div id='ListOfProjectData'>
        <div class="oms2-well-name"><i @click="handleBack" class="fa fa-chevron-left oms2-icon-back"></i> ( {{wellName}} ) </div>
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

    export default {
        data() {
            return {
                tableDataGC: [],
                tableDataQK: [],
                selected: "GC",
                wellName:'',
                wellboreId:'',
                isReceive:false,  //是否接收数据
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
                const wsuri = "ws://localhost:8080/mobile/websocket";
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
                console.log('发送消息')
                this.websock.send(agentData);
            },
            //接受数据
            websocketonmessage(e) {
                if(this.sessionId==''&&!this.isReceive){
                    this.sessionId=e.data
                    setwellboreId(this.wellboreId,this.sessionId)
                    this.isReceive=true
                }
                if(this.isReceive&&e.data[0]=='{'){
                    const redata = JSON.parse(e.data);
                    var item = this.convertJsonToBean(redata);
                    this.tableDataGC.unshift(item)
                }
            },
            //关闭
            websocketclose(e) {
                console.log("connection closed ");
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
            //获取对象属性结果
            getPropertityData(object){
                for(var key in object){
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
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
                // this.$ruixin.closePage({});
            },
        },
        created() {
            this.initWebSocket()
            this.wellName=this.$route.query.wellName
            this.wellboreId=this.$route.query.wellboreId
            if(!this.wellName||this.wellName==''){
                this.wellName='未获取井名'
            }
            this.$ruixin.hideWebViewTitle({});
        },
        watch:{
            selected:function(val,oldval){
                if(val=='QK'){
                    this.tableDataQK=[]
                    this.$toast.showToast('暂无数据')
                }else{
                    this.tableDataGC=[]=this.tableDataGC.slice(0,20)
                }
            }
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