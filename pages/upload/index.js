const APP_ID = 'wx1987b6657c57763a';//输入小程序appid  
const APP_SECRET = '368cf87ede8a22a2bbae44dafc6b165e';//输入小程序app_secret
var SESSION_KEY = ''//储存获取到session_key  

//index.js
//获取应用实例
const app = getApp()
const host = app.data.host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worker_number:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  //拍照
  // takephoto: function () {
  //   var that = this;
  //   wx.chooseImage({
  //     count: 1,
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {
  //       that.setData({
  //         imageinfo: res.tempFiles[0].path
  //       });
  //       wx.uploadFile({
  //         url: host + '/Home/file/uploadFile',
  //         filePath: res.tempFilePaths[0],
  //         name: 'img',
  //         header: {
  //           "Content-Type": "multipart/form-data",
  //           'accept': 'application/json'
  //         },
  //         formData: {
  //           'user': 'test'
  //         },
  //         success: function (res) {console.log(res)
  //           wx.showToast({
  //             title: '读取文件中',
  //             icon: 'loading',
  //             duration: 100000000
  //           })
  //           var jsonStr = res.data;
  //           jsonStr = jsonStr.replace(" ", "");
  //           if (typeof jsonStr != 'object') {
  //             jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
  //             var jj = JSON.parse(jsonStr);
  //             res.data = jj;
  //           }
  //           var params = {};
  //           params.fid = res.data.fid;
  //           params.url = res.data.path;
  //           params.worker_number = app.data.workerNumber;
  //           var url = host + "/Home/file/readWebImage?fid=" + params.fid + "&url=" + params.url + "&worker_number=" + params.worker_number;
  //           wx.request({
  //             url: url,
  //             method: "get",
  //             data: params,
  //             success: function (res) {
  //               var jsonStr = res.data;
  //               wx.hideToast();
  //               if(!res.data.isSuccess){
  //                 wx.showModal({
  //                   content: res.data.message,
  //                 })
  //               }else{
  //                 wx.navigateTo({
  //                   url: '/pages/index/index'
  //                 })
  //               };
  //             }
  //           })//读取文件请求
  //         }//上传文件回调
  //       })
  //     },
  //   })
  // }
  takephoto: function () {
    var workerNumber = app.data.workerNumber;
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          imageinfo: res.tempFiles[0].path
        });
        var wn = app.data.workerNumber
        wx.uploadFile({
          url: host + '/ocr/upload/' + wn,
          filePath: res.tempFilePaths[0],
          name: 'img',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'worker_number': workerNumber
          },
          data:{
            worker_number: workerNumber
          },
          formData: {
            'user': 'test'
          },
          success: function (res) {
            wx.navigateTo({
              url: '/pages/index/index'
            })
          },//上传文件回调
          fail: function(res){
            
          }
        })
      },
    })
  }
})