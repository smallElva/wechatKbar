/**
 * Created by enter on 2018/1/23.
 */
$(function () {

    // 发送请求
    $.ajax({
        type:'GET',
        url:'../Data/myRecord',
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
    $('.content2').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            page++;
            // 拼接HTML
            var result = '';
            $.ajax({
                type: 'GET',
                url: '../Data/myRecord',
                dataType: 'json',
                success: function(data){
                        var arrLen = data.record[0].perRecord.length;
                        if (arrLen > 0) {
                            for (var i = 0; i < arrLen; i++) {
                                result += '<li class="aui-list-item aui-list-item-middle aui-margin-b-15">' +
                                    '<div class="aui-media-list-item-inner">' +
                                        '<div class="aui-list-item-media myRecord-list-item-media">' +
                                            '<img src="'+ data.record[0].perRecord[i].myRecordListImg +'" class="aui-list-img-sm myRecord-list-img">'+
                                        '</div>'+
                                        '<div class="aui-list-item-inner">'+
                                            '<div class="aui-list-item-text myRecord-list-text">'+
                                                '<div class="aui-list-item-title myRecord-song-name">'+ data.record[0].perRecord[i].myRecordSongName +'</div>'+
                                                '<div class="aui-list-item-right myRecord-share">' +
                                                    '<i class="iconfont icon-more" tapmode onclick="openSharebox()">' +
                                                    '</i>' +
                                                '</div>'+
                                            '</div>' +
                                            '<div class="aui-list-item-text">'+
                                                '<div class="aui-list-item-title myRecord-icons">'+
                                                    '<div class="myRecord-text-icons myRecord-listen-icons">'+
                                                        '<i class="iconfont icon-iconset0270">' + '</i>' +
                                                        '<span class="per-listen-num">' + data.record[0].perRecord[i].perListenNum + '</span>'+
                                                    '</div>'+
                                                    '<div class="myRecord-text-icons">' +
                                                        '<i class="iconfont icon-dianzan">' + '</i>' +
                                                        '<span class="per-like-num">' + data.record[0].perRecord[i].perLikeNum + '</span>' +
                                                    '</div>'+
                                                '</div>' +
                                                '<div class="aui-list-item-right per-myRecord-time">' +data.record[0].perRecord[i].perMyRecordTime + '</div>'+
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</li>'
                            }
                            // 如果没有数据
                        } else {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                        }
                        // 为了测试，延迟1秒加载
                        setTimeout(function () {
                            // 插入数据到页面，放到最后面
                            $('#myRecord-list').append(result);
                            // 每次数据插入，必须重置
                            me.resetload();
                        }, 1000);
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

/** 渲染模板 */
function renderTpl(recordList) {
    // 模板
    var tpl = '{{#record}}<div class="myRecord-title">\n' +
        '<div class="myRecord-img">\n'+
            '<img src="{{myRecordImg}}" class="aui-img-round">\n'+
        '</div>\n'+
        '<p class="myRecord-name">{{myRecordName}}</p>\n'+
        '<div class="myRecord-title-text">\n'+
            '<div class="myRecord-title-icons">\n'+
                '<i class="iconfont icon-iconset0270"></i><span class="listen-num">{{totalListenNum}}</span>\n'+
            '</div>\n'+
            '<div class="myRecord-title-icons">\n'+
                '<i class="iconfont icon-dianzan"></i><span class="like-num">{{totalLikeNum}}</span>\n'+
            '</div>\n'+
        '</div>\n'+
    '</div>\n'+
    '<div class="aui-content">\n'+
        '<div class="bill-benefit-block bill-benefit-total">\n'+
            '<div class="myRecord-list-header">全部录音\n'+
                '<span class="myRecord-total-num">{{myRecordTotalNum}}</span>\n'+
            '</div>\n'+
            '<ul class="aui-list aui-media-list myRecord-list" id="myRecord-list">\n'+
        '{{#perRecord}}<li class="aui-list-item aui-list-item-middle aui-margin-b-15">\n'+
        '<div class="aui-media-list-item-inner">\n'+
            '<div class="aui-list-item-media myRecord-list-item-media">\n'+
                '<img src="{{myRecordListImg}}" class="aui-list-img-sm myRecord-list-img">\n'+
            '</div>\n'+
            '<div class="aui-list-item-inner">\n'+
                '<div class="aui-list-item-text myRecord-list-text">\n'+
                    '<div class="aui-list-item-title myRecord-song-name">{{myRecordSongName}}</div>\n'+
                    '<div class="aui-list-item-right myRecord-share"><i class="iconfont icon-more" tapmode onclick="openSharebox()"></i></div>\n'+
                '</div>\n'+
                '<div class="aui-list-item-text">\n'+
                    '<div class="aui-list-item-title myRecord-icons">\n'+
                        '<div class="myRecord-text-icons myRecord-listen-icons">\n'+
                            '<i class="iconfont icon-iconset0270"></i><span class="per-listen-num">{{perListenNum}}</span>\n'+
                        '</div>\n'+
                        '<div class="myRecord-text-icons">\n'+
                            '<i class="iconfont icon-dianzan"></i><span class="per-like-num">{{perLikeNum}}</span>\n'+
                        '</div>\n'+
                    '</div>\n'+
                    '<div class="aui-list-item-right per-myRecord-time">{{perMyRecordTime}}</div>\n'+
                '</div>\n'+
            '</div>\n'+
        '</div>\n'+
    '</li>{{/perRecord}}'+
'</ul>\n'+
'</div>\n'+
'</div>{{/record}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, recordList);
    // 插入dom
    $('#myRecordContent').html(dom);
}

apiready = function(){
    api.parseTapmode();
};
var sharebox = new auiSharebox();
function openSharebox(){
    sharebox.init({
        frameBounces:true,//当前页面是否弹动，（主要针对安卓端）
        buttons:[{
            image:'',
            text:'微信好友',
            value:'wx'//可选
        },{
            image:'',
            text:'朋友圈',
            value:'wx-circle'
        },{
            image:'',
            text:'QQ好友',
            value:'qq'
        },{
            image:'',
            text:'QQ空间',
            value:'qq-qzone'
        },{
            image:'',
            text:'腾讯微博'
        },{
            image:'',
            text:'新浪微博'
        },{
            image:'',
            text:'短信'
        }],
        col:5,
        cancelTitle:'关闭'//可选,当然也可以采用下面的方式使用图标
        // cancelTitle:'<i class="aui-iconfont aui-icon-close aui-font-size-16"></i>'//可选
    },function(ret){
        console.log(ret);
    })
}