<template>
  <div>
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
     <ul  class="list-group">
      <li class="list-group-item" v-for="item in data" v-bind:key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      let data=[];
      for(let i=0;i<20;i++){
        data.push("这是第"+i+"行");
      }
      return{
        data
      }
    },
  }
</script>

<style>

</style>