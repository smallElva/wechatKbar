/**
 * Created by enter on 2018/5/22.
 */
$(function () {
    /*移动端按下软键盘搜索按钮触发搜索事件*/
    $("#search-input").on('keypress',function(e) {
        var keycode = e.keyCode;
        if(keycode=='13') {
            e.preventDefault();
            searchSongs();
        }
    });
    /*点击搜索符号触发搜索事件*/
    $(".aui-searchbar .icon-sousuo").click(function(){
        searchSongs();
    });
    /*搜索歌曲方法*/
    function searchSongs() {
        var keyword= $("#search-input").val();
        if(keyword) {
            //重置列表数据
            curWord=keyword; //更新关键词
            vm.mescroll.resetUpScroll();
        }
    }


    //拿到存储在sessionStorage中的设备号
    if (typeof(Storage) !== "undefined") {
        var deviceId =sessionStorage.getItem("deviceId");
    }
    else{
        deviceId=sessionStorage.getItem('deviceId');
    }

    var websocket = null;
//判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://118.190.204.56:8081/webSocketServer?serialNo=123456");
        // websocket = new WebSocket("ws://118.190.204.56:8081/webSocketServer?serialNo=" +deviceId);
    }
    else {
        alert('当前浏览器 Not support websocket')
    }
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
        websocket.close();
    };
    websocket.onmessage = function(msg) {
        var msgChange = msg.data;
        var pointStr = $.parseJSON(msgChange);
        $('#haveSongNum').text(pointStr.point_count);
        if (msgChange.indexOf('kban_change')!=-1){
            window.location.reload(true);
        }
    };

});