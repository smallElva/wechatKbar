/**
 * Created by enter on 2018/3/20.
 */

var orderm=new Vue({
    el: '#bill-app',
    data: {
        stores: [],
        orders: []
    },
    mounted: function () {
        this.showData();
        this.showChargeData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            $.ajax({
                url: 'order.json',
                type: "GET",
                success: function (json) {
                    var lists = json.orderList;
                    for (var i = 0; i < lists.length; i++) {
                        orderm.stores.push(lists[i]);
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
                url: 'Data/store/store'+ store,
                type: "GET",
                // data:{shop:store},
                success: function (json) {
                    orderm.orders=[];
                    json = JSON.parse(json);
                    var lists = json.list;
                    for (var i = 0; i < lists.length; i++) {
                        orderm.orders.push(lists[i]);
                    }
                }
            });
        },
        showChargeData: function () {
            $.ajax({
                url: 'order.json',
                type: "GET",
                success: function (json) {
                    var lists = json.orderList;
                    for (var i = 0; i < lists.length; i++) {
                        var orderesList = lists[i].list;
                        for(var j=0; j<orderesList.length; j++){
                            orderm.orders.push(orderesList[j]);
                        }
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
