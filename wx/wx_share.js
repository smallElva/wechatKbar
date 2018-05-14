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
   	         	wxShare();
   	      	}
   		});
   	}
   	//签名验证
	function wxShare(){
   		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
		    timestamp:timeStamp, // 必填，生成签名的时间戳
		    nonceStr: nonceStr, // 必填，生成签名的随机串
		    signature: signature,// 必填，签名，见附录1
		    jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
   		});
	}
   	
	wx.ready(function(){
       //----------“分享给朋友”
		wx.onMenuShareAppMessage({
			title: shareTitle, // 分享标题
   			desc: shareTitle, // 分享描述
   		    link: shareUrl, // 分享链接
   		    imgUrl: shareImgUrl, // 分享图标
   		    trigger: function (res) {// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
 //  				alert('用户点击发送给朋友');
   			},
   		    success: function (res) { 
 //  		    	alert('分享成功了666');// 用户确认分享后执行的回调函数、
        	},
    		cancel: function (res) { 
     			// 用户取消分享后执行的回调函数
//    			alert('已取消');
    		},
        	fail: function (res) {
 //       		alert('分享失败：' +JSON.stringify(res));
            }
       	});
       	//--------"分享到朋友圈"
       	wx.onMenuShareTimeline({
       		title: shareTitle, // 分享标题
    		link: shareUrl, // 分享链接
    		imgUrl: shareImgUrl, // 分享图标
    		trigger: function (res) {// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
 //   			alert('用户点击分享到朋友圈');
   			},
   			success: function (res) {
 //  			alert('已分享666');
   			},
   			cancel: function (res) {
 // 				alert('已取消');
   			},
   			fail: function (res) {
 //  				alert('分享失败：' +JSON.stringify(res));
   			}
       	});
       	//-----分享到QQ
       	wx.onMenuShareQQ({
       		title: shareTitle, // 分享标题
    		desc: shareTitle, // 分享描述
    		link: shareUrl, // 分享链接
    		imgUrl: shareImgUrl, // 分享图标
    		trigger: function (res) {
 //   			alert('用户点击分享到QQ');
   			},
   			complete: function (res) {
//   				alert(JSON.stringify(res));
   			},
   			success: function (res) {
 //  				alert('已分享666');
   			},
   			cancel: function (res) {
 //  				alert('已取消');
   			},
   			fail: function (res) {
//   				alert('分享失败：' +JSON.stringify(res));
   			}
       	});
       	
       	//-----分享到腾讯微博
       	wx.onMenuShareWeibo({
       		title: shareTitle, // 分享标题
       	    desc: shareTitle, // 分享描述
       	    link: shareUrl, // 分享链接
       	    imgUrl: shareImgUrl, // 分享图标
       	    success: function () { 
       	       // 用户确认分享后执行的回调函数
       	    },
       	    cancel: function () { 
       	        // 用户取消分享后执行的回调函数
       	    }
       	});
       	//-----分享QQ空间
       	wx.onMenuShareQZone({
       	    title: shareTitle, // 分享标题
       	    desc: shareTitle, // 分享描述
       	    link: shareUrl, // 分享链接
       	    imgUrl: shareImgUrl, // 分享图标
       	    success: function () { 
       	       // 用户确认分享后执行的回调函数
       	    },
       	    cancel: function () { 
       	        // 用户取消分享后执行的回调函数
       	    }
       	});
    	
       	//----判断当前客户端版本是否支持指定JS接口
       	wx.checkJsApi({
       	    jsApiList: [
       	    	'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
			], // 需要检测的JS接口列表，所有JS接口列表见附录2,
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
