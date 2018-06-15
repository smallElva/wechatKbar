/**
 * Created by enter on 2018/3/20.
 */
$(function () {

    window.addEventListener("resize", function () {
        myChartLine.resize();
    });
    /***
     * 点击全部门店筛选
     */
    $("#showStore").click(function () {
        $('#store-top').toggleClass('toggleShow');
        $("#showStore").find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
    });
    //点击门店选择栏里的任何一个选项，切换选项值，并刷新页面
    $('#store-top .aui-list-item').click(function () {
        var storeName = $(this).find('.bill-store-name').text();
        $('#showStore .order-store-name').html(storeName);
        var store = parseInt($(this).find('.bill-store-name').attr('data-store'));
        $("#showStore").find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
        setAjaxChart(store);
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
    /**
     * 时间选择部分.
     */
    $("#report-choose").click(function () {
        $('#time-div.time-block').toggleClass('toggleShow');
    });
    //点击门店选择栏里的任何一个选项，切换选项值，并刷新页面
    $('#time-div .time-item').click(function () {
        var time = $(this).text();
        $('#report-choose .choose-time').html(time);
        $('#time-div.time-block').toggleClass('toggleShow');
        var dataTime = parseInt($(this).attr('aui'));
    });
    // 点击页面除了id="showStore"之外的任何区域都关闭该div
    $(document).on('click', function(e) {
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id == 'report-choose') {
                return;
            }
            elem = elem.parentNode;
        }
        $('#time-div').removeClass('toggleShow'); //关闭该div
    });
    /**
     * 折线图部分.
     */
    var myChartLine = echarts.init(document.getElementById('main-line'),'light');
// 显示标题，图例和空的坐标轴
    var option={
        tooltip : {
            trigger: 'axis'
        },
//        legend: {
//
//        },
        grid: {
            top:'1%',
            left: '0',
            right: '5%',
            bottom: '20%',
            containLabel: true
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                splitNumber: 6,
                boundaryGap : false,
                axisLabel: {
                    show: true,    //这行代码控制着坐标轴x轴的文字是否显示
                    textStyle: {
                        color: '#818181'  //x轴上的字体颜色
                    }
                },
                splitLine: {
                    show: false   // 网格线是否显示
                },
                axisLine:{
                    lineStyle:{
                        color:'#ccc', // x坐标轴的轴线颜色
                        width:2      //这里是坐标轴的宽度,可以去掉
                    }
                },
                axisTick: {
                    show: false
                },
                data : ['03/01','03/02','03/03','03/04','03/05','03/06','03/07','03/08','03/09','03/10','03/11','03/12','03/13','03/14','03/15','03/16','03/17','03/18','03/19','03/20','03/21','03/22','03/23','03/24','03/25','03/26','03/27','03/28','03/28','03/29','03/30']
            }
        ],
        yAxis : [
            {
                type: 'value',
                offset: '-5',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#818181'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#f2f2f2'   // 修改网格线颜色
                    }
                }
            }
        ]
//            series : [
//            {
//                name:'',
//                type:'line',
//                stack: '总量',
//                data:[]
//            },
//            {
//                name:'',
//                type:'line',
//                stack: '总量',
//                data:[]
//            },
//            {
//                name:'',
//                type:'line',
//                stack: '总量',
//                data:[]
//            },
//            {
//                name:'',
//                type:'line',
//                stack: '总量',
//                data:[]
//            },
//            {
//                name:'',
//                type:'line',
//                stack: '总量',
//                data:[]
//            }
//        ]
    };

    myChartLine.showLoading();    //显示加载动画
    setAjaxChart(1);
    function setAjaxChart(store) {
        myChartLine.showLoading();    //数据加载完之前先显示一段简单的loading动画
        var equipNames=[];    //设备名数组
        var legends = {};
        var legend = {};
        $.ajax({
            type : "GET",
            url : 'Data/day'+store+'.json',    //请求数据接口
            // data : {},
            dataType : "json",        //返回数据形式为json
            success : function(result) {
                //请求成功时执行该函数内容，result即为服务器返回的json对象
                if (result) {
                    var l = result.list[0].equipList.length;
                    var seriesArr = [];
                    for(var i=0;i<l;i++){
                        equipNames.push(result.list[0].equipList[i].equip_name);
                        //挨个取出类别并填入类别数组
                        var series = {};
                        series["data"] = result.list[0].equipList[i].equip_value;
                        series["name"] = result.list[0].equipList[i].equip_name;
                        series["type"] = 'line';
                        series["stack"] = '总量';
                        series["symbol"] = 'none';
                        seriesArr.push(series);
                    }
                    option["series"] = seriesArr;
                    legends["data"]=equipNames;
                    legends["bottom"]=0;
                    legends["itemGap"]=30;
                    option["legend"]=legends;
                    myChartLine.hideLoading();    //隐藏加载动画
                    myChartLine.setOption(option,true);
                }
            },
            error : function(errorMsg) {
                //请求失败时执行该函数
                alert("图表请求数据失败!");
                myChartLine.hideLoading();
            }
        })
    }
});

