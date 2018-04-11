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
     * 未登录前点击购买套餐弹窗提示扫码进入房间
     */

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
            scanCodes();
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
