/**
 * Created by enter on 2018/1/23.
 */

$(function () {
    /***
     * 轮播效果
     */
    $('.slide-content').slick({
        autoplay: true,
        arrows: false
    });



    var href = location.href.split('#')[0];
    var timeStamp;		//必填，生成签名的时间戳
    var nonceStr;		//必填，生成签名的随机串
    var signature;		//必填，签名
    var appId;			//必填
    var url = window.location.search;
    var state = url.split('serialNo=')[1];

    //获取设备号，存储在sessionStorage中；
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem('deviceId',state);
    }
    else{
        sessionStorage.setItem('deviceId','');
    }


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
                console.log(objData);
                timeStamp = objData.timeStamp;
                nonceStr = objData.nonceStr;
                signature = objData.signature;
                appId = objData.appId;
                wxScanCodes();
            }
        });
    }
    /***
     * 扫码配置
     */
    function wxScanCodes(){
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId,
            timestamp: timeStamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }

    wx.ready(function () {
        /***
         * 请求判断用户登录状态和支付状态
         */
        var websocket = null;
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            websocket = new WebSocket("ws://192.168.1.115:8086/webSocketServer?serialNo="+state);
        }
        else {
            alert('当前浏览器 Not support websocket')
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function() {
            websocket.close();
        };
        websocket.onopen = function () {
            alert('打开啦');
        };
        //获得消息事件
        websocket.onmessage = function(msg) {
            var deal = JSON.parse(msg.data).action;
            $('#control-btn').click(function () {
                if(deal && deal!=''){
                    window.location.href = 'control/control.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){ //点击确认后跳转到购买套餐页面
                            window.location.href='packages/packages.html';
                        }
                    });
                }
            });

        };

        /***
         * 点击
         */
        $('#buy-package').click(function () {
            if(url.indexOf("serialNo")!=-1){  // 如果没有登录则弹窗提示扫码登录
                window.location.href='packages/packages.html';
            }else{ // 如果是已经登录的状态的话直接跳转到购买套餐页面
                dialog.alert({
                    title:"是否扫码畅享点歌体验？",
                    buttons:['取消','确定']
                },function(ret){
                    if(ret.buttonIndex==2){
                        wx.scanQRCode({
                            // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
                            needResult : 1,
                            desc : 'scanQRCode desc',
                            success : function(res) { // 扫码登录成功后跳转到购买套餐页面
                                window.location.href='packages/packages.html';
                                //扫描成功的执行方法
                            }
                        });
                    }
                });
            }
        });

        // $.ajax({
        //     type: "GET",
        //     url: "",
        //     data: {},
        //     dataType: "json",
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     success: function(response) {// 假设0表示没有登录；1表示已经登录，但没买套餐；2表示已经购买套餐
        //         /***
        //          * 点击购买套餐按钮
        //          */
        //         $('#buy-package').click(function () {
        //             if(response==0){ // 如果没有登录则弹窗提示扫码登录
        //                 dialog.alert({
        //                     title:"是否扫码畅享点歌体验？",
        //                     buttons:['取消','确定']
        //                 },function(ret){
        //                     if(ret.buttonIndex==2){
        //                         wx.scanQRCode({
        //                             // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        //                             needResult : 1,
        //                             desc : 'scanQRCode desc',
        //                             success : function(res) { // 扫码登录成功后跳转到购买套餐页面
        //                                 window.location.href='packages/packages.html';
        //                                 //扫描成功的执行方法
        //                             }
        //                         });
        //                     }
        //                 });
        //             }else{ // 如果是已经登录的状态的话直接跳转到购买套餐页面
        //                 window.location.href='packages/packages.html';
        //             }
        //         });
        //
        //         /***
        //          * 点击遥控按钮
        //          */
        //         $('#control-btn').click(function () {
        //             if(response==0){ //如果没有登录则弹窗提示扫码登录
        //                 dialog.alert({
        //                     title:"是否扫码畅享点歌体验？",
        //                     buttons:['取消','确定']
        //                 },function(ret){
        //                     if(ret.buttonIndex==2){
        //                         wx.scanQRCode({
        //                             // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        //                             needResult : 1,
        //                             desc : 'scanQRCode desc',
        //                             success : function(res) { //扫码登录成功后跳转到购买套餐页面
        //                                 window.location.href='choose.html';
        //                                 //扫描成功的执行方法
        //                             }
        //                         });
        //                     }
        //                 });
        //             }else if(response==1){ //如果是已经登录的状态的话弹窗提示购买套餐
        //                 dialog.alert({
        //                     title:"是否购买套餐畅享K歌体验？",
        //                     buttons:['取消','确定']
        //                 },function(ret){
        //                     if(ret.buttonIndex==2){ //点击确认后跳转到购买套餐页面
        //                         window.location.href='packages/packages.html';
        //                     }
        //                 });
        //             }else if(response==2){ //如果已经购买套餐直接跳转到遥控页面
        //                 window.location.href='control/control.html';
        //             }
        //         });
        //     }
        // });

        /***
         * 点击扫描二维码
         */
        $('#scanQRCode').click(function () {
            wx.scanQRCode();
        });

    });
    wx.checkJsApi({
        jsApiList: ['checkJsApi',
            'scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        fail: function (res) {
            alert('微信版本太低，不支持扫码的功能！');
        },
        success: function(res) {

        }
    });
    wx.error(function (res) {
        alert(res.errMsg);
    });
});
apiready = function(){
    api.parseTapmode();
};
/***
 * 点击搜索跳转到搜索页面
 */
var searchBar = document.querySelector(".aui-searchbar");
var searchBarInput = document.querySelector(".aui-searchbar input");
if(searchBar){
    searchBarInput.onclick = function(){
        window.location.href='search/search.html';
    };
    searchBarInput.oninput = function(){
        window.location.href='search/search.html';
    }
}

/***
 * 初始化弹窗
 */
var dialog = new auiDialog();

