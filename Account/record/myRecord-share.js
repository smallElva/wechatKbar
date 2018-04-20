/**
 * Created by enter on 2018/3/29.
 */
var record =
    {
        id: "",
        songName: "...",
        playRecord: "...",
        thumbs: "...",
        score: "...",
        path: ""
    };
var recordm = new Vue({
    el: '#myRecord-page-app',
    data: record,
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            var href = location.href;
            var id = href.split('id=')[1];
            $.ajax({
                url: 'http://yangleo.ittun.com/recSong/getMySound',
                type: "GET",
                data:{id:id},
                success: function (json) {
                    // alert(json.data.id);
                    $.extend(true, record, json.data);
                    // $.each(json,function(idx,val) {
                    //     //根据id获取详情数据
                    //     if (id == val.id) {
                    //         $.extend(true, record, val);
                    //     }
                    // })
                }
            });
        }
    }
});

$(function () {

    //点赞方法
    $('#thumbsUp').one("click",function(){
        var thumbsNum = parseInt($('.like-num').text());
        $('#thumbsUp').find('.iconfont').removeClass('icon-zan').addClass('icon-zan-anxia');
        $('.like-num').html(thumbsNum+1);
    });


});
