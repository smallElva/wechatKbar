/**
 * Created by enter on 2018/1/22.
 */

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
