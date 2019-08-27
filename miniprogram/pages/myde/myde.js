// pages/myde/myde.js
let app = getApp();
Page({
  data: {
    userInfo: null,
    isHide: false
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
            isHide: false
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
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          })

          console.log("用户没有授权，userInfo:", app.globalData.userInfo)
        }
      },
      fail: function (res) {
        console.log("查看是否授权 fail")
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

      // 授权成功后，通过改变isHide的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      // 用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入！！！',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变isHide的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      })
    }
  },

  goLogin:function(e){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  onShow: function (e) {
    let that = this;

    this.onCheckAuthorization(result => {
      that.setData({
        userInfo: app.globalData.userInfo
      })
      console.log("onShow app.globalData.userInfo：", app.globalData.userInfo);
    });
  }
})