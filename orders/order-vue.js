
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
            $('#showStore .order-store-name').html(storeName);
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
                    console.dir(orderm.orders);
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
                    console.dir(orderm.orders);
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

