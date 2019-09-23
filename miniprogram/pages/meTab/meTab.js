// pages/myde/myde.js
let app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUse: wx.canIUse('view.open-type.getUserInfo'),
    userInfo: null,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.onCheckAuthorization();

    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  onCheckAuthorization: function (cb) {
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("查看是否授权 success 已授权")
          that.setData({
            isShow: false
          })

          // 获取用户信息
          wx.getUserInfo({
            success: function (res) {
              // 用户授权成功后
              // 调用微信云函数接口直接获取 openid：
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  app.globalData.openid = res.result.openid

                  that.setData({
                    isShow: false
                  })
                },
                fail: err => {
                  console.error('[云函数] [login] 调用失败', err)
                  wx.navigateTo({
                    url: '../deployFunctions/deployFunctions',
                  })
                }
              })
            }
          })
        } else {
          // 用户没有授权
          // 改变 isShow 的值，显示授权页面
          that.setData({
            isShow: true
          })

          console.log("用户没有授权，userInfo:", app.globalData.userInfo)
        }
      },
      fail: function (res) {
        console.log("查看是否授权 fail")
        that.setData({
          isShow: true
        })
      }
    })
  },

  // 获取用户信息
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      // 用户按了允许授权按钮
      var that = this;

      // 获取到用户的信息了，打印到控制台上查看
      console.log("用户的信息如下:");
      console.log(e.detail.userInfo);

      // 授权成功后，通过改变isShow的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isShow: false,
        userInfo: app.globalData.userInfo
      });
      console.log("isShow:", this.isShow);
      app.globalData.openid = res.result.openid
    } else {
      // 用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入！！！',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变isShow的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      })
    }
  },

  onShow: function (e) {
    let that = this;

    this.onCheckAuthorization(result => {
      that.setData({
        userInfo: app.globalData.userInfo
      })
      console.log("onShow app.globalData.userInfo：", app.globalData.userInfo);
    });
  },

  // // 跳转到登录界面（暂时废弃）
  // goLogin: function (e) {
  //   wx.navigateTo({
  //     url: '/pages/login/login'
  //   })
  // },

  // 1. 微信登录(授权)
  onMiniProAuth: function (e) {
    let that = this;
    console.log("detail:", e.detail)

    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    // 赋值全局变量userInfo
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.openid = e.detail.userInfo.openid

    // 微信登录成功，小程序登录
    this.loginMiniProCloud()
  },

  // 2. 小程序登录(云函数login，获取openid)
  loginMiniProCloud: function () {
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid

        that.setData({
          isShow: false
        })

        // 2. 小程序登录，获取openid后，业务登录（登录内部业务服务器）
        this.loginInternal(app.globalData.openid);
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
    let that = this;
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

          that.setData({
            isShow: false
          })
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