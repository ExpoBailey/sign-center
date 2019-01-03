<template>
  <div>
    <div id="retroclockbox1" ></div>
  </div>
</template>

<script>
  import flipcount from "../assets/flipcountdown/jquery.flipcountdown"
  export default {
    name: 'flipTime',
    data() {
      return {

      }
    },
    mounted() {
      console.log(flipcount)
      $('#retroclockbox1').flipcountdown();
    }
  }
</script>

<style>
  @import "../assets/flipcountdown/jquery.flipcountdown.css";
</style>
