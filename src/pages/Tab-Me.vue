<template>
  <div id="Me">
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
    <button class="btn btn-info" @click="requestTest">获取用户信息</button>
    <br/>
    <br/>
    <br/>



  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      requestTest(){
        this.$http('GET','/user',)
                .then((data)=> {
                    if(data.body){
                      console.log();
                      alert("用户名为："+data.body.userName)
                    }else{
                      alert("返回值没有body")
                    }
                })
                .catch(function(error) {
                    alert("出错"+error)
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
