//index.js
const app = getApp()

Page({
  data: {
    list: []
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    wx.request({
      url: 'http://192.168.1.220:83/app/hmHousekeepingManagement/getHousekeepingWorkerList',
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
          list = res.list;
          console.log("list:", res.list);
        }
        else 
          console.log('error')
      },
      fail: function(res) {
        wx.showToast({
          title: '系统错误',
        })
      },
      complete: function(res) {
        wx.hideLoading();
      }
    })
  },

  // 上传图片
  doUpload: function () {
    
  },
})
