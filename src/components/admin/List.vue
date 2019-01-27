<template>
  <div>

    <van-nav-bar
      title="奖品清单"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="plus" slot="right"/>
    </van-nav-bar>

    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
    >

      <h2 class="van-doc-demo-block__title">{{award.id == null || award.id == '' ? '新增奖品' : '修改奖品'}}</h2>
      <van-cell-group>
        <van-field
          label="名称"
          placeholder="请输入其名称"
          v-model="award.name"
        />
      </van-cell-group>

      <van-cell-group>
        <van-switch-cell v-model="typeFlag" title="是否奖品"/>
      </van-cell-group>

      <van-cell-group>
        <van-switch-cell v-model="statusFlag" title="启用"/>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="图标" value-class="icon-align" @click="showIconPopup=true">
          <van-icon :name="award.path" :color="award.color" size="5em" class="custom-icon"/>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell title="概率" :value="sliderValue + '%'"/>
        <van-slider v-model="sliderValue"
                    bar-height="4px"
                    active-color="#f44"
                    @change="changeProb">
        </van-slider>
      </van-cell-group>

    </van-dialog>

    <!-- 图标列表 -->
    <van-popup v-model="showIconPopup" position="right" :overlay="false" class="icon-list">
      <icon-list :onClick="changeIcon" v-bind:name="award.path"></icon-list>
    </van-popup>


    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">

      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >

        <van-swipe-cell class="swipe-award" :right-width="130" :left-width="130" :on-close="onClose" v-for="(item, index) in list" :data="item.id"
                        :key="index">
          <span slot="left">修改</span>
          <van-cell-group>

            <van-cell :title="item.name">
              <van-icon slot="icon"
                        class="list-icon"
                        :name="item.path"
                        :color="item.color" size="3em"></van-icon>
              <template slot="title" class="center-div">
                <p class="custom-text"><strong>{{item.name}}</strong></p>
                <van-tag type="danger" v-if="item.status == 0">禁用</van-tag>
                <van-tag type="primary" v-else>启用</van-tag>
              </template>
              <van-circle
                slot="right-icon"
                class="circle-text"
                v-model="item.probable * 100"
                :rate="30"
                size="80px"
                :speed="100"
                :text="item.probable * 100 + '%'"
                :stroke-width="60"
                layer-color="#ebedf0"
                color="#07c160"></van-circle>
            </van-cell>

          </van-cell-group>
          <span slot="right" v-if="item.status == 1">禁用</span>
          <span slot="right" v-else>启用</span>
        </van-swipe-cell>


      </van-list>

    </van-pull-refresh>


  </div>
</template>
<script>
  import iconList from './IconList'

  export default {
    components: {
      iconList
    },
    data() {
      return {
        show: false,
        showIconPopup: false,
        username: '',
        password: '',
        award: {
          id: null,
          type: 1, // 正常奖品
          path: null,
          color: null,
          name: '',
          status: 1, // 1启用，0禁用
          probable: 0.5
        },
        sliderValue: 50,
        list: [],
        pager: {
          pageIndex: 0,
          pageSize: 1,
          pageCount: 1,
          itemCount: 0
        },
        error: false,
        loading: false,
        finished: false,
        count: 0,
        isRefresh: false
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

      initAward() {
        let vm = this;
        // award: {
        //   id: null,
        //     type: 1, // 正常奖品
        //     path: null,
        //     color: null,
        //     name: '',
        //     status: 1, // 1启用，0禁用
        //     probable: 0.5
        // },
        this.award.id = null;
        this.award.type = 1;
        this.award.path = null;
        this.award.color = null;
        this.award.name = '';
        this.award.status = 1;
        this.award.probable = 0.5;
      },

      changeIcon(icon) {
        this.showIconPopup = false;
        this.award.path = icon.name;
        this.award.color = icon.color;
        console.log(icon)
      },

      onClickRight() {
        this.show = true;
        this.initAward();
      },

      changeProb(value) {
        this.award.probable = (value / 100).toFixed(2);
      },

      beforeClose(action, done) {
        let vm = this;
        if (action === 'confirm') {
          // 保存奖品
          let url = "/sign-center/api/award/";
          if (vm.award.id == null || vm.award.id === '') {
            url += "add";
          } else {
            url += "update"
          }
          vm.axios.post(url, vm.award)
            .then(res => {
              if (res.data.status === 200) {
                vm.$toast("保存成功")
              } else {
                vm.$toast(res.data.desc);
              }
            })
            .then(res => {
              vm.onRefresh();
              done()
            })
            .catch(error => {
              done();
              this.$notify(error);
            })
        } else {
          done();
        }
      },

      onLoad() {
        // 异步更新数据
        let vm = this;
        vm.pager.pageIndex++;
        vm.axios.get("/sign-center/api/award/page", {
          params: {
            pageIndex: vm.pager.pageIndex,
            pageSize: vm.pager.pageSize,
          }
        })
          .then(res => {
            if (res.data.status === 200) {
              vm.pager = res.data.pager;
              res.data.data.forEach(item => {
                vm.list.push(item);
              })
            }
          }).then(res => {
          // 数据全部加载完成
          vm.finished = vm.pager.pageIndex >= vm.pager.pageCount;
          // 加载状态结束
          vm.loading = false;
        })
          .catch(error => {
            vm.error = true;
            vm.loading = false;
          });

      },

      onRefresh() {
        this.isRefresh = false;
        this.count++;
        this.list = [];
        this.pager.pageIndex = 0;
        this.onLoad();
      },

      onClose(clickPosition, instance) {
        let id = instance.$attrs.data;
        switch (clickPosition) {
          case 'left':
            this.loadUpdateData(id);
            instance.close();
            break;
          case 'cell':
          case 'outside':
          case 'right':
            instance.close();
            break;
        }
      },

      loadUpdateData(id) {
        this.show = true;
        let vm = this;
        vm.$toast.loading();
        vm.axios.get("/sign-center/api/award/get?id=" + id)
          .then(res => {
            if (res.data.status === 200) {
              vm.award = res.data.data;
              vm.sliderValue = vm.award.probable * 100
            }
          })
          .then( res => {
              vm.$toast.clear();
            }
          )
          .catch(error => {
            vm.$toast.fail(error);
          })
      }

    }
  }
</script>
<style scoped>
  .content {
    background-color: #e5e5e5;
  }

  .custom-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .van-slider {
    margin: 0 15px 30px;
  }

  .custom-icon {
    /*line-height: 24px;*/
  }

  .van-doc-demo-block__title {
    margin: 0;
    font-weight: 400;
    font-size: 17px;
    color: rgba(69, 90, 100, .6);
    padding: 16px 15px 15px;
  }

  .van-cell__value >>> .icon-align {
    text-align: center;
  }

  .icon-list {
    width: 100%;
    height: 100%;
  }

  .circle-text .van-circle__text {
    color: red;
    font-weight: bold;
  }

  .list-icon {
    position: relative;
    height: auto;
    width: 1.5em;
    margin: auto 5px;
    text-align: center;
  }

  .center-div {
    margin: 0 10px;
  }

  .van-list >>> .van-swipe-cell__right {
    color: #fff;
    font-size: 15px;
    width: 130px;
    text-align: center;
    background-color: #f44;
    align-content: center;
    display: inline-grid;
  }

  .van-list >>> .van-swipe-cell__left {
    color: #fff;
    font-size: 15px;
    width: 130px;
    text-align: center;
    background-color: #07c160;
    align-content: center;
    display: inline-grid;
  }
</style>
