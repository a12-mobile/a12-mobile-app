<template>  
  <div class="tabs">  
    <!--命名路由-->  
    <ul>  
      <!--this inspection reports XML/HTML tags with missing mandatory attrbutes ,you can specify attrbute name that should not  be reported-->  
      <!--home被点击后，一直处于激活状态，因此需要使用精确匹配模式，在router-link中添加exact属性-->  
      <router-link :to="{name:'Home'}" tag="li" exact>  
        <div>  
          <i class="icon iconfont icon-home"></i>  
        </div>  
        <div>首页</div>  
      </router-link>  
      <router-link :to="{name:'MultiWellList'}" tag="li">  
        <div>  
          <i class="icon iconfont icon-liebiaomoshi"></i>  
        </div>  
        <div>多井列表</div>  
      </router-link>  
      <router-link :to="{name:'Discussion'}" tag="li">  
        <div>  
          <i class="icon iconfont icon-discussion"></i>  
        </div>  
        <div>协同讨论</div>  
      </router-link>
      <router-link :to="{name:'Me',params:{user:'xu'}}" tag="li">  
        <div>  
          <i class="icon iconfont icon-wo"></i>  
        </div>  
        <div>我</div>
      </router-link>  
    </ul>  
  </div>  
</template>  
<script type="text/ecmascript-6">  
  export default {

  }  
</script>  
<style lang="less" type="text/less">
  .tabs {  
    z-index: 1;
    position: fixed;  
    bottom: 0;  
    left: 0;  
    background-color: #F8F8F8;  
    box-shadow: 0 2px 4px #000;  
    width: 100%;
    & > ul, & > ul > li {  
      margin: 0;  
      padding: 0;  
    }  
    ul {  
      display: table;  
      width: 100%;  
      & > li {  
        text-align: center;  
        font-size: 16px;  
        display: table-cell;  
        padding: 8px 12px;  
        cursor: pointer;  
        &.router-link-active{  
          //链接激活时使用的css样式
          color: #D0021B;  
        }  
        & > div {  
          font-size: 14px;  
          & > i {  
            font-size: 30px;  
          }  
        }  
      }  
    }  
  }  
</style>  