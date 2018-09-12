const APP_ID = 'wx1987b6657c57763a';//输入小程序appid  
const APP_SECRET = '368cf87ede8a22a2bbae44dafc6b165e';//输入小程序app_secret
var SESSION_KEY = ''//储存获取到session_key  

//index.js
//获取应用实例
const app = getApp()
const host = app.data.host;
Page({
  data: {
    cur:0,
    modalHidden:true,
    showModal: false,
    imageinfo:'',
    open_id:"",
    workerNumber:"",
    insuredList:[]
  },
  //模态登记工号模态框确定
  onModalConfirm:function(e){
    var that = this;
    var openId = app.data.open_id;
    var wn = this.data.workerNumber;
    //记录微信工号
    wx.request({
      url: host +"/home/index/insertUserInfo",
      data:{
        open_id: openId,
        worker_number: wn
      },
      success:function(res){
        if (res.data.isSuccess){
          that.setData({
            modalHidden: true
          });
          that.listInsurace();
        };//判断是否插入员工号码
      }
    })
  },
  //输入工号
  numberInput:function(e){
    this.setData({
      workerNumber: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getopenId();
  },
  //判断openid是否存在
  checkOpenId:function(){
    var openId = this.data.open_id;
    var that = this;
    //记录微信工号
    wx.request({
      url: host + "/Home/index/infoMessageByOpenId",
      data: {
        open_id: openId
      },
      success: function (res) {
        if (!res.data.isSuccess){
          that.setData({
            modalHidden: false
          });
        }else{
          that.setData({
            workerNumber: res.data.data[0].worker_number
          })
          app.data.workerNumber = res.data.data[0].worker_number
          that.listInsurace();
        }
      }
    })
  },
  //查询保单列表: 
  // listInsurace: function(){
  //   var that = this;
  //   //查询
  //   wx.request({
  //     url: host + "/Home/index/listresurace",
  //     method: "get",
  //     data:{
  //       worker_number:that.data.workerNumber
  //     },
  //     success: function (res) {
  //       that.setData({
  //         insuredList: res.data.data
  //       });
  //     }
  //   })
  // },
  listInsurace: function(){
    var that = this;
    //查询
    wx.request({
      url: host + "/Home/person/personWith",
      method: "get",
      data:{
        worker_number:that.data.workerNumber
      },
      success: function (res) {
        that.setData({
          insuredList: res.data
        });
      }
    })
  },
  //滑动
  changeTap:function(e){
    this.setData({
      cur:e.detail.current
    })
  },
  //点击
  swichNav:function(e){
    if (this.data.cur == e.target.dataset.id){
      return false;
    }else{
      this.setData({
        cur: e.target.dataset.id
      })
    }
  },
  //跳转保单详细页
  gotoInsurance: function(e){
    app.data.insuranceName = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/person/person?name=' + e.target.dataset.name
    });
  },
  //拍照
  takephoto:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album','camera'],
      success: function(res) {
        that.setData({
          imageinfo: res.tempFiles[0].path
        });
        wx.uploadFile({
          url: host + '/Home/file/uploadFile',
          filePath: res.tempFilePaths[0],
          name: 'img',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
          },
          formData: {
            'user': 'test'
          },
          success: function (res) {
            wx.showToast({
              title: '读取文件中',
              icon: 'loading',
              duration: 100000000
            })
            var jsonStr = res.data;
            jsonStr = jsonStr.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
              var jj = JSON.parse(jsonStr);
              res.data = jj;
            }
            var params = {};
            params.fid = res.data.fid;
            params.url = res.data.path;
            params.worker_number = that.data.workerNumber;
            var url = host + "/Home/file/readWebImage?fid=" + params.fid + "&url=" + params.url + "&worker_number=" + params.worker_number;
            wx.request({
              url: url,
              method: "get",
              data: params,
              success:function(res){
                console.log(res)
                var jsonStr = res.data;
                wx.hideToast();
                that.listInsurace();
              }
            })//读取文件请求
          }//上传文件回调
        })  
      },
    })
  },
  openPhotoModal: function(e){
    wx.navigateTo({
      url: '/pages/upload/index'
    });
  },
  closePhotoModal: function (e) {
    this.setData({
      showModal: false
    })
  },
  getopenId: function () {
    var returnStr = "";
    var that = this;
    //微信登录
    wx.login({
      success: res => {
        wx.request({
          // url: 'https://api.weixin.qq.com/sns/jscode2session',
          url: host + "/Home/UserLogin/openInfo",
          method: 'GET',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            that.data.open_id = data.openid;
            that.checkOpenId();
          }
        })//request
      }
    });
  }//getopenId方法
})
