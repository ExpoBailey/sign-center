<template>
    <div>
      <div class="head">
        <h1>选择日期</h1>
        <i class="ic-back"></i>
      </div>

      <div class="wrap">
        <ul class="week-f">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li class="wk">六</li>
          <li class="wk">日</li>
        </ul>

        <div id="calendar"></div>

        <P class="act">
          <button id="prevMonth">上一月</button>
          <button id="nextMonth">下一月</button>
        </P>
      </div>
    </div>
</template>
<script>
  import "../../assets/Calendar/demo/js/jqmobi"
  import "../../assets/Calendar/calendar"

  export default {
    mounted() {
      (function() {
        calendarIns = new calendar.calendar( {
          count: 4,
          selectDate: new Date(),
          selectDateName: '入住',
          minDate: new Date(),
          maxDate: new Date( +new Date() + 100 * 86400000 ),
          isShowHoliday: true,
          isShowWeek: false
        } );

        $.bind( calendarIns, 'afterSelectDate', function( event ) {
          console.log( 'after select date' );
          var curItem = event.curItem,
            date = event.date,
            dateName = event.dateName;

          calendarIns.setSelectDate( date );
        } );

        $( '#prevMonth' ).on( 'click', function() {
          calendarIns.prevMonth();
        } );

        $( '#nextMonth' ).on( 'click', function() {
          calendarIns.nextMonth();
        } );
      })();
    }
  }
</script>
<style scoped>
  @import "../../assets/Calendar/demo/css/reset.css";
  @import "../../assets/Calendar/demo/css/calendar.css";
</style>
