/**
 * Created by enter on 2018/3/20.
 */

var orderm=new Vue({
    el: '#bill-app',
    data: {
        stores: [],
        orders: [],
        billTotalMoney:"",
        billCalcMoney:"",
        billNoCalcMoney:""
    },
    mounted: function () {
        this.showData();
        this.showChargeData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            $.ajax({
                url: 'bills.json',
                type: "GET",
                success: function (json) {

                    for (var i = 0; i < json.length; i++) {
                        orderm.stores.push(json[i]);
                    }
                }
            });
        },
        showStore: function (e) {
            var storeName = e.target.innerHTML;
            $('#showStore .bill-store-name').html(storeName);
            // 获取门店名，调用发送接口
            var store = parseInt(e.target.getAttribute('aui'));
            $("#showStore").find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
            $.ajax({
                url: 'Data/bill'+ store,
                type: "GET",
                // data:{shop:store},
                success: function (json) {
                    orderm.orders=[];
                    json = JSON.parse(json);
                    orderm.billTotalMoney=json.billTotalMoney;
                    orderm.billCalcMoney=json.billCalcMoney;
                    orderm.billNoCalcMoney=json.billNoCalcMoney;

                    var lists = json.bill;
                    for (var i = 0; i < lists.length; i++) {
                        orderm.orders.push(lists[i]);
                    }
                },
                fail:function (msg) {
                    alert(msg);
                }
            });
        },
        showChargeData: function () {
            $.ajax({
                url: 'Data/billTotal',
                type: "GET",
                success: function (json) {
                    json = JSON.parse(json);
                    orderm.billTotalMoney=json.billTotalMoney;
                    orderm.billCalcMoney=json.billCalcMoney;
                    orderm.billNoCalcMoney=json.billNoCalcMoney;
                    var lists = json.bill;
                    for (var i = 0; i < lists.length; i++) {
                        orderm.orders.push(lists[i]);
                    }
                },
                fail:function (msg) {
                    alert(msg);
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
                    //正式版获取更亲日期参数
                    // var data={
                    //     sTime:startTime,
                    //     eTime: endTime
                    // };
                    // getData(data);
                    changeTime(endTimes,startTimes);//测试版
                    return true;
                }
            }

        }

    };
    $('#startTime').mobiscroll($.extend(opt['date'], opt['default']));
    $('#finishTime').mobiscroll($.extend(opt['date'], opt['default']));

});

//测试的选择日期刷新数据的方法
function changeTime(endTimes,startTimes) {
    $.ajax({
        url: 'Data/billTotal',
        type: "GET",
        success: function (json) {
            json = JSON.parse(json);
            orderm.billTotalMoney=json.billTotalMoney;
            orderm.billCalcMoney=json.billCalcMoney;
            orderm.billNoCalcMoney=json.billNoCalcMoney;
            var lists = json.bill;
            $.extend(true, orderm.orders, lists);
        }
    });
}
//正式版选择日期刷新数据方法
function getData(data) {
    $.ajax({
        type:"POST",
        url:"",
        data:data,
        success:function (json) {
            json = JSON.parse(json);
            orderm.billTotalMoney=json.billTotalMoney;
            orderm.billCalcMoney=json.billCalcMoney;
            orderm.billNoCalcMoney=json.billNoCalcMoney;
            var lists = json.bill;
            $.extend(true, orderm.orders, lists);
        }
    })
}

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
