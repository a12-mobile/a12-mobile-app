<template>
  <div class="tabs">
    <!--命名路由-->
    <ul v-show="$route.meta.navShow">
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
<style>
  .tabs {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #F8F8F8;
    box-shadow: 0 2px 4px #000;
    width: 100%;
  }
  .tabs ul,
  .tabs ul li {
    margin: 0;
    padding: 0;
  }
  .tabs ul {
    display: table;
    width: 100%;
  }
  .tabs ul li {
    text-align: center;
    font-size: 16px;
    display: table-cell;
    padding: 8px 12px;
    cursor: pointer;
  }
  .tabs ul li.router-link-active {
    color: #D0021B;
  }
  .tabs ul li div {
    font-size: 12x;
  }
  .tabs ul li div i {
    font-size: 30px;
  }
  textarea {
    width: 400px;
    height: 300px;
    font-size: 12px;
  }
</style>