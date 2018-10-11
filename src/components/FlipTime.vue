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
      $('#retroclockbox1').flipcountdown();
    }
  }
</script>
