//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 1. 顶部轮播图
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    // 2.1 第一行导航
    comList: [],

    // 2.2 第二行导航
    comListTwo: [],

    // 3. 推荐服务员列表
    prolList: []
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    this.loadData();
  },
  toDatail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("id:", id)
    wx.navigateTo({
      url: '/pages/xqing/xqing?id=' + id
    })
  },
  findRen: function (e) {
    let type_id = e.currentTarget.dataset.id;
    console.log(e)
    wx.navigateTo({
      url: '/pages/zhaoren/zhaoren?type_id=' + type_id
    })
  },
  loadData: function () {
    let that = this;

    // 获取顶部广告
    wx.request({
      url: app.globalData.server_base_url + '/app/sysSystemManagement/getSysWebsiteAdList',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({ imgUrls: res.data.list })
          console.log("imgUrls:", res.data.list);
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

    // 获取家政工作类型
    wx.request({
      url: app.globalData.server_base_url + '/app/sysSystemManagement/getHmHousekeepingWorkerTypeList',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({ comList: res.data.list.slice(0, 4) })
          that.setData({ comListTwo: res.data.list.slice(4, 8) })
          console.log("comListTwo:", res.data.list.slice(4, 8));
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

    // 推荐服务员
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
    });
  }
})
