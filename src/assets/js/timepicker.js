// for Vue 2.0
// import myDatepicker from 'vue-datepicker'
import {getCurrentDate} from './date'

export default {
      // for Vue 2.0
      startTime: {
        time: getCurrentDate()
      },
      endTime: {
        time: ''
      },

      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: '选择时间',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F',
          'width':'100px'
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
      timeOption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm',
        placeholder: '选择时间',
        buttons: {
          ok: '确定',
          cancel: '取消'
        },
        inputStyle: {
          'width':'auto'
        },
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format:"YYYY-MM-DD HH:mm"
      },
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5]
      },
      {
        type: 'fromto',
        from: '2016-02-01',
        to: '2020-02-20'
      }]
}