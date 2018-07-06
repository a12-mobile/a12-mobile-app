<template>
    <div id="WellDaily">
        <oms2-header :title="well.jm+'日报'">
        </oms2-header>
        <div class="container oms2-list">
            <div class="row">
                <label class="col-5 oms2-right">日期:</label>
                <p>{{well.time}}</p>
            </div>
            <div class="oms2-list-divider list-group-item list-group-item-dark">基础信息</div>
            <div class="row">
                <label class="col-5 oms2-right">施工单位:</label>
                <p>{{well.sgdw}}</p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">队号:</label>
                <p>{{well.dh}}</p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">井别:</label>
                <p>{{well.wellSort}}</p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">井型:</label>
                <p>{{well.wellType}}</p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">开钻日期:</label>
                <p>{{well.start1Date}}</p>
            </div>
            <div class="oms2-list-divider list-group-item list-group-item-dark">当日动态</div>
            <div class="row">
                <label class="col-5 oms2-right">设计井深:</label>
                <p>{{well.designWellDepth}}<span v-if="well.designWellDepth!=''">m</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">当前井深:</label>
                <p>{{well.actualWellDepth}}<span v-if="well.actualWellDepth!=''">m</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">钻达层位:</label>
                <p>{{well.layername}}</p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">工况:</label>
                <p>{{well.project}}</p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">工作内容:</label>
                <div class="col-7 oms2-list-item-content">{{well.workContent}}</div>
            </div>
            <div class="oms2-list-divider list-group-item list-group-item-dark ">工作量</div>
            <div class="row">
                <label class="col-5 oms2-right">进尺-当日:</label>
                <p>{{well.dailyDrilledFootage | ifNumberIsNull}}<span v-if="well.dailyDrilledFootage!='-1'">m</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">进尺-月计划:</label>
                <p>{{well.monthPlannedDrillingFootage | ifNumberIsNull}}<span v-if="well.monthPlannedDrillingFootage!='-1'">m</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">进尺-月累:</label>
                <p>{{well.cumulMonthDrilledFootage | ifNumberIsNull}}<span v-if="well.cumulMonthDrilledFootage!='-1'">m</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">进尺-年累:</label>
                <p>{{well.cumulYearDrilledFootage | ifNumberIsNull}}<span v-if="well.cumulYearDrilledFootage!='-1'">m</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">完井-月累:</label>
                <p>{{well.monthCompletion | ifNumberIsNull}}<span v-if="well.monthCompletion!='-1'">口</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">完井-年累:</label>
                <p>{{well.yearFinish | ifNumberIsNull}}<span v-if="well.yearFinish!='-1'">口</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">钻头尺寸型号:</label>
                <p>{{well.bitSizeModel}}</p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">钻压:</label>
                <p>{{well.woba | ifNumberIsNull}}<span v-if="well.woba!='-1'">KN</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">排量:</label>
                <p>{{well.deliveryVolume | ifNumberIsNull}}<span v-if="well.deliveryVolume!='-1'">L/s</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">纯钻时间:</label>
                <p>{{well.onlydrill | ifNumberIsNull}}<span v-if="well.onlydrill!='-1'&&well.onlydrill">h</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">钻速:</label>
                <p>{{well.drillRotateSpeed}}<span v-if="well.drillRotateSpeed!='-1'">r/min</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">泵压:</label>
                <p>{{well.pumpPressure | ifNumberIsNull}}<span v-if="well.pumpPressure!='-1'">MPa</span></p>
            </div>
            <div class="list-group-item list-group-item-dark oms2-list-divider">钻井液性能</div>
            <div class="row">
                <label class="col-5 oms2-right">密度-设计:</label>
                <p>{{well.designMudPropDendity | ifNumberIsNull}}<span v-if="well.designMudPropDendity!='-1'">g/cm3</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">密度-实际:</label>
                <p>{{well.mudPropDensity | ifNumberIsNull}}<span v-if="well.mudPropDensity!='-1'">g/cm3</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">粘度:</label>
                <p>{{well.mudPropViscosity | ifNumberIsNull}}<span v-if="well.mudPropViscosity!='-1'">s</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">失水:</label>
                <p>{{well.mudPropWaterLose | ifNumberIsNull}}<span v-if="well.mudPropWaterLose!='-1'">ml</span></p>
            </div>
            <div class="row">
                <label class="col-5 oms2-right">含砂:</label>
                <p>{{well.mudPropGrittyConsistence | ifNumberIsNull}}<span v-if="well.mudPropGrittyConsistence!='-1'">%</span></p>
            </div>
            <div class="list-group-item list-group-item-dark oms2-list-divider">套管及钻具</div>
            <div class="row">
                <label class="col-6 oms2-right">套管规格(mm*m):</label>
                <div><p style="margin-left:10px;">{{well.cannulaSizeModel}}</p></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        created(){
            this.well=this.$route.query.well
            if(!this.well){
                this.well=[]
            }
            this.$ruixin.hideWebViewTitle({});
        },
        mounted(){
            setTimeout(()=>{
                this.$ruixin.supportAutorotate({});
            },200)
        },
        data() {
            return {
                well: []
            }
        }
    }
</script>

<style lang="scss" scoped>
    #WellDaily {}
    .oms2-list {
        padding-top: $header-height+10px;
    }
    .oms2-list-divider {
        text-align: center;
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        margin-bottom: 10px;
        font-size: 16px;
    }
    .oms2-right {
        text-align: right;
    }
    .oms2-list-item-content{
        font-size:16px;
            text-align: left;
            padding-left:0px;
            padding-bottom:10px; 
        }
</style>



