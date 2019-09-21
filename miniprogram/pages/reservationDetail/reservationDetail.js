// pages/xinxi/xinxi.js
const app = getApp();
const util_date = require("../../utils/util_date.js");
Page({
  data: {
    housekeeping_worker:{},
    item:{
      id:0,
      booking_person_openid:0,
      housekeeping_worker_id:0,
      date_start: "",
      date_end: "",
      remark:"",
      state_type_id: 506
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    let date_start = new Date();
    let date_start_str = util_date.fromDateToStr(date_start, 'yyyy-MM-dd')
    let date_end = new Date();
    date_end.setMonth(date_end.getMonth() + 1)
    let date_end_str = util_date.fromDateToStr(date_end, 'yyyy-MM-dd');

    console.log("date_start_str:", date_start_str)
    console.log("date_end_str:", date_end_str)

    that.setData({
      "item.date_start": date_start_str,
      "item.date_end": date_end_str
    })
    
    wx.setNavigationBarTitle({
      title: '预约信息'
    })

    let worker_id = options.id
    if (!worker_id){
      alert("worker_id不能为空")
      return
    }

    that.setData({
      "item.booking_person_openid":app.globalData.openid,
      "item.housekeeping_worker_id": worker_id
    })

    // 获取服务员信息
    that.getOneById(worker_id);
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
          duration: 2000
        })
      },
      complete: function (res) {
        // wx.hideLoading();
      }
    });
  },

  bindDateStartChange: function (e) {
    this.setData({
      "item.date_start": e.detail.value
    })
  },

  bindDateEndChange: function (e) {
    this.setData({
      "item.date_end": e.detail.value
    })
  },

  inputeidt: function (e) {
    console.log("inputeidt:",e.detail.value);

    this.setData({
      "item.remark": e.detail.value
    })
  },

  inputChange: function (event) {
    console.log("inputeidt:", event.detail.value);
    let dataset_name = event.currentTarget.dataset.name   // worker字符串
    let view_name = event.detail.value


    console.log("view_name:",view_name)



    // this.setData({
    //   [dataset_name]: view_name    // worker: input框输入的值
    // })
  },

  onSubmit: function (e) {
    console.log("onSubmit click");
    this.saveByObj();
  },

  saveByObj: function () {
    let that = this;
    console.log("saveByObj item:",that.data.item);

    // 预约服务员
    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/saveHousekeepingRequirementByObj',
      method: 'POST',
      data: that.data.item,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 500) {
          wx.showToast({
            title: '系统错误',
            duration: 2000
          })
          return;
        }

        wx.navigateBack({
          delta: 3,
          success: function () {
            wx.showToast({
              title: '预约成功',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '系统错误',
          duration: 2000
        })
      },
      complete: function (res) {
        // wx.hideLoading();
      }
    });
  },
})