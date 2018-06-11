let app = getApp();
//替换成开发者后台设置的安全域名
let url = "http://127.0.0.1:8080";

//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//let url = "http://your_sub_domain.vaiwan.com/";

Page({
    data:{
        corpId: '',
        authCode:'',
        userId:''
    },
    onLoad(){

        let _this = this;

        this.setData({
            corpId: app.globalData.corpId
        })

         
        dd.getCorpAuthCode({
            success:(res)=>{
                _this.setData({
                    authCode:res.authCode
                })
                
                dd.httpRequest({
                    url: url+'/login',
                    method: 'POST',
                    data: {
                        authCode: res.authCode,
                        corpId:app.globalData.corpId,
                    },
                    dataType: 'json',
                    success: function(res) {
                        console.log('success----',res)
                        let userId = res.data.result.userId;
                        _this.setData({
                            userId:userId
                        })
                    },
                    fail: function(res) {
                        console.log("httpRequestFail---",res)
                       dd.alert({content: JSON.stringify(res)});
                    },
                    complete: function(res) {
                        dd.hideLoading();
                    }
                    
                });
            },
            fail: (err)=>{
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })
        
    }
})