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




