// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.action == 'add') {
    let result = await db.collection('todos').add({
      // data 字段表示需新增的 JSON 数据
      data: event.data
    })
    return result
  }
  
  if (event.action == 'update') {
    let { _id, ...attrs } = event.data
    let result = await db.collection('todos').doc(_id).update({
      data: attrs
    })
    return result
  }
}
