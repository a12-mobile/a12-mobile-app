<template>
  <div>
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
    <button class="btn btn-info" @click="requestTest">请求数据测试</button>
    <br/>
    <br/>
    <br/>
    <!-- <router-link to="/sub">
      <button type="button" class="btn btn-primary">进入子页面</button>
    </router-link> -->
<!-- 
    <br/>
    <br/> -->
    <router-link to="/dailyOfDrilling">
      <button type="button" class="btn btn-primary">进入中油油服钻井日报</button>
    </router-link>
    <router-link to="/monthLogOfWellWorkload">
      <button type="button" class="btn btn-primary">进入录井工作量月报</button>
    </router-link>


  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      requestTest(){
        this.$http('GET','logging/loggingWell',{
                    "token":"a735579b-93fa-4719-aa92-968191372004",
                    "rx_token":"a735579b-93fa-4719-aa92-968191372004",
                    "date":'2018-05-22'
                    })
                .then((data)=> {
                    Indicator.close()
                    if(data){
                        this.tableData=data
                    }else{
                        this.tableData=[]
                    }
                })
                .catch(function(error) {
                    Indicator.close()
                    console.log(error)
                })
      }
      
    }
  }
</script>

<style>

</style>
