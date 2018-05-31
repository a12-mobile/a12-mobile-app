<template>  
  <div class="main-body"  ref="wrapper" :style="{'-webkit-overflow-scrolling': scrollMode,'overflow':'auto',height: wrapperHeight + 'px'}">  
    <v-loadmore 
        :top-method="loadTop" 
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        :auto-fill="false" 
        ref="loadmore">  
      <ul class="list" v-for="(val, key) in pageList">  
        <li>  
          <div>{{key}}</div>
        </li>  
      </ul>  
    </v-loadmore>  
  </div>  
</template>  
<script>  
  import {Loadmore} from 'mint-ui';  
  export default {  
    data:function() {  
      return {  
        searchCondition:{  //分页属性  
          pageNo:"1",  
          pageSize:"10"  
        },  
        pageList:[],  
        wrapperHeight: 0,
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了  
        scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动  
      }  
    },  
    components: {  
      'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
                              // 推荐应用组件时用a-b形式起名  
    },  
    mounted(){  
      this.loadPageList();  //初次访问查询列表  
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;

    },  
    methods: {  
      loadTop:function() { //组件提供的下拉触发方法  
        //下拉加载  
        this.loadPageList();  
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
      },  
      loadBottom:function() {  
        // 上拉加载  
        this.more();// 上拉触发的分页查询  
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
      },  
      loadPageList:function (){  
          for(let i=0;i<10;i++){
              this.pageList.push(i);
          }
      },  
      more:function (){  
          // 分页查询  
        this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;  
        for(let i=0;i<10;i++){
              this.pageList.push(i);
        } 
      },  
      isHaveMore:function(isHaveMore){  
        // 是否还有下一页，如果没有就禁止上拉刷新  
        this.allLoaded = true; //true是禁止上拉加载  
        if(isHaveMore){  
          this.allLoaded = false;  
        }  
      }  
    }  
  }  
</script>  