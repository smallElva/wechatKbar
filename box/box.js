/**
 * Created by enter on 2018/3/12.
 */


$(function () {
    $.ajax({
        type: 'GET',
        url:'Data/box.json',
        dataType: "json",
        success: function (result) {
            renderTpl(result);
        },
        error: function () {
            alert('加载失败，请检查网络后重试');
        }
    })
});

/** 渲染模板 */
function renderTpl(orderList) {
    // 模板
    var tpl = '{{#list}} <li class="box-list-item-inner">\n'+
        '<div class="box-list-item-header">\n'+
        '<div class="box-list-header">\n'+
        '<div class="box-list-store aui-pull-left">\n'+
        '<i class="aui-iconfont aui-icon-location"></i>\n'+
        '<span class="order-store-name">{{orderStoreName}}</span>\n'+
    '</div>\n'+
    '<div class="box-list-benefit aui-pull-right">\n'+
        '<div class="box-list-benefit-p">\n'+
        '<i class="iconfont icon-geren1"></i>\n'+
        '<span>累计用户：</span>\n'+
    '<span class="box-list-benefit-users">{{boxListUsers}}</span>\n'+
    '</div>\n'+
    '<div class="box-list-benefit-p">\n'+
        '<i class="iconfont icon-zanwushouyi"></i>\n'+
        '<span>累计收益：</span>\n'+
    '<span class="box-list-benefit-benefits">{{boxListBenefits}}</span>\n'+
    '</div>\n'+
    '</div>\n'+
    '</div>\n'+
    '<div class="box-list-state aui-clearfix">\n'+
        '<span class="box-state-no-use">空闲中：<span class="box-state-no-use-num">{{boxStateNoUseNum}}</span></span>\n'+
    '<span class="box-state-use">消费中：<span class="box-state-use-num">{{boxStateUseNum}}</span></span>\n'+
    '<span class="box-state-fix">维修中：<span class="box-state-fix-num">{{boxStateFixNum}}</span></span>\n'+
    '</div>\n'+
    '</div>\n'+
    '<div class="box-house-block">\n'+
        '<div class="aui-content-padded">\n'+
        '<div class="aui-row-padded">\n'+
        '{{#room}}<div class="aui-col-xs-4">\n'+
        '<div class="box-block">\n'+
        '<div class="box-block-text">\n'+
        '<i class="iconfont icon-geren1"></i>\n'+
        '<span class="room-users-num">{{roomUsersNum}}</span>\n'+
    '</div>\n'+
    '<div class="box-block-text">\n'+
        '<i class="iconfont icon-zanwushouyi"></i>\n'+
        '<span class="room-benefit-num">{{roomBenefitNum}}</span>\n'+
    '</div>\n'+
    '<div class="box-block-room-num">{{boxBlockRoomNum}}</div>\n'+
    '<div class="box-block-text">空闲{{boxBlockRoomTime}}小时</div>\n'+
    '</div>\n'+
    '</div>{{/room}}'+
    '</div>\n'+
    '<div class="aui-clearfix"></div>\n'+
        '</div>\n'+
        '</div>\n'+
        '</li>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, orderList);
    // 插入dom
    $('#box-content').html(dom);
}