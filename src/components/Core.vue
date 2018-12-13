<template>

    <div class="weui-tab">

      <div class="weui-tab__bd tab_box_content">

        <div id="sign" class="weui-tab__bd-item weui-tab__bd-item--active">

          <div class="demos-header date-div">
            <flip-time></flip-time>
            <div class="date-span">
              <span>{{ nowDateStr }}</span>
            </div>
          </div>

          <transition enter-active-class="animated bounceIn"
                      leave-active-class="animated bounceOut" >
            <div class="weui-btn-area" v-show="showSign">
              <div class="sign-btn" @click="submitSignProject">{{signDesc}}</div>
            </div>
          </transition>

          <div class="weui-cells weui-cells_form">

            <div class="weui-cell">
              <div class="weui-cell__hd"><label for="signProject" class="weui-label">项目</label></div>
              <div class="weui-cell__bd" >
                <input class="weui-input" id="signProject" type="text" value readonly
                       @click="initSelect" placeholder="请选择项目"
                       >
              </div>
            </div>

            <div class="weui-cell weui-cell_switch">
              <div class="weui-cell__bd">备注</div>
              <div class="weui-cell__ft">
                <input class="weui-switch" type="checkbox" @click="showRemark=!showRemark">
              </div>
            </div>

            <div class="weui-cell" v-show="showRemark">
              <div class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="请输入备注" rows="3" v-model="sign.remark" maxlength="200"></textarea>
                <div class="weui-textarea-counter"><span>{{sign.remark.length}}</span>/200</div>
              </div>
            </div>
          </div>

        </div>

        <div id="list" class="weui-tab__bd-item">
          <div class="weui-panel">
            <div class="weui-panel__hd">
              <span>我的项目</span>
              <a @click="promptSave(-1)" class="weui-btn weui-btn_mini weui-btn_primary right-header">添加项目</a>
            </div>
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
                        <div class="weui-cell__ft">向左滑动玩玩</div>
                      </div>
                    </div>
                    <div class="weui-cell__ft">
                      <a class="weui-swiped-btn weui-swiped-btn_default close-swipeout" @click="promptSave(index)">编辑</a>
                      <a class="weui-swiped-btn weui-swiped-btn_warn delete-swipeout" @click="deleteProject(index)">删除</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div id="count" class="weui-tab__bd-item">

          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd"><label for="startDate" class="weui-label">开始日期</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input" id="startDate" data-toggle='date' type="text" v-model="query.startDate"
                       readonly>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd"><label for="endDate" class="weui-label">结束日期</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input" id="endDate" data-toggle='date' type="text" v-model="query.endDate"
                       readonly >
              </div>
            </div>
          </div>

          <!--<a @click="out" class="weui-btn weui-btn_primary">退出</a>-->

          <div class="weui-cells__title">我的纪录</div>
          <div class="weui-loadmore weui-loadmore_line" v-if="signInfoList.length === 0">
            <span class="weui-loadmore__tips">暂无数据</span>
          </div>
          <div class="weui-cells">
            <div class="weui-cell" v-for="(item, index) in signInfoList">
              <div class="weui-cell__bd">
                <p>{{item.project.name}}</p>
              </div>
              <div class="weui-cell__ft">{{item.startDate}}</div>
            </div>
          </div>

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
          <p class="weui-tabbar__label">纪录</p>
        </a>
      </div>
    </div>

