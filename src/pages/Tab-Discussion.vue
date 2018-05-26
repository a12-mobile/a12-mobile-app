<template>
  <div id="Discussion">
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
    <p>这是协同讨论页面</p>
    <oms2-date-picker-daily :date="date"></oms2-date-picker-daily>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalSelect">查询</button>
    <!-- Modal -->
    <div class="modal fade" id="ModalSelect" tabindex="-1" role="dialog" aria-labelledby="ModalSelectTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">数据查询</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <label for="staticEmail" class="col-3 col-form-label">日期：</label>
                  <div class="col-7 center">
                  <oms2-date-picker-daily :date="date">
                    <!-- <label for="staticEmail" class="col-3 col-form-label">日期：</label> -->
                  </oms2-date-picker-daily>
                  </div>
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">队号：</label>
                <div class="col-7">
                  <select id="inputState" class="form-control">
                      <option v-for="item in tableData">{{item.dh}}</option>
                      </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-3 col-form-label">井号：</label>
                <div class="col-7">
                  <select id="inputState" class="form-control">
                      <option v-for="item in tableData">{{item.jm}}</option>
                      </select>
                </div>
              </div>
            </form>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary">查询</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Indicator
  } from 'mint-ui';
  import timepicker from './../components/datepicker/timepicker'
  import DatePickerDaily from './../components/datepicker/DatePickerDaily'
  export default {
    data() {
      return {
        date: timepicker.startTime,
        tableData: [{
            "jm": '111',
            'dh': 'aaa'
          },
          {
            "jm": '222',
            'dh': 'bbb'
          },
          {
            "jm": '333',
            'dh': 'ccc'
          },
          {
            "jm": '444',
            'dh': 'ddd'
          },
          {
            "jm": '555',
            'dh': 'eee'
          },
        ]
      }
    },
    methods: {},
    components: {
      'oms2-date-picker-daily': DatePickerDaily
    }
  }
</script>

<style>
  #Discussion {
    margin-top: 50px;
  }
  .center{
    text-align: center;
  }
</style>