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
    moneyCount:0,
    pt:[]
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(ops){
    console.log("onShareAppMessage")
    return {
      title: '保单管理工具',
      path: '/pages/share/index',
      success: function (res) {
        console.log(res.shareTickets[0])
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: '欢迎',
    //     });
    //   },
    //   fail: function(res){

    //   }
    // });
    var that = this;
    app.data.insuranceId = options.id;//公用信息作为更新
    wx.request({
      url: host +"/api/Insurance/listresuraceById",
      data:{
        id: options.id
      },
      success: function (res) {
        that.setData({
          insurance:res.data.data,
          sure: res.data.data.type,
          moneyCount: res.data.data.money,
          pt: res.data.data.pt
        });
        wx.setStorageSync("updateInfo", res.data.data);
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
    wx.showShareMenu({
      withShareTicket:true
    });
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