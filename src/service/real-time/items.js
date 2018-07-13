const RtData={
    item_count:120,
    GRID_COUNT:2,                 //Grid得初始化数量
    items :[
        {
            id: "8490",
            name: "大钩高度",
            unit: "m",
            limit_min: 0,
            limit_max: 1000,
            current: 0.0,
            color: "#EA449F",
            display: true,
            position: 1,
            data: new Array(this.item_count)
        }, {
            id: "8404",
            name: "钻速",
            unit: "",
            limit_min: 0,
            limit_max: 30,
            current: 0.0,
            color: "#AC31F4",
            display: true,
            position: 1,
            data: new Array(this.item_count)
        }, {
            id: "8010",
            name: "大钩负荷",
            unit: "kN",
            limit_min: 0,
            limit_max: 100,
            current: 0,
            color: "#7CFBF0",
            display: true,
            position: 1,
            data: new Array(this.item_count)
        },
        {
            id: "8011",
            name: "钻压",
            unit: "kN",
            limit_min: 0,
            limit_max: 200,
            current: 11.3,
            color: "#c23531",
            display: false,
            position: 1,
            data: new Array(this.item_count)
        }, {
            id: "8013",
            name: "扭矩",
            unit: "kN/m",
            limit_min: 0,
            limit_max: 100,
            current: 53.2,
            color: "#FFFF00",
            display: false,
            position: 1,
            data: new Array(this.item_count)
        }, {
            id: "8012",
            name: "转盘转速",
            unit: "RPM",
            limit_min: 0,
            limit_max: 100,
            current: 24.2,
            color: "#FACB0E",
            display: false,
            position: 1,
            data: new Array(this.item_count)
        },
        {
    
            id: "8111",
            name: "出口流量",
            unit: "L/s",
            limit_min: 1,
            limit_max: 100,
            current: 32.1,
            color: "#0FA3B2",
            display: false,
            position: 1,
            data: new Array(this.item_count)
        }, {
            id: "8110",
            name: "入口流量",
            unit: "L/s",
            limit_min: 1,
            limit_max: 100,
            current: 43.2,
            color: "#4901F0",
            display: false,
            position: 1,
            data: new Array(this.item_count)
        }, {
            id: "8219",
            name: "全烃",
            unit: "%",
            limit_min: 0,
            limit_max: 100,
            current: 53.2,
            color: "#F80999",
            display: false,
            position:1,
            data: new Array(this.item_count)
        }
    ]
}

export default RtData