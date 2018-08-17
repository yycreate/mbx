// pages/update/index.js
const app = getApp();
const host = app.data.host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insurance: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.insuranceInfo();
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
  //获取保单数据
  insuranceInfo:function(){
    var that = this;
    wx.request({
      url: host + "/home/index/infoinsurace",
      data: {
        id: app.data.insuranceId
      },
      success: function (res) {
        that.setData({
          insurance: res.data.data[0]
        })
      }
    });
  },
  //更新单据数据
  formSubmit:function(e){
    console.log(e.detail.value);
    wx.request({
      url: host + "/home/index/updateinsurace",
      data:{
        
      },
      success: function(e){
        console.log(e)
      }
    })

  }
})