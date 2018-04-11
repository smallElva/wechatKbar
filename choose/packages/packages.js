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
            $.ajax({
                type: 'Get',
                url: "packages.json",
                // data:{type:type,ext:ext},
                dataType: "json",
                success: function (data) {
                    var lists = data.packagesList;
                    for (var i = 0; i < lists.length; i++) {
                        vmm.datas.push(lists[i]);
                    }
                }
            });

        }
    }
});

function openMask(time,money) {
    $('#mask').show();
    $('#timeVal').text(time);
    $('#moneyVal').text(money);
    $('body').css('overflow','hidden');
}
function closeMask() {
    $('#mask').hide();
    $('body').css('overflow','auto');
}

$(function () {

    /***
     * 微信支付方法
     * */
    var code = GetQueryString("code");
    var openid = window.localStorage.getItem("openid");

    $.ajax({
        type: "GET",
        url: "/WxPay/GetPayConfig",
        beforeSend: function () {
            $("#btnPay").attr({ "disabled": "disabled" });//获取到配置之前，禁止点击付款按钮
        },
        success: function (data) {
            $("#btnPay").removeAttr("disabled");//获取到配置，打开付款按钮
            wx.config({
                debug: true, // 开启调试模式,成功失败都会有alert框
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timeStamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
            });
            wx.ready(function () {
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        }
    });

    function startWxPay() {
        $.ajax({
            type: "POST",
            url: "/WxPay/GetPaySign",
            data: { code: code, openid: openid },
            beforeSend: function () {
                $("#btnPay").attr({ "disabled": "disabled" });
            },
            success: function (res) {
                $("#btnPay").removeAttr("disabled");
                if (res.openid != null && res.openid != undefined && res.openid != "") {
                    window.localStorage.setItem("openid", res.openid);
                }
                wx.chooseWXPay({
                    timestamp: res.data.timeStamp, // 支付签名时间戳
                    nonceStr: res.data.nonceStr, // 支付签名随机串，不长于32 位
                    package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: res.data.paysign, // 支付签名
                    success: function (res) {
                        //支付成功
                    },
                    cancel: function (res) {
                        //支付取消
                    }
                });
            }
        });
    }

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
});

