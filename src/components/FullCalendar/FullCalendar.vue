<template>
  <div>
    <vue-full-calendar class="test-fc" :events="fcEvents"
                       first-day='1' locale="fr"
                       @changeMonth="changeMonth"
                       @eventClick="eventClick"
                       @dayClick="dayClick"
                       @moreClick="moreClick"></vue-full-calendar>
  </div>
</template>
<script>
  import VueFullCalendar from 'vue-fullcalendar'

  export default {
    props: {
      list: Array
    },
    data() {
      return {
        fcEvents: [
          {
            title    : 'Sunny1',
            start    : '2019-02-25',
            cssClass : 'family'
          },
          {
            title    : 'Sunny2',
            start    : '2019-02-25',
            cssClass : 'family'
          },
          {
            title    : 'Sunny3',
            start    : '2019-02-25',
            cssClass : 'family'
          },
          {
            title    : 'Sunny4',
            start    : '2019-02-25',
            cssClass : 'family'
          },
          {
            title    : 'Sunny5',
            start    : '2019-02-25',
            cssClass : 'family'
          },
          {
            title    : 'Sunny6',
            start    : '2019-02-25',
            cssClass : 'family'
          },
          {
            title : 'Lunfel 726-727',
            start : '2019-02-26',
            cssClass : ['home', 'work']
          },
          {
            title : 'Lunfel 2/27-2/28',
            start : '2019-02-27',
          },
          {
            title : 'Lunfel 2/27-2/28',
            start : '2019-02-27',
          },
          {
            title : 'Lunfel 2/27-2/28',
            start : '2019-02-27',
          },
          {
            title : 'Lunfel 2/26-3/05',
            start : '2019-02-26',
          },
          {
            title : 'Lunfel 1/27-1/28',
            start : '2019-01-27',
          },
          {
            title : 'Lunfel 1/27-2/2',
            start : '2019-01-27',
          },
          {
            title : 'Lunfel 3/27-3/28',
            start : '2019-03-27',
          },
        ],
        signInfoList: this.list
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
    computed: {
      eventData () {
        return this.list;
      }
    },
    components: {
      VueFullCalendar
    },
    mounted() {
      console.log(this.eventData)
    },
    methods: {
      'changeMonth' (start, end, current) {
        console.log('changeMonth', start.format(), end.format(), current.format())
      },
      'eventClick' (event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
      },
      'dayClick' (day, jsEvent) {
        console.log('dayClick', day, jsEvent)
      },
      'moreClick' (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      }
    }

  }

</script>

<style scoped lang="scss">
  .app{
    color:green;
  }

</style>
