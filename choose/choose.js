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

    /***
     * 扫码配置
     */
    wx.config({
        debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId : 'wx622ca8545e5c354b', // 必填，公众号的唯一标识
        timestamp : '', // 必填，生成签名的时间戳
        nonceStr :'', // 必填，生成签名的随机串
        signature : '',// 必填，签名，见附录1
        jsApiList : [ 'scanQRCode' ]
        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });


    /***
     * 请求判断用户登录状态和支付状态
     */
    $.ajax({
        type: "GET",
        url: "",
        data: {},
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function(response) {//假设0表示没有登录；1表示已经登录，但没买套餐；2表示已经购买套餐
            /***
             * 点击购买套餐按钮
             */
            $('#buy-package').click(function () {
                if(response==0){ //如果没有登录则弹窗提示扫码登录
                    dialog.alert({
                        title:"是否扫码畅享点歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode({
                                // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
                                needResult : 1,
                                desc : 'scanQRCode desc',
                                success : function(res) { //扫码登录成功后跳转到购买套餐页面
                                    window.location.href='packages/packages.html';
                                    //扫描成功的执行方法
                                }
                            });
                        }
                    });
                }else{ //如果是已经登录的状态的话直接跳转到购买套餐页面
                    window.location.href='packages/packages.html';
                }
            });

            /***
             * 点击遥控按钮
             */
            $('#control-btn').click(function () {
                if(response==0){ //如果没有登录则弹窗提示扫码登录
                    dialog.alert({
                        title:"是否扫码畅享点歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode({
                                // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
                                needResult : 1,
                                desc : 'scanQRCode desc',
                                success : function(res) { //扫码登录成功后跳转到购买套餐页面
                                    window.location.href='choose.html';
                                    //扫描成功的执行方法
                                }
                            });
                        }
                    });
                }else if(response==1){ //如果是已经登录的状态的话弹窗提示购买套餐
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){ //点击确认后跳转到购买套餐页面
                            window.location.href='packages/packages.html';
                        }
                    });
                }else if(response==2){ //如果已经购买套餐直接跳转到遥控页面
                    window.location.href='control/control.html';
                }
            });
        }
    });

    /***
     * 点击扫描二维码
     */
    $('#scanQRCode').click(function () {
        wx.scanQRCode({
            // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
            needResult : 1,
            desc : 'scanQRCode desc',
            success : function(res) {//扫描成功的执行方法;假设返回的1表示登录的二维码；2表示购买套餐的二维码
                if(res==1){
                    window.location.href='choose.html';
                }else if(res==2){
                    var time = res.times; //获取二维码中购买的套餐时间和金额
                    var money = res.money;
                    window.location.href='packages/packages.html'+time+money;
                }
            },
            error:function (msg) {
                alert(msg);
            }
        });
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
 * 提醒扫码弹窗
 */
var dialog = new auiDialog();
function scanDialog() {
    dialog.alert({
        title:"是否扫码畅享点歌体验？",
        buttons:['取消','确定']
    },function(ret){
        if(ret.buttonIndex==2){
            // scanCodes();
        }
    });
}

/***
 * 扫码方法
 */
function scanCodes() {
    wx.scanQRCode({
        // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        needResult : 1,
        desc : 'scanQRCode desc',
        success : function(res) {

            //扫描成功的执行方法
        }
    });
}
