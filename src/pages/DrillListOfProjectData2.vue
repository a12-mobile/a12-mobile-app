<template>
    <div>
        <header>
            <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
            </mt-header>
        </header>
        <div class="content" style="margin-left:5px">
            <v-table
             :width="340"
             :height="600"
             :columns="columns"
             :table-data="filterData"
             even-bg-color="#f4f4f4"
             row-hover-color="#eee"
             row-click-color="#edf7ff"
        ></v-table>
        </div>
        <div id="test">

        </div>
    </div>

</template>

<script>
import {
        convertJsonToBean
    } from "./../assets/js/convert"
    import myDatepicker from 'vue-datepicker'
    import {
        Toast
    } from "mint-ui"
    export default {
        data(){
            return {
                tableData:[],
                websock: null,
                columns: [
                           {field: 'time', title:'时间', width: 80, titleAlign: 'center',columnAlign:'center', isFrozen: true},
                           {field: 'jingshen', title: '井深', width: 70, titleAlign: 'center',columnAlign:'center'},
                           {field: 'zuantouweizhi', title: '钻头位置', width: 80, titleAlign: 'center',columnAlign:'center'},
                           {field: 'chidaojingshen', title: '迟到井深', width: 80, titleAlign: 'center',columnAlign:'center'},
                           {field: 'chidaoshijian', title: '迟到时间', width: 80, titleAlign: 'center',columnAlign:'center'},
                           {field: 'dagougaodu', title: '大钩高度', width: 80, titleAlign: 'center',columnAlign:'center'},
                           {field: 'dagoufuhe', title: '大钩负荷', width: 80, titleAlign: 'center',columnAlign:'center'},
                           {field: 'zuanya', title: '钻压', width: 70, titleAlign: 'center',columnAlign:'center'},
                           {field: 'zhuanpanzhuansu', title: '转盘转速', width: 80, titleAlign: 'center',columnAlign:'center'},
                           {field: 'niuju', title: '扭矩', width: 70, titleAlign: 'center',columnAlign:'center'},
                           {field: 'liguanyali', title: '立管压力', width: 80, titleAlign: 'center',columnAlign:'center'},
                           {field: 'taoguanyali', title: '套管压力', width: 80, titleAlign: 'center',columnAlign:'center'},
                           {field: 'zuanshi', title: '钻压', width: 70, titleAlign: 'center',columnAlign:'center'},
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
            //调用websocket获取实时数据
            threadPoxi() {
                //参数
                const agentData = "getMessage";
                //若是ws开启状态
                if (this.websock.readyState === this.websock.OPEN) {
                    this.websocketsend(agentData)
                }
                // 若是 正在开启状态，则等待300毫秒
                else if (this.websock.readyState === this.websock.CONNECTING) {
                    let that = this; //保存当前对象this
                    setTimeout(function() {
                        that.websocketsend(agentData)
                    }, 300);
                }
                // 若未开启 ，则等待500毫秒
                else {
                    this.initWebSocket();
                    let that = this; //保存当前对象this
                    setTimeout(function() {
                        that.websocketsend(agentData)
                    }, 500);
                }
            },
            initWebSocket() { //初始化weosocket
                //ws地址
                const wsuri = "ws:/localhost:8080/a12-mobile/websocket";
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;
            },
            //数据发送
            websocketsend(agentData) {
                this.websock.send(agentData);
            },
            //接受数据
            websocketonmessage(e) {
                const redata = JSON.parse(e.data);
                var item = convertJsonToBean(redata);
                this.tableData.splice(0, 0, item)
            },
            //关闭
            websocketclose(e) {
                if (e["code"] == "1006") {
                    Toast({
                        message: '获取数据失败',
                        position: 'bottom',
                        duration: 3000
                    });
                }
                console.log("connection closed ");
            }
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