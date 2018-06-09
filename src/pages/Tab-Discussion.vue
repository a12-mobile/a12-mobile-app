<template>
  <div id="Discussion">
    <!-- <mt-header :title="$route.meta.title" fixed>
    </mt-header> -->
    <i class='fa fa-chevron-left oms2-icon'></i>

    <button class="btn" @click="show">出现吧</button>

    <div class="oms2-div"></div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      show(){
        $(".oms2-div").slideToggle()
      }

    },
  }
</script>

<style lang="scss" scoped>
#Discussion{
  margin-top:50px;
  text-align: center;
  .oms2-icon{
    font-size:30px;
    position: relative;
    transition: .5s transform;

  }
  .oms2-icon:hover{
    transform: rotate(-.25turn);
  }

  .oms2-div{
    width:100px;
    height:100px;
    background:red;
    /*position:relative;*/
    /*animation:mymove 5s infinite;*/

  }
@keyframes mymove
{
  from {left:0px;}
  to {left:200px;}
}

}
</style>
