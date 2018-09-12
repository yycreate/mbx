// pages/person/person.js
const app = getApp()
const host = app.data.host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "未识别到名字",
    count: 0,
    insuranceArr: []
  },
  /**
   * 查询这个人有多少保单
  */
  bPI:function(){
    var name = this.data.name;
    var that = this;
    wx.request({
      url: host + '/Home/person/byPersonInsurance?name=' + name,
      method: "GET",
      success: function(res){
        console.log(res.data)
        that.setData({
          count: res.data.length,
          insuranceArr: res.data
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
    this.bPI();
  },
  messagePage:function(e){
    wx.navigateTo({
      url: '/pages/message/message?id=' + e.currentTarget.dataset.id
    });
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
  
  }
})