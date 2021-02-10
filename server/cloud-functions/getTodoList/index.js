// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let data = await db.collection('todos').get()
    return data
  } catch (e) {
    return e
  }
}
