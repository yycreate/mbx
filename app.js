const APP_ID = 'wx1987b6657c57763a';//输入小程序appid  
const APP_SECRET = '368cf87ede8a22a2bbae44dafc6b165e';//输入小程序app_secret
var SESSION_KEY = ''//储存获取到session_key  


var host = "https://www.pailibaook.com";
// var host = "http://127.0.0.1:8088";

var workerNumber = "";
//app.js
App({
  data:{
    host: host,
    open_id: "",
    workerNumber:""
  },
  onLaunch: function () {
    this.getopenId();
  },//onlanuch
  getopenId:function(){
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
          }
        })//request
      }
    });
  }//getopenId方法
})
