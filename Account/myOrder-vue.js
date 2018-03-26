/**
 * Created by enter on 2018/3/23.
 */
/**
 * Created by enter on 2018/3/16.
 */
var vmm=new Vue({
    el: "#myOrder-app",
    data: {
        orders: []

    },
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            $.ajax({
                type: 'Get',
                url: "myOrder.json",
                // data:{type:type,ext:ext},
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        vmm.orders.push(data[i]);
                    }
                }
            });

        }
    }
});
