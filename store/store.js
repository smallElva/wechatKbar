/**
 * Created by enter on 2018/1/18.
 */

$(function () {


    /** 接口数据我是文件模拟的，/Data/store/目录下是模拟数据
     *
     *
     * */
    var url = 'Data/store';
    // 发送请求
    $.ajax({
        type:'GET',
        url:url,
        dataType: "json",
        success: function (result) {
            renderTpl(result);
        },
        error: function () {
            alert('加载失败，请检查网络后重试');
        }
    });


});

/** 渲染模板 */
function renderTpl(storeList) {
    // 模板
    var tpl = '{{#list}}<div class="aui-list aui-media-list aui-margin-t-15">\n' +
        '<div class="aui-list-item aui-list-item-middle">\n' +
        '<a href="{{storePageHref}}">\n'+
        '<div class="aui-list-item-inner aui-list-item-arrow">\n'+
        '<div class="aui-list-item-text">\n'+
        '<div class="store-list-item-media">\n'+
        '<img src="{{storeImg}}" class="aui-list-img-sm" alt="门店">\n' +
        '</div>\n' +
        '<div class="aui-list-item-right aui-text-right">'+
        '<p class="store_list_name">{{storeName}}</p>\n'+
        '<p class="store_list_add">{{storeAdd}}</p>\n'+
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</a>\n'+
        '</div>\n'+
        '</div>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, storeList);
    // 插入dom
    $('#storeContent').html(dom);
}

