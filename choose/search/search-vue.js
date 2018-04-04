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
                //page:{size:8}, //可配置每页8条数据,默认10
                toTop:{ //配置回到顶部按钮
                    html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                    offset : 200
                },
                empty:{ //配置列表无任何数据的提示
                    warpId:"search-result",
                    icon: "../../img/nodata.png", //图标,默认null
                    tip: "亲,暂无相关数据~" //提示
                },
                //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
                //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
//						clearId: "dataList",
//						clearEmptyId: "dataList"
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
            getListDataFromNet(curWord, page.num, page.size, function(curPageData) {
                //curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

                //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
                if(page.num == 1) self.songlist = [];

                //更新列表数据
                self.songlist = self.songlist.concat(curPageData);

                //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
                console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.songlist.length==" + self.songlist.length);

                //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                //self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

                //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                //self.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

                //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                //self.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

                //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
                self.mescroll.endSuccess(curPageData.length);

            }, function() {
                //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                self.mescroll.endErr();
            });
        },
        choose: function (obj) {
            obj.hasChoose = true; //点击选歌将数据的选择状态改变
        },
        getSingerSongInfo: function(id) {
            window.location.href = "./singerPage.html?id=" + id;
        }
    }
});



/*联网加载列表数据
 请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
 实际项目以您服务器接口返回的数据为准,无需本地处理分页.
 * */
function getListDataFromNet(curWord, pageNum,pageSize,successCallback,errorCallback) {
    //延时一秒,模拟联网
    setTimeout(function () {
//          	axios.get("xxxxxx", {
//					params: {
//						num: pageNum, //页码
//						size: pageSize //每页长度
//					}
//				})
//				.then(function(response) {
        var data=pdlist1.songlist; // 模拟数据: ../res/pdlist1.js
        var datas=[];
        for (var i = 0; i < data.length; i++) {
            if (data[i].songName.indexOf(curWord)!=-1) {
                datas.push(data[i]);
            }

        }
        //模拟服务器接口的分页
        var listData=[];
        for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
            if(i==datas.length) break;
            listData.push(datas[i]);
        }
        successCallback&&successCallback(listData);//成功回调
//				})
//				.catch(function(error) {
//					errorCallback&&errorCallback()//失败回调
//				});
    },500)
}

//当前关键词
var curWord=null;
//搜索按钮
/*移动端按下软键盘搜索按钮触发搜索事件*/
$("#search-input").on('keypress',function(e) {
    var keycode = e.keyCode;
    if(keycode=='13') {
        e.preventDefault();
        searchSongs();
    }
});
/*点击搜索符号触发搜索事件*/
$(".aui-searchbar .icon-sousuo").click(function(){
    searchSongs();
});
/*搜索歌曲方法*/
function searchSongs() {
    var keyword= $("#search-input").val();
    if(keyword){
        // setHeightKeyWord('searchScroll', keyword, '#ff2600', false);
        curWord=keyword; //更新关键词
        vm.mescroll.resetUpScroll(); //重新搜索,重置列表数据
    }
}