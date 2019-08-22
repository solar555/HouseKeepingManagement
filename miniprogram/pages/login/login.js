// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: '请登录'
    }),
    wx.setNavigationBarColor({
      backgroundColor:"#4585f5",
      frontColor:"#ffffff"
    })

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          // 获取用户信息
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后: res.code
                  console.log("用户的code:" + res.code);

                  // 可以传给后台，在经过解析获取用户的openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid，方法如下：
                  // wx.request({
                  //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa2443c0fd571ed64&secret=270841d3c3df8997083e70433f2b22fe&js_code=' + 
                  //     res.code + '&grant_type=authorization_code',
                  //     success: res => {
                  //       // 获取到用户的openid
                  //       console.log("用户的openid:" + res.data.openid);
                  //     }
                  // })
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
        }
      }
    })
  },

  // 第三方微信授权
  onGotUserInfo: function (e) {
    console.log("detail:",e.detail)


    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
 
})