/**
 * Created by enter on 2018/4/2.
 */


var vmm=new Vue({
    el: "#singer-app",
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
                type: 'GET',
                url: "http://wechat.uniquemusic.cn/singerType/list",
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    var list = result.data;
                    for (var i = 0; i < list.length; i++) {
                        vmm.datas.push(list[i]);
                    }
                }
            });

        },
        openSingerTypeInfo:function (id) {
            window.location.href = "./singerList.html?singerTypeId=" + id;
        }
    }
});
