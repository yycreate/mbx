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
    wx.request({
      url: host + "/home/index/updateInsuraceInfo",
      method: "get",
      data:{
        insurance_id: app.data.insuranceId,
        sure_num: e.detail.value.sure_num,
        insurance_number: e.detail.value.insurance_number,
        insurance_type_name: e.detail.value.insurance_type_name,
        insured_person_name: e.detail.value.insured_person_name,
        insured_creit_card: e.detail.value.insured_creit_card,
        insured_person_birthday: e.detail.value.insured_person_birthday,
        policy_holder_name: e.detail.value.policy_holder_name,
        policy_holder_birthday: e.detail.value.policy_holder_birthday,
        policy_creit_card: e.detail.value.policy_creit_card
      },
      success: function(e){
        wx.navigateTo({
          url: "/pages/message/message?id=" + app.data.insuranceId
        });
      }
    })

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