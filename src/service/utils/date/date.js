  /**
   * 封装关于Date的方法，方法含有：
   * 
   * getCurrentTime()        获取当前时间  HH:mm:ss
   * getCurrentDate()        获取当前日期  yyyy-MM-dd
   * addDate()               日期，在原有日期基础上，增加（减少）days天数，默认增加1天
   * addMonth()              在原有日期基础上，增加（减少）months月，默认增加1月
   * formatDate()            将date类型按指定格式转化为String类型
   * compareDate()           比较两个日期的大小
   */
  
  
  
  
  
  /**
   * 获取当前时间  HH:mm:ss
   */
  export function getCurrentTime(){
    var date = new Date()
    var hour=date.getHours()
    var minute=date.getMinutes()
    var second=date.getSeconds()
    return getFormatDate(hour)+":"+getFormatDate(minute)+":"+getFormatDate(second)
  }

  /**
   * 获取当前日期  yyyy-MM-dd
   */
  export function getCurrentDate(format='yyyy-MM-dd'){
    var date = new Date()
    var year=date.getFullYear()
    var month=date.getMonth()+1
    var day=date.getDate()
    if(format.indexOf('yyyy')!=-1){
        format=format.replace('yyyy',year)
    }
    if(format.indexOf('MM')!=-1){
        format=format.replace('MM',getFormatDate(month))
    }
    if(format.indexOf('dd')!=-1){
        format=format.replace('dd',getFormatDate(day))
    }
    return format
  }

  /**
   * 日期，在原有日期基础上，增加（减少）days天数，默认增加1天
   * @param {*} date 日期字符串形式 如2018-05-10
   * @param {*} days number型，为加减的天数，为负数时减少天数
   */
  export function addDate(date, days=1) {
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
   * 在原有日期基础上，增加（减少）months月，默认增加1月
   * @param {String/Date} date 日期字符串形式 如2018-05-10  Date格式也可以
   * @param {number} months 为加减的月份数，为负数时减少月份
   * @param {String} format 日期格式
   */
  export function addMonth(date, months=1 ,format='yyyy-MM-dd') {
      var date1 = new Date(date);
      date1.setMonth(date1.getMonth() + months)
      //对日期进行格式化
      return formatDate(date1,format)
  }

  /**
   * 将date类型转化为String类型
   * @param {*} date Date类型的参数
   * @param {*} format 转化的格式  yyyy-MM-dd HH:mm:ss
   */
  export function formatDate(date,format="yyyy-MM-dd HH:mm:ss"){
    var year=date.getFullYear()
    var month=date.getMonth()+1
    var day=date.getDate()
    var hour=date.getHours()
    var minute=date.getMinutes()
    var second=date.getSeconds()
    if(format.indexOf('yyyy')!=-1){
        format=format.replace('yyyy',year)
    }
    if(format.indexOf('MM')!=-1){
        format=format.replace('MM',getFormatDate(month))
    }
    if(format.indexOf('dd')!=-1){
        format=format.replace('dd',getFormatDate(day))
    }
    if(format.indexOf('HH')!=-1){
        format=format.replace('HH',getFormatDate(hour))
    }
    if(format.indexOf('mm')!=-1){
        format=format.replace('mm',getFormatDate(minute))
    }
    if(format.indexOf('ss')!=-1){
        format=format.replace('ss',getFormatDate(second))
    }
    return format
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
    if (re.length < 2||re.length==0) {
        re = '0' + re
    }
    return re
}