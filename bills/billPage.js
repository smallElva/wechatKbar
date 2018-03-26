/**
 * Created by enter on 2018/3/10.
 */
// 发送请求,渲染页面
$.ajax({
    type:'GET',
    url:'Data/orderTotal',
    dataType: "json",
    success: function (result) {
        renderTpl(result);
    },
    error: function () {
        alert('加载失败，请检查网络后重试');
    }
});

/** 渲染模板 */
function renderTpl(orderList) {
    // 模板
    var tpl = '{{#list}}<div class="aui-list aui-media-list aui-margin-b-15">\n' +
        '<div class="aui-list-header order-list-header">\n'+
        '<span class="aui-pull-left order-num-id">{{orderNumId}}</span>\n'+
        '<span class="aui-pull-right order-equip">{{orderEquip}}</span>\n'+
        '</div>\n'+
        '<div class="aui-list-item aui-list-item-middle aui-clearfix">\n'+
        '<div class="aui-media-list-item-inner">\n'+
        '<div class="aui-list-item-media order-list-item-media">\n'+
        '<img src="{{orderUserImg}}" class="aui-img-round aui-list-img-sm">\n'+
        '</div>\n'+
        '<div class="aui-list-item-inner">\n'+
        '<div class="aui-list-item-text">\n'+
        '<div class="aui-list-item-title aui-font-size-14">{{orderUserName}}</div>\n'+
        '<div class="aui-list-item-right">\n'+
        '<p class="order_money">¥{{orderMoney}}</p>\n'+
        '</div>\n'+
        '</div>\n'+
        '<div class="aui-list-item-text">\n'+
        '<div class="aui-list-item-title order-buy-time">购买时长{{orderBuyTime}}分钟</div>\n'+
        '<div class="aui-list-item-right">\n'+
        '<p class="order_state">{{orderState}}</p>\n'+
        '</div>\n'+
        '</div>\n'+
        '<div class="aui-list-item-text">{{orderOrderedTime}} </div>\n'+
        '</div>\n'+
        '</div>\n'+
        '</div>\n'+
        '</div>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, orderList);
    // 插入dom
    $('#billPage-list').html(dom);
}
