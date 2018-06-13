import httpService from './../http/httpService'

export function setwellboreId(wellboreId,sessionId){
    return new Promise((resolve,reject)=>{
        if(wellboreId==''||wellboreId==undefined||sessionId==''||sessionId==undefined){
            return resolve(false);
        }else{
            return httpService('POST','/websocket/wellbore/'+wellboreId,{
                    'SESSION_ID':sessionId
                    })
        }
    })

}