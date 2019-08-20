//index.js
const app = getApp()

Page({
  data: {
    list: []
  },

  onLoad: function () {
    var that = this;
    
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    this.data.list = ['a', 'b', 'c']
    console.log("list:", this.data.list);

    wx.request({
      url: 'http://192.168.1.220:85/app/hmHousekeepingManagement/getHousekeepingWorkerList',
      method: 'POST',
      header: { 'content-type': 'application/json'},
      data: {
        "type_id": 0,
        "current_city_id": 0,
        "salary_range_type_id": 0,
        "start_age": 0,
        "end_age": 0
      },
      success:function(res) {
        if(res.statusCode == 200){
          // this.data.list = res.data.list;
          that.setData({ list: res.data.list })
          console.log("list:", res.data.list);
        }
        else 
          console.log('error')
      },
      fail: function(res) {
        wx.showToast({
          title: '系统错误',
        })
      },
      complete: function (res) {
        
        wx.hideLoading();
      }
    })
  },

  // 上传图片
  doUpload: function () {
    
  },
})
