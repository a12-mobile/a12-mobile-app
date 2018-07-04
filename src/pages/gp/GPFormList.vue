<template>
  <div id="GPFormList">
    <div class="container">
      <div class="row">
          <div class="col-4 oms2-g-grid-cell">
            <a href="http://app.bgp.cnpc.com.cn/gms_app/projectgisinfo/login.html?appcode=cng=&action=index.html">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/gp/gp.png">
            </a>
            <p>物探项目分布</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <a href="http://app.bgp.cnpc.com.cn/gms_app/gms_app/login.html?appcode=cng=&action=dashboard/main.html">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/monthlyOfWorkload.png">
            </a>
            <p>物探综合分析</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created(){
      this.$ruixin.setWebViewTitle({title:'物探专业'})
    },
    methods: {
    }
  }
</script>

<style>
  #GPFormList{
    padding-top:10px;
  }

</style>
