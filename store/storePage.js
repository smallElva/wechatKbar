/**
 * Created by enter on 2018/1/22.
 *
 *
 */
var store =
    {
        id: "0",
        storeImg: "../img/store/store.png",
        storeName: "...",
        storeCall: "...",
        storeAdd: "...",
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
                url: 'Data/'+ id,
                type: "GET",
                success: function (json) {
                    json = JSON.parse(json);
                    $.extend(true, store, json);
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

function openDialog(type){
    switch (type) {
        case "store_name":
            var nameVal = $('.store_name');
            dialog.prompt({
                title:"门店名称",
                text:nameVal.html(),
                type:'text',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2 && !(ret.text=="")){
                    nameVal.html(ret.text);
                }else{
                    nameVal.html(nameVal.html());
                }
            });
            break;
        case "store_call":
            var callVal = $('.store_call');
            dialog.prompt({
                title:"联系电话",
                text:callVal.html(),
                type:'tel',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2 && !(ret.text=="")){
                    callVal.html(ret.text);
                } else{
                    callVal.html(callVal.html());
                }
            });
            break;
        case "store_add":
            var addVal = $('.store_add');
            dialog.prompt({
                title:"门店地址",
                text:addVal.html(),
                type:'text',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2 && !(ret.text=="")){
                    addVal.html(ret.text);
                }else{
                    addVal.html(addVal.html());
                }
            });
            break;
        default:
            break;

    }
}
