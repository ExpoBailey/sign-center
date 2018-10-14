<template>

    <div class="weui-tab">

      <div class="weui-tab__bd">
        <div id="sign" class="weui-tab__bd-item weui-tab__bd-item--active">

          <div class="demos-header" style="text-align: center">
            <flip-time></flip-time>
            <div class="date-span">
              <span>{{ nowDateStr }}</span>
            </div>
          </div>

          <div class="weui-btn-area">
            <div class="sign-btn" @click="sign">喵喵</div>
            <div class="sign-btn-readonly" >喵喵</div>
          </div>

          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label for="signProject" class="weui-label">项目</label></div>
              <div class="weui-cell__bd" @click="initSelect">
                <input class="weui-input" id="signProject" type="text" value="" readonly="" onClose="selectClose" onChange="selectChange">
              </div>
            </div>
          </div>

        </div>

        <div id="list" class="weui-tab__bd-item">
          <div class="weui-panel">
            <div class="weui-panel__hd">我的项目</div>
            <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_small-appmsg tab_box">

                <div class="weui-loadmore" v-if="listWait">
                  <i class="weui-loading"></i>
                  <span class="weui-loadmore__tips">正在加载</span>
                </div>
                <div class="weui-loadmore weui-loadmore_line" v-if="!listWait && list.length === 0">
                  <span class="weui-loadmore__tips">暂无数据</span>
                </div>

                <div class="weui-cells" v-if="list.length > 0">
                  <div class="weui-cell weui-cell_swiped swipeout-touching" v-for="(item, index) in list">
                    <div class="weui-cell__bd" style="transform: translate3d(0px, 0px, 0px);">
                      <div class="weui-cell">
                        <div class="weui-cell__bd">
                          <p>{{item.name}}</p>
                        </div>
                        <div class="weui-cell__ft">向左滑动试试</div>
                      </div>
                    </div>
                    <div class="weui-cell__ft">
                      <a class="weui-swiped-btn weui-swiped-btn_default close-swipeout" @click="promptSave(index)">编辑</a>
                      <a class="weui-swiped-btn weui-swiped-btn_warn delete-swipeout" @click="deleteProject(index)">删除</a>
                    </div>
                  </div>
                </div>
                <div class="weui-btn-area">
                  <a @click="promptSave(-1)" class="weui-btn weui-btn_primary">添加项目</a>
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
          <p class="weui-tabbar__label">嘀卡</p>
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
        nowDateStr: '',
        project: {
          id: null,
          name: '',
          projectType: 1
        }
      }
    },
    create() {

    },
    mounted() {
      this.nowDateStr = this.getNowFormatDate();

      this.init();
    },
    updated() {
      $('.weui-cell_swiped').swipeout()
    },
    methods: {
      init() {

      },
      initSelect() {
        let vm = this;
        vm.axios.get('/sign-center/api/project/all').then(res => {
          if (res.data.status === 200) {
            vm.list = res.data.data;
            return vm.projectListToNames(res.data.data);
          }

        }).then(names => {
          $("#signProject").picker({
            title: "请选择滴卡的项目",
            cols: [
              {
                textAlign: 'center',
                values: names
              }
            ]
          });
        });
      },
      projectListToNames(list) {
        let names = [];
        if (list !== undefined && list != null && list.length > 0) {
          list.each(project => {
            names.push(project.name)
          })
        }
        return names;
      },
      nameToProjectId(name) {
        let vm = this;
        let id = null;
        vm.list.each(project => {
          if (project.name === name) id = project.id;
        });
        return id;
      },
      selectChange(name) {
        console.log("改变为：" + name);
      },
      selectClose(name) {
        console.log("关闭时：" + name);
      },
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
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return year + "年" + month + "月" + strDate + "日";
      },
      sign(event) {

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
      promptSave(index) {
        let vm = this;
        let addFlag = false;
        vm.project.id = null;
        vm.project.name = '';
        vm.project.projectType = 1;
        if (index >= 0) {
          addFlag = true;
        } else {
          vm.project = vm.list[index];
        }
        $.prompt({
          title: addFlag ? '新增项目' : '修改项目',
          text: '请起一个新的名称',
          input: vm.project.name,
          empty: false,
          onOK: function (input) {
            if (input !== vm.project.name) {
              $.showLoading("正在验证");
              vm.axios.post("/sign-center/api/project/exist", {name: input})
                .then(res => {
                  $.hideLoading();
                  if (res.data.status === 200) {
                    if (res.data.data.exist) {
                      $.toptip("此项目名称已存在", "error");
                    } else {
                      if (addFlag)
                        vm.addProject(input);
                      else
                        vm.updateProject(vm.project.id, input);
                    }
                  }
                }).catch(error => {
                $.hideLoading();
              });
            }

          },
          onCancel: function () {
            $.toast("取消操作", "cancel");
          }
        });
      },
      addProject(name) {
        let vm = this;
        vm.project.name = name;
        vm.axios.post("/sign-center/api/project/add", vm.project)
          .then(res => {
            if (res.data.status === 200) {
              $.toast("成功");
            }
            vm.findAllProject();
          })
      },
      updateProject(id, name) {
        let vm = this;
        vm.project.id = id;
        vm.project.name = name;
        vm.axios.post("/sign-center/api/project/update", vm.project)
          .then(res => {
            if (res.data.status === 200) {
              $.toast("成功");
            }
            vm.findAllProject();
          })
      },
      deleteProject(index) {
        let vm = this;
        let project = vm.list[index];
        vm.axios.get("/sign-center/api/project/delete?id=" + project.id)
          .then(res => {
            if (res.data.status === 200) {
              $('.weui-cell_swiped').swipeout('close') //关闭
              vm.list.splice(index, 1);
            }
          })
          .catch(error => {
            $('.weui-cell_swiped').swipeout('close') //关闭
          });
      },

      out() {
        let vm = this;
        $.toast("正在退出", "loadind");
        this.axios.get('/sign-center/api/login/out').then(res => {
          if (res.data.status === 200) {
            $.toptip("已安全退出", "success");
            vm.$router.push({name: 'login'})
          }
        })
      }


    }
  }
</script>
<style scoped>

  .tab_box {
    margin-bottom: 4em;
  }
  .date-span {
    text-align: right;
    margin-right: 2.5em;
    font-weight: bold;
    color: #3B3B3B;
  }
  .sign-btn {
    height: 4em;
    line-height: 4em;
    width: 50%;
    background-color: #383838;
    color: #fff;
    text-align: center;
    margin: auto;
    border-radius: 0.3em 1em;
    cursor: pointer;
  }
  .sign-btn-readonly {
    height: 4em;
    line-height: 4em;
    width: 50%;
    background-color: #C4C4C4;
    color: #fff;
    text-align: center;
    margin: auto;
    border-radius: 0.3em 1em;
    cursor: not-allowed;
  }
</style>
