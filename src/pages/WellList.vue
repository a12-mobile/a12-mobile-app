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
                        <i @click="handleGoToChart(item)" class="fa fa-area-chart oms2-icon oms2-vertical-divider"></i>
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
    import {
        Indicator
    } from 'mint-ui';
    import {
        showToast,
        POSITION
    } from './../service/utils/toast/toast'
    export default {
        data() {
            return {
                selectedWellBlock: '全部',
                wellBlockList: [],
                selectedJM: '',
                baseData: [],
                tableData: []
            }
        },
        created() {
            this.requestData();
        },
        methods: {
            requestData() {
                Indicator.open('加载中...')
                getWellList().then((data) => {
                    console.log(data)
                        Indicator.close()
                        if (data.body) {
                            this.baseData = data.body;
                        } else {
                            this.baseData = []
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
                    .catch(function(error) {
                        Indicator.close()
                        console.log(error)
                    })
            },
            handleClickItem(item) {
                showToast('选中得索引值为' + item)
                // console.log("获取得index为" + item);
                // this.$router.push({
                //     path: '/sub',
                //     query: {
                //         username: '我是那边扔过来的'
                //     }
                // })
            },
            //关注/取消关注
            handleCareFor(index){
                if(this.tableData[index].isCare){
                    this.tableData[index].isCare=false
                    showToast("取消关注", POSITION.bottom, 1500)
                }else if(this.tableData[index].isCare==false){
                    this.tableData[index].isCare=true
                    showToast("关注成功", POSITION.bottom, 1500)
                }else{
                    this.$set(this.tableData[index],'isCare',true)
                    showToast("关注成功", POSITION.bottom, 1500)
                }
            },
            //进入实时数据列表
            handleGoToList(item){
                alert("进入"+item.wellName+"井实时数据列表")

            },
            //进入实时曲线列表
            handleGoToChart(item){
                alert("进入"+item.wellName+"井实时曲线列表")

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
                    showToast("没有该井的数据", POSITION.middle, 3000)
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
        .oms2-list-item{
            margin-bottom:10px;
            width:96%;
            margin-left:2%;
            box-shadow: 3px 3px 5px #e4e4e4;
        }
        .oms2-icon {
            font-size: 16px;
            padding:3px;
        }
        .col-3,.col-9{
            padding-left:0px;
            padding-right:0px;
        }
        .oms2-vertical-divider{
    padding-right:15px;
    // border-right:1px solid #000;
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
    .oms2-flex{
        display: inline-block;
        
        // flex-direction: row;
        // flex-wrap: nowrap;
        // justify-content: flex-start;
        // align-items: flex-start;
        .oms2-flex-item1{
            // flex-grow:3;
            width: 50%; 
        }
        .oms2-flex-item2{
            // flex-grow:9;
            width: 50%;
        }
    }
</style>


