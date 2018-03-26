/**
 * Created by enter on 2018/3/5.
 */
$(function(){
    /***
     * 日历选择
     */
    var currYear = (new Date()).getFullYear();
    var now = new Date();
    var currMonth = now.getMonth();
    var currDay = now.getDate();
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear, //开始年份
        endYear: currYear,//结束年份
        maxDate: new Date(currYear, currMonth, currDay),//结束日期
        onClose:function(textVale,inst) { //插件效果退出时执行 inst:表示点击的状态反馈：set/cancel

            if (inst == 'cancel') {
                opt.showNow == false;
            } else if(inst == 'set')
            {
                if (this.id == 'startTime') {
                    var startDate = textVale;
                    var endDate = $('#finishTime').val();
                } else if (this.id == 'finishTime') {
                    var endDate = textVale;
                    var startDate = $('#startTime').val();
                }
                /***
                 * 两个时间点的前后比较，结束时间不能小于开始时间
                 */
                var arrStart = startDate.split("-");
                var startTime = new Date(arrStart[0], arrStart[1], arrStart[2]);
                var startTimes = startTime.getTime();
                var arrEnd = endDate.split("-");
                var endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2]);
                var endTimes = endTime.getTime();
                if (endTimes<startTimes) {
                    showDefault('fail');
                    return false;
                }else{
                    $('#startTime').mobiscroll($.extend(opt['date'], opt['default']));
                    $('#finishTime').mobiscroll($.extend(opt['date'], opt['default']));
                    return true;
                }
            }
        }

    };
    $('#startTime').mobiscroll($.extend(opt['date'], opt['default']));
    $('#finishTime').mobiscroll($.extend(opt['date'], opt['default']));

    /*初始化菜单*/
    var pdType=0;
    var store='';
    $.ajax({
        type:'GET',
        url:'storeName.json',
        dataType: "json",
        success: function (result) {
            renderTpl(result);
            /***
             * 点击全部门店筛选
             */

            $("#showStore").click(function () {
                $('#store-top').toggleClass('toggleShow');
                $(this).find('.aui-iconfont').toggleClass('aui-icon-down aui-icon-top');
            });
            $('#store-top .aui-list-item').click(function () { //点击门店选择栏里的任何一个选项，切换选项值，并刷新页面
                var storeName = $(this).find('.bill-store-name').text();
                $('#showStore .select-block-store').html(storeName);
                // 获取门店名，调用发送接口
                store = parseInt($(this).find('.bill-store-name').attr('data-store'));
                if(pdType!=store) {
                    //更改列表条件
                    pdType=store;

                    //重置列表数据
                    mescroll.resetUpScroll();
                }
            });
        },
        error: function () {
            alert('加载失败，请检查网络后重试');
        }
    });
    //点击页面除了id="showStore"和id="showOrder"之外的任何区域都关闭该div
    $(document).on('click', function(e) {
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id == 'showStore') {
                return;
            }
            elem = elem.parentNode;
        }
        $('#store-top').removeClass('toggleShow'); //关闭该div
    });


    //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
    var mescroll = new MeScroll("mescroll", { //id固定"mescroll"
        //上拉加载的配置项
        up: {
            page:{size:1},//每次加载1条数据,模拟loadFull
            loadFull: {
                use: true, //列表数据过少,是否自动加载下一页,直到满屏或者无更多数据为止;默认false
                delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
            },
            noMoreSize: 1,
            callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
            isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
            clearEmptyId: "bill-content", //1.下拉刷新时会自动先清空此列表,再加入数据; 2.无任何数据时会在此列表自动提示空
            empty: {
                //列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
                //warpId:null, //父布局的id; 如果此项有值,将不使用clearEmptyId的值;
                icon: "../img/nodata.png", //图标,默认null
                tip: "亲,暂无消息~" //提示
            },
            toTop:{ //配置回到顶部按钮
                html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                offset : 200
            }
        }
    });


    /*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function getListData(page){
        //联网加载数据
        getListDataFromNet(pdType, page.num, page.size, function(curPageData){
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            console.log("pdType="+pdType+", page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length);

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
        var listDom=document.getElementById("bill-content");
        var result='';
        for (var i = 0; i < curPageData.length; i++) {
            var billStore=curPageData[i];
            renderList(billStore);
            for(var j = 0; j< billStore.list.length;j++){
                var billList = billStore.list[j];

                result += '<div class="aui-content">'+
                    '<ul class="aui-list aui-list-in bill-list">';
                for (var g = 0; g < billList.series.length; g++){
                    var seriesList = billList.series[g];
                    result += '<li class="aui-list-item">'+
                        '<a class="aui-list-item-inner aui-list-item-arrow" href="'+seriesList.billEquipHref+'">'+
                        '<div class="bill-list-item-title">'+
                        '<div class="bill-list-item-text aui-clearfix">'+
                        '<span class="bill-equip-name">'+ seriesList.billEquipName +'</span>'+
                        '<span class="bill-equip-name aui-pull-right">'+ seriesList.billEquipTime +'</span>'+
                        '</div>'+
                        '<div class="bill-list-item-series aui-clearfix">'+
                        '<span class="bill-series-name">畅享'+ seriesList.billSeriesName +'分钟套餐</span>'+
                        '<span class="bill-series-money aui-pull-right">¥'+ seriesList.billSeriesMoney +'</span>'+
                        '</div>'+
                        '</div>'+
                        '</a>'+
                        '</li>'
                }
                result += '</ul>'+
                    '</div>';
            }

            listDom.innerHTML +=result;
        }
    }

    /*联网加载列表数据
     在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
     请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
     实际项目以您服务器接口返回的数据为准,无需本地处理分页.
     * */
    function getListDataFromNet(pdType,pageNum,pageSize,successCallback,errorCallback) {
        //延时一秒,模拟联网
        setTimeout(function () {
            $.ajax({
                type: 'GET',
                url: 'bills.json',
//		                url: '../res/pdlist1.json?pdType='+pdType+'&num='+pageNum+'&size='+pageSize,
                dataType: 'json',
                success: function(data){
                    var listData=[];

                    //pdType==0 全部门店;
                    if(pdType==0){
                        //全部商品 (模拟分页数据)
                        for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                            if(i==data.length) break;
                            listData.push(data[i]);
                        }
                    }else if(pdType==store) {
                        //不同门店
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == store) {
                                listData.push(data[i]);
                            }
                        }

                    }
                    //回调
                    successCallback(listData);
                },
                error: errorCallback
            });
        },1000)
    }

});



