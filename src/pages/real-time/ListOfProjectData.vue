<template>
    <div id='ListOfProjectData'>
        <div class="oms2-well-name">
            <i @click="handleBack" class="fa fa-chevron-left oms2-icon-back"></i> ( {{wellName}} )
            <i @click="handleShowModal" class="fa fa-history oms2-icon-history"></i>
            <i @click="handleRefresh" class="fa fa-refresh oms2-icon-refresh"></i>
        </div>
        <mt-navbar v-model="selected" style="background-color:#0E4F83;color:#fff">
            <mt-tab-item id="GC">工程数据列表</mt-tab-item>
            <mt-tab-item id="QK">气测数据列表</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="GC" v-if="selected=='GC'">
                <v-table is-horizontal-resize is-vertical-resize style="width:100%;font-size:12px;color:#fff;background-color:#0E4F83;margin-top:3px" :row-height=30 :columns="columnsGC" :table-data="tableDataGC" title-bg-color="#0E4F83" odd-bg-color="#165A92" even-bg-color="#0E4F83"
                    row-hover-color="#3177B1" row-click-color="#34383C"></v-table>
            </mt-tab-container-item>
            <mt-tab-container-item id="QK" v-if="selected=='QK'">
                <v-table is-horizontal-resize is-vertical-resize style="width:100%;font-size:12px;color:#fff;background-color:#0E4F83;margin-top:3px" :row-height=30 :columns="columnsQK" :table-data="tableDataQK" title-bg-color="#0E4F83" odd-bg-color="#165A92" even-bg-color="#0E4F83"
                    row-hover-color="#3177B1" row-click-color="#34383C"></v-table>
            </mt-tab-container-item>
        </mt-tab-container>


        <!-- 查询 Modal -->
        <div class="modal fade oms2-font-size" id="ModalSelect" tabindex="-1" role="dialog" aria-labelledby="ModalSelectTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title" id="exampleModalLongTitle"><b>查询时间范围</b></p>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span style="font-size:32px" aria-hidden="true">&times;</span>
                                  </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group row">
                                <label class="col-4 col-form-label">起始时间:</label>
                                <div class="col-7" style="text-align:left">
                                    <date-picker :date="startDate" :option="option" :limit="limit"></date-picker>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-4 col-form-label">结束时间:</label>
                                <div class="col-7"  style="text-align:left">
                                    <date-picker :date="endDate" :option="option" :limit="limit"></date-picker>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-4 col-form-label">时间间隔(s):</label>
                                <div class="col-7">
                                    <select class="custom-select" v-model="quertInterval">
                                        <option value="60" selected>60</option>
                                        <option value="30">30</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary  oms2-font-size" data-dismiss="modal">取消</button>
                            <button type="button" @click="handleSelect" data-dismiss="modal" class="btn btn-primary  oms2-font-size">查询</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myDatepicker from 'vue-datepicker'
    import {
        getCurrentTime,formatDate, compareDate
    } from './../../service/utils/date/date'
    import {
        setwellboreId
    } from './../../service/well/wellService'
    import {
        Toast
    } from "mint-ui"
    import {
        webSocketUrl,webSocketHttpUrl
    } from './../../service/http/config'
    export default {
        data() {
            return {
                startDate:{
                    time:formatDate(new Date(),'yyyy-MM-dd HH:mm')
                },
                endDate:{
                    time:formatDate(new Date(),'yyyy-MM-dd HH:mm')
                },
                tableDataGC: [],
                tableDataQK: [],
                selected: "GC",
                wellName: '',
                wellboreId: '',
                isReceive: false, //是否接收数据
                isRefresh: true, //是否更新   第一次进入也算更新
                sessionId: '', //sessionId
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
                        field: '8004',
                        title: '井深(m)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8005',
                        title: '钻头位置(m)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8006',
                        title: '迟到井深(m)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8486',
                        title: '迟到时间(min)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8008',
                        title: '大钩高度(m)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8010',
                        title: '大钩负荷(kN)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8011',
                        title: '钻压(kN)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8012',
                        title: '转盘转速(Rpm)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8013',
                        title: '扭矩(kN.m)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8018',
                        title: '立管压力(MPa)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8019',
                        title: '套管压力(MPa)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8020',
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
                        field: '8219',
                        title: '全烃(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8212',
                        title: '甲烷(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8213',
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
                        field: '8215',
                        title: '正丁烷(%)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8216',
                        title: '异丁烷(%)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8217',
                        title: '正戊烷(%)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8218',
                        title: '异戊烷(%)',
                        width: 70,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8204',
                        title: '二氧化碳(%)',
                        width: 80,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8205',
                        title: '氢(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8206',
                        title: '氦(%)',
                        width: 60,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8207',
                        title: '硫化氢1(ppm)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                    {
                        field: '8208',
                        title: '硫化氢2(ppm)',
                        width: 90,
                        titleAlign: 'center',
                        columnAlign: 'center'
                    },
                ],
                option: {
                    type: 'min',
                    week: ['一', '二', '三', '四', '五', '六', '日'],
                    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    format: 'YYYY-MM-DD HH:mm',
                    placeholder: '选择时间',
                    inputClass:'oms2-date-picker',
                    inputStyle: {
                        'display': 'inline-block',
                        'padding': '2px',
                        'font-size': '16px',
                        'border': '2px solid #fff',
                        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                        'border-radius': '2px',
                        'color': '#5F5F5F',
                        'width':'100%',
                    },
                    color: {
                        header: '#3F51B5',
                        headerText: '#fff'
                    },
                    buttons: {
                        ok: '确定',
                        cancel: '取消'
                    },
                    overlayOpacity: 0.5, // 0.5 as default
                    dismissible: true // as true as default
                },
                limit: [
                    {
                        type: 'fromto',
                        to: formatDate(new Date(),'yyyy-MM-dd HH:mm')
                    }
                ],
                quertInterval:60  //查询间隔
            }
        },
        created() {
            this.wellName = this.$route.query.wellName
            this.wellboreId = this.$route.query.wellboreId
            if (!this.wellName || this.wellName == '') {
                // this.wellName='克深21'
                this.$toast.showToast("获取井名失败")
            }
            if (!this.wellboreId || this.wellboreId == '') {
                this.$toast.showToast("获取井ID失败")
            }
            // this.wellboreId = "4e70a19b4f3148eca0c80b65b1d5e2ca"
            this.$ruixin.hideWebViewTitle({});
            this.initWebSocket()
        },
        beforeDestroy() {
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
                if (!this.isReceive && (this.wellboreId == '' || !this.wellboreId)) {
                    //如果没有井id则显示默认值
                    // this.$toast.showToast("获取井ID失败")
                    console.log("失败")
                } else if (!this.isReceive && this.isRefresh) {
                    this.isRefresh = false
                    this.sessionId = e.data
                    setwellboreId(this.wellboreId, this.sessionId).then((data) => {
                        // console.log(this.wellboreId, data.result)
                        if (data.result == 'success') {
                            this.isReceive = true
                        } else {
                            this.$toast.showToast("设置井信息失败")
                        }
                    }).catch((err) => {
                        this.$toast.showToast("设置井信息失败")
                    })
                }
                if (this.isReceive && e.data[0] == '{') {
                    const redata = JSON.parse(e.data);
                    var item = this.convertJsonToBean(redata)
                    this.tableDataGC.unshift(item)
                    var item = this.convertJsonToQKBean(redata)
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
                var time
                if(data.hasOwnProperty('time')){
                    time=data.time
                }else{
                    time = getCurrentTime()
                }
                
                var item = {
                    "time": time,
                    "8004": this.getPropertityData(data["8004"]),
                    "8005": this.getPropertityData(data["8005"]),
                    "8006": this.getPropertityData(data["8006"]),
                    "8486": this.getPropertityData(data["8486"]),
                    "8008": this.getPropertityData(data["8008"]),
                    "8010": this.getPropertityData(data["8010"]),
                    "8011": this.getPropertityData(data["8011"]),
                    "8012": this.getPropertityData(data["8012"]),
                    "8013": this.getPropertityData(data["8013"]),
                    "8018": this.getPropertityData(data["8018"]),
                    "8019": this.getPropertityData(data["8019"]),
                    "8020": this.getPropertityData(data["8020"])
                }
                return item;
            },
            convertJsonToQKBean(data) {
                var time
                if(data.hasOwnProperty('time')){
                    time=data.time
                }else{
                    time = getCurrentTime()
                }
                var item = {
                    "time": time,
                    "8219": this.getPropertityData(data["8219"]),
                    "8212": this.getPropertityData(data["8212"]),
                    "8213": this.getPropertityData(data["8213"]),
                    "8214": this.getPropertityData(data["8214"]),
                    "8215": this.getPropertityData(data["8215"]),
                    "8216": this.getPropertityData(data["8216"]),
                    "8217": this.getPropertityData(data["8217"]),
                    "8218": this.getPropertityData(data["8218"]),
                    "8204": this.getPropertityData(data["8204"]),
                    "8205": this.getPropertityData(data["8205"]),
                    "8206": this.getPropertityData(data["8206"]),
                    "8207": this.getPropertityData(data["8207"]),
                    "8208": this.getPropertityData(data["8208"])
                }
                return item;
            },
            //获取对象属性结果
            getPropertityData(item) {
                if(typeof(item)=="object"){
                    for (var key in item) {
                        if (key == '0') {
                            return 0
                        }
                        if (item[key]) {
                            return item[key].toFixed(2)
                        } else {
                            return 0
                        }
                    }
                }else if(typeof(item)=="number") {
                    return item.toFixed(2)
                }
                    
            },
            handleBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$ruixin.closePage({});
                // this.$ruixin.closePage({});
            },
            handleRefresh() {
                this.$toast.showIndicator.open('刷新中...')
                //清除现有数据
                this.tableDataGC=[]
                this.tableDataQK=[]
                //设置时间宽度
                this.columnsGC[0].width=60
                this.columnsQK[0].width=60
                this.websock.close()
                this.initWebSocket()
                this.isReceive = false
                this.isRefresh = true
                setTimeout(() => {
                    this.$toast.showIndicator.close()
                    this.$toast.showToast("刷新成功")
                }, 1000)
            },
            handleShowModal(){
                $("#ModalSelect").modal('show')
            },
            /**
             * 查看历史数据
             */
            handleSelect(){
                let judge=compareDate(this.startDate.time,this.endDate.time)
                if(judge>0){
                    //起始时间大于终止时间
                    this.$toast.showToast("起始时间大于结束时间")
                    return
                }else if(judge==0){
                    this.$toast.showToast("起始时间等于结束时间")
                    return
                }
                this.$toast.showIndicator.open('查询中...')
                //清除现有数据
                this.tableDataGC=[]
                this.tableDataQK=[]
                //关闭websocket
                this.websock.close()
                let gcArray=['8004','8005','8006','8486','8008','8010','8011','8012','8013','8018','8019','8020']
                let qkArray=['8219','8212','8213','8214','8215','8216','8217','8218','8204','8205','8206','8207','8208']
                let queryParams=this.wellboreId+','+this.startDate.time+':00,'+this.endDate.time+':00,'+this.quertInterval+','+gcArray.join('-')+'-'+qkArray.join('-')
                console.log(webSocketHttpUrl+"/getDataForHistory")
                this.$http("POST",webSocketHttpUrl+"/getDataForHistory",{
                    params:queryParams
                },{
                    timeout:300*1000
                }).then((redata)=>{
                    this.$toast.showIndicator.close()
                    this.columnsGC[0].width=120
                    this.columnsQK[0].width=120
                    if(redata.length>0){
                        redata.forEach(element => {
                            let itemGC = this.convertJsonToBean(element)
                            this.tableDataGC.unshift(itemGC)
                            let itemQK = this.convertJsonToQKBean(element)
                            this.tableDataQK.unshift(itemQK)
                        });
                    }
                }).catch((error)=>{
                    this.$toast.showIndicator.close()
                })
                
            }
        },
        
        components: {
            'date-picker': myDatepicker
        }
    }
</script>

<style lang="scss">
    #ListOfProjectData {
        background: linear-gradient(to bottom, #0E4F83, #0E4F83, #0272CF);
        height: 100%;
        .oms2-icon-back {
            position: absolute;
            top: 1.5rem;
            left: 10px;
            font-size: 20px;
        }
        .oms2-icon-history {
            position: absolute;
            top: 1.5rem;
            right: 40px;
            font-size: 20px;
        }
        .oms2-icon-refresh {
            position: absolute;
            top: 1.5rem;
            right: 10px;
            font-size: 20px;
        }
        .oms2-well-name {
            font-size: 20px;
            padding-top: 1rem;
            padding-bottom: .5rem;
            text-align: center;
            color: aliceblue;
            border-bottom: 1px solid #e4e4e4;
        }
        .mint-tab-item {
            padding-top: 1rem;
            padding-bottom: 1rem;
            .mint-tab-item-label {
                font-size: 14px !important;
            }
        }
        .mint-navbar .mint-tab-item.is-selected {
            color: #26a2ff !important;
        }
        .v-table-body-cell {
            border-style: none;
        }
        .v-table-title-cell {
            border-style: none;
        }
        .v-table-views {
            border-style: none;
        }
    }
</style>