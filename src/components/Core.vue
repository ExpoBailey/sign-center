<template>

    <div class="weui-tab">

      <div class="weui-tab__bd">
        <div id="sign" class="weui-tab__bd-item weui-tab__bd-item--active">

          <div class="demos-header" style="text-align: center">
            <h1>{{ nowDateStr }}</h1>
            <flip-time></flip-time>
          </div>

        </div>

        <div id="list" class="weui-tab__bd-item">
          <div class="weui-panel">
            <div class="weui-panel__hd">我的项目</div>
            <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_small-appmsg">

                <div class="weui-loadmore" v-if="listWait">
                  <i class="weui-loading"></i>
                  <span class="weui-loadmore__tips">正在加载</span>
                </div>
                <div class="weui-loadmore weui-loadmore_line" v-if="!listWait && list.length === 0">
                  <span class="weui-loadmore__tips">暂无数据</span>
                </div>

                <div class="weui-cells" v-if="list.length > 0">
                  <div class="weui-cell weui-cell_swiped swipeout-touching" v-for="item in list">
                    <div class="weui-cell__bd" style="transform: translate3d(0px, 0px, 0px);">
                      <div class="weui-cell">
                        <div class="weui-cell__bd">
                          <p>{{item.name}}</p>
                        </div>
                        <div class="weui-cell__ft">向左滑动试试</div>
                      </div>
                    </div>
                    <div class="weui-cell__ft">
                      <a class="weui-swiped-btn weui-swiped-btn_default close-swipeout" href="javascript:">关闭</a>
                      <a class="weui-swiped-btn weui-swiped-btn_warn delete-swipeout" href="javascript:">删除</a>
                    </div>
                  </div>
                </div>
                <div class="weui-btn-area">
                  <a href="javascript:;" @click="promptAdd" class="weui-btn weui-btn_primary">添加项目</a>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div id="count" class="weui-tab__bd-item">

        <a @click="out" class="weui-btn weui-btn_primary">退出</a>

      </div>
      </div>

      <div class="weui-tabbar">
        <a href="#sign" @click="clickTab(1)" class="weui-tabbar__item weui-bar__item--on">
          <div class="weui-tabbar__icon">
            <img v-if="tabIndex === 1" src="../assets/111.png" alt="">
            <img v-else src="../assets/11.png" alt="">
          </div>
          <p class="weui-tabbar__label">滴卡</p>
        </a>
        <a href="#list" @click="clickTab(2)" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="tabIndex === 2" src="../assets/222.png" alt="">
            <img v-else src="../assets/22.png" alt="">
          </div>
          <p class="weui-tabbar__label">项目</p>
        </a>
        <a href="#count" @click="clickTab(3)" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="tabIndex === 3" src="../assets/333.png" alt="">
            <img v-else src="../assets/33.png" alt="">
          </div>
          <p class="weui-tabbar__label">数据</p>
        </a>
      </div>
    </div>

</template>
<script>

  import FlipTime from "./FlipTime";
  export default {
    name: 'core',
    components: {FlipTime},
    data() {
      return {
        tabIndex: 1,
        list: [],
        listWait: true,
        nowDateStr: ''
      }
    },
    mounted() {
      this.nowDateStr = this.getNowFormatDate();
    },
    methods: {

      clickTab(index) {
        this.tabIndex = index;
        switch (index) {
          case 1:
            break;
          case 2:
            this.findAllProject();
            break;
          case 3:
            break;
          default:
        }
      },

      getNowFormatDate() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return month + "月" + strDate + "日";
      },

      findAllProject() {
        let vm = this;
        vm.listWait = true;
        vm.axios.get('/sign-center/api/project/all').then(res => {
          if (res.data.status === 200) {
            vm.list = res.data.data;
          }
          vm.listWait = false;
        }).catch(error => {
          vm.listWait = false;
        })
      },
      promptAdd() {
        let vm = this;
        $.prompt({
          title: '新增项目',
          text: '请起一个新的名称',
          input: '',
          empty: false,
          onOK: function (input) {
            $.showLoading("正在验证");
            vm.axios.post("/sign-center/api/project/exist", {name: input})
              .then(res => {
                $.hideLoading();
                if (res.data.status === 200) {
                  if (res.data.data.exist) {
                    $.toptip("此项目名称已存在", "error");
                  } else {
                    vm.addProject(input);
                  }
                }
              }).catch(error => {
                $.hideLoading();
            });
          },
          onCancel: function () {
            $.toast("取消操作", "cancel");
          }
        });
      },
      addProject(name) {
        let vm = this;
        vm.axios.post("/sign-center/api/project/add", {projectType: 1, name: name})
          .then(res => {
            if (res.data.status === 200) {
              $.toast("成功");
            }
            vm.findAllProject();
          })
      },

      out() {
        $.toast("正在退出", "loadind");
        this.axios.get('/sign-center/api/login/out').then(res => {

        })
      }


    }
  }
</script>
<style scoped>
</style>
