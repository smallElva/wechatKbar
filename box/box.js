/**
 * Created by enter on 2018/3/16.
 */
var vmm=new Vue({
    el: "#box-app",
    data: {
        datas: []
    },
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            $.ajax({
                type: 'post',
                url: "http://192.168.1.121:8082/devices/getAllBoxState/33",
                dataType: "json",
                success: function (data) {
                    var lists = JSON.parse(data.data);
                    for (var i = 0; i < lists.length; i++) {
                        vmm.datas.push(lists[i]);
                    }
                }
            });

        },
        openBoxInfo:function (e, id) {
            window.location.href = "./box_page.html?id=" + id;
        }
    }
});
