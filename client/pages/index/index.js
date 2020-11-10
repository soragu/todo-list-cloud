/*<remove trigger="prod">*/
import {test, test2} from '../../lib/api-mock'
/*</remove>*/

/*<jdists trigger="prod">
import {test, test2} from '../../lib/api'
</jdists>*/

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  onLoad() {},

  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
