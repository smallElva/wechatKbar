
/**
 * Created by enter on 2018/1/18.
 */
var storeId = null;//定义搜索关键词，初始化为空
var storem = new Vue({
    el: "#charge-app",
    data: {
        mescroll: null,
        stores: [],
        charges: []
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
                page:{size:10}, //可配置每页8条数据,默认10
                noMoreSize: 5,
                toTop:{ //配置回到顶部按钮
                    html : "<i class='iconfont icon-zhiding'></i>", //标签内容,默认null; 如果同时设置了src,则优先取src
                    offset : 100
                },
                empty:{ //配置列表无任何数据的提示
                    warpId:"chargeContent",
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
                url: 'http://192.168.1.121:8082/meal/getMealFees',
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({"ownerId": 36,"storeId":storeId,pageNum: page.num,pageSize: page.size}),
                xhrFields: {
                    withCredentials: true
                },
                success: function(result) {
                    //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
                    if(page.num == 1) self.charges = [];
                    var curPageData = JSON.parse(result.data);
                    //获取数据的总页数
                    var totalPage = curPageData.pages;
                    //更新列表数据
                    self.charges = self.charges.concat(curPageData.list);

                    //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    //必传参数(当前页的数据个数, 总页数)
                    self.mescroll.endByPage(curPageData.list.length, totalPage);
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
                        storem.stores.push(lists.list[i]);
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

});

// 点击不同的门店显示不同的门店的订单
function showStore(obj) {
    var storeName = $(obj).find('.bill-store-name').text().trim();
    $('#showStore .charge-store-name').html(storeName);
    // 获取门店名，调用发送接口
    var store = parseInt($(obj).attr('aui'));
    $("#showStore").find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
    storeId = store;
    storem.mescroll.resetUpScroll();
}
