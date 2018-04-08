let puzzleArr = []
for (let i = 0; i < 16; i++) {
  puzzleArr.push(i)
}
puzzleArr = puzzleArr.sort(() => {
  return Math.random() - 0.5
})
console.log(puzzleArr)
check(puzzleArr)

var puzzles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]

// check(puzzles)

function check (arr) {
  if (arr[15] === 0) {
    const newPuzzles = arr.slice(0, 15)
    const isSucess = newPuzzles.every((e, i) => e === i + 1)
    if (isSucess) {
      console.log('恭喜，闯关成功！')
    }
  }
}
