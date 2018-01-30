/**
 * Created by enter on 2018/1/26.
 */
$(function() {
    $(".aui-searchbar .aui-searchbar-btn").click(function() {
        var $keyword = $("#search-input").val();
        setHeightKeyWord('search-result', $keyword, '#ff2600', false)
    });
});
//将搜索结果中的关键字标红方法
function setHeightKeyWord(id, keyword, color, bold) {
    if (keyword == "")
        return;
    var tempHTML = $("#" + id).html();
    var htmlReg = new RegExp("\<.*?\>", "i");
    var arrA = new Array();
    for (var i = 0; true; i++) {
        var m = htmlReg.exec(tempHTML);
        if (m) {
            arrA[i] = m;
        }
        else {
            break;
        }
        tempHTML = tempHTML.replace(m, "[[[[" + i + "]]]]");
    }
    var replaceText;
    if (bold)
        replaceText = "<b style='color:" + color + ";'>$1</b>";
    else
        replaceText = "<font style='color:" + color + ";'>$1</font>";
    var arrayWord = keyword.split(',');
    for (var w = 0; w < arrayWord.length; w++) {
        var r = new RegExp("(" + arrayWord[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig");
        tempHTML = tempHTML.replace(r, replaceText);
    }
    for (var i = 0; i < arrA.length; i++) {
        tempHTML = tempHTML.replace("[[[[" + i + "]]]]", arrA[i]);
    }
    $("#" + id).html(tempHTML);
};
apiready = function(){
    api.parseTapmode();
};
var searchBar = document.querySelector(".aui-searchbar");
var searchBarInput = document.querySelector(".aui-searchbar input");
var searchBarBtn = document.querySelector(".aui-searchbar .aui-searchbar-btn");
var searchBarClearBtn = document.querySelector(".aui-searchbar .aui-searchbar-clear-btn");
if(searchBar){
    searchBarInput.onclick = function(){
        searchBarBtn.style.marginRight = 0;
    };
    searchBarInput.oninput = function(){
        if(this.value.length){
            searchBarClearBtn.style.display = 'block';
            searchBarBtn.classList.add("aui-text-info");
            searchBarBtn.textContent = "搜索";
        }else{
            searchBarClearBtn.style.display = 'none';
            searchBarBtn.classList.remove("aui-text-info");
            searchBarBtn.textContent = "取消";
        }
    }
}
searchBarClearBtn.onclick = function(){
    this.style.display = 'none';
    searchBarInput.value = '';
    searchBarBtn.classList.remove("aui-text-info");
    searchBarBtn.textContent = "取消";
};
searchBarBtn.onclick = function(){
    var keywords = searchBarInput.value;
    if(keywords.length){
        searchBarInput.blur();
    }else{
        this.style.marginRight = "-"+this.offsetWidth+"px";
        searchBarInput.value = '';
        searchBarInput.blur();
    }
};
