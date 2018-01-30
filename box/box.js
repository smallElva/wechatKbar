/**
 * Created by enter on 2018/1/19.
 */

$(function () {
    // 页数
    var page = 0;
// 每页展示5个
    var size = 5;
// dropload
    $('.content-box').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            page++;
            // 拼接HTML
            var result = '';
            $.ajax({
                type: 'GET',
                url: 'Data/box',
                dataType: 'json',
                success: function(data){
                    var arrLen = data.list.length;
                    if(arrLen > 0){
                        for(var i=0; i<arrLen; i++){
                            result += '<li class="box-list-item-inner">'+
                                '<div class="box-list-item-header">'+
                                '<div class="box-list-header">'+
                                '<div class="box-list-store aui-pull-left">'+
                                '<i class="aui-iconfont aui-icon-location"></i>'+
                                '<span class="order-store-name">'+ data.list[i].orderStoreName +'</span>'+
                                '</div>'+
                                '<div class="box-list-benefit aui-pull-right">'+
                                '<div class="box-list-benefit-p">'+
                                '<i class="iconfont icon-geren1"></i>'+
                                '<span>'+'累计用户：'+'</span>'+
                                '<span class="box-list-benefit-users">'+ data.list[i].boxListUsers +'</span>'+
                                '</div>'+
                                '<div class="box-list-benefit-p">'+
                                '<i class="iconfont icon-zanwushouyi"></i>'+
                                '<span>'+'累计收益：'+'</span>'+
                                '<span class="box-list-benefit-benefits">'+ data.list[i].boxListBenefits +'</span>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '<div class="box-list-state aui-clearfix">'+
                                '<span class="box-state-no-use">'+'空闲中：'+'<span class="box-state-no-use-num">'+data.list[i].boxStateNoUseNum +'</span>'+'</span>'+
                                '<span class="box-state-use">'+'消费中：'+'<span class="box-state-use-num">'+data.list[i].boxStateUseNum +'</span>'+'</span>'+
                                '<span class="box-state-fix">'+'维修中：'+'<span class="box-state-fix-num">'+data.list[i].boxStateFixNum +'</span>'+'</span>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '<div class="box-house-block">'+
                                '<div class="aui-content-padded">'+
                                '<div class="aui-row-padded">';

                            var roomLen = data.list[i].room.length;
                            for(var j=0; j<roomLen; j++){
                                    result += '<div class="aui-col-xs-4">'+
                                                    '<div class="box-block">'+
                                                        '<div class="box-block-text">'+
                                                            '<i class="iconfont icon-geren1"></i>'+
                                                            '<span class="room-users-num">'+ data.list[i].room[j].roomUsersNum+'</span>'+
                                                        '</div>'+
                                                        '<div class="box-block-text">'+
                                                            '<i class="iconfont icon-zanwushouyi"></i>'+
                                                            '<span class="room-benefit-num">'+ data.list[i].room[j].roomBenefitNum+'</span>'+
                                                        '</div>'+
                                                        '<div class="box-block-room-num">'+ data.list[i].room[j].boxBlockRoomNum+'</div>'+
                                                        '<div class="box-block-text">'+'空闲'+ data.list[i].room[j].boxBlockRoomTime +'小时'+'</div>'+
                                                    '</div>'+
                                                '</div>';

                            }
                            result +='</div>'+
                                '<div class="aui-clearfix"></div>'+
                                '</div>'+
                                '</li>';

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
                        $('#box-content').append(result);
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

