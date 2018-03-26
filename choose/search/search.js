/**
 * Created by enter on 2018/1/26.
 */
$(function(){

    //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,重置列表数据;
    var mescroll = new MeScroll("searchScroll", {
        down:{
            auto:false //是否在初始化完毕之后自动执行下拉回调callback; 默认true; (注: down的callback默认调用 mescroll.resetUpScroll(); )
//					callback: function(mescroll) {
//						mescroll.resetUpScroll(); //下拉刷新的回调,默认重置上拉加载列表为第一页
//					},
        },
        up: {
            callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
            clearEmptyId: "search-result", //1.下拉刷新时会自动先清空此列表,再加入数据; 2.无任何数据时会在此列表自动提示空
            isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
            noMoreSize: 6, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
            empty: {
                //列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
                //warpId:null, //父布局的id; 如果此项有值,将不使用clearEmptyId的值;
                warpId:'searchScroll',
                icon: "../../img/nodata.png", //图标,默认null
                tip: "亲,请在输入框中输入歌曲或歌星~", //提示
            },
            toTop:{ //配置回到顶部按钮
                html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                offset : 200
            }
        }
    });

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
            mescroll.resetUpScroll(); //重新搜索,重置列表数据
        }
    }

    /*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function getListData(page){
        //联网加载数据
        getListDataFromNet(curWord, page.num, page.size, function(curPageData){
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            console.log("curWord="+curWord+", page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length);

            //方法一(推荐): 后台接口有返回列表的总页数 totalPage
            //mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

            //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
            //mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

            //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
            //mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

            //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
            mescroll.endSuccess(curPageData.length);

            //设置列表数据,因为配置了emptyClearId,第一页会清空dataList的数据,所以setListData应该写在最后;
            setListData(curPageData);
        }, function(){
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
        });
    }

    /*设置列表数据*/
    function setListData(curPageData){
        var listDom=document.getElementById("search-result");
        var result ='';
        for (var i = 0; i < curPageData.length; i++) {
            var pd=curPageData[i];
            result +='<li class="aui-list-item aui-list-item-middle">'+
            '<a class="aui-media-list-item-inner" href="'+pd.pdHref+'">'+
            '<div class="aui-list-item-inner aui-list-item-arrow">'+
            '<div class="aui-list-item-title singerName">'+pd.pdName+'</div>'+
            '</div>'+
            '</a>'+
            '</li>';
            for(var j = 0;j < pd.song.length; j++){
                var songs = pd.song[j];
                result +='<li class="aui-list-item aui-list-item-middle" onclick="chooseThis(this)">'+
                '<div class="aui-media-list-item-inner">'+
                '<div class="aui-list-item-inner">'+
                '<div class="aui-list-item-text">'+
                '<div class="aui-list-item-title list-song-info">'+
                '<div class="songName aui-ellipsis-1">'+ songs.songName +'</div>'+
                '<div class="perSingerName"> '+songs.singerName +'</div>'+
                '</div>'+
                '<div class="aui-list-item-right">'+
                    '<i class="iconfont icon-maikefeng select-song-icon"></i>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</li>';
            }
        }
        listDom.innerHTML= result;
    }

    /*联网加载列表数据
     在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
     请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
     实际项目以您服务器接口返回的数据为准,无需本地处理分页.
     * */
    function getListDataFromNet(curWord, pageNum,pageSize,successCallback,errorCallback) {
        //延时一秒,模拟联网
        setTimeout(function () {
            $.ajax({
                type: 'GET',
                url: 'search.json',
//		                url: '../res/pdlist1.json?num='+pageNum+"&size="+pageSize+"&word="+curWord,
                dataType: 'json',
                success: function(dataAll){
                    //模拟服务器接口的搜索
                    var data=[];
                    for (var i = 0; i < dataAll.length; i++) {
                        if (dataAll[i].pdName.indexOf(curWord)!=-1) {
                            data.push(dataAll[i]);
                        }

                    }
                    //模拟服务器接口的分页
                    var listData=[];
                    for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                        if(i==data.length) break;
                        listData.push(data[i]);
                    }

                    successCallback(listData);
                    setHeightKeyWord('searchScroll', curWord, '#ff2600', false);
                },
                error: errorCallback
            });
        },500)
    }

});

//将搜索结果中的关键字标红方法
function setHeightKeyWord(id, keyword, color, bold) {
    if (keyword == "")
        return;
    var tempHTML = $("#" + id).html();
    var htmlReg = new RegExp("\<.*?\>", "i");
    var arrA = new Array();
    for (var i = 0; true; i++) {
        var m = htmlReg.exec(tempHTML);
        if (m) {
            arrA[i] = m;
        }
        else {
            break;
        }
        tempHTML = tempHTML.replace(m, "[[[[" + i + "]]]]");
    }
    var replaceText;
    if (bold)
        replaceText = "<b style='color:" + color + ";'>$1</b>";
    else
        replaceText = "<font style='color:" + color + ";'>$1</font>";
    var arrayWord = keyword.split(',');
    for (var w = 0; w < arrayWord.length; w++) {
        var r = new RegExp("(" + arrayWord[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig");
        tempHTML = tempHTML.replace(r, replaceText);
    }
    for (var i = 0; i < arrA.length; i++) {
        tempHTML = tempHTML.replace("[[[[" + i + "]]]]", arrA[i]);
    }
    $("#" + id).html(tempHTML);
}

apiready = function(){
    api.parseTapmode();
};

/**
 * 点歌操作
 */
function chooseThis(obj) {
    $(obj).find('.select-song-icon').removeClass('icon-maikefeng').addClass('icon-maikefeng-dianji red-icon');
}