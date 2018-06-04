<template>
    <div id="wellList">
        <form class="oms2-search-bar">
            <div class="form-group row" style="padding-left:5px;padding-right:5px;">
                <label class="col-2 col-form-label"  style="padding-right:0px;">油区:</label>
                <div class="col-4"  style="padding-left:0px;padding-right:5px;">
                    <select id="inputState" class="form-control" v-model="selectedWellBlock">
                        <option>全部</option>
                        <option v-for="item in wellBlockList">{{item}}</option>
                    </select>
                </div>
                <label class="col-2 col-form-label"  style="padding-right:0px;">井名:</label>
                <div class="col-4 input-group" style="padding-left:0px">
                    <input type="text" class="form-control" placeholder="井名"  v-model="selectedJM">
                </div>
            </div>
        </form>
        <div class="list-group" style="margin-top:60px;">
            <a v-for="(item,index) of tableData" class="list-group-item list-group-item-action flex-column align-items-start" @click="handleClickItem(index)">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">
                        <i class="fa fa-circle" v-if="item.clientStatus==0" style="color:red;font-size:16px;margin-right:5px;"></i>
                        <i class="fa fa-circle" v-if="item.clientStatus==1||item.clientStatus==2" style="color:green;font-size:16px;margin-right:5px;"></i>
                        <i class="fa fa-circle-thin" v-if="item.clientStatus==''||!item.clientStatus" style="font-size:16px;margin-right:5px;"></i>
                        <b>{{item.wellName}}</b>
                    </h5>
                    <small>{{item.wellBlock | ifStringIsNull}}</small>
                </div>
                <div class="row">
                    <label class="mb-1 col-4" style="padding-right:0px;text-align:right;">设计井深：</label>
                    <div class="col-8" style="padding-left:0px">{{item.authorizedMd | ifStringIsNull}}</div>
                </div>
                <div class="row">
                    <label class="mb-1 col-4" style="padding-right:0px;text-align:right;">当前井深：</label>
                    <div class="col-8" style="padding-left:0px">{{item.bHMd | ifStringIsNull}}</div>
                </div>
                <div class="row">
                    <label class="mb-1 col-4" style="padding-right:0px;text-align:right;">作业内容：</label>
                    <div class="col-8" style="padding-left:0px">{{item.workContent | ifStringIsNull}}</div>
                </div>
                <!-- <small>Donec id elit non mi porta.</small> -->
            </a>
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
                            return param1.localeCompare(param2,"zh");
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

        watch:{
            selectedJM:function(){
                this.handleSelect()
            },
            selectedWellBlock:function(){
                this.handleSelect()
            }
        }
    }
</script>

<style lang="scss" scoped>
    #wellList {
        text-align: left;
    }
    .oms2-search-bar{
        position:fixed;
        z-index:2;
        top:0px;
        padding-top:10px;
        background-color:#fff;
        box-shadow: 0px 1px 5px #e4e4e4;
    }
    .oms2-search {
        position: absolute;
        right: 10px;
        top: 5px;
    }
    .oms2-table-header-fixed {
        /* position: fixed;
                top:20px;
                z-index: 2; */
    }
</style>


