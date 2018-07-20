<template>
    <div id="dateRangeModal">
        <i @click="handleShowModal" class="fa fa-history oms2-icon-history"></i>
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
                                    <date-picker :date="startDate" :option="option" ></date-picker>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-4 col-form-label">结束时间:</label>
                                <div class="col-7"  style="text-align:left">
                                    <date-picker :date="endDate" :option="option"></date-picker>
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
import {formatDate} from './../../service/utils/date/date'
import myDatepicker from 'vue-datepicker'

export default {
    data(){
        return {
                startDate:{
                    time:formatDate(new Date(),'yyyy-MM-dd HH:mm')
                },
                endDate:{
                    time:formatDate(new Date(),'yyyy-MM-dd HH:mm')
                },
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
                quertInterval:60  //查询间隔
        }
    },
    methods:{
        handleShowModal(){
            $("#ModalSelect").modal('show')
        },
        handleSelect(){
            this.$emit("date-range",{
                start:this.startDate.time+":00",
                end:this.endDate.time+":00",
                interval:this.quertInterval
            })
        }
    },


    props:[

    ],

    components: {
            'date-picker': myDatepicker
        },
    
}
</script>

<style lang="scss">
    #dateRangeModal {

    }

</style>


