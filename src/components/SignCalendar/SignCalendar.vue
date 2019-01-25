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
        <timeline-item bg-color="#9dd8e0" v-for="(item, index) in timeDateList" :key="index">

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
      projectIds: {
        type: Array,
        default: []
      }
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
        dateList: [],
        daySignInfoList: [],
        selectDay: '',
      }
    },
    watch: {
    },
    computed: {
      markDateList() {
        let dates = [];
        let vm = this;
        let num = 6;
        if (vm.projectIds.length > 0) {
          let sum = 0;
          vm.projectIds.forEach(id => {
            sum += id;
          });
          num = sum % 6
        }
        console.log(num)
        vm.dateList.forEach(date => {
          let obj = {};
          obj.date = date;
          obj.className = "mark" + num;
          dates.push(obj);
        });
        return dates;
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
      this.countDateList(this.projectIds);
      this.selectDay = Utils.getTodayString();
      this.clickDay(this.selectDay)
    },
    methods: {

      clickDay(date) {
        let day = Utils.changeStandardDate(date).split(" ")[0];
        this.selectDay = day;
        this.findSignAll(this.projectIds, day, day)
      },

      openRemark(remark) {
        $.toast(remark, "text");
      },

      findSignAll(projectIds, startDate, endDate, sortFlag = 0) {
        let vm = this;
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
        null ? '' : ("&projectIds=" + projectIds.join(",")));
        vm.axios.get('/sign-center/api/core/sign/all' + queryParams)
          .then(res => {
            if (res.data.status === 200) {
              vm.daySignInfoList = res.data.data;
            }
          })
      },

      countDateList(projectIds) {
        let vm = this;
        let queryParams = "?projectIds="  + (projectIds == null ? '' :  projectIds.join(","));
        vm.axios.get('/sign-center/api/count/dates' + queryParams)
          .then(res => {
            if (res.data.status === 200) {
              vm.dateList = res.data.data;
            }
          })
      }

    }
  }
</script>
<style scoped>

  .wh_container >>> .wh_content_all {
    background-color: #FFFAF0;
  }

  .wh_container >>> .wh_content_item {
    color: black;
  }

  .wh_container >>> .wh_top_changge {
    background-color: #1AAD19;
  }

  .wh_container >>> .wh_content_item .wh_isToday {
    background-color: #DBDDE0;
  }

  .wh_container >>> .wh_content_item .wh_chose_day {
    background-color: #363636;
    color: #fff;
  }

  .wh_container >>> .wh_top_tag {
    font-weight: bold;
  }

  .wh_content_item .wh_content_item_tag {
     color: black;
  }

  .wh_top_tag {
    color: #fff;
  }

  /**
    多种样式主题
   */
  .wh_container >>> .mark0 {
    background-color: #00C5CD;
    border-radius: 50%;
    color: #fff;
  }
  .wh_container >>> .mark1 {
    background-color: #1AAD19;
    border-radius: 50%;
    color: #fff;
  }
  .wh_container >>> .mark2 {
    background-color: #FF69B4;
    border-radius: 50%;
    color: #fff;
  }
  .wh_container >>> .mark3 {
    background-color: #FF4500;
    border-radius: 50%;
    color: #fff;
  }
  .wh_container >>> .mark4 {
    background-color: #BA55D3;
    border-radius: 50%;
    color: #fff;
  }
  .wh_container >>> .mark5 {
    background-color: #668B8B;
    border-radius: 50%;
    color: #fff;
  }
  .wh_container >>> .mark6 {
    background-color: #1E90FF;
    border-radius: 50%;
    color: #fff;
  }

  .timeline-item {
    padding-bottom: 1em;
  }

  .div-remark-img {
    text-align: center;
  }
</style>
