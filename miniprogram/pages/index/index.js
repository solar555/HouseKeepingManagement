//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    showBottomLine: false,

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
    list: []
  },

  onLoad: function () {
    this.loadData();
    console.log("server_base_url:", app.globalData.server_base_url)
  },

  toDatail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("id:", id)
    wx.navigateTo({
      url: '/pages/workerDetail/workerDetail?id=' + id
    })
  },

  findRen: function (e) {
    let type_id = e.currentTarget.dataset.id;
    console.log(e)
    wx.navigateTo({
      url: '/pages/workerList/workerList?type_id=' + type_id
    })
  },

  loadData: function (cb) {
    this.getAdList(() => {
      this.getWorkerTypeList(() => {
        this.getWorkerList(true, () => {
          if (cb)
            cb();
        });
      });
    });

  },

  // 获取顶部广告
  getAdList: function (cb) {
    let that = this;

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
          title: '系统错误：' + res,
        })
      },
      complete: function (res) {
        if (cb)
          cb();
        // wx.hideLoading();
      }
    })
  },

  // 获取家政工作类型
  getWorkerTypeList: function (cb) {
    let that = this;

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
          title: '系统错误：' + res,
        })
      },
      complete: function (res) {
        if (cb)
          cb();
        // wx.hideLoading();
      }
    })
  },

  // 推荐服务员
  getWorkerList: function (override, cb) {
    let that = this;
    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/getHousekeepingWorkerListByPage?'
        + 'currentPage=' + that.data.currentPage
        + '&pageSize=' + that.data.pageSize,
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
          console.log("that.data.list:", that.data.list)
          let new_list = that.data.list.concat(res.data.list);
          console.log("new_list:", new_list)

          that.setData({
            list: override ? res.data.list : new_list,
            currentPage: that.data.currentPage + 1,
            totalPages: res.data.totalPages
          })
          console.log("currentPage:", that.data.currentPage);
          console.log("list:", res.data.list);
          console.log("res.data.totalPages:", res.data.totalPages);
        }
        else
          console.log('error')
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误：' + res,
        })
      },
      complete: function (res) {
        if (cb)
          cb();
        // wx.hideLoading();
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    let that = this;
    if (!this.loading) {
      // 下拉刷新时，从第一页开始查询
      that.setData({
        currentPage: 1
      })
      this.loadData(() => {
        // 处理完成后，终止下拉刷新
        wx.stopPullDownRefresh()
      })
    }
  },

  // 上拉刷新
  onReachBottom: function () {
    console.log("触底刷新")
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    console.log("currentPage:", this.data.currentPage);
    console.log("totalPages:", this.data.totalPages);
    wx.showLoading({
      title: '加载中',
    })

    if (!this.loading && this.data.currentPage <= this.data.totalPages) {
      console.log("进入触底刷新")
      this.getWorkerList(false, () => {
        setTimeout(function () {
          wx.hideLoading()
        }, 2000);
      })
    } else {
      setTimeout(function () {
        wx.hideLoading()
      }, 2000);

      wx.showToast({
        title: '没有更多数据。',
      })
    }
  },
})