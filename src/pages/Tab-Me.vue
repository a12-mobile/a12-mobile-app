<template>
  <div id="Me">
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



  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      requestTest(){
        this.$http('GET','mlog/loggingWell',{
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
  #Me{
    margin-top: 50px;
  }

</style>
