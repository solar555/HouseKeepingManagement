//app.js
const server_config = require('config/server.js');

App({
  onLaunch: function () {
    let that = this;

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.onCheckAuthorization();
  },

  // 验证是否授权
  onCheckAuthorization: function (cb) {
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("查看是否授权 success 已授权")

          // 获取用户信息
          wx.getUserInfo({
            success: function (res) {
              // 用户授权成功后 小程序登录，获取openid
              that.loginMiniProCloud();
            }
          })
        } else {
          // 用户没有授权
          console.log("用户没有授权，userInfo:", that.globalData.userInfo)
        }
      },
      fail: function (res) {
        console.log("查看是否授权 fail")
      }
    })
  },

  // 小程序登录
  loginMiniProCloud: function () {
    let that = this;

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // 2. 小程序登录，获取openid
        that.globalData.userInfo = res.userInfo
        that.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.showToast({
          title: '[云函数] [login] 调用失败',
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    token:null,
    openid:null,
    server_port: server_config.port,
    server_host: server_config.mysql.host,
    server_base_url: 'http://' + server_config.mysql.host + ':' + server_config.port,
  }
})