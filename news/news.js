/**
 * Created by enter on 2018/1/20.
 */
$(function(){
    // 发送请求,渲染页面
    $.ajax({
        type:'GET',
        url:'Data/news',
        dataType: "json",
        success: function (result) {
            renderTpl(result);
        },
        error: function (xhr) {
            console.log(xhr)
            // alert('加载失败，请检查网络后重试');
        }
    });
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
                url: 'Data/news',
                dataType: 'json',
                success: function(data){
                    var arrLen = data.list.length;
                    if(arrLen > 0){
                        for(var i=0; i<arrLen; i++){
                            result +=   '<li class="aui-list-item aui-list-item-arrow">' +
                                '<div class="aui-media-list-item-inner">'+
                                '<i class="iconfont icon-iconfontzhizuobiaozhun023147 aui-text-warning"></i>'+
                                '<div class="aui-list-item-inner">'+
                                '<a href='+ data.list[i].newsHrefPage +'>'+
                                '<div class="aui-list-item-text">'+
                                '<div class="aui-list-item-title index-info-title">'+ data.list[i].newsTitle +'</div>'+
                                '<div class="aui-list-item-right">'+ data.list[i].newsTime +'</div>'+
                                '</div>'+
                                '</a>'+
                                '<div class="aui-list-item-text aui-ellipsis-2 index-info-text">'+ data.list[i].newsText +'</div>'+
                                '</div>'+
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
                        $('#newsContent').append(result);
                        // 每次数据插入，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    // alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });
});


/** 渲染模板 */
function renderTpl(newsList) {
    // 模板
    var tpl = '{{#list}}<li class="aui-list-item aui-list-item-arrow">\n'+
        '<div class="aui-media-list-item-inner">\n'+
            '<i class="iconfont icon-iconfontzhizuobiaozhun023147 aui-text-warning"></i>\n'+
                '<div class="aui-list-item-inner">\n'+
                    '<a href="{{newsHrefPage}}">\n'+
                        '<div class="aui-list-item-text">\n'+
                            '<div class="aui-list-item-title index-info-title">{{newsTitle}}</div>\n'+
                            '<div class="aui-list-item-right">{{newsTime}}</div>\n'+
                        '</div>\n'+
                    '</a>\n'+
                    '<div class="aui-list-item-text aui-ellipsis-2 index-info-text">{{newsText}} </div>\n'+
                '</div>\n'+

        '</div>\n'+
    '</li>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, newsList);
    // 插入dom
    $('#newsContent').html(dom);
}