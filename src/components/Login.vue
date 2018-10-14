<template>
  <div>
    <header class="demos-header">
      <h1 class="demos-title">{{projectName}}</h1>
    </header>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">帐号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="email" pattern="[a-zA-Z]{3}" placeholder="请输入用户帐号" v-model="user.userCode">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password" placeholder="请输入密码" v-model="user.password">
        </div>
      </div>
    </div>

    <div class="weui-btn-area">
      <a @click="login()" :class="[wait ? btnDisabled : '', btnClass]">
        <i class="weui-loading" v-show="wait"></i>{{btnDesc}}</a>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        projectName: '喵喵嘀卡',
        btnClass: "weui-btn weui-btn_primary",
        btnDisabled: "weui-btn_disabled",
        btnDesc: "登录",
        wait: false,
        user: {
          userCode: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        let vm = this;
        if (vm.user.userCode === '') {
          $.toptip('请输入用户帐号', 'error');
          return;
        } else if (vm.user.password === '') {
          $.toptip('请输入密码', 'error');
          return;
        }
        vm.btnDesc = "登录中...";
        vm.wait = true;
        vm.axios.post('/sign-center/api/login/into', vm.user).then(res => {
          if (res.data.status === 200) {
            vm.$router.push({name: 'core'});
          }
        });
        vm.btnDesc = "登录";
        vm.wait = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
