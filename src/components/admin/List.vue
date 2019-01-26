<template>
  <div class="content">

    <van-nav-bar
      title="奖品清单"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="plus" slot="right" />
    </van-nav-bar>

    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
    >

      <!--<van-field-->
        <!--label="用户名"-->
        <!--placeholder="请输入用户名"-->
      <!--/>-->

      <!--<van-cell-group>-->
        <!--<van-switch-cell v-model="typeFlag" title="是否奖品" />-->
      <!--</van-cell-group>-->

      <!--<van-cell-group>-->
        <!--<van-switch-cell v-model="statusFlag" title="启用" />-->
      <!--</van-cell-group>-->

      <van-row type="flex" >
        <van-col span="16">概率</van-col>
        <van-col span="8" justify="center">{{sliderValue}}%</van-col>
      </van-row>
      <van-slider v-model="sliderValue"
                  bar-height="4px"
                  active-color="#f44"
                  @change="changeProb"/>

    </van-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        show: false,
        username: '',
        password: '',
        award: {
          id: null,
          type: 1, // 正常奖品
          name: null,
          status: 1, // 1启用，0禁用
          probable: 0.5
        },
        sliderValue:50
      };
    },
    computed: {
      typeFlag: {
        get() {
          return this.award.type === 1;
        },
        set(flag) {
            this.award.type = flag ? 1 : 0;
        }
      },
      statusFlag: {
        get() {
          return this.award.status === 1;
        },
        set(flag) {
          this.award.status = flag ? 1 : 0;
        }
      },
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },

      onClickRight() {
        this.show = true;
      },

      changeProb(value) {
        this.award.probable = value / 100;
        console.log("概率：" + this.award.probable)
      },

      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      }

    }
  }
</script>
<style scoped>
   .content {
     background-color: #c9c9c9;
   }
</style>
