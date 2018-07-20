<template>
  <div id="Me">
    <!-- <oms2-header :title="$route.meta.title">
    </oms2-header> -->
    <oms2-Modal-date-range @date-range="handleSelect"></oms2-Modal-date-range>
  </div>
</template>

<script>
import dateRangeModal from './../components/Modal/DateRangeModal'
  export default {
    data() {
      return {}
    },
    created(){

    },
    methods: {
      handleSelect(range){
        console.log(range)

      }
    },
    components:{
      "oms2-Modal-date-range":dateRangeModal
    }
  }
</script>

<style>
  #Me {
    /* margin-top: 50px; */
  }
</style>
