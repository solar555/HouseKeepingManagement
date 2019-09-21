// pages/find/find.js
let app = getApp();

Page({
  data: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    showBottomLine: false,

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
            url: '../meTab/meTab',
            success:function(){
              wx.showToast({
                title: '请您登陆',
                duration: 2000
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log("查看是否授权 fail")
      },

      complete: function (res) {
        if (cb)
          cb();
        // wx.hideLoading();
      }
    })
  },

  loadData: function (override, cb) {
    this.getList(true);
  },

  getList: function (override, cb) {
    let that = this;

    // 预约列表
    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/getHousekeepingRequirementListByPage?'
        + 'currentPage=' + that.data.currentPage
        + '&pageSize=' + that.data.pageSize,
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: that.data.query,
      success: function (res) {
        if (res.statusCode == 500) {
          wx.showToast({
            title: '系统错误',
          })
          console.log('error:', res)
          return;
        }

        console.log("that.data.currentPage:", that.data.currentPage)
        console.log("that.data.pageSize:", that.data.pageSize)
        console.log("res.data.list:", res.data.list)

        let new_list = that.data.list.concat(res.data.list);
        that.setData({
          list: override ? res.data.list : new_list,
          currentPage: that.data.currentPage + 1,
          totalPages: res.data.totalPages
        })
        console.log("list:", res.data.list);
        
      },

      fail: function (res) {
        wx.showToast({
          title: '系统错误',
        })
      },

      complete: function (res) {
        if(cb)
          cb();
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
  },

  onShow: function (e) {
    let that = this;

    this.onCheckAuthorization();
    that.setData({
      currentPage: 1
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    let that = this;
    if (!this.loading) {
      // 下拉刷新时，从第一页开始查询
      that.setData({
        currentPage: 1
      })
      this.getList(true, () => {
        // 处理完成后，终止下拉刷新
        wx.stopPullDownRefresh()
      })
    }
  },

  // 上拉刷新
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })

    if (!this.loading && this.data.currentPage <= this.data.totalPages) {
      this.getList(false, () => {
        setTimeout(function () {
          wx.hideLoading()
        }, 300);
      })
    } else {
      setTimeout(function () {
        wx.hideLoading()
      }, 300);

      wx.showToast({
        title: '没有更多数据。',
      })
    }
  },
})