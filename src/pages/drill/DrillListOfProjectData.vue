<template>
    <div id="DrillListOfProjectData">
        <header>
            <mt-header :title="$route.meta.title" fixed>
                <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
                <mt-button v-if="!isQuery" slot="right" @click="isQuery=!isQuery">查询</mt-button>
                <mt-button v-if="isQuery" slot="right" @click="isQuery=!isQuery">收起</mt-button>
            </mt-header>
        </header>
        <div class="content">
            <nav class="navs">
                <div class="nav nav-tabs row" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link col active" id="nav-page1-tab" data-toggle="tab" href="#nav-page1" role="tab" aria-controls="nav-page1" aria-selected="false" @click="handleSelect('page1')">Page1</a>
                    <a class="nav-item nav-link col" id="nav-page2-tab" data-toggle="tab" href="#nav-page2" role="tab" aria-controls="nav-page2" aria-selected="false" @click="handleSelect('page2')">Page2</a>
                    <a class="nav-item nav-link col" id="nav-page3-tab" data-toggle="tab" href="#nav-page3" role="tab" aria-controls="nav-page3" aria-selected="false" @click="handleSelect('page3')">Page3</a>
                    <a class="nav-item nav-link col" id="nav-page4-tab" data-toggle="tab" href="#nav-page4" role="tab" aria-controls="nav-page4" aria-selected="false" @click="handleSelect('page4')">Page4</a>
                </div>
            </nav>
            <div v-if="isQuery">
                <div class="row margin">
                    <span>开始时间：</span>
                    <date-picker :date="startTime" :option="option"></date-picker>
                </div>
                <div class="row margin">
                    <span>结束时间：</span>
                    <date-picker :date="endTime" :option="option"></date-picker>
                </div>
                <button type="button" class="margin btn btn-primary" @click="isQuery=!isQuery">查询</button>
            </div>
            <table class="table table-striped  table-sm">
                <thead class="">
                    <tr v-if="select=='page1'">
                        <th scope="col">时间</th>
                        <th scope="col">井深（m）</th>
                        <th scope="col">钻头位置</th>
                        <th scope="col">迟到井深</th>
                    </tr>
                    <tr v-if="select=='page2'">
                        <th scope="col">时间</th>
                        <th scope="col">迟到时间</th>
                        <th scope="col">大钩高度</th>
                        <th scope="col">大钩负荷</th>
                    </tr>
                    <tr v-if="select=='page3'">
                        <th scope="col">时间</th>
                        <th scope="col">钻压</th>
                        <th scope="col">转盘转速</th>
                        <th scope="col">扭矩</th>
                    </tr>
                    <tr v-if="select=='page4'">
                        <th scope="col">时间</th>
                        <th scope="col">立管压力</th>
                        <th scope="col">套管压力</th>
                        <th scope="col">钻时</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="select=='page1'" v-for="item in filterData">
                        <th scope="row">{{item.time}}</th>
                        <td>{{item.jingshen}}</td>
                        <td>{{item.zuantouweizhi}}</td>
                        <td>{{item.chidaojingshen}}</td>
                    </tr>
                    <tr v-if="select=='page2'" v-for="item in filterData">
                        <th scope="row">{{item.time}}</th>
                        <td>{{item.chidaoshijian}}</td>
                        <td>{{item.dagougaodu}}</td>
                        <td>{{item.dagoufuhe}}</td>
                    </tr>
                    <tr v-if="select=='page3'" v-for="item in filterData">
                        <th scope="row">{{item.time}}</th>
                        <td>{{item.zuanya}}</td>
                        <td>{{item.zhuanpanzhuansu}}</td>
                        <td>{{item.niuju}}</td>
                    </tr>
                    <tr v-if="select=='page4'" v-for="item in filterData">
                        <th scope="row">{{item.time}}</th>
                        <td>{{item.liguanyali}}</td>
                        <td>{{item.taoguanyali}}</td>
                        <td>{{item.zuanshi}}</td>
                    </tr>
                </tbody>
            </table>
            <p v-if="filterData.length==0">暂无数据</p>
            <nav v-if="filterData.length>0" aria-label="Page navigation example w-page">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    import {getCurrentTime} from './../../service/utils//date/date'
    import timepicker from './../../components/datepicker/timepicker';
    import myDatepicker from 'vue-datepicker'
    import {
        Toast
    } from "mint-ui"
    export default {
        data() {
            return {
                isQuery: false,
                startTime: timepicker.startTime,
                endTime: timepicker.endTime,
                option: timepicker.timeOption,
                websock: null,
                select: "page1",
                tableData: [],
            }
        },
        methods: {
            handleSelect(index) {
                this.select = index;
            },
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
                console.log("我执行了")
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
                const wsuri = "ws:/10.88.123.11:8080/oms2-mobile/websocket";
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
      "jingshen": data["8404"]["1526031567000"],
      "zuantouweizhi": data["8008"]["1526031837000"],
      "chidaojingshen": data["8405"]["1526031567000"],
      "chidaoshijian": data["8406"]["1526031567000"],
      "dagougaodu": data["8408"]["1526031567000"],
      "dagoufuhe": data["8490"]["1526031567000"],
      "zuanya": data["8491"]["1526031567000"],
      "zhuanpanzhuansu": data["8492"]["1526031567000"],
      "niuju": data["8493"]["1526031567000"],
      "liguanyali": data["8494"]["1526031567000"],
      "taoguanyali": data["8010"]["1526031837000"],
      "zuanshi": data["8495"]["1526031567000"]
    }
    return item;
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
    .margin {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .content {
        margin-left: 10px;
        margin-right: 10px;
    }
    .w-page {
        float: right !important;
    }
</style>