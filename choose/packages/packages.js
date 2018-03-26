/**
 * Created by enter on 2018/1/26.
 */

$(function () {
    $.ajax({
        type:"GET",
        url:"packages.json",
        dataType:"json",
        success: function (result) {
            renderTpl(result)
        },
        error: function () {
            alert('加载失败，请检查网络后重试');
        }
    })
});

/*全部门店列表渲染模板*/
function renderTpl(storeList) {
    // 模板
    var tpl = '{{#list}}<li class="aui-col-xs-4">\n' +
        '<div class="packages-block">\n'+
        '<div class="package-name">\n'+ '畅享'+ '<span class="packages-time">{{packagesTime}}</span>'+'分钟套餐'+'</div>\n'+
        '<div class="package-charge"><span class="packages-money">{{packagesMoney}}</span> <span class="packages-orig-money">{{packagesOrigMoney}}</span></div>\n'+
        '</div>\n'+
        '</li>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, storeList);
    // 插入dom
    $('#packages-list').html(dom);
}