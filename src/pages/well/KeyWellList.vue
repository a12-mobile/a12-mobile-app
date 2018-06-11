<template>
    <div id="wellList">
        <form class="oms2-search-bar">
            <div class="form-group row" style="padding-left:5px;padding-right:5px;">
                <label class="col-2 col-form-label" style="padding-right:0px;">油区:</label>
                <div class="col-4" style="padding-left:0px;padding-right:5px;">
                    <select id="inputState" class="form-control" v-model="selectedWellBlock">
                                <option>全部</option>
                                <option v-for="item in wellBlockList">{{item}}</option>
                        </select>
                </div>
                <label class="col-2 col-form-label" style="padding-right:0px;">井名:</label>
                <div class="col-4 input-group" style="padding-left:0px">
                    <input type="text" class="form-control" placeholder="井名" v-model="selectedJM">
                </div>
            </div>
        </form>
        <div class="list-group" style="padding-top:60px;">
            <div>
                <div v-for="(item,index) of tableData" class="list-group-item oms2-list-item">
                    <div class="d-flex w-100 justify-content-between" style="border-bottom:1px solid #e4e4e4">
                        <p class="mb-1">
                            <i class="fa fa-circle" v-if="item.clientStatus==0" style="color:red;font-size:16px;margin-right:5px;"></i>
                            <i class="fa fa-circle" v-else-if="item.clientStatus==1||item.clientStatus==2" style="color:green;font-size:16px;margin-right:5px;"></i>
                            <i class="fa fa-circle-thin" v-else="item.clientStatus==''||(!item.clientStatus&&item.clientStatus!=0)" style="font-size:16px;margin-right:5px;"></i>
                            <b>{{item.wellName}}</b>
                        </p>
                        <div>
                            <i @click="handleGoToChart(item)" class="fa fa-area-chart oms2-icon oms2-vertical-divider"></i>
                            <i @click="handleGoToList(item)" class="fa fa-list-alt oms2-icon oms2-vertical-divider"></i>
                            <i v-if="!item.isCare" @click="handleCareFor(item)" style="color:red" class="fa fa-star-o oms2-icon"></i>
                            <i v-if="item.isCare==true" @click="handleCareFor(item)" style="color:red" class="fa fa-star oms2-icon"></i>
                        </div>
                    </div>
                    <div>
                        <div @click="handleClickItem(index)" style="padding-right:15px;padding-top:1rem">
                            <div class="row">
                                <div class="col-3">
                                    <label style="font-size:12px;font-weight:bold;float:right;">油区：</label>
                                </div>
                                <div class="col-9">
                                    <label style="font-size:12px;">{{item.wellBlock | ifStringIsNull}}</label>
                                </div>
                                <div class="col-3">
                                    <label style="font-size:12px;font-weight:bold;float:right">设计井深：</label>
                                </div>
                                <div class="col-3">
                                    <label style="font-size:12px;">{{item.authorizedMd | ifStringIsNull}}</label>
                                </div>
                                <div class="col-3">
                                    <label style="font-size:12px;font-weight:bold;float:right">当前井深：</label>
                                </div>
                                <div class="col-3">
                                    <label style="font-size:12px;">{{item.BHMd | ifStringIsNull}}</label>
                                </div>
                            </div>
                            <div class="row">
                                <label class="mb-1 col-3" style="text-align:right;font-weight:bold;font-size:12px;">作业内容：</label>
                                <div class="col-9" style="font-size:12px;">
                                    {{item.workContent | ifStringIsNull}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <small>Donec id elit non mi porta.</small> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getKeyWellList
    } from './../../service/well/wellGetData'
    import db from './../../service/utils/database/database'
    import user from './../../service/comm/user'
    import {
        Indicator
    } from 'mint-ui';
    export default {
        data() {
            return {
                searchCondition: { //分页属性  
                    pageNo: 1,
                    pageSize: 30
                },
                selectedWellBlock: '全部',
                wellBlockList: [], //油区列表
                selectedJM: '', //筛选的井名
                baseData: [], //用于初始数据备份
                tableData: [],
                user: {}
            }
        },
        created() {
            this.requestData();
            user.getUser().then((user) => {
                this.user = user
            })
        },
        beforeDestroy(){
            if (Indicator) {
                Indicator.close()
            }
        },
        methods: {
            handleClickItem(item) {
                this.$toast.showToast('选中得索引值为' + item)
                // console.log("获取得index为" + item);
                // this.$router.push({
                //     path: '/sub',
                //     query: {
                //         username: '我是那边扔过来的'
                //     }
                // })
            },
            //关注/取消关注
            handleCareFor(item) {
                if (item.isCare) {
                    item.isCare = false
                    this.cancelCare(item.keyWellId)
                } else {
                    //关注
                    item.isCare = true
                    let keyWellId = db.createUUID()
                    item.keyWellId = keyWellId
                    this.addCare(item.wellId, keyWellId)
                }
            },
            //向服务器添加关注井信息
            addCare(wellId, keyWellId) {
                this.$entity.add('KeyWell', {
                    keyWellId: keyWellId,
                    userId: this.user.userId,
                    wellId: wellId,
                }).then((data) => {
                    this.$toast.showToast("关注成功", 1000)
                }).catch((err) => {
                    this.$toast.showToast('关注失败', 2000)
                })
            },
            //向服务器取消关注井信息
            cancelCare(keyWellId) {
                this.$entity.delete('KeyWell', [{
                    keyWellId: keyWellId
                }]).then((data) => {
                    this.$toast.showToast("取消关注", 1000)
                }).catch((err) => {
                    this.$toast.showToast('取消关注失败', 2000)
                })
            },
            //进入实时数据列表
            handleGoToList(item) {
                this.$router.push({
                    path: '/real-time/list/project',
                    query: {
                        wellId: item.wellId,
                        wellName: item.wellName
                    }
                })
            },
            //进入实时曲线列表
            handleGoToChart(item) {
                location.href = 'http://11.10.97.109:9493/websocket/echarts/demo.html'
            },
            /**
             * 点击查询按钮后的方法
             * 设计初衷：之所以用四个判断是为了减少baseData循环时判断的次数
             */
            handleSelect() {
                if (this.selectedJM.trim() != '' && this.selectedWellBlock == '全部') {
                    //搜索井名
                    this.tableData = this.baseData.filter((item) => {
                        return item.wellName.toLowerCase().includes(this.selectedJM.toLowerCase())
                    })
                } else if (this.selectedJM.trim() != '' && this.selectedWellBlock != '全部') {
                    //搜索该单位下的井名
                    this.tableData = this.baseData.filter((item) => {
                        return item.wellName.toLowerCase().includes(this.selectedJM.toLowerCase()) && item.wellBlock == this.selectedWellBlock
                    })
                } else if (this.selectedJM.trim() == '' && this.selectedWellBlock != '全部') {
                    //搜索某单位下的井
                    this.tableData = this.baseData.filter((item) => {
                        return item.wellBlock == this.selectedWellBlock
                    })
                } else {
                    //没有搜索
                    this.tableData = this.baseData
                }
                if (this.tableData.length == 0) {
                    this.$toast.showToast("没有该井的数据")
                }
            },
            requestData() {
                Indicator.open('加载中...')
                getKeyWellList().then((data) => {
                        Indicator.close()
                        if (data.body) {
                            this.baseData = data.body;
                        } else {
                            this.baseData = []
                        }
                        if (this.baseData.length == 0) {
                            this.$toast.showToast("没有关注井")
                        }
                        this.tableData = this.baseData
                        //获取施工单位的列表
                        let sgdws = new Set();
                        if (this.baseData.length > 0) {
                            this.baseData.forEach((item) => {
                                sgdws.add(item.wellBlock)
                            })
                            this.wellBlockList = []
                            for (var sgdw of sgdws) {
                                this.wellBlockList.push(sgdw)
                            }
                            this.wellBlockList.sort(
                                function compareFunction(param1, param2) {
                                    return param1.localeCompare(param2, "zh");
                                });
                        }
                    })
                    .catch((error) => {
                        Indicator.close()
                        console.log(error)
                        this.$toast.showToast('获取关注井列表失败')
                    })
            },
        },
        watch: {
            selectedJM: function() {
                this.handleSelect()
            },
            selectedWellBlock: function() {
                this.handleSelect()
            }
        }
    }
</script>

<style lang="scss" scoped>
    #wellList {
        text-align: left;
        .oms2-list-item {
            margin-bottom: 10px;
            width: 96%;
            margin-left: 2%;
            box-shadow: 3px 3px 5px #e4e4e4;
        }
        .oms2-icon {
            font-size: 16px;
            padding: 3px;
        }
        .col-3,
        .col-9 {
            padding-left: 0px;
            padding-right: 0px;
        }
        .oms2-vertical-divider {
            padding-right: 15px; // border-right:1px solid #000;
        }
        .oms2-search-bar {
            width: 100%;
            position: fixed;
            z-index: 2;
            top: 0px;
            padding-top: 10px;
            background-color: #fff;
            box-shadow: 0px 1px 5px #e4e4e4;
        }
    }
</style>


