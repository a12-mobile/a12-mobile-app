import { Toast } from "mint-ui"

export const POSITION={
    bottom:'bottom',
    top:'top',
    middle:'middle'
}

export function showToast(message,position='bottom',duration='3000'){
    Toast({
        message,
        position,
        duration,
    })
}