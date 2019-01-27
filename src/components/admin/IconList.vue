<template>
  <div>
    <div class="title-text">
      <p>奖品列表</p>
    </div>

    <van-tabs v-model="active" animated>
      <van-tab title="基础图标">
        <van-col span="6" :class="[selectIndex == index ? activeClass : '', iconClass]" v-for="(item, index) in list" :key="index">
          <van-icon :name="item.name" :color="item.color" size="3em" @click="_onClick(item)"/>
        </van-col >
      </van-tab>
      <van-tab title="本地图标">
        <van-button type="default" @click="upload">上传</van-button>
        <van-button type="default" @click="_onClick">关闭</van-button>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script>
  export default {
    props: {
      onClick: {
        type: Function
      },
      name: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        activeClass: 'active-icon',
        iconClass: 'sign-icon',
        active: 0,
        list: [
          {name: "like", color: "#FF3030"},
          {name: "fire", color: "rgb(255, 210, 30)"},
          {name: "star", color: "rgb(255, 210, 30)"},
        ],
      }
    },
    watch: {
      name(a, b) {
        console.log(a + ", " + b);
      }
    },
    computed: {
      selectIndex() {
        let vm = this;
        for (let i = 0; i < vm.list.length; i++) {
          let item = vm.list[i];
          if (item.name === vm.name) {
            return i
          }
        }
        return -1;
      }
    },
    methods: {
      _onClick(item) {
        this.onClick(item);
      },
      upload() {
        console.log(this.selectIndex);
        this.$toast('该功能未开放');
      }
    }
  }
</script>
<style scoped>
  .sign-icon {
    text-align: center;
    display: inline-block;
    vertical-align: middle;
  }
  .sign-icon:hover {
    background-color: red;
  }
  .activeClass {
    background-color: blue;
  }
</style>
