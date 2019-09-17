// pages/xqing/xqing.js
const app = getApp()

Page({
  data: {
    booked:false,
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

  makePhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: '15602328806'
    })
  },
  
  // 预约
  yuYueXinXi: function (e) {
    let that = this;

    console.log("dataset:",e.currentTarget.dataset.id)

    this.onCheckAuthorization();

    var worker_id = that.data.item.id;
    if (!worker_id){
      console.log("worker_id不能为空")
      return;
    }

    console.log("预约 app.globalData.openid：", app.globalData.openid)

    // 未登录
    if (!app.globalData.openid) {
      console.log("openid为空")

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

  getOneHousekeepingRequirementByOpenidAndWorkerId: function (worker_id) {
    let that = this;
    console.log("worker_id:", worker_id);
    console.log("app.globalData.openid:", app.globalData.openid);

    // 预约信息
    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/getOneHousekeepingRequirementByOpenidAndWorkerId?'
        + 'booking_person_openid=' + app.globalData.openid
        + '&housekeeping_worker_id=' + worker_id,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data) {
            that.setData({ booked: true })
            console.log("找到预约信息:", res.data);
          }
          console.log("找到预约信息:", res.data);
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

          // 查看是否预约
          that.getOneHousekeepingRequirementByOpenidAndWorkerId(res.data.id);
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

  onCheckAuthorization: function (cb) {
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("查看是否授权 success 已授权")
        } else {
          console.log("用户没有授权，userInfo:", app.globalData.userInfo)
          wx.switchTab({
            url: '../myde/myde',
          })

        }
      },
      fail: function (res) {
        console.log("查看是否授权 fail")
      }
    })
  }
})