/**
 * Created by enter on 2018/4/2.
 */
var curWord = null;//定义搜索关键词，初始化为空
//创建vue对象
var vm = new Vue({
    el: "#songName-app",
    data: {
        mescroll: null,
        songlist: []
    },
    mounted: function() {
        //创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
        //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
        var self = this;
        self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
            up: {
                callback: self.upCallback, //上拉回调
                //以下参数可删除,不配置
                isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                page:{size:20}, //可配置每页8条数据,默认10
                noMoreSize: 10, //首页数据10条以上才显示无更多数据
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
        //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback: function(page) {
            //联网加载数据
            var self = this;
            $.ajax({
                type: "GET",
                url: "http://wechat.uniquemusic.cn/song/findAllByName",
                data: {pageNum: page.num,pageSize: page.size,songName:curWord},
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(curPageData) {
                    //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
                    if(page.num == 1) self.songlist = [];
                    //获取数据的总页数
                    var totalPage = curPageData.data.pages;
                    //更新列表数据
                    self.songlist = self.songlist.concat(curPageData.data.list);

                    //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    //必传参数(当前页的数据个数, 总页数)
                    self.mescroll.endByPage(curPageData.data.list.length, totalPage);
                },
                error: function(e) {
                    //联网失败的回调,隐藏下拉刷新和上拉加载的状态
                    self.mescroll.endErr();
                }
            });
        },
        choose: function (obj,id) {
            //拿到存储在sessionStorage中的设备号
            var deviceId =sessionStorage.getItem("deviceId");
            var websocket = new WebSocket("ws://118.190.204.56:8081/webSocketServer?serialNo=123456");
            // var websocket = new WebSocket("ws://118.190.204.56:8081/webSocketServer?serialNo=" +deviceId);
            websocket.onopen = function () {
                var songObj = {"action":"select", "value":id, "serialNo": "123456"}; //定义选歌对象
                var songJson = JSON.stringify(songObj); //定义选歌JSON
                websocket.send(songJson);
            };

            obj.sfdg=true; //点击选歌将数据的选择状态改变
        }
    }
});



// $(function () {
//     /*移动端按下软键盘搜索按钮触发搜索事件*/
//     $("#search-input").on('keypress',function(e) {
//         var keycode = e.keyCode;
//         if(keycode=='13') {
//             e.preventDefault();
//             searchSongs();
//         }
//     });
//     /*点击搜索符号触发搜索事件*/
//     $(".aui-searchbar .icon-sousuo").click(function(){
//         searchSongs();
//     });
//     /*搜索歌曲方法*/
//     function searchSongs() {
//         var keyword= $("#search-input").val();
//         if(keyword) {
//             //重置列表数据
//             curWord=keyword; //更新关键词
//             vm.mescroll.resetUpScroll();
//         }
//     }
//
// });
