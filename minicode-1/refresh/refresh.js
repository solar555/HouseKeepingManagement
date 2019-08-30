Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      loadingHidden: false
    });
    var that = this;
    wx.request({
      url: 'https://192.168.1.220:84/app/hmHousekeepingManagement/getHousekeepingWorkerList',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data.works);
        that.setData({
          recWorks: res.data.data.works,
        })
      },
      complete: function () {        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh()      //停止下拉刷新
      }
    })
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      });
    }, 2000);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底");
    this.setData({
      loadingHidden: false
    });
    console.log("loadingHidden:", this.data.loadingHidden);

    setTimeout(function () {
      this.setData({
        loadingHidden: true
      });
    }, 2000);

    console.log("loadingHidden:", this.data.loadingHidden);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})