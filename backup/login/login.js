// pages/login/login.js
let app = getApp();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: '请登录'
    }),
    wx.setNavigationBarColor({
      backgroundColor:"#4585f5",
      frontColor:"#ffffff"
      })

    that.onCheckAuthorization();
  },

  onCheckAuthorization: function (e) {
    var that = this;

    // 查看是否登录授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          // 1. 已授权，获取用户信息
          wx.getUserInfo({
            success: function (res) {
              // 授权后，获取 openid：
              this.loginMiniProCloud()
            }
          })
        } else {
          // 未授权，显示授权页面
          that.setData({
            isHide: true
          })
        }
      },
      fail:function(res){
        console.log("查看授权 fail")
      }
    })
  },

  // 1. 微信登录(授权)
  onMiniProAuth: function (e) {
    let that = this;
    console.log("detail:",e.detail)

    console.log(e.detail.errMsg)
    console.log("userInfo:",e.detail.userInfo)
    console.log(e.detail.rawData)

    // 赋值全局变量userInfo
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.openid = e.detail.userInfo.openid

    // 微信登录成功，小程序登录
    this.loginMiniProCloud()
  },

  // 2. 小程序登录(云函数login，获取openid)
  loginMiniProCloud:function(){
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        app.globalData.userInfo = res.result.userInfo;
        console.log("res.result:",res.result)

        // 2. 小程序登录，获取openid后，业务登录（登录内部业务服务器）
        this.loginInternal(app.globalData.openid);

        // 3. 返回“我的”页面
        wx.navigateBack({
          delta: 1,
          success: function(res){
            console.log("返回成功信息：", res)
          },
          fail: function (res) {
            console.log("返回失败信息：", res)
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.showToast({
          title: '[云函数] [login] 调用失败',
        })
      }
    })
  },

  // 3. 业务登录(内部业务服务器)
  loginInternal: function (openid) {
    // 查询数据库是否存在openid，存在-登录成功，不存在-创建-登录成功
    // 后续绑定手机号
    wx.request({
      url: app.globalData.server_base_url + '/app/auth/wechat_login',
      method: 'POST',
      data: {
        openid: app.globalData.openid,
        nickName: app.globalData.userInfo.nickName
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 500) {
          wx.showToast({
            title: '登录业务服务器失败。',
          })
        } else {
          app.globalData.token = res.data.token
          console.log("app.globalData.token:", app.globalData.token);
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '业务服务器系统错误',
        })
      },
      complete: function (res) {
        // wx.hideLoading();
      }
    });
  }
})