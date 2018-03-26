/**
 * Created by enter on 2018/1/20.
 */

$(function(){
    /***
     * 点击全部门店筛选
     */
    $("#showStore").click(function () {
        $('#store-top').toggleClass('toggleShow');
        $(this).find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
        $('#state-top').removeClass('toggleShow');
    });
    /***
     * 点击订单状态筛选
     */
    $('#store-top .aui-list-item').click(function () { //点击门店选择栏里的任何一个选项，切换选项值，并刷新页面
        var storeName = $(this).find('.bill-store-name').text();
        $('#showStore .order-store-name').html(storeName);
        // 获取门店名，调用发送接口
        var store = parseInt($(this).find('.bill-store-name').attr('data-store'));
        $("#showStore").find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
        getOrderByStore(store);
    });
    //点击页面除了id="showStore"和id="showOrder"之外的任何区域都关闭该div
    $(document).on('click', function(e) {
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id == 'showStore') {
                return;
            }
            elem = elem.parentNode;
        }
        $('#store-top').removeClass('toggleShow'); //关闭该div
    });
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
    // 页数
    var page = 0;
    // 每页展示5个
    var size = 5;

    // dropload
    $('.content').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            page++;
            // 拼接HTML
            var result = '';
            $.ajax({
                type: 'GET',
                url: 'Data/orderTotal',
                dataType: 'json',
                success: function(data){
                    var arrLen = data.list.length;
                    if(arrLen > 0){
                        for(var i=0; i<arrLen; i++){
                            result +=   '<div class="aui-list aui-media-list aui-margin-b-15">' +
                            '<div class="aui-list-header order-list-header">'+
                            '<span class="aui-pull-left order-num-id">'+ data.list[i].orderNumId +'</span>'+
                            '<span class="aui-pull-right order-equip">'+ data.list[i].orderEquip +'</span>'+
                            '</div>'+
                            '<div class="aui-list-item aui-list-item-middle aui-clearfix">'+
                            '<div class="aui-media-list-item-inner">'+
                            '<div class="aui-list-item-media order-list-item-media">'+
                            '<img class="aui-img-round aui-list-img-sm" src= '+ data.list[i].orderUserImg +'>'+
                            '</div>'+
                            '<div class="aui-list-item-inner">'+
                            '<div class="aui-list-item-text">'+
                            '<div class="aui-list-item-title aui-font-size-14">'+ data.list[i].orderUserName +'</div>'+
                            '<div class="aui-list-item-right">'+
                            '<p class="order_money">¥'+data.list[i].orderMoney +'</p>'+
                            '</div>'+
                            '</div>'+
                            '<div class="aui-list-item-text">'+
                            '<div class="aui-list-item-title order-buy-time">'+'购买时长'+data.list[i].orderBuyTime+'分钟'+'</div>'+
                            '<div class="aui-list-item-right">'+
                            '<p class="order_state">'+ data.list[i].orderState +'</p>'+
                            '</div>'+
                            '</div>'+
                            '<div class="aui-list-item-text">'+ data.list[i].orderOrderedTime +'</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>';
                        }
                        // 如果没有数据
                    }else{
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        // 插入数据到页面，放到最后面
                        $('#orderContent').append(result);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });
});

/** 获取门店分类的接口;接口数据我是文件模拟的，/Data/store/目录下是模拟数据
 *  参数 store: 0 ==> store1
 *              1 ==> store2
 *              2 ==> store3
 * */
function getOrderByStore(store) {
    // 根据性别决定接口数据
    var url='';
    if(store == 0){
        url = 'Data/store/store1';
    }else if(store == 1){
        url = 'Data/store/store2';
    }else if(store == 2){
        url = 'Data/store/store3';
    }else{
        return
    }
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
    })
}
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
    $('#orderContent').html(dom);
}