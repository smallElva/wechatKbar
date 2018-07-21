/**
 * Created by enter on 2018/1/22.
 *
 *
 */
var store =
    {
        id: "0",
        picture: "../img/store/store.png",
        storeName: "...",
        storePhone: "...",
        address: "...",
        storePage_a: ""
    };
new Vue({
    el: '#store_page_app',
    data: store,
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            var href = location.href;
            var id = href.split('id=')[1];
            $.ajax({
                type: 'post',
                url: "http://192.168.1.121:8082/store/getStoreList",
                contentType: 'application/json',
                data:JSON.stringify({"id": id}),
                dataType: "json",
                success: function (result) {
                    var lists = JSON.parse(result.data);
                    for (var i = 0; i < lists.list.length; i++) {
                        $.extend(true, store, lists.list[0]);
                    }
                }
            });
        },
        openBoxInfo:function (e, id) {
            window.location.href = "../box/box_page.html?id=" + id;
        }
    }
});


/** 初始化API
 *
 */
apiready = function () {
    api.parseTapmode();
};
var dialog = new auiDialog();
var nameVal = $('.store_name');
var callVal = $('.store_call');
var addVal = $('.store_add');
var href = location.href;
var id = href.split('id=')[1];
function openDialog(type){
    switch (type) {
        case "store_name":
            dialog.prompt({
                title:"门店名称",
                text:nameVal.html(),
                type:'text',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2 && !(ret.text=="")){
                    $.ajax({
                        type: 'post',
                        url: "http://192.168.1.121:8082/store/updateStoreById",
                        contentType: 'application/json',
                        data:JSON.stringify({"id": id,"name": ret.text}),
                        dataType: "json",
                        success: function (result) {
                            nameVal.html(ret.text);
                        }
                    });
                }else{
                    nameVal.html(nameVal.html());
                }
            });
            break;
        case "store_call":
            dialog.prompt({
                title:"联系电话",
                text:callVal.html(),
                type:'tel',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2 && !(ret.text=="")){
                    $.ajax({
                        type: 'post',
                        url: "http://192.168.1.121:8082/store/updateStoreById",
                        contentType: 'application/json',
                        data:JSON.stringify({"id": id,"phone": ret.text}),
                        dataType: "json",
                        success: function (result) {
                            callVal.html(ret.text);
                        }
                    });
                } else{
                    callVal.html(callVal.html());
                }
            });
            break;
        case "store_add":
            dialog.prompt({
                title:"门店地址",
                text:addVal.html(),
                type:'text',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2 && !(ret.text=="")){
                    $.ajax({
                        type: 'post',
                        url: "http://192.168.1.121:8082/store/updateStoreById",
                        contentType: 'application/json',
                        data:JSON.stringify({"id": id,"address": ret.text}),
                        dataType: "json",
                        success: function (result) {
                            addVal.html(ret.text);
                        }
                    });
                }else{
                    addVal.html(addVal.html());
                }
            });
            break;
        default:
            break;

    }
}

