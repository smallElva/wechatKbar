/**
 * Created by enter on 2018/2/7.
 */

$(function(){

    //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
    var mescroll = new MeScroll("mescroll", { //id固定"body"
        //上拉加载的配置项
        up: {
            page:{size:3},//每次加载1条数据,模拟loadFull
            loadFull: {
                use: true, //列表数据过少,是否自动加载下一页,直到满屏或者无更多数据为止;默认false
                delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
            },
            callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
            empty: {
                icon: "../../img/nodata.png", //图标,默认null
                tip: "暂无相关数据~" //提示
            },
            clearEmptyId: "box-content", //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
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
        var listDom=document.getElementById("box-content");
        var result = '';
        for (var i = 0; i < curPageData.length; i++) {
            var list=curPageData[i];
            result += '<li class="box-list-item-inner">'+
                '<div class="box-list-item-header">'+
                '<div class="box-list-header">'+
                '<div class="box-list-store aui-pull-left">'+
                '<i class="aui-iconfont aui-icon-location"></i>'+
                '<span class="order-store-name">'+ list.orderStoreName +'</span>'+
                '</div>'+
                '<div class="box-list-benefit aui-pull-right">'+
                '<div class="box-list-benefit-p">'+
                '<i class="iconfont icon-geren1"></i>'+
                '<span>'+'累计用户：'+'</span>'+
                '<span class="box-list-benefit-users">'+ list.boxListUsers +'</span>'+
                '</div>'+
                '<div class="box-list-benefit-p">'+
                '<i class="iconfont icon-zanwushouyi"></i>'+
                '<span>'+'累计收益：'+'</span>'+
                '<span class="box-list-benefit-benefits">'+ list.boxListBenefits +'</span>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="box-list-state aui-clearfix">'+
                '<span class="box-state-no-use">'+'空闲中：'+'<span class="box-state-no-use-num">'+list.boxStateNoUseNum +'</span>'+'</span>'+
                '<span class="box-state-use">'+'消费中：'+'<span class="box-state-use-num">'+list.boxStateUseNum +'</span>'+'</span>'+
                // '<span class="box-state-fix">'+'维修中：'+'<span class="box-state-fix-num">'+list.boxStateFixNum +'</span>'+'</span>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="box-house-block">'+
                '<div class="aui-content-padded">'+
                '<div class="aui-row-padded">';

            var roomLen = list.room.length;
            for(var j=0; j<roomLen; j++){
                result += '<div class="aui-col-xs-4">'+
                    '<div class="box-block">'+
                    '<div class="box-block-text">'+
                    '<i class="iconfont icon-geren1"></i>'+
                    '<span class="room-users-num">'+ list.room[j].roomUsersNum+'</span>'+
                    '</div>'+
                    '<div class="box-block-text">'+
                    '<i class="iconfont icon-zanwushouyi"></i>'+
                    '<span class="room-benefit-num">'+ list.room[j].roomBenefitNum+'</span>'+
                    '</div>'+
                    '<div class="box-block-room-num">'+ list.room[j].boxBlockRoomNum+'</div>'+
                    '<div class="box-block-text">'+'空闲'+ list.room[j].boxBlockRoomTime +'小时'+'</div>'+
                    '</div>'+
                    '</div>';

            }
            result +='</div>'+
                '<div class="aui-clearfix"></div>'+
                '</div>'+
                '</li>';
        }
        listDom.innerHTML +=result;
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
                url: 'box.json',
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

