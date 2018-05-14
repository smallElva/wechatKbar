/**
 * Created by enter on 2018/3/21.
 */



$(function () {
    //拿到存储在sessionStorage中的设备号
    if (typeof(Storage) !== "undefined") {
        var deviceId =sessionStorage.getItem("deviceId");
    }
    else{
        deviceId=sessionStorage.getItem('deviceId');
    }
    var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://192.168.1.116:8086/webSocketServer?serialNo=" +deviceId);
    }
    else {
        alert('当前浏览器 Not support websocket')
    }
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
        websocket.close();
    };
    websocket.onmessage = function(msg) {
        alert(msg);
        $('#haveSongNum').html(msg);
    };

});


var songsm=new Vue({
    el: '#haveSang-app',
    data: {
        mescroll: null,
        songs: []
    },
    mounted: function () {
        //创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
        //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
        var self = this;
        self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
            up: {
                callback: self.upCallback, //上拉回调
                //以下参数可删除,不配置
                isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                page:{size:10}, //可配置每页8条数据,默认10
                noMoreSize: 10,
                toTop:{ //配置回到顶部按钮
                    html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                    offset : 100
                },
                empty:{ //配置列表无任何数据的提示
                    warpId:"singer-song-result",
                    icon : "../../img/nodata.png" ,
                    tip : "亲,暂无相关数据哦~"
                }

            }

        });
    },
    methods: {
        upCallback: function(page) {
            //联网加载数据
            var self = this;
            //拿到存储在sessionStorage中的设备号
            var deviceId =sessionStorage.getItem("deviceId");
            $.ajax({
                type: "GET",
                url: "http://yangleo.ittun.com/recSong/alreadySing?serialNo=67890",
                // data:{"serialNo":deviceId},
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(curPageData) {
                    //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
                    if(page.num == 1) self.songlist = [];
                    //获取数据的总页数
                    var totalPage = curPageData.pages;
                    //更新列表数据
                    self.songs = self.songs.concat(curPageData.list);

                    //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    //必传参数(当前页的数据个数, 总页数)
                    self.mescroll.endByPage(curPageData.list.length, totalPage);
                },
                error: function(e) {
                    //联网失败的回调,隐藏下拉刷新和上拉加载的状态
                    self.mescroll.endErr();
                }
            });
        },
        getGoodsHref: function(val){
            window.location.href='../../Account/record/myRecord_page.html?id='+val
        },
        choose: function (obj) {
            //拿到存储在sessionStorage中的设备号
            var deviceId =sessionStorage.getItem("deviceId");
            var websocket = new WebSocket("ws://192.168.1.116:8086/webSocketServer?serialNo=" +deviceId);
            websocket.onopen = function () {
                var songObj = {"action":"select", "value":obj, "serialNo": "123456"}; //定义选歌对象
                var songJson = JSON.stringify(songObj); //定义选歌JSON
                websocket.send(songJson);
            };
        }
    }

});

