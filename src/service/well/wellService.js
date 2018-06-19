import httpService from './../http/httpService'
import { webSocketHttpUrl } from './../http/config'

export function setwellboreId (wellboreId, sessionId) {
  if (wellboreId == '' || wellboreId == undefined || sessionId == '' || sessionId == undefined) {
    return new Promise((resolve, reject) => {
      resolve(false)
    })
  }else {
    return httpService('POST', webSocketHttpUrl + '/wellbore/' + wellboreId, {
      'SESSION_ID': sessionId
    })
  }
}
