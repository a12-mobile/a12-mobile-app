/**
 * css横屏显示
 * id 整体页面的id或者class名字
 * 
 * 
 * 报表使用屏幕旋转时需要注意:
 *    1.设置表格高度为 window.innerHeight*0.94
 *    2.由于页面旋转后与屏幕最后侧会存在一定边距，因此不需要设置页面margin-top，或者padding-top
 *    3.添加bootstrap模态框效果不好，如果一定要添加查询可以添加到页面最上方，如果一定一定要用模态框，那可以设置页面的z-index值
 *    4.toast提示，输入法均为竖屏效果，忍受不了不要横屏
 * 
 */
export function transToHorizontalScreen(id){
    $(id).css({
        "width": window.innerHeight*0.94+"px",
        "transform": "rotate(90deg)",
        "transform-origin":(window.innerWidth*0.47)+"px "+(window.innerWidth*0.47) +"px",
        "position": "absolute",
        "margin-top": "10px",
        "over-flow":'auto'
    })
}