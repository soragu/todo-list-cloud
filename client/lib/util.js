const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/***
 * 判断用户滑动
 * 左滑还是右滑
 */
const getTouchData = (endX, endY, startX, startY, length) => {
  let turn = ''
  if (endX - startX > length && Math.abs(endY - startY) < length) {           //右滑
    turn = 'right'
  } else if (endX - startX < -length && Math.abs(endY - startY) < length) {   //左滑
    turn = 'left'
  }
  return turn
}

/*函数节流*/

const throttle = (fn, interval) => {
  let enterTime = 0 //触发的时间
  let gapTime = interval || 300 //间隔时间，如果interval不传，则默认300ms
  return function () {
    let backTime = new Date() //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn(arguments)
      enterTime = backTime //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  }
}

/*函数防抖*/

function debounce(fn, interval) {
  let timer
  let gapTime = interval || 1000  //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer)
    //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn(arguments)
    }, gapTime)
  }
}

module.exports = {
  getTouchData,
  formatTime,
  formatNumber,
  throttle,
  debounce,
}
