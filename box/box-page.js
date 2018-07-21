/**
 * Created by enter on 2018/3/19.
 */
var boxm=new Vue({
    el: '#box_page_app',
    data: {
        boxes: []
    },
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            var href = location.href;
            var id = href.split('id=')[1];
            $.ajax({
                type: "POST",
                url: 'http://192.168.1.121:8082/devices/getDevicesStateList/'+ id,
                contentType: 'application/json',
                dataType: "json",
                success: function (result) {
                    var lists = JSON.parse(result.data);
                    for (var i = 0; i < lists.length; i++) {
                        boxm.boxes.push(lists[i]);
                    }
                }
            });
        }
    }
});


