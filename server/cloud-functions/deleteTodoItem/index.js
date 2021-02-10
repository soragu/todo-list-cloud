// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let _id = event.data._id
  let data = await db.collection('todos').doc(_id).remove()
  return data
}
