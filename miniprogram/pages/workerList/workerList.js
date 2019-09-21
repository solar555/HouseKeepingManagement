// pages/zhaoren/zhaoren.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_city: "城市",
    current_type: "类型",
    current_age_range: "年龄",
    current_salary_range: "薪资",

    params: {
      booking_person_openid: app.globalData.openid,
      type_id: 0,
      current_city_id: 0,
      salary_range_type_id: 0,
      age_range_type_id: 0,
      start_age: 0,
      end_age: 0
    },
    show: false,
    searchList: [],

    typeList: [],
    ageRangeList: [],
    salaryRangeList: [],

    cityList: [],
    prolList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    this.setData({
      cityList: [
        {
          name: "不限",
          act: "active"
        },
        {
          name: "深圳市"
        },
        {
          name: "广州市"
        },
        {
          name: "南京市"
        },
        {
          name: "大连市"
        },
        {
          name: "杭州市"
        },
        {
          name: "武汉市"
        },
        {
          name: "西安市"
        },
        {
          name: "北京市"
        },
        {
          name: "西宁市"
        }
      ]
    })

    wx.setNavigationBarTitle({
      title: '服务人员列表'
    })

    // if (options.type_id) {
    //   that.setData({ 'params.type_id':options.type_id })

    //   this.searchData(this.data.params);
    // } else
    //   this.searchData();

    that.setData({ 'params.booking_person_openid': app.globalData.openid })
    console.log("app.globalData.openid:", that.data.params.booking_person_openid)
    this.searchData(that.data.params);
    this.loadData();
  },

  onItemTap: function(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;

    // 工作类型
    if (item.sys_dic_category_rid == 72) {
      // 改变筛选条件的样式——————————————Start
      let oldItem = that.data.typeList.find(function(obj){
        return obj.act == "active";
      })
      oldItem.act = "";
      
      let newItem = that.data.typeList.find(function(obj) {
        return obj.id == item.id
      })
      newItem.act = "active";
      // 改变筛选条件的样式——————————————End

      that.setData({ 
        'params.type_id': item.id,
        current_type: item.id == 0 ? "类型" : item.name
        })
    }

    // 薪资范围
    if (item.sys_dic_category_rid == 73) {
      // 改变筛选条件的样式——————————————Start
      let oldItem = that.data.salaryRangeList.find(function (obj) {
        return obj.act == "active";
      })
      oldItem.act = "";

      let newItem = that.data.salaryRangeList.find(function (obj) {
        return obj.id == item.id
      })
      newItem.act = "active";
      // 改变筛选条件的样式——————————————End

      that.setData({
        'params.salary_range_type_id': item.id,
        current_salary_range: item.id == 0 ? "薪资" : item.name
      })
    }

    // 年龄范围
    if (item.sys_dic_category_rid == 80) {
      // 改变筛选条件的样式——————————————Start
      let oldItem = that.data.ageRangeList.find(function (obj) {
        return obj.act == "active";
      })
      oldItem.act = "";

      let newItem = that.data.ageRangeList.find(function (obj) {
        return obj.id == item.id
      })
      newItem.act = "active";
      // 改变筛选条件的样式——————————————End

      if(item.id == 0){
        that.setData({
          'params.start_age': 0,
          'params.end_age': 0
        })
      } else if(item.name[2] == '-') {
        let arr = item.name.split("-")
        that.setData({
          'params.start_age': arr[0],
          'params.end_age': arr[1]
        })
      } else if (item.name[3] == '上'){
        let start_age = item.name.slice(0,2);
        that.setData({
          'params.start_age': start_age,
          'params.end_age': -1
        })
      } else if (item.name[3] == '下') {
        let end_age = item.name.slice(0, 2);
        that.setData({
          'params.start_age': 0,
          'params.end_age': end_age
        })
      }

      that.setData({
        current_age_range: item.id == 0 ? "年龄" : item.name
      })
    }

    this.searchData(that.data.params);
    that.setData({ show: false });
  },
 
  onClose() {
    this.setData({ show: false });
  },
  showBox:function(e){
    let that = this;

    let id = e.currentTarget.dataset.id;
    console.log("id:", id)
    console.log("cityList:", that.data.cityList)

    if (id == 1)
      that.setData({ searchList: that.data.cityList });

    if (id == 2) 
      that.setData({ searchList: that.data.typeList })

    if (id == 3) 
      that.setData({ searchList: that.data.ageRangeList });

    if (id == 4) 
      that.setData({ searchList: that.data.salaryRangeList });

    console.log("searchList:", that.data.searchList);
    that.setData({ show: true });
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    if (!this.loading) {
      // 下拉刷新时，从第一页开始查询

      that.setData({ 'params.booking_person_openid': app.globalData.openid })
      this.searchData(that.data.params, () => {
        this.loadData(() => {
          // 处理完成后，终止下拉刷新
          wx.stopPullDownRefresh()
        });
      });
    }
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
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/workerDetail/workerDetail?id=' + id
    })
  },

  loadData: function (cb) {
    let that = this;

    // 筛选条件列表
    let type_categoryId = 72;
    let salary_range_type_categoryId = 73;
    let age_range_type_categoryId = 80;

    // 工作类型列表
    wx.request({
      url: app.globalData.server_base_url + '/app/sysSystemManagement/getSysDicListByCategoryId?categoryId=' + type_categoryId,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          let item = {
            id: 0,
            name: '不限',
            act: "active",
            sys_dic_category_rid:res.data.list[0].sys_dic_category_rid,
          }
          res.data.list.unshift(item);

          that.setData({ typeList: res.data.list })
          console.log("typeList:", res.data.list);
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
        if (cb)
          cb();
      }
    })

    // 工资范围列表
    wx.request({
      url: app.globalData.server_base_url + '/app/sysSystemManagement/getSysDicListByCategoryId?categoryId=' + salary_range_type_categoryId,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          let item = {
            id: 0,
            name: '不限',
            act: "active",
            sys_dic_category_rid: res.data.list[0].sys_dic_category_rid,
          }
          res.data.list.unshift(item);

          that.setData({ salaryRangeList: res.data.list })
          console.log("salaryRangeList:", res.data.list);
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
    })

    // 年龄范围列表
    wx.request({
      url: app.globalData.server_base_url + '/app/sysSystemManagement/getSysDicListByCategoryId?categoryId=' + age_range_type_categoryId,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          let item = {
            id: 0,
            name: '不限',
            act: "active",
            sys_dic_category_rid: res.data.list[0].sys_dic_category_rid,
          }
          res.data.list.unshift(item);

          that.setData({ ageRangeList: res.data.list })
          console.log("ageRangeList:", res.data.list);
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
    })
  },

  searchData: function (params, cb) {
    let that = this;
    console.log("params:",params)

    wx.request({
      url: app.globalData.server_base_url + '/app/hmHousekeepingManagement/getHousekeepingWorkerListWithIsBooked',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: params,
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
        console.log('完成')
        console.log('res', res)
        if (cb)
          cb();
        // wx.hideLoading();
      }
    })
  }
})