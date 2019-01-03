<template>
  <div class="calendar-show">
    <div class="weui-cells__title">统计项</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>总纪录数</p>
        </div>
        <div class="weui-cell__ft">{{signInfoList.length}} 条</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>打卡天数</p>
        </div>
        <div class="weui-cell__ft">{{dates.length}} 天</div>
      </div>
    </div>

    <div class="weui-cells__title">打卡日期</div>
    <input class="weui-input" id="date3" type="hidden" readonly="" onDayClick="dayClick">
    <div id="inline-calendar"></div>

    <div class="readonly-div"></div>
  </div>
</template>

<script>

  export default {
    name: 'CalendarShow',
    props: {
      list: Array,
    },
    data() {
      return {
        signInfoList: this.list,
      }
    },
    computed: {
      dates() {
        let dates = [];
        let vm = this;
        vm.signInfoList.forEach(signInfo => {
          let startDate = signInfo.startDate.substring(0, 10);
          if (dates.indexOf(startDate) < 0) {
            dates.push(startDate)
          }
        });
        vm.initDate(dates);
        return dates;
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
    mounted() {
      this.initDate(this.dates)
    },
    methods: {
      initDate(dates) {
        let vm = this;
        $("#inline-calendar").calendar({
          container: "#inline-calendar",
          input: "#date3",
          multiple: true,
          value: dates,
          onDayClick: function (p, dayContainer, year, month, day) {
            vm.dayClick(p, dayContainer, year, month, day)
          },
          onChange: function (p, values, displayValues) {
            vm.changeDay(p, values, displayValues)
          }
        });
      },
      dayClick (p, dayContainer, year, month, day) {
        console.log(dayContainer)
        // $(dayContainer).removeClass("picker-calendar-day picker-calendar-day-selected").addClass("picker-calendar-day");
        // console.log(dayContainer)
        // $(dayContainer).;
        // console.log(dayContainer)
      },
      changeDay (p, values, displayValues) {
        if (values.length !== this.dates.length) {
          console.log(111)
          this.initDate(this.dates)
        }
      }
    }
  }

</script>
<style scoped>
 .calendar-show {
   background-color: #fff;
 }

  .calendar-show .readonly-div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
