<template>
  <div id="Discussion">
    <mt-header :title="$route.meta.title" fixed>
    </mt-header>
    <p>这是协同讨论页面</p>
  </div>
</template>

<script>
  import DatePickerMonthly from './../components/datepicker/DatePickerMonthly'
  export default {
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style>
  #Discussion{
    margin-top: 50px;
  }

</style>