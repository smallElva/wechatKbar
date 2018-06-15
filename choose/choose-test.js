/**
 * Created by enter on 2018/6/4.
 */
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


    var url = window.location.search;
    var state = url.split('serialNo=')[1];

    //获取设备号，存储在sessionStorage中；
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem('deviceId',state);
    }
    else{
        sessionStorage.setItem('deviceId','');
    }

    /***
     * 请求判断用户登录状态和支付状态
     */
    /***
     * 点击遥控
     */
    $('#control-btn').click(function () {
        window.location.href = 'control/control.html';
    });
    /***
     * 点击歌手点歌
     */
    $('#singer-btn').click(function () {
        window.location.href = 'singer/singer.html';
    });
    /***
     * 点击歌名点歌
     */
    $('#songName-btn').click(function () {
        window.location.href = 'songName/songName.html';
    });
    /***
     * 点击乐谱点歌
     */
    $('#musicScore-btn').click(function () {
        window.location.href = 'musicScore/musicScore.html';
    });
    /***
     * 点击热门歌曲
     */
    $('#hotSong-btn').click(function () {
        window.location.href = 'hotSong/hotSong.html';
    });
    /***
     * 点击语种点歌
     */
    $('#language-btn').click(function () {
        window.location.href = 'language/language.html';
    });
    /***
     * 点击新歌推荐
     */
    $('#newSong-btn').click(function () {
        window.location.href = 'newSong/newSong.html';
    });
    /***
     * 点击已点歌曲
     */
    $('#haveSong-btn').click(function () {
        window.location.href = 'haveSongs/haveSongs.html';
    });
    /***
     * 点击已唱歌曲
     */
    $('#haveSang-btn').click(function () {
        window.location.href = 'haveSang/haveSang.html';

    });
    $('#buy-package').click(function () {
        window.location.href='http://wechat.uniquemusic.cn/packagesPage?serialNo=123456';
        // window.location.href='http://wechat.uniquemusic.cn/packagesPage?serialNo='+state;
    });


    /***
     * 点击扫描二维码
     */
    $('#scanQRCode').click(function () {
        wx.scanQRCode();
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

