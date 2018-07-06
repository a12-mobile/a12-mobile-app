<template>
    <header class="oms2-header">
        <div class="oms2-header-button left">
            <img @click="handleBack" src="./../assets/icon/sys/close.png">
        </div>
        <p class="oms2-header-title" v-text="title"></p>
        <div class="oms2-header-button right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script>
    /**
     * oms2-header
     * @module components/header
     * @desc 顶部导航
     * @param {string} [title] - 标题
     * @param {slot} [left] - 显示在左侧区域
     * @param {slot} [right] - 显示在右侧区域
     *
     * @example
     * <oms2-header title="我是标题" fixed>
     *   <button slot="left" @click="handleBack">返回</button>
     *   <button slot="right"></button>
     * </oms2-header>
     */
    export default {
        name: 'oms2-header',
        props: {
            title: String
        },
        mounted(){
            // this.$ruixin.hideWebViewTitle({});
        },
        methods:{
            //返回按钮
            handleBack(){
                window.history.length > 1 ? this.$router.go(-1) : this.$ruixin.closePage({});
            }
        }
    }
</script>

<style lang="scss">
    .oms2-header {
        display: flex;
        text-align: center;
        align-items: center;
        background-color: $header-color;
        height: $header-height;
        width: 100%;
        font-size: 20px;
        color: black;
        line-height: 1;
        padding: 0 15px;
        white-space: nowrap;
        position: fixed;
        z-index: 100;
        box-shadow: 2px 2px 3px #e4e4e4;
        .oms2-header-title {
            margin:0px;
            flex: 5;
            color: inherit;
            font-size: inherit;
        }
        .oms2-header-button {
            flex: 1;
            img{
                height:20px;
                width:20px;
            }
        }
        .left {
            text-align: left;
        }
        .right {
            text-align: right;
        }
    }
</style>
