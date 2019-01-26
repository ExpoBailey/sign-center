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

      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-cell-group>
        <van-switch-cell v-model="typeFlag" title="是否奖品" />
      </van-cell-group>

      <van-cell-group>
        <van-switch-cell v-model="statusFlag" title="启用" />
      </van-cell-group>

      <van-slider v-model="award.probable" @change="changeProb" :step="step" :max="max" :min="min" active-color="#f44">
        <div
          slot="button"
          class="custom-button"
        >
          {{ award.probable }}
        </div>
      </van-slider>

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
        slider: {
          step: 0.01,
          max:1,
          min: 0.1
        }
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
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },

      onClickRight() {
        this.show = true;
      },

      changeProb(value) {
        console.log(value);
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
  .custom-button {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
  }
</style>
