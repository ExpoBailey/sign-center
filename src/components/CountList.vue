<template>
  <div>
    <div class="weui-loadmore weui-loadmore_line" v-if="signInfoList.length === 0">
      <span class="weui-loadmore__tips">暂无数据</span>
    </div>
    <div class="weui-cells">
      <div class="weui-cell" v-for="(item, index) in signInfoList">
        <div class="weui-cell__bd">
          <p>{{item.project.name | restrictLength(5)}}</p>
        </div>
        <div class="weui-cell__hd" v-if="item.remark != ''" @click="clickInfoShowRemark(item)">
          <img src="../assets/images/remark.png" style="width:20px;margin-right:5px;display:block">
        </div>
        <div class="weui-cell__ft">{{item.startDate}}</div>
      </div>
    </div>

    <!--查看备注的弹框-->
    <div id="infoRemark" class="weui-popup__container popup-bottom">
      <div class="weui-popup__overlay"></div>
      <div class="weui-popup__modal">
        <div class="toolbar">
          <div class="toolbar-inner">
            <a href="javascript:;" class="picker-button close-popup">关闭</a>
            <h1 class="title">【{{popupTitle}}】纪录的备注</h1>
          </div>
        </div>
        <div class="modal-content">
          <div class="weui-grids">
            <div class="weui-cells weui-cells_form">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <textarea class="weui-textarea" :value="popupRemark" rows="3" readonly></textarea>
                  <div class="weui-textarea-counter"><span>不可修改</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      list: Array
    },
    data() {
      return {
        signInfoList: this.list,
        popupTitle: null,
        popupRemark: null,
      }
    },
    watch: {
      list: {
        handler(newValue, oldValue) {
          this.signInfoList = newValue;
        },
        deep: true
      }
    },
    mounted() {},
    methods: {
      clickInfoShowRemark(info) {
        let vm = this;
        vm.popupTitle = info.project.name;
        vm.popupRemark = info.remark;
        $("#infoRemark").popup();
      }
    }
  }
</script>
<style scoped>
  .weui-cells {
    margin-top: 0.5em;
  }

  .popup-bottom .weui-cells {
    margin-top: 0;
  }
</style>
