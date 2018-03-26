/**
 * Created by enter on 2018/3/6.
 */
/**
 * Created by enter on 2018/1/11.
 */
$(function(){
    /***
     * 点击全部门店筛选
     */
    $("#showStore").click(function () {
        $('#top').toggleClass('toggleShow');
        $(this).find('.aui-iconfont').toggleClass('aui-icon-down aui-icon-top');
    });
    //点击门店选择栏里的任何一个选项，切换选项值，并刷新页面
    $('#top .aui-list-item').click(function () {
        var storeName = $(this).find('.bill-store-name').text();
        $('#showStore .select-block-store').html(storeName);
        // 获取门店名，调用发送接口
        var store = parseInt($(this).find('.bill-store-name').attr('data-store'));
        getBillByStore(store);
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
        $('#top').removeClass('toggleShow'); //关闭该div
    });
    loadThis('Data/billTotal');

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

/** 获取门店分类的接口;接口数据我是文件模拟的，/Data/charge/目录下是模拟数据
 *  参数 store: 0 ==> store1
 *              1 ==> store2
 *              2 ==> store3
 * */
function getBillByStore(store) {
    // 根据性别决定接口数据
    var url = '';
    if (store == 0) {
        url = 'Data/bill1';
    } else if (store == 1) {
        url = 'Data/bill2';
    } else if (store == 2) {
        url = 'Data/bill3';
    } else {
        return
    }
    loadThis(url);
}
/** 渲染模板 */
function renderTpl(billList) {
    // 模板
    var tpl = '{{#bill}}<div class="aui-content bill-nav-content aui-margin-b-15" id="bill-bar">\n' +
        '<div class="aui-row">\n'+
        '<div class="aui-col-xs-4">\n'+
        '<div class="bill-benefit-block bill-benefit-total">\n'+
        '<p class="bill-total-money">¥{{billTotalMoney}}</p>\n'+
        '<p class="bill-total-text">累计收益<i class="aui-iconfont aui-icon-question"></i></p>\n'+
        '</div>\n'+
        '</div>\n'+
        '<div class="aui-col-xs-4">\n'+
        '<div class="bill-benefit-block bill-benefit-already">\n'+
        '<p class="bill-total-money">¥{{billCalcMoney}}</p>\n'+
        '<p class="bill-total-text">已结算<i class="aui-iconfont aui-icon-question"></i></p>\n'+
        '</div>\n'+
        '</div>\n'+
        '<div class="aui-col-xs-4">\n'+
        '<div class="bill-benefit-block">\n'+
        '<p class="bill-total-money">¥{{billNoCalcMoney}}</p>\n'+
        '<p class="bill-total-text">待结算<i class="aui-iconfont aui-icon-question"></i></p>\n'+
        '</div>\n'+
        '</div>\n'+
        '</div>\n'+
        '</div>{{/bill}}';
    // 调用mustache生成dom
    var dom = Mustache.render(tpl, billList);
    // 插入dom
    $('#bill-content').html(dom);
}

function loadThis(url) {
    //页数
    var page = 0;
// 每页展示5个
    var size = 5;
// dropload
    $('.content').dropload({
        scrollArea: window,
        loadDownFn: function (me) {
            page++;
            // 拼接HTML
            var result = '';
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                success: function (data) {
                    // renderTpl(data);
                    result += '<div class="aui-content">' +
                        '<ul class="aui-list aui-list-in bill-list">';
                    var arrLen = data.bill[0].series.length;
                    if (arrLen > 0) {
                        for (var i = 0; i < arrLen; i++) {
                            result += '<li class="aui-list-item">' +
                                '<div class="aui-list-item-inner aui-list-item-arrow">' +
                                '<div class="bill-list-item-title">' +
                                '<div class="bill-list-item-text aui-clearfix">' +
                                '<span class="bill-equip-name">' + data.bill[0].series[i].billEquipName + '</span>' +
                                '<span class="bill-equip-name aui-pull-right">' + data.bill[0].series[i].billEquipTime + '</span>' +
                                '</div>' +
                                '<div class="bill-list-item-series aui-clearfix">' +
                                '<span class="bill-series-name">畅享' + data.bill[0].series[i].billSeriesName + '分钟套餐</span>' +
                                '<span class="bill-series-money aui-pull-right">¥' + data.bill[0].series[i].billSeriesMoney + '</span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                        }
                        result += '</ul>' +
                            '</div>';
                        // 如果没有数据
                    } else {
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function () {
                        // 插入数据到页面，放到最后面
                        $('#bill-content').append(result);
                        // 每次数据插入，必须重置
                        me.resetload();
                    }, 1000);
                },
                error: function (xhr, type) {
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });
}
