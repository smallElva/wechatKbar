/**
 * Created by enter on 2018/3/29.
 */
var news =
    {
        id: 1,
        newsTitle: "...",
        newsTime: "...",
        newsText: "..."
    };
new Vue({
    el: '#news-app',
    data: news,
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            var href = location.href;
            var id = href.split('id=')[1];
            $.ajax({
                url: 'news.json',
                type: "GET",
                success: function (json) {
                    $.each(json,function(idx,val) {
                        //根据id获取详情数据
                        if (id == val.id) {
                            $.extend(true, news, val);
                        }
                    })
                }
            });
        }
    }
});