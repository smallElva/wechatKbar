/**
 * Created by enter on 2018/3/20.
 */
var storeId = null;

var startTimesVal = $('#startTime').val().trim();
var finishTimesVal = $('#finishTime').val().trim();

var vm = new Vue({
    el: "#bill-app",
    data: {
        mescroll: null,
        stores: [],
        orders: [],
        billTotalMoney:"",
        billCalcMoney:"",
        billNoCalcMoney:""
    },
    mounted: function() {
        this.showStoreData();
        //创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
        //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
        var self = this;
        self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
            up: {
                callback: self.upCallback, //上拉回调
                //以下参数可删除,不配置
                isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                page:{size:20}, //可配置每页8条数据,默认10
                noMoreSize: 10,
                toTop:{ //配置回到顶部按钮
                    html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                    offset : 100
                },
                empty:{ //配置列表无任何数据的提示
                    warpId:"orderContent",
                    icon : "../img/nodata.png" ,
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
                type: 'post',
                url: "http://192.168.1.121:8082/order/getDetailList",
                dataType: "json",
                contentType: 'application/json',
                data:JSON.stringify({"ownerId": 36,"storeId": storeId,"pageNum": 1,"pageSize": 12,"startTime":startTimesVal,"endTime":finishTimesVal}),
                xhrFields: {
                    withCredentials: true
                },
                success: function(result) {
                    var curPageData = result.list.list;
                    var moneyData = result.data.data;

                    vm.billTotalMoney = moneyData.totalPrice;
                    vm.billCalcMoney = moneyData.alreadyPrice;
                    vm.billNoCalcMoney = moneyData.stayPrice;

                    //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
                    if(page.num == 1) self.orders = [];
                    //获取数据的总页数
                    var totalPage = result.list.pages;
                    //更新列表数据
                    self.orders = self.orders.concat(curPageData);

                    //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    //必传参数(当前页的数据个数, 总页数)
                    self.mescroll.endByPage(curPageData.length, totalPage);
                },
                error: function(e) {
                    //联网失败的回调,隐藏下拉刷新和上拉加载的状态
                    self.mescroll.endErr();
                }
            });
        },
        showStoreData: function () {
            $.ajax({
                type: 'post',
                url: "http://192.168.1.121:8082/store/getStoreList",
                contentType: 'application/json',
                data:JSON.stringify({"ownerId": 36}),
                dataType: "json",
                success: function (result) {
                    var lists = JSON.parse(result.data);
                    for (var i = 0; i < lists.list.length; i++) {
                        vm.stores.push(lists.list[i]);
                    }
                }
            });
        }
    }
});


$(function(){
    /***
     * 点击全部门店筛选
     */
    $("#showStore").click(function () {
        $('#store-top').toggleClass('toggleShow');
        $(this).find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
    });
    //点击页面除了id="showStore"之外的任何区域都关闭该div
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

    /***
     * 日历选择
     */
    getNowFormatDate(); //初始化结束时间为当前时间
    getBeforeDate(7);   //初始化开始时间为当前时间前七天

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
                    startTimesVal = startDate;
                    finishTimesVal = endDate;
                    vm.mescroll.resetUpScroll();
                    return true;
                }
            }

        }

    };
    $('#startTime').mobiscroll($.extend(opt['date'], opt['default']));
    $('#finishTime').mobiscroll($.extend(opt['date'], opt['default']));

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
            break;
    }
}
// 点击不同的门店显示不同的门店的订单
function showStore(obj) {
    var storeName = $(obj).find('.bill-store-name').text().trim();
    $('#showStore .bill-store-name').html(storeName);
    // 获取门店名，调用发送接口
    var store = parseInt($(obj).attr('aui'));
    $("#showStore").find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
    storeId = store;
    vm.mescroll.resetUpScroll();
}
/***
 * 获取当前时间
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
        + " ";
    $('#finishTime').val(currentdate); //结束时间的value值为当前时间
}

/***
 * 获取n天前的时间
 */
function getBeforeDate(n){
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
        if(mon>1) {
            mon=mon-1;
        }
        else {
            year = year-1;
            mon = 12;
        }
    }
    d.setDate(d.getDate()-n);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    var s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day)+" ";
    $('#startTime').val(s); //开始时间的value值为当前时间前7天
}
