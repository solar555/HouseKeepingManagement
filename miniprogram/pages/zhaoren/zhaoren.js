// pages/zhaoren/zhaoren.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    cityList:[
      {
        titleOne:"不限",
        act:"active"
      },
      {
        titleOne: "深圳市"
      },
      {
        titleOne: "广州市"
      }, 
      {
        titleOne: "南京市"
      },
      {
        titleOne: "大连市"
      },
      {
        titleOne: "杭州市"
      },
      {
        titleOne: "武汉市"
      },
      {
        titleOne: "西安市"
      },
      {
        titleOne: "北京市"
      },
      {
        titleOne: "西宁市"
      }
    ],
    prolList: [],
  },
 
  onClose() {
    this.setData({ show: false });
  },
  showBox:function(e){
    this.setData({ show: true });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '服务人员列表'
    })

    this.loadData();
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

  },
  toDatail: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    wx.navigateTo({
      url: '/pages/xqing/xqing'
    })
  },
  loadData: function () {
    let that = this;
    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/getHousekeepingWorkerList',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: {
        "type_id": 0,
        "current_city_id": 0,
        "salary_range_type_id": 0,
        "start_age": 0,
        "end_age": 0
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({ prolList: res.data.list })
          console.log("prolList:", res.data.list);
        }
        else
          console.log('error')
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误',
        })
      },
      complete: function (res) {

        // wx.hideLoading();
      }
    })
  }
})