/***
 * 提示框
 */
var toast = new auiToast({
});
function showDefault(type){
    switch (type) {
        case "fail":
            toast.fail({
                title:"结束时间不能小于开始时间",
                duration:1000
            });
            break;
        default:
            // statements_def
            break;
    }
}
/*全部门店列表渲染模板*/
function renderTpl(storeList) {
    // 模板
    var tpl = '{{#list}}<li class="aui-list-item">\n' +
        '<div class="aui-list-item-inner bill-store-name" data-store="{{id}}">{{storeName}}</div>\n'+
        '</li>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, storeList);
    // 插入dom
    $('#store-list').html(dom);
}
/*全部门店列表渲染模板*/
function renderList(billList) {
    // 模板
    var tpl = '{{#list}}<div class="aui-content bill-nav-content" id="navContent">\n' +
        '<div class="aui-row">\n'+
        '<div class="aui-col-xs-4">\n'+
        '<div class="bill-benefit-block bill-benefit-total">\n'+
        '<p class="bill-total-money">¥{{billTotalMoney}}</p>'+
        '<p class="bill-total-text">累计收益<i class="aui-iconfont aui-icon-question"></i></p>'+
        '</div>'+
        '</div>'+
        '<div class="aui-col-xs-4">\n'+
        '<div class="bill-benefit-block bill-benefit-already">\n'+
        '<p class="bill-total-money">¥{{billCalcMoney}}</p>'+
        '<p class="bill-total-text">已结算<i class="aui-iconfont aui-icon-question"></i></p>'+
        '</div>'+
        '</div>'+
        '<div class="aui-col-xs-4">\n'+
        '<div class="bill-benefit-block">\n'+
        '<p class="bill-total-money">¥{{billNoCalcMoney}}</p>'+
        '<p class="bill-total-text">待结算<i class="aui-iconfont aui-icon-question"></i></p>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>{{/list}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, billList);
    // 插入dom
    $('#bill-nav-content').html(dom);
}
