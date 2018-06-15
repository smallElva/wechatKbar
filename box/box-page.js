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
                url: 'Data/boxes/'+ id +'.json',
                type: "GET",
                success: function (json) {
                    var lists = json.list;
                    for (var i = 0; i < lists.length; i++) {
                        boxm.boxes.push(lists[i]);
                    }
                }
            });
        }
    }
});


