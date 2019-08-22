// pages/xqing/xqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolList: [
      {
        touxiang: "/images/toux.png",
        name: "王金霞",
        age: "44岁",
        biaoqian: ["性格开朗", "踏实能干", "做饭好吃"],
        dizhi: "河南省",
        xueli: "初中"
      },
      {
        touxiang: "/images/33.jpg",
        name: "张露露",
        age: "29岁",
        biaoqian: ["性格开朗", "人长得好看", "做饭好吃"],
        dizhi: "陕西省",
        xueli: "本科"
      },
      {
        touxiang: "/images/22.jpg",
        name: "张大大",
        age: "24岁",
        biaoqian: ["性格开朗", "踏实能干", "多才多艺"],
        dizhi: "广州省",
        xueli: "本科"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '查看服务人员简历'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toDatail: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    wx.navigateTo({
      url: '/pages/xqing/xqing'
    })
  },
  yuYueXinXi:function(e){
    wx.navigateTo({
      url: '/pages/xinxi/xinxi'
    })
  }
 
})