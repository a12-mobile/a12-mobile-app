/**
 * 封装关于toast的方法
 * 
 * showToast()     显示toast
 * 
 */

import { Toast } from "mint-ui"
import { Indicator } from 'mint-ui';

const toastServer={
    POSITION:{
        bottom:'bottom',
        top:'top',
        middle:'middle'
    },
    /**
     * 显示toast
     * @param {*} message 显示内容  
     * @param {*} position 显示位置
     * @param {*} duration 显示时间
     */
    showToast:function(message,duration='3000',position='bottom'){
        Toast({
            message,
            position,
            duration,
        })
    },
    showIndicator:{
        open:function(msg){
            Indicator.open(msg)
        },
        close:function(){
            Indicator.close()
        }
    },
}

export default toastServer