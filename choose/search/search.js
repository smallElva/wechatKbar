/**
 * Created by enter on 2018/4/3.
 */

//创建vue对象
var vm = new Vue({
    el: "#search-app",
    data: {
        mescroll: null,
        songlist: []
    },
    mounted: function() {
        //创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
        //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
        var self = this;
        self.mescroll = new MeScroll("searchScroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
            up: {
                callback: self.upCallback, //上拉回调
                //以下参数可删除,不配置
                isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                page:{size:20}, //可配置每页8条数据,默认10
                noMoreSize: 12,
                toTop:{ //配置回到顶部按钮
                    html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                    offset : 200
                },
                empty:{ //配置列表无任何数据的提示
                    warpId:"search-result",
                    icon: "../../img/nodata.png", //图标,默认null
                    tip: "亲,暂无数据~" //提示
                }
            },
            down:{
                isLock:true
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
                url: 'http://wechat.uniquemusic.cn/song/searchSongSinger',
                data: {type:type,pageNum: page.num,pageSize: page.size,searchKey:curWord},
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
            var resultStorage = sessionStorage.getItem("resultStorage");
            var deviceId = resultStorage.deviceId;
            var openId = resultStorage.openId;
            var websocket = new WebSocket("ws://192.168.1.141:8082/webSocketServer?deviceId=123456&openId=oVdmm1f0FIMOtVMwS-tkBKWf79Rx&type=wechat");
            // var websocket = new WebSocket("ws://118.190.204.56:8081/webSocketServer?deviceId="+deviceId+"&openId="+openId+"&type=wechat");
            websocket.onmessage = function(msg) {
                var deal = JSON.parse(msg.data).action;
                if(deal && deal!=''){
                    var songObj = {"deviceId":"123456","msg":id}; //定义选歌对象
                    var songJson = JSON.stringify(songObj); //定义选歌JSON
                    var songData = "msg_select_song:" + songJson;
                    websocket.send(songData);
                    obj.sfdg=true; //点击选歌将数据的选择状态改变
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){ //点击确认后跳转到购买套餐页面
                            wx.scanQRCode();
                        }
                    });
                }
            };
        },
        getSingerSongInfo: function(id) {
            window.location.href = "../singer/singerPage.html?id=" + id;
        }
    }
});


//定义一个搜索关键词，初始化为空
var curWord=null;
//定义搜索类型，type: 0表示歌曲，1表示歌手；初始化为歌曲
var type=0;
$(function () {
    /*切换歌曲歌手方法*/
    $('#tab .aui-tab-item').click(function () {
        $(this).addClass('aui-active').siblings().removeClass('aui-active');
        var uid = parseInt($(this).attr('uid'));
        type=uid; //更新搜索类型
        vm.mescroll.resetUpScroll(); //重新搜索,重置列表数据
    });
});


apiready = function(){
    api.parseTapmode();
};
/***
 * 初始化弹窗
 */
var dialog = new auiDialog();