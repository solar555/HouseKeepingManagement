// pages/find/find.js
let app = getApp();

Page({
  data: {
    query: {
      booking_person_openid: "",
      housekeeping_worker_id: 0,
      state_type_id: 0,
      date_start: "",
      date_end: ""
    },
    list:[],
    sub_list:[],
    boxHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预约服务'
    })
    
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - 50;
    this.setData({
      'boxHeight': boxHeight
    });
    console.log("boxHeight:",boxHeight)

    this.onCheckAuthorization();
  },

  onCheckAuthorization: function (cb) {
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("查看是否授权 success 已授权")

          that.setData({
            "query.booking_person_openid": app.globalData.openid
          })

          // 加载数据
          that.loadData();
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
  },

  loadData: function () {
    let that = this;

    // 预约列表
    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/getHousekeepingRequirementList',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: that.data.query,
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({ list: res.data.list })
          console.log("list:", res.data.list);
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

  onClick: function(e) {
    let index = e.detail.index
    let state_type_id = 0;

    if(index == 0){
      state_type_id = 0;
      this.setData({ "query.state_type_id": 0 })
    }

    if (index == 1) {
      state_type_id = 506;
      // this.setData({ "query.state_type_id": 506 })
    }

    if (index == 2) {
      state_type_id = 507;
      // this.setData({ "query.state_type_id": 507 })
    }

    if (index == 3) {
      state_type_id = 508;
      // this.setData({ "query.state_type_id": 508 })
    }

    // 过滤
    console.log("state_type_id:", state_type_id)

    let sub_list = this.data.list.filter(x => x.state_type_id == state_type_id)
    console.log("sub_list:",sub_list)

    this.setData({
      sub_list: sub_list
    })
  }
})