<template>
  <div class="div-parent">
    <div class="div-top">
      <calendar :sundayStart="true"
                :markDateMore="markDateList"
                v-on:choseDay="clickDay"
                ></calendar>
    </div>

    <div class="div-bottom">

      <timeline>
        <timeline-title style="font-size: large; font-weight: bold">{{showSelectDay}}</timeline-title>
        <div class="weui-loadmore weui-loadmore_line close-popup" v-if="timeDateList.length === 0">
          <span class="weui-loadmore__tips">暂无打卡</span>
        </div>
        <timeline-item bg-color="#9dd8e0" v-for="(item, index) in timeDateList">

          <div class="weui-flex">
            <div >{{item.time}}</div>
            <div class="weui-flex__item div-remark-img">
              <img src="../../assets/images/remark.png" style="width:20px;margin-left:5px;display:block"
                   v-show="item.remark != null && item.remark != ''" @click="openRemark(item.remark)">
            </div>
            <div>{{item.name}}</div>
          </div>
        </timeline-item>
      </timeline>
    </div>
  </div>
</template>
<script>
  import Calendar from 'vue-calendar-component'
  import Utils from '../../utils/index'
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
  export default {
    props: {
      list: Array
    },
    components: {
      Calendar,
      Timeline,
      TimelineItem,
      TimelineTitle
    },
    data(){
      return {
        arr: [],
        signInfoList: this.list,
        daySignInfoList: [],
        selectDay: ''
      }
    },
    watch: {
      list: {
        handler(newValue, oldValue) {
          this.signInfoList = newValue
        },
        deep: true
      }
    },
    computed: {
      markDateList() {
        let dateList = [];
        let vm = this;
        vm.signInfoList.forEach(signInfo => {
          let obj = {};
          obj.date = signInfo.startDate;
          obj.className = "mark1";
          dateList.push(obj);
        });
        return dateList;
      },
      timeDateList() {
        let list = [];
        let vm = this;
        vm.daySignInfoList.forEach(signInfo => {
          let obj = {};
          obj.time = signInfo.startDate.split(" ")[1];
          obj.name = signInfo.project.name;
          obj.remark = signInfo.remark;
          list.push(obj);
        });
        return list.reverse()
      },
      showSelectDay() {
        return this.selectDay.replace("-", "年").replace("-", "月") + "日"
      }
    },
    mounted() {
      this.selectDay = Utils.getTodayString();
      this.clickDay(this.selectDay)
    },
    methods: {
      clickDay(date) {
        let day = Utils.changeStandardDate(date).split(" ")[0];
        this.selectDay = day;
        this.findSignAll(null, day, day)
      },
      openRemark(remark) {
        $.toast(remark, "text");
      },
      findSignAll(projectIds, startDate, endDate, sortFlag = 0) {
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
        let queryParams = "?startDate=" + startDate + "&endDate=" + endDate + "&sortFlag=" + sortFlag + (projectIds ==
        null ? '' : ("&projectIds=" + projectIds.join(",")));
        vm.axios.get('/sign-center/api/core/sign/all' + queryParams)
          .then(res => {
            if (res.data.status === 200) {
              vm.daySignInfoList = res.data.data;
            }
          })
      },
    }
  }
</script>
<style scoped>

  .wh_content_all{
    background-color: #F6F2E9;
  }

  .wh_top_changge {
    background-color: #1AAD19;
  }

  .wh_content_item .wh_content_item_tag {
     color: black;
  }

  .wh_top_tag {
    color: #fff;
  }

  .wh_container >>> .mark1 {
    background-color: orange;
    border-radius: 50%;
  }
  .wh_item_date .wh_isToday {
    background-color: #9B9A9A;
    border-radius: 100px;
  }

  .timeline-item {
    padding-bottom: 1em;
  }

  .div-remark-img {
    text-align: center;
  }
</style>
