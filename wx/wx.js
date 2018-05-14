$(function(){
    var href = location.href.split('#')[0];//获取当前页的url
    var shareTitle;		//分享标题
    var shareImgUrl;	//分享图片
    var timeStamp;		//必填，生成签名的时间戳
    var nonceStr;		//必填，生成签名的随机串
    var signature;		//必填，签名
    var shareUrl;		//分享地址
    var appId;			//必填

    sign();

    //获取签名
    function sign(){
        $.ajax({
            type: 'GET',
            url: 'http://yangleo.ittun.com/signature',
            data:{url:href},
            xhrFields: {
                withCredentials: true
            },
            success: function(data){

                var objData = JSON.parse(data);
                shareTitle = objData.subscriptionTitle;
                shareImgUrl = objData.subscriptionPicUrl;
                shareUrl = objData.subscriptionUrl;
                timeStamp = objData.timeStamp;
                nonceStr = objData.nonceStr;
                signature = objData.signature;
                appId = objData.appId;
                wxSign();
            }
        });
    }
    //签名验证
    function wxSign(){
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
            timestamp:timeStamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: [
                'getNetworkType',
                'previewImage',
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'openLocation',
                'chooseImage',
                'scanQRCode',
                'chooseWXPay'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
    wx.ready(function () {
        //----判断当前客户端版本是否支持指定JS接口
        wx.checkJsApi({
            jsApiList: ['checkJsApi',
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'getNetworkType',
                'previewImage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'chooseImage',
                'openLocation',
                'translateVoice',
                'chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            fail: function (res) {
                alert('微信版本太低，不支持分享给朋友的功能！');
            },
            success: function(res) {
//       	    	alert(res+"-");
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });
    });

    wx.error(function(res){
        //  		alert(res+"=error");
    });

});
