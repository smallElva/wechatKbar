
/**
 * Created by enter on 2018/1/18.
 */

var orderm=new Vue({
    el: '#order-app',
    data: {
        stores: [],
        orders: []
    },
    mounted: function () {
        this.showData();
        this.showStoreData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            $.ajax({
                url: 'http://192.168.1.121:8082/order/getDetailList',
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                data:JSON.stringify({"pageNum": 1,"pageSize": 12}),
                success: function (json) {
                    var lists = JSON.parse(json.data);
                    for (var i = 0; i < lists.list.length; i++) {
                        orderm.orders.push(lists.list[i]);
                    }
                }
            });
        },
        showStore: function (e) {
            var storeName = e.target.innerHTML;
            $('#showStore .order-store-name').html(storeName);
            // 获取门店名，调用发送接口
            var store = parseInt(e.target.getAttribute('aui'));
            $("#showStore").find('.iconfont').toggleClass('icon-xiangxia icon-xiangshang');
            $.ajax({
                url: 'http://192.168.1.121:8082/order/getDetailList',
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                data:JSON.stringify({"storeId": store,"pageNum": 1,"pageSize": 12}),
                success: function (json) {
                    var lists = JSON.parse(json.data);
                    console.dir(this.orders);
                    for (var i = 0; i < lists.list.length; i++) {
                        this.orders.push(lists.list[i]);
                    }
                }
            });
        },
        showStoreData: function () {
            $.ajax({
                type: 'post',
                url: "http://192.168.1.121:8082/store/getStoreList",
                contentType: 'application/json',
                data:JSON.stringify({"ownerId": 1,"pageNum": 1,"pageSize": 12}),
                dataType: "json",
                success: function (result) {
                    var lists = JSON.parse(result.data);
                    for (var i = 0; i < lists.list.length; i++) {
                        orderm.stores.push(lists.list[i]);
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

