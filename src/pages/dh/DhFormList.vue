<template>
  <div id="DhFormList">
    <div class="container">
      <div class="row">
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/dh/monthly/workload/total">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/dh/monthlyOfWorkload.png">
            </router-link>
            <p>工作量月报总</p>
          </div>
          <div class="col-4 oms2-g-grid-cell">
            <router-link to="/dh/monthly/workload/gn">
              <img class='oms2-g-grid-cell-image' src="./../../assets/icon/log/monthlyOfWorkload.png">
            </router-link>
            <p>工作量月报国内</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created(){
      this.$ruixin.setWebViewTitle({title:'井下专业'})
    },
    methods: {
    }
  }
</script>

<style>
  #DhFormList{
    padding-top:10px;
  }

</style>