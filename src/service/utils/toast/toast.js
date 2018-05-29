/**
 * 封装关于toast的方法
 * 
 * showToast()     显示toast
 * 
 */

import { Toast } from "mint-ui"

export const POSITION={
    bottom:'bottom',
    top:'top',
    middle:'middle'
}

/**
 * 显示toast
 * @param {*} message 显示内容  
 * @param {*} position 显示位置
 * @param {*} duration 显示时间
 */
export function showToast(message,position='bottom',duration='3000'){
    Toast({
        message,
        position,
        duration,
    })
}