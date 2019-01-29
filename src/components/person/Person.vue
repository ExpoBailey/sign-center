<template>
  <div>

    <van-cell-group>
      <van-cell icon="shop-o" class="user-cell">
        <div slot="icon">
          <img class="user-img" :src="defaultUrl"/>
        </div>
        <template slot="title">
          <h2 class="user-name-text">{{userName}}</h2>
          <span class="user-code-text">猫猫号：{{userCode}}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-top">
      <van-cell icon="location-o" title="后台" is-link to="admin" />
    </van-cell-group>

    <van-cell-group class="cell-top">
      <van-cell icon="location-o" title="打卡纪录" is-link to="/person/sign/record" />
      <van-cell icon="location-o" title="我的奖品" is-link to="/award/count" />
    </van-cell-group>

    <van-cell-group class="cell-top out-cell">
      <van-cell title="退出登录" :center="centerFlag" :clickable="true" @click="out"/>
    </van-cell-group>
  </div>
</template>
<script>
  import defaultUrl from '../../assets/images/logo.png'

  export default {
    data() {
      return {
        msg: "333",
        centerFlag: true,
        userCode: "22222",
        userName: "jffeerr",
        defaultUrl: defaultUrl
      }
    },
    mounted() {
      this.initUser()
    },
    methods: {

      initUser() {
        let vm = this;
        vm.axios.get("/sign-center/api/user/login/judge")
          .then(res => {
            if (res.data.status === 200 && res.data.data.login) {
              vm.userCode = res.data.data.userCode;
              vm.userName = res.data.data.userName;
            }
          })
      },

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
  }

  .cell-top {
    margin-top: 10px;
  }

  .cell-font {

  }

  .user-name-text {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .user-code-text {
    color: #969799;
  }

  .user-img {
    width: 80px;
  }

  .user-cell {
    padding: 25px 15px;
  }

</style>
