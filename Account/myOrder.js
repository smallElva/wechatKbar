/**
 * Created by enter on 2018/1/23.
 */

$(function () {

    // 页数
    var page = 0;
// 每页展示5个
    var size = 5;
// dropload
    $('.content2').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            page++;
            // 拼接HTML
            var result = '';
            $.ajax({
                type: 'GET',
                url: 'Data/myOrder',
                dataType: 'json',
                success: function(data){
                    var arrLen = data.list.length;
                    if(arrLen > 0){
                        for(var i=0; i<arrLen; i++){
                            result += '<li class="aui-list-item aui-list-item-middle aui-margin-b-15">'+
                                '<div class="myOrder-title">'+
                                    '<span class="myOrder-title-num">'+'订单号：'+'<span class="myOrder-num">'+ data.list[i].myOrderNum +'</span>'+
                                    '</span>'+
                                    '<span class="myOrder-time">'+ data.list[i].myOrderTime +'</span>'+
                                '</div>'+
                                '<div class="aui-media-list-item-inner">'+
                                    '<div class="aui-list-item-media myOrder-list-item-media">'+
                                        '<img src=" '+ data.list[i].myOrderImg +'" class="aui-list-img-sm myOrder-list-img">'+
                                    '</div>'+
                                    '<div class="aui-list-item-inner">'+
                                        '<div class="myOrder-info">'+
                                            '<div class="aui-list-item-title myOrder-type">'+ data.list[i].myOrderType +'</div>'+
                                            '<div class="myOrder-add">'+data.list[i].myOrderAdd +'</div>'+
                                        '</div>'+
                                        '<div class="aui-list-item-text">'+
                                            '<div class="aui-list-item-title myOrder-money">¥'+ data.list[i].myOrderMoney +'</div>'+
                                            '<div class="aui-list-item-right myOrder-state">'+ data.list[i].myOrderState +'</div>'+
                                        '</div>'+
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
                        $('#myOrder_list').append(result);
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

