  /**
   * 获取当前时间  hh:mm:ss
   */
  export function getCurrentTime(){
    var date = new Date()
    var hour=date.getHours()
    var minute=date.getMinutes()
    var second=date.getSeconds()
    if(hour<10){
      hour="0"+hour
    }
    if(minute<10){
      minute="0"+minute
    }
    if(second<10){
      second="0"+second
    }
    return hour+":"+minute+":"+second
  }

  /**
   * 获取当前日期  yyyy-MM-dd
   */
  export function getCurrentDate(){
    var date = new Date()
    var year=date.getFullYear()
    var month=date.getMonth()+1
    var day=date.getDate()
    return year+"-"+getFormatDate(month)+"-"+getFormatDate(day)
  }

  /**
   * 日期，在原有日期基础上，增加（减少）days天数，默认增加1天
   * @param {*} date 日期字符串形式 如2018-05-10
   * @param {*} days 
   */
  export function addDate(date, days) {
      if (days == undefined || days == '') {
          days = 1
      }
      var date = new Date(date);
      date.setDate(date.getDate() + days)
      var month = date.getMonth() + 1
      var day = date.getDate()
      return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day)
  }

  /**
   * 比较两个日期的大小
   * 1  date1>date2
   * -1 date1<date2
   * 0 date1=date2
   * @param {*} date1 日期字符串形式 如2018-05-10
   * @param {*} date2 日期字符串形式 如2018-05-10
   */
  export function compareDate(date1,date2){
    var d1 = new Date(date1)
    var d2 = new Date(date2)
    if(d1>d2){
        return 1
    }else if(d1<d2){
        return -1
    }else{
        return 0
    }
  }


  // 日期月份/天的显示，如果是1位数，则在前面加上'0'
  function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return ''
    }
    var re = arg + ''
    if (re.length < 2) {
        re = '0' + re
    }
    return re
}