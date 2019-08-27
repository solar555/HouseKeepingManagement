// pages/xqing/xqing.js
const app = getApp()

Page({
  data: {
    item: {},
    prolList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '查看服务人员简历'
    })
    
    that.loadData();
    that.getOneById(options.id);
  },

  toDatail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/xqing/xqing?id=' + id
    })
  },
  
  // 预约
  yuYueXinXi: function (e) {
    let that = this;

    var worker_id = that.data.item.id;
    if (!worker_id){
      console.log("worker_id不能为空")
      return;
    }

    // 未登录
    if (!app.globalData.openid) {
      console.log("openid为空")

      wx.navigateTo({
        url: '../login/login',
      })

      return;
    }
    
    wx.navigateTo({
      url: '/pages/xinxi/xinxi?id=' + worker_id
    })
  },

  loadData: function () {
    let that = this;

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
  },
  
  getOneById: function (id) {
    let that = this;

    // 推荐服务员
    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/getOneHousekeepingWorkerById?id=' + id,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({ item: res.data })
          console.log("item:", res.data);
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