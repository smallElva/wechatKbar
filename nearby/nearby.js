/**
 * Created by enter on 2018/1/24.
 */
$(function () {
    // 发送请求,渲染页面
    $.ajax({
        type:'GET',
        url:'Data/nearby',
        dataType: "json",
        success: function (result) {
            renderTpl(result);
        },
        error: function (xhr) {
            console.log(xhr)
            // alert('加载失败，请检查网络后重试');
        }
    });
});
apiready = function(){
    api.parseTapmode();
};

/***
 * tab切换
 */
var tab = new auiTab({
    element:document.getElementById("tab"),
},function(ret){
    if(ret.index==1){
        // 发送请求,渲染页面
        $.ajax({
            type:'GET',
            url:'Data/nearby',
            dataType: "json",
            success: function (result) {
                renderTpl(result);
            },
            error: function (xhr) {
                alert('加载失败，请检查网络后重试');
            }
        });
    }else if(ret.index==2){
        // 发送请求,渲染页面
        $.ajax({
            type: 'GET',
            url: 'Data/often',
            dataType: "json",
            success: function (result) {
                renderTpl(result);
            },
            error: function (xhr) {
                alert('加载失败，请检查网络后重试');
            }
        });
    }
});
/** 渲染模板 */
function renderTpl(nearbyList) {
    // 模板
    var tpl = '{{#list}}<li class="nearby-list-item aui-margin-b-15">\n'+
        '<div class="nearby-list-item-info">\n'+
            '<div class="nearby-list-store">\n'+
                '<div class="nearby-list-store-name">\n'+
                    '<i class="iconfont icon-jianzhu"></i>\n'+
                    '<span class="nearby-store-name">{{nearbyStoreName}}</span>\n'+
                '</div>\n'+
                '<a class="nearby-list-a" href="{{nearbyMapHref}}">\n'+
                    '<i class="iconfont icon-dizhi"></i>\n'+
                    '<span class="nearby-list-distance">{{nearbyStoreDistance}}</span>\n'+
                '</a>\n'+
            '</div>\n'+
            '<div class="nearby-list-add">地址：<span class="nearby-store-add">{{nearbyStoreAdd}}</span></div>\n'+
        '</div>\n'+
        '<div class="nearby-room-block">\n'+
            '{{#room}}<div class="nearby-room">\n' +
                '<div class="nearby-room-img"><img src="../img/ktv.jpg" class="aui-img-round"></div>\n'+
                '<div class="nearby-equip-name">{{nearbyEquipName}}</div>\n'+
            '</div>{{/room}}\n'+
        '</div>\n'+
    '</li>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, nearbyList);
    // 插入dom
    $('#tab-content').html(dom);
}
/***
 * 点击搜索出现取消效果
 */
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
        document.getElementById("search-keywords").textContent = keywords;
    }else{
        this.style.marginRight = "-"+this.offsetWidth+"px";
        searchBarInput.value = '';
        searchBarInput.blur();
    }
};

