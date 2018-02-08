/**
 * Created by enter on 2018/2/7.
 */

$(function(){
    //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
    var mescroll = new MeScroll("body", { //id固定"body"
        //上拉加载的配置项
        up: {
            callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
            noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
            empty: {
                icon: "../../img/nodata.png", //图标,默认null
                tip: "亲，还没有演唱完的歌曲哦~" //提示
            },
            clearEmptyId: "songs-result", //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
            toTop:{ //配置回到顶部按钮
                html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                offset : 200
            }
        }
    });

    /*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function getListData(page){
        //联网加载数据
        getListDataFromNet(page.num, page.size, function(curPageData){
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length);

            //方法一(推荐): 后台接口有返回列表的总页数 totalPage
            //mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

            //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
            //mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

            //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
            //mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

            //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
            mescroll.endSuccess(curPageData.length);

            //设置列表数据
            setListData(curPageData);
        }, function(){
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
        });
    }

    /*设置列表数据*/
    function setListData(curPageData){

        // renderTpl(curPageData);
        var listDom=document.getElementById("songs-result");
        for (var i = 0; i < curPageData.length; i++) {
            var list=curPageData[i];
            var str='<div class="aui-media-list-item-inner">';
            str+='<div class="aui-list-item-label-icon">';
            str+='<span class="song-list-num">'+ i +'</span>';
            str+='</div>';
            str+='<div class="aui-list-item-inner">';
            str+='<div class="aui-list-item-text">';
            str+='<div class="aui-list-item-title list-song-info">';
            str+='<div class="songName aui-ellipsis-1">'+ list.songName +'</div>';
            str+='<div class="perSingerName">'+ list.singerName +'</div>';
            str+='</div>';
            str+='<div class="aui-list-item-right">';
            str+='<a class="aui-pull-right song-btn" href="#">';
            str+='<span class="iconfont icon-shanchu"></span>';
            str+='</a>';
            str+='<a class="aui-pull-right song-btn" href="#">';
            str+='<span class="iconfont icon-zhiding1 icon-toTop"></span>';
            str+='</a>';
            str+='</div>';
            str+='</div>';
            str+='</div>';
            str+='</div>';
            var liDom=document.createElement("li");
            liDom.setAttribute('class','aui-list-item aui-list-item-middle');
            liDom.innerHTML=str;
            listDom.appendChild(liDom);
        }
    }

    /*联网加载列表数据
     在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
     请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
     实际项目以您服务器接口返回的数据为准,无需本地处理分页.
     * */
    function getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
        //延时一秒,模拟联网
        setTimeout(function () {
            $.ajax({
                type: 'GET',
                url: '../haveSang/haveSang.json',
                dataType: 'json',
                success: function(data){
                    var listData=[];
                    //全部商品 (模拟分页数据)
                    for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                        if(i==data.length) break;
                        listData.push(data[i]);
                    }
                    //回调
                    successCallback(listData);
                },
                error: errorCallback
            });
        },1000)
    }

});

/** 渲染模板 */
function renderTpl(songList) {
    // 模板
    var tpl = '{{#list}}<li class="aui-list-item aui-list-item-middle">\n' +
        '<div class="aui-media-list-item-inner">\n' +
        '<div class="aui-list-item-label-icon">\n'+
        '<span class="song-list-num">{{id}}</span>\n'+
        '</div>\n'+
        '<div class="aui-list-item-inner">\n'+
        '<div class="aui-list-item-text">\n'+
        '<div class="aui-list-item-title list-song-info">\n' +
        '<div class="songName aui-ellipsis-1">{{songName}}</div>\n' +
        '<div class="perSingerName"> {{singerName}}</div>\n'+
        '</div>\n'+
        '<div class="aui-list-item-right">\n'+
        '<a class="aui-pull-right song-btn" href="#">\n' +
        '<span class="iconfont icon-shanchu"></span>\n' +
        '</a>\n' +
        '<a class="aui-pull-right song-btn" href="{{myRecordHref}}">\n'+
        '<span class="iconfont icon-jianting2 icon-toTop"></span>\n'+
        '</a>\n'+
        '</div>\n'+
        '</div>\n'+
        '</div>\n'+
        '</div>\n'+
        '</li>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, songList);
    // 插入dom
    $('#songs-result').html(dom);
}
