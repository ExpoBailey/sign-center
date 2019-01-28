<template>
  <div>
    <van-cell-group>
      <van-cell icon="location-o" title="后台" is-link to="admin" />
      <van-cell icon="location-o" title="我的奖品" is-link to="/award/count" />
    </van-cell-group>

    <van-cell-group>
      <van-cell title="退出登录" :center="centerFlag" class="out-cell" clickable="true" @click="out"/>
    </van-cell-group>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: "333",
        centerFlag: true
      }
    },
    mounted() {},
    methods: {

      out() {
        let vm = this;
        vm.$toast.loading("正在退出");
        this.axios.get('/sign-center/api/login/out').then(res => {
          if (res.data.status === 200) {
            vm.$toast.clear();
            vm.$toast.success("已安全退出");
            vm.$router.push({name: 'login'})
          }
        })
      },

    }
  }
</script>
<style scoped>

  .out-cell {
    text-align: center;
    margin-top: 10px;
  }

</style>
