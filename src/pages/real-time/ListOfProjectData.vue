<template>
    <div>
        <div>
            <nav class="navs">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link col active" id="nav-page1-tab" data-toggle="tab" href="#nav-page1" role="tab" aria-controls="nav-page1" aria-selected="false" @click="handleSelect('GC')">工程数据列表</a>
                    <a class="nav-item nav-link col" id="nav-page2-tab" data-toggle="tab" href="#nav-page2" role="tab" aria-controls="nav-page2" aria-selected="false" @click="handleSelect('QK')">气测数据列表</a>
                </div>
            </nav>
        </div>
        <div v-if="selectNav=='GC'" class="content" style="margin-top:10px">
            <v-table 
                is-horizontal-resize 
                is-vertical-resize 
                style="width:100%;font-size:12px;color:#fff" 
                :columns="columns" 
                :table-data="tableData" 
                title-bg-color="#212529"
                odd-bg-color="#2C3034"
                even-bg-color="#212529" 
                row-hover-color="#323539" 
                row-click-color="#323539"></v-table>
        </div>
        <div v-if="selectNav=='QK'">
            这是气测数据列表
        </div>
    </div>
</template>

<script>
    import myDatepicker from 'vue-datepicker'
    import {
        getCurrentTime
    } from './../../service/utils/date/date'
    import {
        Toast
    } from "mint-ui"
    export default {
        data() {
            return {
                tableData: [],
                selectNav: "GC",
                websock: null,
                columns: [{
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
                ]
            }
        },
        methods: {
            handleBack() {
                //关闭web socket通信
                this.websock.close();
                //返回路由
                window.history.length > 1 ?
                    this.$router.go(-1) :
                    this.$router.push('/')
            },
            initWebSocket() { //初始化weosocket
                //ws地址
                const wsuri = "ws://61.158.56.6:8030/websocket/websocket";
                // const wsuri = "ws://10.88.123.11:8080/a12-mobile/websocket";
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
                const redata = JSON.parse(e.data);
                var item = this.convertJsonToBean(redata);
                this.tableData.splice(0, 0, item)
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
                    "jingshen": data["8004"]["1526031312000"],
                    "zuantouweizhi": data["8005"]["1526031312000"],
                    "chidaojingshen": data["8006"]["1526031641000"],
                    "chidaoshijian": data["8486"]["1526031314000"].toFixed(2),
                    "dagougaodu": data["8008"]["1526031312000"].toFixed(2),
                    "dagoufuhe": data["8010"]["1526031312000"],
                    "zuanya": data["8011"]["1526031312000"],
                    "zhuanpanzhuansu": data["8012"]["1526031312000"],
                    "niuju": data["8013"]["1526031312000"],
                    "liguanyali": data["8018"]["1526031312000"],
                    "taoguanyali": data["8019"]["1526031312000"],
                    "zuanshi": data["8020"]["1526031312000"]
                }
                return item;
            },
            handleSelect(item) {
                this.selectNav = item;
            },
        },
        created() {
            this.initWebSocket()
        },
        computed: {
            filterData() {
                return this.tableData.slice(0, 10)
            }
        },
        components: {
            'date-picker': myDatepicker
        }
    }
</script>

<style>

</style>