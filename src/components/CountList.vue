<template>
  <div>
    <div class="weui-loadmore weui-loadmore_line" v-if="signInfoList.length === 0">
      <span class="weui-loadmore__tips">暂无数据</span>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      :error.sync="error"
      @load="onLoad"
      :offset="offset"
    >
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
    </van-list>

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

  import Utils from '../utils'

  export default {
    props: {
      startDate: {
        type: String,
        default: null
      },
      endDate: {
        type: String,
        default: null
      },
      projectIds: {
        type: Array,
        default: []
      },
      sortFlag: {
        type: Number,
        default: 0
      },
      refresh: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        signInfoList: [],
        popupTitle: null,
        popupRemark: null,
        error: false,
        loading: false,
        finished: false,
        offset: 50,
        pager: {
          pageIndex: 0,
          pageSize: 8,
          pageCount: 1,
          itemCount: 0,
        }
      }
    },
    watch: {
      startDate(newValue, oldValue) {
        this.refreshData();
      },
      endDate(newValue, oldValue) {
        this.refreshData();
      },
      projectIds(newValue, oldValue) {
        this.refreshData();
      },
      sortFlag(newValue, oldValue) {
        this.refreshData();
      },
      refresh(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.refreshData()
        }
      }
    },
    mounted() {
      this.refreshData();
    },
    methods: {

      clickInfoShowRemark(info) {
        let vm = this;
        vm.popupTitle = info.project.name;
        vm.popupRemark = info.remark;
        $("#infoRemark").popup();
      },

      refreshData() {
        this.pager.pageIndex = 0;
        this.signInfoList = [];
        console.log("清空，查")
        this.onLoad()
      },

      onLoad() {
        let vm = this;
        vm.pager.pageIndex++;
        let startDate = vm.startDate;
        let endDate = vm.endDate;
        let sortFlag = vm.sortFlag;
        let projectIds = vm.projectIds;
        // 开始、结束时间相同，查当天记录
        if (startDate === endDate !== null) {
          if (startDate == null) {
            startDate = endDate = Utils.getTodayString();
          }
          startDate += " 00:00:00";
          endDate += " 23:59:59";
        } else {
          // 开始时间为空，默认很早；0点开始
          if (startDate == null) {
            startDate = "1999-12-12 00:00:00";
          } else {
            startDate += " 00:00:00";
          }

          // 结束时间，默认很远，23:59:59结束
          if (endDate == null) {
            endDate = "2099-12-12 23:59:59";
          } else {
            endDate += " 23:59:59";
          }
        }

        let queryParams = "?startDate=" + startDate + "&endDate=" + endDate + "&sortFlag=" + sortFlag + (projectIds ==
        null ? '' : ("&projectIds=" + projectIds.join(","))) + "&pageIndex=" + vm.pager.pageIndex + "&pageSize=" + vm.pager.pageSize;
        vm.axios.get("/sign-center/api/core/sign/page"+ queryParams)
          .then(res => {
            this.pager = res.data.pager;
            res.data.data.forEach(signInfo => {
              vm.signInfoList.push(signInfo)
            })
          })
          .then(res => {
            console.log(vm.signInfoList.length);
            vm.loading = false;
            vm.finished = vm.pager.pageIndex >= vm.pager.pageCount;
          })
          .catch(error => {
            vm.error = true;
          })
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
