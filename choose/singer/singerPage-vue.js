/**
 * Created by enter on 2018/4/2.
 */
//创建vue对象
var vm = new Vue({
    el: "#singer-page-app",
    data: {
        mescroll: null,
        songlist: [],
        singerName:"",
        singerImg:'../../img/singerImg.png'
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
                // page:{size:8}, //可配置每页8条数据,默认10
                toTop:{ //配置回到顶部按钮
                    html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                    offset : 200
                },
                empty:{ //配置列表无任何数据的提示
                    warpId:"dataList",
                    icon: "../../img/nodata.png", //图标,默认null
                    tip: "亲,暂无相关数据~" //提示
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
            var href = location.href;
            var id = href.split('id=')[1];//解析href所带参数，传入接口请求

            $.ajax({
                type: "GET",
                url: "http://192.168.1.115:8090/song/getSingerId?singerId="+id,
                data: {pageNum: page.num,pageSize: page.size},
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(curPageData) {
                    //更换歌手名
                    self.singerName = curPageData.data.content[0].singerName;
                    //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
                    if(page.num == 1) self.songlist = [];
                    //获取总页数
                    var totalPage = curPageData.data.totalPages;
                    //更新列表数据
                    self.songlist = self.songlist.concat(curPageData.data.content);
                    //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                    //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空,显示empty配置的内容;
                    //列表如果无下一页数据,则提示无更多数据,(注意noMoreSize的配置)

                    //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    //必传参数(当前页的数据个数, 总页数)
                    self.mescroll.endByPage(curPageData.data.content.length, totalPage);
                    //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                    //必传参数(当前页的数据个数, 总数据量)
                    //mescroll.endBySize(curPageData.length, totalSize);

                    //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                    //必传参数(当前页的数据个数, 是否有下一页true/false)
                    //mescroll.endSuccess(curPageData.length, hasNext);

                    //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
                    //如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
                    //如果传了hasNext,则翻到第二页即可显示无更多数据.
                    //mescroll.endSuccess(curPageData.length);

                    //设置列表数据
                    //setListData(curPageData);//自行实现 TODO

                },
                error: function(e) {
                    //联网失败的回调,隐藏下拉刷新和上拉加载的状态
                    self.mescroll.endErr();
                }
            });
        },
        choose: function (obj) {
            obj.hasChoose = true; //点击选歌将数据的选择状态改变
        }
    }
});

/**
 * 吸顶效果
 */
var navWarp=document.getElementById("navWarp");
if(vm.mescroll.os.ios){
    //ios的悬停效果,通过给navWarp添加nav-sticky样式来实现
    navWarp.classList.add("nav-sticky");
}else{
    //android和pc端悬停效果,通过监听mescroll的scroll事件,控制navContent是否为fixed定位来实现
    navWarp.style.height=navWarp.offsetHeight+"px";//固定高度占位,避免悬浮时列表抖动
    var navContent=document.getElementById("navContent");
    vm.mescroll.optUp.onScroll=function(mescroll, y, isUp){
        console.log("up --> onScroll 列表当前滚动的距离 y = " + y + ", 是否向上滑动 isUp = " + isUp);
        if(y>=navWarp.offsetTop){
            navContent.classList.add("nav-fixed");
        }else{
            navContent.classList.remove("nav-fixed");
        }
    }
}