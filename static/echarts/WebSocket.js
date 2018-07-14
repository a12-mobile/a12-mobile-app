import {rtData} from "./rtData";


var webSocket = null;
var rtDataInstance = new rtData();


window.rtDataInstance = rtDataInstance;
window.webSocket = webSocket;

window.initWebSocket = function () {
    let host = "localhost:8002";
    //  let host = location.host;
     console.log("呵呵")
    webSocket = new WebSocket("ws://"+"localhost:8002"+"/websocket/websocket");
    webSocket.onmessage = function (event) {
        rtDataInstance.update(event.data);
    };
    webSocket.onopen = function (event) {
        rtDataInstance.afterSessionCreated();
    };
    webSocket.onclose = function (event) {
    };
}
