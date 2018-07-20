<template>
    <div id="chartsOfDataMonitoring" class="container">
        <!--头部-->
        <div class="row1" style="text-align: center;height: 50px;">
            <i class="fa fa-arrow-left" style="left: 10px;position: absolute;line-height: 50px;font-size: 20px;" @click="handleBack()"></i>
            <i class="fa fa-fa-refresh" style="left: 10px;position: absolute;line-height: 50px;font-size: 20px;"></i>
            <span style="color: white;padding: 0px 20px 0px 20px;line-height: 50px;font-size: 20px;font-weight: 100;" id="WellBore">当前井名</span>
            <span style="font-size: 12px;color: black;" hidden id="width_temp">10:31</span>
        </div>
        <div id="myCarousel" class="carousel slide"  data-ride="carousel" data-interval="false">
            <div class="carousel-inner">
                <!--曲线显示部分-->
                <div class="carousel-item active">
                    <!--曲线监测页面头部-->
                    <div class="row" style="height: 50px;">
                        <!--日期显示-->
                        <div style="text-align: center;height: 50px;position: relative;margin-left: auto;margin-right: auto;">
                            <span style="color: white;padding: 0px 20px 0px 20px;line-height: 50px;font-size: 20px;font-weight: 100;font-family: 'Microsoft YaHei UI'">
                                            <i class="fa fa-chevron-left" id="dataTableExpand"></i>
                                                &nbsp;&nbsp;
                                            <i class="fa fa-cog" @click="handleBtnChartSetting" style="color: #3F4889"></i>
                                                &nbsp;&nbsp;<span id="chartDate">2018年5月14日,昼 </span>&nbsp;&nbsp;
                            <i class="fa fa-wrench" id="btn_calendarSetting" style="color: #3F4889"></i> &nbsp;&nbsp;
                            <i class="fa fa-chevron-right" id="dataTableClose"></i>
                            </span>
                        </div>
                        <!--时间段显示-->
                        <!-- <div style="text-align: center;width:100%">
                            <span style="font-size: 15px;font-weight: 100;font-family: 'Microsoft YaHei UI';color: #54FFFF;height: 30px;">
                                            <span id="WellBore">当前井名</span>
                            </span>
                        </div> -->
                    </div>
                    <!--曲线的表头-->
                    <div class="row" style="color: #DDDDDD;" id="dataTable">
                        <div v-for="n in grid" :class="average" style="border-right: 1px solid gray;">
                            <div style="text-align: center;" class="lineSettingButton" v-for="(item,index) in items" @click="handleLineSettingButton(index)" v-bind:data-options="index" v-if="n==item.position&&item.display===true">
                                {{item.name}}<span v-if="item.unit != ''">[{{item.unit}}]</span>
                                <div style="width: 100%;height: 2px;" v-bind:style="{backgroundColor:item.color}"></div>
                                <div class="row" style="font-size: 12px;">
                                    <div class="col-4" style="padding: 0px;">
                                        {{item.limit_min}}
                                    </div>
                                    <div class="col-4" style="padding: 0px;">
                                        {{item.current.toFixed(2)}}
                                    </div>
                                    <div class="col-4" style="padding: 0px;">
                                        {{item.limit_max}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--曲线监测部分-->
                    <div class="row" id="charts" style="margin-left: 0px;margin-right: 0px;">
                        <p class="hidden">{{chartCount}}</p>
                        <div class="" style="width:100%;height: 500px;" id="distChart"></div>
                    </div>
                </div>
                <!--曲线设置部分-->
                <div class="carousel-item">
                    <div class="row" id="vue">
                        <!--数据列表页面的数据项-->
                        <div class="col-6   small-padding lineSettingButton" v-for="(item,index) in items" @click="handleLineSettingButton(index)" v-bind:data-options="index">
                            <div style="text-align: center;color: white;" class="block">
                                <p style="font-size: 30px;padding-top: 15px;margin-bottom: 0px;"><i class="fa fa-cog"></i>
                                </p>
                                <div style="float: left;font-size: 13px;padding-left: 10px;">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                        <!--数据列表块的添加项（加号）-->
                        <div class="col-6 small-padding lineSettingButton" @click="handleLineSettingButton()">
                            <div style="text-align: center;color: white;" class="block">
                                <p style="font-size: 30px;padding-top: 15px;margin-bottom: 0px;"><i class="fa fa-plus-circle"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--模块设置Modal-->
        <div class="modal fade" id="myModal" placement="auto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel" :data-options="item.index">
                            <input v-if="temp.name === null" type="text" class="form-control" placeholder="请输入新数据项名称" v-model="item.name" />
                            <span v-else>{{item.name}}</span>
                        </h4>
                        <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> -->
                        <i class="fa fa-close oms2-icon" data-dismiss="modal" aria-hidden="true"></i>
                    </div>
                    <div class="modal-body">
                        <div class="row" v-if="temp.name ===null">
                            <label for="bottom" class="col-4 control-label">id</label>
                            <div class="col-8">
                                <input type="text" class="form-control" id="id" placeholder="请输入id" v-model="item.id">
                            </div>
                        </div>
                        <div class="row">
                            <label for="color" class="col-4 control-label">曲线颜色</label>
                            <div class="col-8">
                                <input type="text" class="form-control" id="color" placeholder="请输入颜色" v-model="item.color">
                            </div>
                        </div>
                        <div class="row">
                            <label for="bottom" class="col-4 control-label">阈值下限</label>
                            <div class="col-8">
                                <input type="text" class="form-control" id="bottom" placeholder="请输入下限" v-model="item.limit_min">
                            </div>
                        </div>
                        <div class="row">
                            <label for="top" class="col-4 control-label">阈值上限</label>
                            <div class="col-8">
                                <input type="text" class="form-control" id="top" placeholder="请输入上限" v-model="item.limit_max">
                            </div>
                        </div>
                        <div class="row">
                            <label for="top" class="col-4 control-label">显示位置</label>
                            <div class="col-8">
                                <select class="form-control" v-model="item.position">
                                            <option v-for="index in length">{{index}}</option>
                                        </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="offset-4 col-8">
                                <div class="checkbox">
                                    <label>
                                                <input type="checkbox" v-model="item.display">是否显示
                                            </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary btn-sm" id="modalSubmitBtn" @click="handleModalSubmitBtn">
                                    <span v-if="temp.name === null">添加</span>
                                    <span v-else>保存更改</span>
                                </button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--chart设置Modal-->
        <div class="modal fade" id="chartSetModal" placement="auto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title">图表显示设置</p>
                        <i class="fa fa-close oms2-icon" data-dismiss="modal" aria-label="Close"></i>
                        <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button> -->
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <label for="top" class="col-4 control-label">显示数量：</label>
                            <div class="col-8">
                                <input type="text" class="form-control" placeholder="请输入显示数量" v-model.number="count_chartSetting">
                            </div>
                        </div>
                        <div class="row" style="margin:0px;height: 200px;width: 100%;background-color: #31b0d5">
                            <!-- <div class="row" > -->
                            <div v-for="n in count_chartSetting" :class="average" style="border: 2px solid black;box-sizing: border-box;height: 200px;">
                            </div>
                            <!-- </div> -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary btn-sm" @click="handleBtnChartSettingSubmit">提交更改
                                </button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <div class="modal fade" id="wellBoreIdSet" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title">当前选择井:<span id="selectWell" :data-options="currentWellBoreId">{{currentWellName}}</span></p>
                        <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
                        <i class="fa fa-close oms2-icon" data-dismiss="modal" aria-hidden="true"></i>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-8">
                                <input type="text" class="form-control" id="wellName" placeholder="请输入井名">
                            </div>
                            <button type="button" class="btn btn-primary col-4" id="searchWell">搜索</button>
                        </div>
                        <table class="table table-hover" id="wellList">
                            <thead>
                                <tr>
                                    <th class="center">编号</th>
                                    <th class="left">井名</th>
                                    <th class="left">在线状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="text-align: center;" v-for="(item,index) in list" v-bind:id="item.wellBoreId" v-bind:name="item.wellName" @click="setTempWellConfig(item)">
                                    <td>{{index}}</td>
                                    <td class="left">{{item.wellName}}</td>
                                    <td class="left" v-if="item.wellBoreStatus==1">在线</td>
                                    <td class="left" v-if="item.wellBoreStatus==0">离线</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="row">
                            <div class="offset-1 col-3">
                                <button type="button" @click="initWellList(pageCount-1<=1?1:pageCount-1)" class="btn btn-primary">上一页</button>
                            </div>
                            <div class="col-4">
                                <div>{{pageCount}}/{{pages}}</div>
                            </div>
                            <div class="col-3">
                                <button @click="initWellList(pageCount+1>=pages?pages:pageCount+1)" type="button" class="btn btn-primary">下一页</button>
                            </div>
                        </div>
                                <!-- <tr>
                                    <td v-bind:data-options="pageCount-1<=1?1:pageCount-1" class="center" @click="initWellList(pageCount-1<=1?1:pageCount-1)"><button type="button" class="btn btn-primary">上一页</button></td>
                                    <td class="center">{{pageCount}}/{{pages}}</td>
                                    <td v-bind:data-options="pageCount+1>=pages?pages:pageCount+1" class="left" @click="initWellList(pageCount+1>=pages?pages:pageCount+1)"><button type="button" class="btn btn-primary">下一页</button></td>
                                </tr> -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" onclick="changeWellBore()">提交更改</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>
    </div>
</template>

<script>
    import RtData from "./../../service/real-time/items.js"
    import { webSocketUrl } from './../../service/http/config'
    export default {
        data() {
            return {
                // charts:"",                    //charts实例
                isChanged: false, //是否发生了改变
                gridTop: 50, //gridtop
                isDataZoomShow: false, //dataZoom是否显示
                isDataZoomChange: true, //dataZoom是否跟随更新值一起变动
                yAxisData: [], //y坐标轴的数据，此数据跟随option的y轴数据一同变化。当曲线发生了不能融合性的变化后，需要初始化y轴的数据，此时y轴的数据可以直接从此变量获取
                isSendGetProperty: false,
                initSessionId: false, //SESSIONID是否初始化
                NONE_DATA_MSG: "loading...", //获取为空的数据显示的内容
                ITEM_INIT_MIN: 0, //item中默认初始最大值和最小值
                ITEM_INIT_MAX: 50000,
                isItemInit: false, //items是否初始化
                DEPTH_ID: 8004, //深度对应的id
                SOCKET_SESSION_ID: null, //WebSocket SessionId
                SESSION_SPLIT:"%%%%",
                wellBoreId:"",                //获取参数传入的WellBoreId
                wellName:"",                  //获取参数传入的WellName
                WELLBORE_NAME_SPLIT : "&&&&",
                isWellInit:false,
                isSearch:false,
                BASE_URL:"http://1.85.51.153:7005/websocket",
                //ItemListVue 数据的列表块   ItemListVue
                items:RtData.items,
                //初始化井列表   WellListVue
                pageCount:0,
                pageSize:10,
                total:0,
                list:[],
                pages:0,
                currentWellName:"this.wellName",
                currentWellBoreId:"this.wellBoreId" ,
                //初始化曲线头部线条   DataTableVue
                grid:RtData.GRID_COUNT,
                //每个数据的设置面板    ItemModalVue
                item: {
                    id: null,
                    name: null,
                    unit: null,
                    limit_min: 0,
                    limit_max: 0,
                    current: 0,
                    color: null,
                    display: true,
                    position: 0
                },
                temp: {
                    id: null,
                    name: null,
                    unit: null,
                    limit_min: 0,
                    limit_max: 0,
                    current: 0,
                    color: null,
                    display: true,
                    position: 0
                },
                length:RtData.GRID_COUNT,
                //初始化轮播2的功能设置模态框Vue实例   ChartSettingModalVue
                count_chartSetting:RtData.GRID_COUNT,
                //ChartsVue
                charts:null,
                chartCount:RtData.GRID_COUNT,
                //记录拖动前的状态
                startX:0,
                startY:0,
                startTime:0,
                webSock:null,
            }
        },
        computed: {
            average: function() {
                if(this.grid>3){
                    this.$toast.showToast("最多设置3个甬道")
                    this.grid=3
                    this.count_chartSetting=3
                }
                let num = 12 / this.grid
                return "col-" + num;
            },
            average_chartSetting: function () {
                let num = 12 / this.count_chartSetting
                return "col-sm-" + num + " col-xs-" + num + " col-md-" + num
            }
        },
        updated() {
            // //发生变化后，为新添加的dom添加事件
            // this.initDomEvent()
            // this.initChartCss()
            
        },
        beforeCreate() {
        },
        created() {
            //获取传入的参数
            this.wellName = this.$route.query.wellName
            this.wellBoreId = this.$route.query.wellBoreId
            this.wellName="m12"
            this.wellBoreId="a8a0c541d13f4591a2f12808c09ed843"
            if (!this.wellName || this.wellName == '') {
                this.$toast.showToast("获取井名失败")
            }
            if (!this.wellBoreId || this.wellBoreId == '') {
                this.$toast.showToast("获取井ID失败")
            }
            this.initWebSocket()
        },
        mounted() {
            /*设置container高度*/
            $(".container").css("min-height", window.innerHeight);
            // this.$ruixin.hideWebViewTitle({})
            //加载charts配置
            this.loadChartsSettings()
            this.applyChartsSetting()

            //初始化颜色选择器
            this.initColorPicker()
            this.initChartCss()
            this.initDragEvent()
            this.initWellList()
            this.initPageButtonEvent()
            this.wellNameShow()
            this.getFunctionProperties()

        },
        beforeDestroy(){
            this.websock.close()
        },
        watch: {
            count_chartSetting: function() {
                console.log("grid",this.grid,this.count_chartSetting)
                this.grid = this.count_chartSetting
            },
            charts1: {
                handle:function() {
                console.log("charts改变")
                //1.销毁之前chart实例
                this.charts.dispose()
                //2.清空charts
                this.charts = null
                //3.初始化当前chart dom 的css样式
                this.initChartCss()
                //4.创建chart实例
                this.loadChartsSettings();
                //5.将item position全部置0
                this.items.forEach((item, index) => {
                    item.position = 1
                })
                //7设置chart的option
                this.applyChartsSetting()
                this.update()
                },
                deep:true
            },
            chartCount:function(){
                //6.设置item 设置位置信息
                this.length = this.chartCount
            }
            
        },
        methods: {
            initWebSocket() { //初始化websocket
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
                console.log('发送消息')
                this.websock.send(agentData);
            },
            //接受数据
            websocketonmessage(e) {
                // console.log(e.data)
                this.update(e.data)
            },
            //关闭
            websocketclose(e) {
                console.log("connection closed ");
            },
            /**
             * 初始化chart高度
             */
            initChartCss() {
                if ($("#dataTable").css("display") == "none") {
                    $("#distChart").css("height", window.innerHeight - 130)
                } else {
                    $("#distChart").css("height", window.innerHeight - 130 - $("#dataTable").height())
                }
            },
            /**
             * 将charts设置回默认状态（只包含一个默认的chart）
             */
            loadChartsSettings() {
                this.charts = this.$echarts.init(document.getElementById("distChart"))
            },
            /**
             * 根据数量设置甬道样式
             */
            setGridStyle(count = 1) {
                let gridArray = new Array()
                let width = 100 / count
                for (let i = 0; i < count; i++) {
                    gridArray.push({
                        left: i * width + '%',
                        width: width + '%',
                        top: 0,
                        height: $("#distChart").height(),
                        containLabel: true,
                        show: true,
                        borderWidth: 1
                    })
                }
                return gridArray
            },
            /**
             * 设置井名
             */
            wellNameShow() {
                if (this.wellName == null) {
                    $("#WellBore").text("未选择井")
                    return
                } else {
                    $("#WellBore").text(this.wellName)
                }
            },
            /**
             * 坐标轴换行
             */
            changeRow(params) {
                let newParamsName = "" //最终拼接成的字符串
                let paramsNameNumber = params.length //实际标签的个数
                let provideNumber = 5 //每行能显示的字的个数
                let rowNumber = Math.ceil(paramsNameNumber / provideNumber) //换行的话，需要显示几行，向上取整
                //判断标签的个数是否大于规定的个数，如果大于，则进行换行处理，如果不大于，即等于或小于，就返回原标签
                //条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                    //循环每一行，p表示行
                    for (let p = 0; p < rowNumber; p++) {
                        let tempStr = ""
                        let start = p * provideNumber
                        let end = start + provideNumber
                        if (p == rowNumber - 1) {
                            //最后一行的内容，不用还行了
                            tempStr = params.substring(start, paramsNameNumber)
                        } else {
                            tempStr = params.substring(start, end) + "\n"
                        }
                        //最终拼接成的字符串
                        newParamsName += tempStr
                    }
                } else {
                    //将旧标签的值赋给新标签
                    newParamsName = params
                }
                //将最终的字符串返回
                return newParamsName;
            },
            /**
             * 根据参数设置tooltip样式
             */
            getTooltips(params) {
                if (params.length == 0) {
                    return "暂无相关信息"
                }
                let xAxisValue = params[0].axisValue == undefined ? this.NONE_DATA_MSG : (params[0].axisValue.substring(0, 5) + '时的深度为:' + params[0].axisValue.substring(5)) + "米"
                let rootDom = $("<div></div>").append($("<span>" + xAxisValue + "</span>"))
                params.forEach((seriesItem, index) => {
                    let itemValue = seriesItem.value == undefined ? this.NONE_DATA_MSG : seriesItem.value
                    let max, min, unit
                    if (itemValue != this.NONE_DATA_MSG) {
                        items.forEach((myItem, index) => {
                            if (myItem.id == seriesItem.seriesId) {
                                max = myItem.limit_max
                                min = myItem.limit_min
                                unit = myItem.unit
                            }
                        })
                        itemValue = (parseFloat(itemValue) * parseFloat(max) / 100).toFixed(2)
                    }
                    unit = unit == undefined ? "" : unit
                    rootDom.append($("<div></div>").append($(seriesItem.marker)).append($("<span>" + seriesItem.seriesName + ":" + itemValue + unit + "</span>")))
                })
                return rootDom.html()
            },
            /**
             * 初始化chart的position
             */
            applyChartsSetting() {
                let option = {
                    trigger: 'axis',
                    formatter: (params) => {
                        return this.getTooltips(params)
                    },
                    axisPointer: {
                        link: {
                            yAxisIndex: 'all'
                        }
                    },
                    grid: this.setGridStyle(this.count_chartSetting),
                    xAxis: (() => {
                        let xAxisArray = new Array()
                        let count = this.count_chartSetting
                        if (!Number.isNaN(count)) {
                            for (let i = 0; i < count; i++) {
                                let xAxis = {
                                    gridIndex: i,
                                    show: false,
                                    min: 0,
                                    max: 100,
                                    silent: true,
                                    position: "top",
                                    type: 'value',
                                    axisLabel: {
                                        formatter: "{value}"
                                    },
                                    splitLine: {
                                        show: false
                                    }
                                }
                                xAxisArray.push(xAxis)
                            }
                            return xAxisArray
                        }
                    })(),
                    dataZoom: [{
                        type: 'slider',
                        yAxisIndex:(()=> {
                            let indexArray = new Array()
                            for (let i = 0; i < this.count_chartSetting; i++) {
                                indexArray.push(i)
                            }
                            return indexArray
                        })(),
                        filterMode: "empty",
                        orient: "horizontal",
                        top: 10,
                        left: "40%",
                        right: "40%",
                        show: this.isDataZoomShow,
                        textStyle: {
                            color: "#FFF"
                        }
                    }, ],
                    yAxis: (()=> {
                        let yAxisArray = new Array()
                        for (let i = 0; i < this.count_chartSetting; i++) {
                            yAxisArray.push({
                                position: 'left',
                                gridIndex: i,
                                nameGap: 0,
                                boundaryGap: false,
                                show: (() => {
                                    return i == 0 ? true : false
                                })(),
                                type: 'category',
                                data: (()=> {
                                    if (this.yAxisData.length > 0) {
                                        return this.yAxisData
                                    } else {
                                        let dateArray = new Array()
                                        let timeNow = new Date().getTime()
                                        for (var i = 0; i < RtData.item_count; i++) {
                                            dateArray.push(new Date(timeNow + i * 5000).Format("hh:mm"))
                                        }
                                        this.yAxisData = dateArray
                                        return dateArray.reverse()
                                    }
                                })(),
                                axisLine: {
                                    show: i == 0 ? true : false
                                },
                                axisLabel: {
                                    show: i == 0 ? true : false,
                                    inside: i == 0 ? false : true,
                                    color: "white",
                                    interval: 10,
                                    showMinLabel: true,
                                    showMaxLabel: true,
                                    margin: 10,
                                    formatter: this.changeRow
                                },
                                axisTick: {
                                    show: true,
                                    interval: 10
                                }
                            })
                        }
                        return yAxisArray
                    })(),
                    series: []
                }
                this.charts.setOption(option)
            },
            /**
             * 接收到新数据后的刷新方法
             */
            update(lastData) {
                if (lastData != null || lastData != undefined) {
                    if (!this.initSessionId && lastData.indexOf(this.SESSION_SPLIT) >= 0) {
                        //接收到sessionId
                        this.SOCKET_SESSION_ID = lastData;
                        this.initSessionId = true;
                        this.setWellWellBore()
                    } else if (!this.isWellInit) {
                        //获取井名
                        $("#WellBore").text(lastData.split(this.WELLBORE_NAME_SPLIT)[0])
                        this.isWellInit = true
                    } else {
                        this.addItemData(lastData)
                        this.renderChartsByItems()
                    }
                } else {
                    this.renderChartsByItems()
                }
            },
            /**
             * 将最新获取的实时数据加入到items数组中
             */
            addItemData(data) {
                try {
                    data = JSON.parse(data)
                } catch (err) {
                    return
                }
                // console.log(this.items)
                this.items.forEach((item, index) => {
                    let key = item.id
                    var dataValue = data[key.toString()]
                    if (dataValue != undefined) {
                        for (let key in dataValue) {
                            let result = dataValue[key]
                            //此时可能还有空值，需要先补充空值,第一个若不是undefined 则unshift值。
                            if (item.data[0] == undefined) {
                                for (let i = 0; i < item.data.length; i++) {
                                    if (item.data[i] != undefined) {
                                        item.data[i - 1] = result
                                        break
                                    }
                                    if (i == item.data.length - 1) {
                                        item.data[i] = result
                                    }
                                }
                            } else {
                                item.data.unshift(result)
                            }
                            //设置当前值
                            item.current = dataValue[key]
                            break;
                        }
                    } else {
                        item.data.unshift(0)
                    }
                })
            },
            /**
             * 将Items中的数据插入到chart的option中
             */
            renderChartsByItems() {
                if (this.items.length <= 0) {
                    return
                }
                //是否option组合，如果发生了颜色、范围、是否显示、位置的设置则不进行数据组合，否则进行数据组合
                let notMerge = this.isChanged
                //一次设置
                let chart_options = this.charts.getOption()
                if (notMerge) {
                    chart_options.series = new Array()
                }
                this.items.forEach((item, index) => {
                    if (item.display) {
                        let dest_chart_index = -1
                        //找到item在series中的位置
                        chart_options.series.forEach((seriesItem, index) => {
                            if (seriesItem.id == item.id) {
                                dest_chart_index = index;
                            }
                        })
                        //没有在series找到item，进行添加
                        if (dest_chart_index < 0) {
                            let seriesOption = {
                                name: item.name,
                                id: item.id,
                                type: 'line',
                                smooth: false,
                                xAxisIndex: item.position - 1,
                                yAxisIndex: item.position - 1,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        color: item.color,
                                        width: 2,
                                        shadowColor: 'rgba(0,0,0,0.4)'
                                    }
                                },
                                data: this.getItemData(item)
                            }
                            chart_options.series.push(seriesOption)
                            return
                        }
                        chart_options.series[dest_chart_index].data = this.getItemData(item)
                    }
                })
                //如果超出了y轴初始时间范围
                if (this.items[0].data.length > RtData.item_count) {
                    chart_options.yAxis.forEach((item, index) => {
                        item.data.unshift(new Date().Format("hh:mm") + this.getDepth())
                    })
                    //yAxisData同步变化
                    this.yAxisData.unshift(new Date().Format("hh:mm") + this.getDepth())
                } else {
                    //如果没有超出初始时间范围
                    chart_options.yAxis.forEach((item, index) => {
                        let a = 0
                        for (; a < this.items[0].length; a++) {
                            if (this.items[0].data[a] != undefined) {
                                break
                            }
                        }
                        if (a == this.items[0].data.length) {
                            a--
                        }
                        if (item.data[a].length <= 5) {
                            item.data[a] = item.data[a] + this.getDepth()
                        }
                        //yAxisData同步变化
                        this.yAxisData[a] = item.data[a]
                    })
                }
                //设置tooltips的颜色，为了当tooltips显示出来时，提示的颜色和曲线颜色一致
                let colors = [];
                chart_options.series.forEach((item, index) => {
                    // console.log(item.lineStyle)
                    colors.push(item.lineStyle.normal.color?item.lineStyle.normal.color:item.lineStyle.color)
                })
                chart_options.color = colors;
                this.charts.setOption(chart_options, notMerge)
                //设置dataZoomChange
                if (this.isDataZoomChange) {
                    this.charts.dispatchAction({
                        type: "dataZoom",
                        startValue: 0,
                        endValue: RtData.item_count
                    })
                }
            },
            /**
             * 对数组进行X轴坐标适应性处理
             */
            getItemData(item) {
        // console.log(item)
                let arr = new Array(item.data.length)
                if (item.data != null) {
                    item.data.forEach((dataItem, index) => {
                        arr[index] = (parseFloat(dataItem) * 100 / parseFloat(item.limit_max))
                    })
                }
                return arr
            },
            /**
             * 获取当前井深
             */
            getDepth() {
                let depth = 0;
                this.items.forEach((item, indx) => {
                    if (item.id == this.DEPTH_ID.toString()) {
                        depth = item.current
                    }
                })
                return Math.round(depth)
            },
            /**
             * 根据传递过来的参数设置当前井
             */
            setWellWellBore() {
                if (this.wellBoreId == null || this.wellName == null) {
                    this.isWellInit = false;
                } else {
                    this.isWellInit = true;
                    this.changeWellBore("urlParam")
                }
            },
            /**
             * 改变井筒id
             */
            changeWellBore(changeSource) {
                if (changeSource != "urlParam") {
                    this.wellBoreId = this.currentWellBoreId
                    this.wellName = this.currentWellName
                }
                if (this.SOCKET_SESSION_ID == null) {
                    alert("修改失败，您没有认证")
                    return
                }
                $.ajax({
                    url: this.BASE_URL + "/wellbore/" + this.wellBoreId,
                    type: 'post',
                    data: {
                        SESSION_ID: this.SOCKET_SESSION_ID
                    }
                })
                $("#wellBoreIdSet").modal("hide")
                this.wellNameShow()
            },
            /**
             * 数据列表项的点击事件，弹出添加或者设置窗口
             */
            handleLineSettingButton(index){
                console.log(index)
                 if (index != undefined) {
                        //设置数据列表项
                        Object.assign(this.item, this.items[index])
                        Object.assign(this.temp, this.items[index])
                        this.item.index = this.temp.index = index
                        delete this.item.data
                        delete this.temp.data
                    } else {
                        //添加数据列表项
                        this.item = {
                            id: null,
                            name: null,
                            unit: null,
                            limit_min: 0,
                            limit_max: 0,
                            current: 0,
                            color: "#FFF",
                            display: true,
                            position: 0
                        }
                        this.temp = {
                            id: null,
                            name: null,
                            unit: null,
                            limit_min: 0,
                            limit_max: 0,
                            current: 0,
                            color: "#FFF",
                            display: true,
                            position: 0
                        }
                    }
                    $("#myModal").modal("show")
            },
            handleModalSubmitBtn(){
                let index = $("#myModalLabel").attr("data-options")
                    //基于index进行判断，如果index不为空则是修改，否则是添加。并根据index确定items中的位置
                    console.log(this.item)
                    this.item.color = $("#color").colorpicker("getValue")
                    if (index != undefined) {
                        //如果发生改变则会新绘制
                        if (this.isItemChanged(this.items[index], this.item)) {
                            this.isChanged = true
                        }
                        Object.assign(this.items[index], this.item)
                    } else {
                        this.item.index = this.items.length
                        let temp = new Object()
                        Object.assign(temp, this.item)
                        this.items.push(temp)
                    }
                    this.update()
                    $("#myModal").modal("hide")
            },
            handleBtnChartSetting(){
                $("#chartSetModal").modal("show")
            },
            handleBtnChartSettingSubmit(){
                this.chartCount = this.count_chartSetting
                $("#chartSetModal").modal("hide")
            },
            /**
             * 初始化滑动事件
             */
            initDragEvent() {
                $("body").on("touchstart", function(e) {
                    this.startX = e.originalEvent.changedTouches[0].pageX
                    this.startY = e.originalEvent.changedTouches[0].pageY
                    this.startTime = Date.parse(new Date())
                })
                $("body").on("touchend", function(e) {
                    let moveEndX = e.originalEvent.changedTouches[0].pageX
                    let moveEndY = e.originalEvent.changedTouches[0].pageY
                    let X = moveEndX - this.startX
                    let Y = moveEndY - this.startY
                    let timeInterval = Date.parse(new Date()) - this.startTime
                    if (Math.abs(X) > Math.abs(Y) && X > 100 && timeInterval < 500) {
                        $("#myCarousel").carousel("prev")
                    } else if (Math.abs(X) > Math.abs(Y) && X < -100 && timeInterval < 500) {
                        $("#myCarousel").carousel("next")
                    }
                })
            },
            /**
             * 判断item是否发生需要重绘的改变
             */
            isItemChanged(oldItem, currentItem) {
                function isAttributeSame(attribute1, attribute2) {
                    if (attribute1 != undefined && attribute2 != undefined) {
                        if (attribute1 != attribute2) {
                            return false
                        }
                    }
                    return true
                }
                if (isAttributeSame(oldItem.color, currentItem.color) &&
                    isAttributeSame(oldItem.limit_min, currentItem.limit_min) &&
                    isAttributeSame(oldItem.limit_max, currentItem.limit_max) &&
                    isAttributeSame(oldItem.position, currentItem.position)) {
                    return false
                }
                return true
            },
            /**
             * 初始化井列表
             */
            initWellList(pageIndex) {
                let url = "wells"
                let data=""
                if (this.isSearch) {
                    data = {
                        key: $("#wellName").val()
                    }
                    url = "keywells"
                }
                let pageCount = 1
                if (pageIndex != undefined) {
                    pageCount = pageIndex
                }
                console.log(data)
                this.$http("GET",this.BASE_URL + "/" + url + "/" + pageCount + "/10",{
                    data:data
                }).then((data)=>{
                    this.pageCount = data.pageCount
                    this.pageSize = data.pageSize
                    this.total = data.total
                    this.list = data.data
                    this.pages = data.pages
                    this.currentWellName = this.wellName
                    this.currentWellBoreId = this.wellBoreId
                })
                // $.ajax({
                //     url: this.BASE_URL + "/" + url + "/" + pageCount + "/10",
                //     type: "post",
                //     data: data,
                //     success: function(data) {
                //         this.pageCount = data.pageCount
                //         this.pageSize = data.pageSize
                //         this.total = data.total
                //         this.list = data.data
                //         this.pages = data.pages
                //         this.currentWellName = this.wellName
                //         this.currentWellBoreId = this.wellBoreId
                //     },
                //     error: function() {}
                // })
            },
            /**
             * 初始化分页按钮事件
             */
            initPageButtonEvent() {
                //展开dataTable
                $("#dataTableExpand").click(() => {
                    $("#dataTable").slideDown("400", "swing", ()=> {
                        this.initChartCss()
                        let option = this.charts.getOption()
                        option.grid.forEach((item, index) => {
                            item.top = 0
                            item.height = $("#distChart").height() - item.top
                        })
                        this.gridTop = 0
                        option.dataZoom[0].show = false
                        this.isDataZoomShow = false
                        this.charts.setOption(option)
                    })
                })
                //关闭dataTable
                $("#dataTableClose").click(() => {
                    $("#dataTable").slideUp("400", "swing", () => {
                        this.initChartCss()
                        let option = this.charts.getOption()
                        option.grid.forEach((item, index) => {
                            item.top = 50
                            item.height = $("#distChart").height() + item.top + 50
                        })
                        this.gridTop = 50
                        option.dataZoom[0].show = true
                        this.isDataZoomShow = true
                        this.charts.setOption(option)
                    })
                })
                $("#btn_calendarSetting").click(function() {
                    $("#wellBoreIdSet").modal("toggle")
                })
                $("#chartDate").text(function() {
                    let now = new Date()
                    let word = (now.getHours() >= 6 && now.getHours < 18) ? "昼" : "夜"
                    return now.getFullYear() + "年" + (parseInt(now.getMonth()) + 1) + "月" + now.getDate() + "日, " + word
                })
                $("#wellBoreIdSet").on("shown.bs.modal", () => {
                    this.currentWellBoreId = this.wellBoreId
                    this.currentWellName = this.wellName
                })
                $("#wellBoreIdSet").on("hide.bs.modal", () => {
                    $("#wellName").val("")
                    this.isSearch = false
                })
                $("#searchWell").on("click", () => {
                    this.isSearch = true
                    this.initWellList()
                })
                this.charts.on("datazoom", (params) => {
                    if (params.start == 0 || params.start == undefined) {
                        this.isDataZoomChange = true
                    } else {
                        this.isDataZoomChange = false
                    }
                })
            },
            /**
             * 获取对应功能点的所有曲线
             */
            getFunctionProperties(id = 1) {
                $.ajax({
                    url: this.BASE_URL + "/function/" + id,
                    type: "get",
                    success: (data) => {
                        console.log(data)
                        this.initItemsByOpenData(data)
                    }
                })
            },
            /**
             * 初始化所有的曲线对应的item
             */
            initItemsByOpenData(data) {
                let showNum = 0
                function getRandomColor() {
                    let colors = ["#EA449F", "#AC31F4", "#7CFBF0", "#00FFFF", "#FFFF00"]
                    return colors[Math.round(Math.random() * 4)]
                }
                function handleNull(str) {
                    if (str == null || str == "null" || str == undefined) {
                        str = "暂无信息"
                    }
                    return str
                }
                function handlePosition(isShow) {
                    if (isShow) {
                        showNum++
                        return showNum % 2 + 1
                    } else {
                        return 1
                    }
                }
                if (data.length == 0) {
                    return
                }
                //data的解析
                this.items.length = 0
                data.forEach((single, index) => {
                    let item = {
                        id: handleNull(single.prop_code),
                        name: handleNull(single.prop_name),
                        unit: handleNull(single.unit),
                        limit_min: this.ITEM_INIT_MIN,
                        limit_max: this.ITEM_INIT_MAX,
                        current: 0.0,
                        color: getRandomColor(),
                        display: handleNull(single.show),
                        position: handlePosition(single.show),
                        data: new Array(RtData.item_count)
                    }
                    this.items.push(item)
                })
                this.isItemInit = true
            },
            setChartHeadMargin() {
                let fontWidth = $("#width_temp").width()
                $("#dataTable").children("div:first").css("padding-left", parseFloat(fontWidth) + 15 + 8 + 10)
            },
            setTempWellConfig(item) {
                this.currentWellName = item.wellName
                this.currentWellBoreId = item.wellBoreId
                // let siblings = $(obj).siblings()
                // for (let i = 0; i < siblings.length; i++) {
                //     $(siblingd[i]).removeClass("success")
                // }
                // $(obj).addClass("success")
            },
            /**
             * 初始化颜色选择器
             */
            initColorPicker() {
                $("#color").colorpicker({
                    format: "hex"
                })
            },
            handleBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$ruixin.closePage({});
                // this.$ruixin.closePage({});
            },
        }
    }
</script>

<style lang="scss" scoped>
    #chartsOfDataMonitoring {
        font-size:14px;
    }
    button{
        font-size:14px;
    }
    .row{
        margin:5px 0px;
    }
    .hidden {
        display: none;
    }
    hr {
        margin: 3px;
    }
    html {
        font-size: 10px;
    }
    .form-group {
        height: 40px;
    }
    .block {
        background-color: rgba(64, 75, 139, 0.3);
        /*background-color: #3F4889;*/
        height: 80px;
        transition: all 0.2s ease;
    }
    .block:hover {
        border: 1px solid;
        border-color: white;
        box-shadow: 0px 0px 10px 5px #aaa;
    }
    .small-padding {
        padding-left: 5px !important;
        padding-right: 5px !important;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .center {
        text-align: center;
    }
    .left {
        text-align: left;
    }
    .container {
        background: linear-gradient(#0C0D12, #3F4889);
    }
</style>


