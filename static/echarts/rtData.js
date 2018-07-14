export class rtData {
    /**
     *
     * @param interval 实时数据请求间隔,默认为5s
     * @param agrs
     */
    constructor(interval = 3000, ...args) {
        if (typeof  new.target === "undefined") {
            throw  new Error("Constructor must be called!");
        };
        if (rtData.isCreated) {
            throw new Error("rtData instance can be created only one!")
        }
        rtData.isCreated = true;
    }
    update(data) {
        if (this.callback != undefined) {
            this.callback(data);
        }
    }
    afterSessionCreated(){
        if(this.sessionOpen!=undefined){
            this.sessionOpen();
        }
    }
}