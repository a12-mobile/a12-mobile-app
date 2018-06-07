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
        <div class="list-group" style="margin-top:60px;">

            
            <div v-for="(item,index) of tableData" class="list-group-item oms2-list-item">
                <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">
                        <i class="fa fa-circle" v-if="item.clientStatus==0" style="color:red;font-size:16px;margin-right:5px;"></i>
                        <i class="fa fa-circle" v-if="item.clientStatus==1||item.clientStatus==2" style="color:green;font-size:16px;margin-right:5px;"></i>
                        <i class="fa fa-circle-thin" v-if="item.clientStatus==''||!item.clientStatus" style="font-size:16px;margin-right:5px;"></i>
                        <b>{{item.wellName}}</b>
                    </p>
                    <div>
                        <i v-if="!item.isCare" @click="handleCareFor(index)" style="color:red" class="fa fa-star-o oms2-icon oms2-vertical-divider"></i>
                        <i v-if="item.isCare==true" @click="handleCareFor(index)" style="color:red" class="fa fa-star oms2-icon oms2-vertical-divider"></i>
                        <i @click="handleGoToList(item)" class="fa fa-list-alt oms2-icon oms2-vertical-divider"></i>
                        <i @click="handleGoToChart(item)" class="fa fa-area-chart oms2-icon"></i>
                    </div>
                </div>
                <div>
                    <div @click="handleClickItem(index)" style="padding-right:15px;">
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
</template>

<script>
    import {
        getWellList
    } from './../service/well/wellGetData'
    import db from './../service/utils/database/database'
    import {
        Indicator
    } from 'mint-ui';
    export default {
        data() {
            return {
                time:0,
                
                selectedWellBlock: '全部',
                wellBlockList: [],
                selectedJM: '',
                careData:[],
                baseData: [], //用于初始数据备份
                tableData: [
                //     {
                //     "BHMd": "",
                //     "authorizedMd": "7461.0",
                //     "workContent": "8:00--15:00下钻--16:00循环--8:00钻进",
                //     "wellBlock": "塔里木油区",
                //     "clientStatus": "2",
                //     "wellName": "FY202-1X",'wellId':'1111'
                // }, {
                //     "BHMd": "",
                //     "authorizedMd": "6802.0",
                //     "workContent": "8:00～21:30钻塞～23:15循环～3:30投球，打开液压刮壁器，对井段6275-6570m反复刮壁3次～6:30循环～8:00起钻。",
                //     "wellBlock": "塔里木油区",
                //     "clientStatus": "2",
                //     "wellName": "HA15-22X",'wellId':'2222'
                // }, {
                //     "BHMd": "",
                //     "authorizedMd": "6762.0",
                //     "workContent": "正在基础施工。",
                //     "wellBlock": "塔里木油区",
                //     "clientStatus": "2",
                //     "wellName": "HA601-8C",'wellId':'3333'
                // }, 
                ]
            }
        },
        created() {
            this.requestData()
        },
        

        methods: {
            requestData() {
                Indicator.open('加载中...')
                getWellList().then((data) => {
                        console.log('获取')
                        Indicator.close()
                        if (data.body) {
                            this.baseData = data.body;
                        } else {
                            this.baseData = []
                        }
                        this.tableData=this.tableData.concat(this.baseData.slice(0,10))
                        this.requestCare();

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
                    .catch(function(error) {
                        Indicator.close()
                        console.log(error)
                    })
            },
            requestCare(){
                this.$entity.query('KeyWell',{
                    userId:'1'
                }).then((data)=>{
                    if(data.total>0){
                        console.log(data)
                        this.careData=data.rows;
                        data.rows.forEach((item)=>{
                            for(let table of this.tableData){
                                if(table.wellId==item.wellId&&!table.isCare){
                                    console.log('关注了')
                                    this.$set(table, 'isCare', true)
                                    // eval("table.isCare="+true)
                                    break
                                }
                            }
                        })
                    }
                    console.log(this.tableData)

                }).catch((err)=>{
                    console.log(err)
                })
            },
            
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
            handleCareFor(index) {
                if (this.tableData[index].isCare) {
                    this.tableData[index].isCare = false
                    this.$toast.showToast("取消关注", 1500)
                    let well=this.tableData[index]
                    this.careData.forEach((item)=>{
                        if(item.wellId==well.wellId){
                            //找到井关注的列表中对应的信息
                            this.cancelCare(index,item.keyWellId)
                        }
                    })
                } else if (this.tableData[index].isCare == false) {
                    this.tableData[index].isCare = true
                    this.addCare(index)
                } else {
                    this.$set(this.tableData[index], 'isCare', true)
                    this.addCare(index)
                }
            },
            //向服务器添加关注井信息
            addCare(index) {
                this.$entity.add('KeyWell', {
                    keyWellId: db.createUUID,
                    userId: '1',
                    wellId: this.tableData[index].wellId,
                }).then((data) => {
                    console.log(data)
                    this.$toast.showToast("关注成功", 1000)
                }).catch((err) => {
                    this.$toast.showToast('关注失败', 2000)
                })
            },
            //向服务器取消关注井信息
            cancelCare(index,keyWellId){
                this.$entity.delete('KeyWell',[{
                    keyWellId:keyWellId
                }]).then((data) => {
                    console.log(data)
                    this.$toast.showToast("取消关注", 1000)
                }).catch((err) => {
                    this.$toast.showToast('取消关注失败',2000)
                })

            },
            //进入实时数据列表
            handleGoToList(item) {
                alert("进入" + item.wellName + "井实时数据列表")
            },
            //进入实时曲线列表
            handleGoToChart(item) {
                alert("进入" + item.wellName + "井实时曲线列表")
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
    .oms2-search {
        position: absolute;
        right: 10px;
        top: 5px;
    }
    .oms2-flex {
        display: inline-block; // flex-direction: row;
        // flex-wrap: nowrap;
        // justify-content: flex-start;
        // align-items: flex-start;
        .oms2-flex-item1 {
            // flex-grow:3;
            width: 50%;
        }
        .oms2-flex-item2 {
            // flex-grow:9;
            width: 50%;
        }
    }
</style>


