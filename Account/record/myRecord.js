

/**
 * Created by enter on 2018/3/16.
 */
var vmm = new Vue({
    el: "#record-content",
    data: {
        mescroll:null,
        records: []
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
                noMoreSize: 4,
                toTop:{ //配置回到顶部按钮
                    html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                    offset : 100
                },
                empty:{ //配置列表无任何数据的提示
                    warpId:"myRecord-list",
                    icon : "../../img/nodata.png" ,
                    tip : "亲,您还没有录音哦~"
                }

            }

        });
    },
    methods: {
        //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback: function (page) {
            //联网加载数据
            var self = this;
            $.ajax({
                type: 'post',
                url: "http://wechat.uniquemusic.cn/myAccount/mySoundRecording",
                data:JSON.stringify({"openId":"oVdmm1YNhZFSkuA-pZltU5Kt4BcY"}),
                contentType: 'application/json',
                dataType: "json",
                success: function (curPageData) {
                    //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
                    if (page.num == 1) self.records = [];
                    //获取数据的总页数
                    var totalPage = curPageData.data.pages;
                    //更新列表数据
                    self.records = self.records.concat(curPageData.data.list);

                    //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    //必传参数(当前页的数据个数, 总页数)
                    self.mescroll.endByPage(curPageData.data.list.length, totalPage);
                },
                error: function (e) {
                    //联网失败的回调,隐藏下拉刷新和上拉加载的状态
                    self.mescroll.endErr();
                }
            });
        },
        //点击播放录音跳转获取该首歌曲的Id
        openRecordInfo:function (e) {
            var id = e.currentTarget.getAttribute('uid');
            window.location.href = "/Account/record/myRecord_page.html?id=" + id;
        },
        //弹窗出现将点击的歌曲的id传给播放录音；将序列号传给删除录音
        showLayout:function (id,index) {
            $('#layout').show();
            $('#lay-list').slideDown(300);
            $('#playRecord').attr("uid",id);
            $('#deleteRecord').attr("uIndex",index);
        },
        closeLayout:function(){
            setTimeout(function(){
                $('#layout').hide();
            },300);
            $('#lay-list').slideUp(300);
        },
        //点击删除录音，删除该录音
        deleteRecord: function(e) {
            var index = e.currentTarget.getAttribute('uIndex');
            setTimeout(function(){
                $('#layout').hide();
            },300);
            $('#lay-list').slideUp(300);
            dialog.alert({
                msg:'是否删除该录音？',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2){
                    vmm.records.splice(index,1);
                }
            });
        }
    }
});

// var vmm=new Vue({
//     el: "#record-content",
//     data: {
//         records: []
//     },
//     mounted: function () {
//         this.showData();
//         //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
//     },
//     methods: {
//         showData: function () {
//             $.ajax({
//                 type: 'post',
//                 url: "http://yangleo.ittun.com/myAccount/mySoundRecording",
//                 data:JSON.stringify({"openId":"oVdmm1YNhZFSkuA-pZltU5Kt4BcY"}),
//                 contentType: 'application/json',
//                 dataType: "json",
//                 success: function (result) {
//                     for (var i = 0; i < result.data.list.length; i++) {
//                         vmm.records.push(result.data.list[i]);
//                     }
//                 }
//             });
//
//         },
//         //点击播放录音跳转获取该首歌曲的Id
//         openRecordInfo:function (e) {
//             var id = e.currentTarget.getAttribute('uid');
//             window.location.href = "./myRecord_page.html?id=" + id;
//         },
//         //弹窗出现将点击的歌曲的id传给播放录音；将序列号传给删除录音
//         showLayout:function (id,index) {
//             $('#layout').show();
//             $('#lay-list').slideDown(300);
//             $('#playRecord').attr("uid",id);
//             $('#deleteRecord').attr("uIndex",index);
//         },
//         closeLayout:function(){
//             setTimeout(function(){
//                 $('#layout').hide();
//             },300);
//             $('#lay-list').slideUp(300);
//         },
//         //点击删除录音，删除该录音
//         deleteRecord: function(e) {
//             var index = e.currentTarget.getAttribute('uIndex');
//             setTimeout(function(){
//                 $('#layout').hide();
//             },300);
//             $('#lay-list').slideUp(300);
//             dialog.alert({
//                 msg:'是否删除该录音？',
//                 buttons:['取消','确定']
//             },function(ret){
//                 if(ret.buttonIndex == 2){
//                   vmm.records.splice(index,1);
//             }
//           });
//         }
//     }
// });

var dialog = new auiDialog();
$(function () {
    $('#lay-list').slideUp(300);
    apiready = function () {
        api.parseTapmode();
    };

    //点击页面除了id="layout"之外的任何区域都关闭该div
    $(document).on('click', function(e) {
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id == 'lay-list') {
                return;
            }
            elem = elem.parentNode;
        }
        setTimeout(function(){
            $('#layout').hide();
        },300);
        $('#lay-list').slideUp(300);
    });

});