</template>
<script>
  import FlipTime from "./FlipTime";
  import Utils from "../utils"

  export default {
    name: 'core',
    components: {FlipTime},
    data() {
      return {
        signDesc: '嘀',
        showSign: true,
        showRemark: false,
        tabIndex: 1,
        list: [],
        listWait: true,
        nowDateStr: '',
        project: {
          id: null,
          name: '',
          projectType: 1
        },
        sign: {
          projectId: null,
          startDate: null,
          endDate: null,
          remark: ''
        },
        query: {
          projectId: null,
          startDate: null,
          endDate: null,
          sortFlag: 1
        },
        signInfoList: []
      }
    },
    mounted() {
      this.nowDateStr = new Date().toDateString();
      this.query.startDate = Utils.getTodayString();
      this.query.endDate = Utils.getTodayString();
      this.init();
    },
    updated() {
      $('.weui-cell_swiped').swipeout()
    },
    methods: {
      init() {
        this.initDate();
        this.initSelect();
      },
      initDate() {
        let vm = this;
        $("#startDate").calendar({
          dateFormat: 'yyyy-mm-dd',
          onChange: vm.changeStartDate
        });
        $("#endDate").calendar({
          dateFormat: 'yyyy-mm-dd',
          onChange: vm.changeEndDate
        });
      },
      initSelect() {
        let vm = this;
        vm.axios.get('/sign-center/api/project/all')
          .then(res => {
            if (res.data.status === 200) {
              vm.list = res.data.data;
              return vm.projectListToNames(res.data.data);
            }
          })
          .then(names => {
            console.log(names);
            if (names === null || names.length === 0) {
              names = ["暂无项目"];
            }
            $("#signProject").picker({
              title: "请选择滴卡的项目",
              cols: [
                {
                  textAlign: 'center',
                  values: names
                }
              ],
              onClose: obj => {
                if (obj.value[0] !== '暂无项目')
                  vm.sign.projectId = vm.nameToProjectId(obj.value[0])
              }
            });
          })
          .catch(error => {
            console.log(error);
            let names = ["暂无项目"];
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
      changeStartDate(p, values, displayValues) {
        let vm = this;
        vm.query.startDate = values[0];
        vm.findSignAll(vm.query.projectId, vm.query.startDate, vm.query.endDate);
      },
      changeEndDate(p, values, displayValues) {
        let vm = this;
        vm.query.endDate = values[0];
        vm.findSignAll(vm.query.projectId, vm.query.startDate, vm.query.endDate);
      },
      projectListToNames(list) {
        let names = [];
        if (list !== undefined && list != null && list.length > 0) {
          list.forEach(project => {
            names.push(project.name)
          })
        }
        return names;
      },
      nameToProjectId(name) {
        let vm = this;
        let id = null;
        vm.list.forEach(project => {
          if (project.name === name) id = project.id;
        });
        return id;
      },
      selectChange(name) {
        console.log("改变为：" + name);
      },
      selectClose(name) {
        console.log("关闭时：" + name);
        $.closePicker()
      },
      clickTab(index) {
        let vm = this;
        this.tabIndex = index;
        switch (index) {
          case 1:
            break;
          case 2:
            this.findAllProject();
            break;
          case 3:
            vm.findSignAll(vm.query.projectId, vm.query.startDate, vm.query.endDate);
            break;
          default:
        }
        $('.weui-cell_swiped').swipeout('close');
      },

      submitSignProject(event) {
        let vm = this;
        // 校验数据
        if (vm.sign.projectId == null) {
          $.toptip('请先选择项目', 'error');
          return
        }
        vm.sign.startDate = Utils.getNowStringDate();
        vm.sign.endDate = '';
        vm.showSign = false;

        vm.axios.post('/sign-center/api/core/sign', vm.sign)
          .then(res => {
            if (res.data.status === 200) {
              $.toptip('嘀卡成功', 'success');
            }
          })
          .then(res => {
            vm.sign.remark = '';
          });

        window.setTimeout(function () {
          vm.showSign = true;
        }, 900)
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
        if (index < 0) {
          addFlag = true;
        } else {
          vm.project.id = vm.list[index].id;
          vm.project.name = vm.list[index].name;
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
            // $.toast("取消操作", "cancel");
          }
        });

        $('.weui-cell_swiped').swipeout('close');
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
          .then(res => {
            $('.weui-cell_swiped').swipeout('close');
          })
      },
      deleteProject(index) {
        let vm = this;
        let project = vm.list[index];
        $.confirm("同时清除该项目的嘀卡记录", "确认删除【" + project.name + "】？", function () {
          vm.axios.get("/sign-center/api/project/delete?id=" + project.id)
            .then(res => {
              if (res.data.status === 200) {
                vm.list.splice(index, 1);
              }
            });
        }, function () {

        });

        $('.weui-cell_swiped').swipeout('close') //关闭
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
      },

      findSignAll(projectId, startDate, endDate, sortFlag = 0) {
        let vm = this;
        // 开始、结束时间相同，查当天记录
        if (startDate === endDate) {
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
        let queryParams = "?startDate=" + startDate + "&endDate=" + endDate + "&sortFlag=" + sortFlag + (projectId ==
          null ? '' : ("&projectId=" + projectId));
        vm.axios.get('/sign-center/api/core/sign/all' + queryParams)
          .then(res => {
            if (res.data.status === 200) {
              vm.signInfoList = res.data.data;
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

  .tab_box_content {
    height: 91%;
  }

  .date-span {
    text-align: right;
    margin-right: 2.5em;
    font-weight: bold;
    color: #3B3B3B;
  }

  .sign-btn {
    height: 6em;
    line-height: 6em;
    width: 6em;
    font-size: 22px;
    background-color: #3cc51f;
    color: #fff;
    text-align: center;
    margin: auto;
    border-radius: 50%;
    cursor: pointer;
  }

  .date-div {
    text-align: center;
    border: 1px #D3D3D3 solid;
    margin: 1em 1em;
    border-radius: 3px;
    padding: 16px 0;
  }

  .right-header {
    position: absolute;
    right: 1em;
    top: 0.5em;
  }
</style>
