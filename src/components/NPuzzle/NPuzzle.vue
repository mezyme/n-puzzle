<template>
  <div class="nPuzzle-wrap">
    <h1>n-puzzle</h1>
    <ul>
      <li v-for="(puzzle,idx) in puzzles"
          v-bind:key="puzzle"
          v-bind:class="{isEmpty:!puzzle}"
          @click="handleClick(idx)"
          v-text="puzzle ? puzzle : ''"
      >
      </li>
    </ul>
    <h3>操作次数：{{times}}</h3>
    <h3>时间：{{timerShow}}</h3>
    <div>
      <button class="btn_reset" @click="handleReset">重新开始</button>
    </div>
    <div>
      <button class="btn_reset" @click="fnToSuccess">模拟成功</button>
    </div>
    <div>
      <button class="btn_reset" @click="handleBack">回退一步</button>
    </div>
    <div>
      <button class="btn_reset" @click="fnTimerStop">时间暂停</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NPuzzle',
  data () {
    return {
      times: 0, // 本次操作步数
      puzzles: [], // 本次游戏数据
      historyArr: [], // 本次操作历史
      isStateSuccess: false, // 是否成功
      ranking: [], // 成功排名数据,
      timerShow: '00:00', // 秒表计时器显示
      seconds: 0, // 秒数
      fnGo: null // 计时器fn
    }
  },
  methods: {

    // 初始化数据
    handleReset () {
      let puzzleArr = []
      for (let i = 0; i < 16; i++) {
        puzzleArr.push(i)
      }
      puzzleArr = puzzleArr.sort(() => {
        return Math.random() - 0.5
      })
      this.puzzles = puzzleArr
      this.historyArr = [[...puzzleArr]]
      this.times = 0
      this.fnTimerReset()
    },

    // 点击格子的操作
    handleClick: function (idx) {
      let {puzzles} = this
      // 获取周围格子的索引
      let curIdx = idx
      let topIdx = idx - 4
      let rightIdx = idx + 1
      let bottomIdx = idx + 4
      let leftIdx = idx - 1
      // 获取周围格子的值
      let curNum = puzzles[curIdx]
      let topNum = puzzles[topIdx]
      let rightNum = puzzles[rightIdx]
      let bottomNum = puzzles[bottomIdx]
      let leftNum = puzzles[leftIdx]

      // 上边的格子是0
      if (topNum === 0) {
        this.$set(this.puzzles, topIdx, curNum)
        this.fnDone(curIdx)
      }
      // 右边的格子是0
      if (rightNum === 0) {
        this.$set(this.puzzles, rightIdx, curNum)
        this.fnDone(curIdx)
      }
      // 下边的格子是0
      if (bottomNum === 0) {
        this.$set(this.puzzles, bottomIdx, curNum)
        this.fnDone(curIdx)
      }
      // 左边的格子是0
      if (leftNum === 0) {
        this.$set(this.puzzles, leftIdx, curNum)
        this.fnDone(curIdx)
      }
    },

    fnDone: function (curIdx) {
      // 把点击的格子变成0
      this.$set(this.puzzles, curIdx, 0)
      this.times += 1
      this.historyArr.push([...this.puzzles])
      this.fnTimerGo()
      // 如果是成功状态，并且做出移动操作，那么重置游戏
      if (this.isStateSuccess) {
        this.isStateSuccess = false
        this.handleReset()
      }
      this.fnCheckSuccess()
    },

    // 检测时候成功
    fnCheckSuccess: function () {
      if (this.puzzles[15] === 0) {
        const newPuzzles = this.puzzles.slice(0, 15)
        const isSuccess = newPuzzles.every((e, i) => e === i + 1)
        if (isSuccess) {
          this.isStateSuccess = true
          this.fnTimerStop()
          setTimeout(function () {
            alert('恭喜，闯关成功！')
          }, 100)
        }
      }
    },

    // 做出一个成功的例子
    fnToSuccess: function () {
      let puzzles = []
      for (let i = 1; i < 16; i++) {
        puzzles.push(i)
      }
      puzzles.push(0)
      this.puzzles = puzzles
    },

    // 回退一步
    handleBack: function () {
      let {times, historyArr} = this
      if (times > 0) {
        times = times - 1
        this.times = times
        let curArr = historyArr[times]
        this.puzzles = [].concat(curArr)
      } else {
        alert('亲，无路可退了呀')
      }
    },

    // 计时器启动
    fnTimerGo: function () {
      // let {fnGo} = this
      clearInterval(this.fnGo)
      var that = this
      this.fnGo = setInterval(function () {
        that.seconds++
        var m = parseInt(that.seconds / 60)
        var s = parseInt(that.seconds % 60)
        that.timerShow = toDub(m) + ':' + toDub(s)
      }, 1000 / 60)

      function toDub (n) {
        return n < 10 ? '0' + n : '' + n
      }
    },

    // 计时器暂停
    fnTimerStop: function () {
      clearInterval(this.fnGo)
      this.fnGo = null
    },

    // 计时器清零
    fnTimerReset: function () {
      clearInterval(this.fnGo)
      this.fnGo = null
      this.timerShow = '00:00'
      this.seconds = 0
    }
  },

  // 在实例创建完成后被立即调用
  created () {
    this.handleReset()
  }
}
</script>

<style lang="scss" scoped>
  @import "NPuzzle-style";
</style>
