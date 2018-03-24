/**
 * Created by enter on 2018/3/20.
 */
$(function () {
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
        // getBillByStore(store);
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
     * tab切换部分.
     */
    $('#report-tab .tab-item').click(function () {
        var chartNum = $(this).attr('data-chart');
        $(this).addClass('active').siblings().removeClass('active');
        if(chartNum == 1){
            $('#main-line').show();
            $('#chart-pie').hide();
        }else{
            $('#main-line').hide();
            $('#chart-pie').show();
        }
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
                data : ['03/09','03/10','03/11','03/12','03/13','03/14','03/15']
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
    setAjaxChart();
    function setAjaxChart() {
        myChartLine.showLoading();    //数据加载完之前先显示一段简单的loading动画
        var equipNames=[];    //设备名数组
        var legends = {};
        var legend = {};
        $.ajax({
            type : "post",
            url : "Data/equip.json",    //请求数据接口
            data : {},
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
                    myChartLine.setOption(option);
                }
            },
            error : function(errorMsg) {
                //请求失败时执行该函数
                alert("图表请求数据失败!");
                myChartLine.hideLoading();
            }
        })
    }

    /**
     * 扇形图部分.
     */
    var myChartPie = echarts.init(document.getElementById('main-pie'),'light');
    var optionPie = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
//            data:['15分钟/¥20','30分钟/¥40','45分钟/¥50','60分钟/¥58','单首/¥8']
        },
        calculable : true,
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '50%',
                center: ['48%', '50%'],
//                data:[
//                    {value:335, name:'15分钟/¥20'},
//                    {value:310, name:'30分钟/¥40'},
//                    {value:234, name:'45分钟/¥50'},
//                    {value:135, name:'60分钟/¥58'},
//                    {value:1548, name:'单首/¥8'}
//                ]
            }
        ]
    };
    myChartPie.showLoading();    //显示加载动画
    setAjaxChart2();
    function setAjaxChart2() {
        myChartPie.showLoading();    //数据加载完之前先显示一段简单的loading动画
        var packages=[];
        $.ajax({
            type : "post",
            async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url : "Data/equip.json",    //请求数据接口
            data : {},
            dataType : "json",        //返回数据形式为json
            success : function(dataList) {

                //请求成功时执行该函数内容，result即为服务器返回的json对象
                if (dataList) {
                    var k = dataList.list[0].packagesList.length;
                    var dataArr = [];
                    for(var j=0;j<k;j++){
                        var dataObj = {};
                        dataObj["value"]= dataList.list[0].packagesList[j].packages_value;
                        dataObj["name"]= dataList.list[0].packagesList[j].packages_name;
                        dataArr.push(dataObj);
                        packages.push(dataList.list[0].packagesList[j].packages_name);    //挨个取出类别并填入类别数组
                    }
                    optionPie.series[0]["data"] = dataArr;
                    optionPie.legend.data = packages;
                    myChartPie.hideLoading();    //隐藏加载动画
                    myChartPie.setOption(optionPie);                }
            },
            error : function(errorMsg) {
                //请求失败时执行该函数
                alert("图表请求数据失败!");
                myChartPie.hideLoading();
            }
        })
    }
});

