<template>
    <div>
      <h3>Time:{{timer}}</h3>
      <div><button @click="handleTimeGo">计时开始</button></div>
    </div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      timer: 0, // 秒表计时器
      n: 0,
      timerd: null
    }
  },
  methods: {

    handleTimeGo: function () {
      var fff = null
      clearInterval(fff)
      let that = this
      fff = setInterval(function () {
        that.n++
        var m = parseInt(that.n / 60)
        var s = parseInt(that.n % 60)
        that.timer = toDub(m) + ':' + toDub(s)
      }, 1000 / 60)
      function toDub (n) {
        return n < 10 ? '0' + n : '' + n
      }
    }
  }
}
</script>

<style scoped>

</style>
