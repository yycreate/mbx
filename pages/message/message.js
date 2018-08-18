// pages/message/message.js
const app = getApp();
const host = app.data.host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insurance:{},
    sure:[],
    moneyCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    wx.request({
      url: host +"/home/index/infoinsurace",
      data:{
        id: options.id
      },
      success:function(res){
        that.setData({
          insurance:res.data.data[0],
          sure: res.data.type,
          moneyCount: res.data.money
        })
      }
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
  gotoUpdate: function(){
    wx.navigateTo({
      url: '/pages/update/index',
    });
  },
  readPicture: function (event) {
    var url = this.data.insurance.url;
    //图片预览
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }
})