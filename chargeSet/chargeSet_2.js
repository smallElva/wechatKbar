/**
 * Created by enter on 2018/1/22.
 */

$(function(){
    /***
     * 点击全部门店筛选
     */
    $("#showStore").click(function () {
        $('#store-top').toggleClass('toggleShow');
        $(this).find('.aui-iconfont').toggleClass('aui-icon-down aui-icon-top');
    });
    //点击门店选择栏里的任何一个选项，切换选项值，并刷新页面
    $('#store-top .aui-list-item').click(function () {
        var storeName = $(this).find('.bill-store-name').text();
        $('#showStore .charge-store-name').html(storeName);
        // 获取门店名，调用发送接口
        var store = parseInt($(this).find('.bill-store-name').attr('data-store'));
        getChargeByStore(store);
    });
    //点击页面除了id="showStore"之外的任何区域都关闭该div
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
                url: 'Data2/chargeTotal',
                dataType: 'json',
                success: function(data){
                    var arrLen = data.list.length;
                    if(arrLen > 0){
                        for(var i=0; i<arrLen; i++){
                            result += '<li>'+
                                '<div class="aui-list-header charge-list-header">'+
                                    '<span class="aui-pull-left charge-type">'+ data.list[i].chargeType +'套餐</span>'+
                                    '<span class="aui-pull-right order-equip">'+ data.list[i].chargeEquip + '</span>'+
                                '</div>'+
                                '<div class="aui-list-item aui-list-item-middle aui-clearfix">'+
                                    '<div class="aui-list-item-inner charge-list-item">'+
                                        '<div class="charge-list-item-text">时长： '+'<span class="charge-type-time">'+ data.list[i].chargeTypeTime +'</span>'+'</div>'+
                                        '<div class="charge-list-item-text charge-list-item-orig-money">'+'原价:'+' <span class="charge-orig-money">'+ data.list[i].chargeOrigMoney +'</span>'+'</div>'+
                                        '<div class="charge-list-item-text charge-list-item-money">'+'优惠价:'+' <span class="charge-take-money">'+ data.list[i].chargeTakeMoney +'</span>'+'</div>'+
                                        '<div class="charge-list-item-text">用于：<span class="charge-type-series">'+ data.list[i].chargeTypeSeries +'</span>'+'</div>'+
                                    '</div>'+
                                '</div>'+
                                '</li>'

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
                        $('#chargeContent2').append(result);
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


/** 获取门店分类的接口;接口数据我是文件模拟的，/Data2/charge/目录下是模拟数据
 *  参数 store: 0 ==> charge1
 *              1 ==> charge2
 *              2 ==> charge3
 * */
function getChargeByStore(store) {
    // 根据性别决定接口数据
    var url='';
    if(store == 0){
        url = 'Data2/charge1';
    }else if(store == 1){
        url = 'Data2/charge2';
    }else if(store == 2){
        url = 'Data2/charge3';
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
function renderTpl(chargeList) {
    // 模板
    var tpl = '{{#list}}<li>\n' +
        '<div class="aui-list-header charge-list-header">\n'+
            '<span class="aui-pull-left charge-type">{{chargeType}}套餐</span>'+
            '<span class="aui-pull-right order-equip">{{chargeEquip}}</span>'+
        '</div>\n'+
        '<div class="aui-list-item aui-list-item-middle aui-clearfix">\n'+
            '<div class="aui-list-item-inner charge-list-item">\n'+
                '<div class="charge-list-item-text">时长：<span class="charge-type-time">{{chargeTypeTime}}</span>'+
                '</div>\n'+
                '<div class="charge-list-item-text charge-list-item-orig-money">原价: <span class="charge-orig-money">{{chargeOrigMoney}}</span>'+
                '</div>\n'+
                '<div class="charge-list-item-text charge-list-item-money">优惠价: <span class="charge-take-money">{{chargeTakeMoney}}</span>'+
                '</div>\n'+
                '<div class="charge-list-item-text">用于：<span class="charge-type-series">{{chargeTypeSeries}}</span>'+
                '</div>\n'+
            '</div>\n'+
        '</div>\n' +
        '</li>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, chargeList);
    // 插入dom
    $('#chargeContent2').html(dom);
}

