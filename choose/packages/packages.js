/**
 * Created by enter on 2018/1/26.
 */
var vmm=new Vue({
    el: "#packages-app",
    data: {
        datas: []

    },
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            //拿到存储在sessionStorage中的设备号
            if (typeof(Storage) !== "undefined") {
                var deviceId=sessionStorage.getItem("deviceId");
            }
            else{
                deviceId=sessionStorage.getItem('123456');
            }
            $.ajax({
                type: 'GET',
                url: "http://yangleo.ittun.com//meal/get/serialNo/123456",
                // url: "http://yangleo.ittun.com//meal/get/serialNo/"+deviceId,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    var lists = response.data;
                    for (var i = 0; i < lists.length; i++) {
                        vmm.datas.push(lists[i]);
                    }
                }
            });

        }
    }
});

function openMask(time,money,id) {
    //格式化当前下单时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var h= date.getHours();
    var m= date.getMinutes();
    var s= date.getSeconds();
    var hstr = h;
    var mstr = m;
    var istr = s;
    if (h < 10) { hstr = "0" + h };
    if (m < 10) { mstr = "0" + m };
    if (s < 10) { istr = "0" + s };
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hstr + seperator2 + mstr
        + seperator2 + istr;


    $('#mask').show();
    $('#moneyVal').text(money);
    $('#nowTime').html(currentdate);//更新当前时间
    $('#getMealId').val(id);
    $('body').css('overflow','hidden');
    if(time==0){
        $('#timeVal').text('');
        $('#type').html('单首');
    }else{
        $('#timeVal').text(time);
        $('#type').html('分钟');
    }
}
function closeMask() {
    $('#mask').hide();
    $('body').css('overflow','auto');
}

$(function () {
    $('#btnPay').click(function () {
        callpsay();
    });
    /***
     * 微信支付方法
     * */
    // var href = location.href.split('#')[0];
    // $.ajax({
    //     type: 'GET',
    //     url: 'http://yangleo.ittun.com/signature',
    //     data:{url:href},
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     beforeSend: function () {
    //         $("#btnPay").attr({ "disabled": "disabled" });//获取到配置之前，禁止点击付款按钮
    //     },
    //     success: function (data) {
    //         $("#btnPay").removeAttr("disabled");//获取到配置，打开付款按钮
    //         var objData = JSON.parse(data);
    //         wx.config({
    //             debug: false, // 开启调试模式,成功失败都会有alert框
    //             appId: objData.appId, // 必填，公众号的唯一标识
    //             timestamp: objData.timeStamp, // 必填，生成签名的时间戳
    //             nonceStr: objData.nonceStr, // 必填，生成签名的随机串
    //             signature: objData.signature,// 必填，签名
    //             jsApiList: ['chooseWXPay','getNetworkType','translateVoice','checkJsApi','previewImage'] // 必填，需要使用的JS接口列表
    //         });
    //         wx.ready(function () {
    //             // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //
    //             $('#btnPay').click(function () {
    //                 callpsay();
    //             });
    //             wx.checkJsApi({
    //                 jsApiList: ['checkJsApi',
    //                     'chooseWXPay','translateVoice','previewImage','getNetworkType'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //                 fail: function (res) {
    //                     alert('微信版本太低，不支持扫码的功能！');
    //                 },
    //                 success: function(res) {
    //
    //                 }
    //             });
    //         });
    //         wx.error(function (res) {
    //             // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    //         });
    //     }
    // });




});

function callpsay(){
    if(typeof WeixinJSBridge == "undefined"){
        if(document.addEventListener){
            document.addEventListener('WeixinJSBridgeReady',jsApiCall, false);
        }else if(document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady',jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    }else{
        WeixinJSBridge.invoke('getNetworkType',{},  function(e){
            if(e.err_msg == 'network_type:fail'){
                alert('亲，当前网络状态不好哦，请检查网络！');
            }else{
                jsApiCall();
            }
        });
    }
}
/**
 * 电子钱包微信充值-微信参数构建
 */
function jsApiCall(){
    //拿到存储在sessionStorage中的设备号
    if (typeof(Storage) !== "undefined") {
        var deviceId =sessionStorage.getItem("deviceId");
    }
    else{
        deviceId=sessionStorage.getItem('123456');
    }
    $.ajax({
        async: true,
        type: 'post',
        dataType: 'json',
        url: "http://yangleo.ittun.com/pay/wxPay",
        data: {mealId: $('#getMealId').val(), serialNo: 123456, payType: "weixin",openid:"oVdmm1ZcHz07YX0it6gBhoKYsq30"},
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert('fail');
        },
        success: function(result){
            if(result.status == 'ok'){
              //  var param = $.parseJSON(result.data);
                var resultObj = $.parseJSON(result.msg);
                var param = {
                    "appId":resultObj.appId,     //公众号名称，由商户传入
                    "timeStamp":resultObj.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr":resultObj.nonceStr, //随机串
                    "package":resultObj.package,
                    "signType":"MD5",         //微信签名方式：
                    "paySign":resultObj.paySign //微信签名
                };

                WeixinJSBridge.invoke('getBrandWCPayRequest',param,function(res){
                        // alert(res.err_msg);
                        alert(JSON.stringify(res));
                        if(res.err_msg == 'get_brand_wcpay_request:ok'){
                        alert('支付成功！');
                    }else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                            alert('您已取消支付');
                        //取消支付
                        WeixinJSBridge.invoke('getNetworkType',{},  function(e){
                            if(e.err_msg == 'network_type:fail'){
                               alert('亲，当前网络状态不好哦，请检查网络！');
                            }else{
                                alert('delete');
                            }
                        });
                    }
                });
            }
        }
    });
}
