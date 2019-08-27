// pages/xinxi/xinxi.js
const app = getApp();

Page({
  data: {
    housekeeping_worker:{},
    item:{
      id:0,
      booking_person_openid:0,
      housekeeping_worker_id:0,
      date_start:"",
      date_end:"",
      remark:"",
      state_type_id: 506
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // console.log("options:",options)
    wx.setNavigationBarTitle({
      title: '预约信息'
    })

    let id = options.id
    if(!id){
      alert("id不能为空")
      return
    }

    that.setData({
      "item.housekeeping_worker_id":id
    })

    if (app.globalData.openid) {
      that.setData({
        "item.booking_person_openid": openid
      })
    }

    // 获取服务员信息
    that.getOneById(options.id);
  },

  getOneById: function (id) {
    let that = this;

    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/getOneHousekeepingWorkerById?id=' + id,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({ housekeeping_worker: res.data })
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
  },

  bindDateStartChange: function (e) {
    this.setData({
      date_start: e.detail.value
    })
  },

  bindDateEndChange: function (e) {
    this.setData({
      date_end: e.detail.value
    })
  },

  saveByObj: function (obj) {
    let that = this;

    // 预约服务员
    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/saveHousekeepingRequirementByObj',
      method: 'POST',
      data: obj,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log("预约成功:");
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
})