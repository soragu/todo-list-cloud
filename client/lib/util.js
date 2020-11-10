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
const getTouchData = (endX, endY, startX, startY, length)=> {
  let turn = ''
  if (endX - startX > length && Math.abs(endY - startY) < length) {           //右滑
    turn = 'right'
  } else if (endX - startX < -length && Math.abs(endY - startY) < length) {   //左滑
    turn = 'left'
  }
  return turn
}

module.exports = {
  getTouchData,
  formatTime,
  formatNumber,
}
