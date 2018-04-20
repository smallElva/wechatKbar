/**
 * Created by enter on 2018/3/22.
 */
$(function () {
    $('#closeMask').click(function () {
        $('#mask').hide();
    });

    var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://192.168.1.115:8095");
    }
    else {
        alert('当前浏览器 Not support websocket')
    }
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
        websocket.close();
    };

    var scoreObj = {"action":"score", "value":0, "to": "123456"}; //定义评分对象
    var scoreJson = JSON.stringify(scoreObj); //定义评分JSON
    $('#score').click(function () {
        websocket.send(scoreJson);
    });

    var musical_note_obj = {"action":"musical_note", "value":0,"to": "123456"}; //定义乐谱对象
    var musical_note_Json = JSON.stringify(musical_note_obj);//定义乐谱JSON
    $('#musical_note').click(function () {
        websocket.send(musical_note_Json);
    });

    var jumpObj = {"action":"jump", "value":0,"to": "123456"}; //定义跳过前奏对象
    var jumpJson = JSON.stringify(jumpObj);//定义跳过前奏JSON
    $('#jump').click(function () {
        websocket.send(jumpJson);
    });

    var replayObj = {"action":"replay", "value":0,"to": "123456"}; //定义重唱对象
    var replayJson = JSON.stringify(replayObj);//定义重唱JSON
    $('#replay').click(function () {
        websocket.send(replayJson);
    });

    var vocalObj = {"action":"vocal", "value":0,"to": "123456"}; //定义原唱/伴唱对象
    var vocalJson = JSON.stringify(vocalObj);//定义原唱/伴唱JSON
    $('#vocal').click(function () {
        websocket.send(vocalJson);
    });

    var cutObj = {"action":"cut", "value":0,"to": "123456"}; //定义切歌对象
    var cutJson = JSON.stringify(cutObj);//定义切歌JSON
    $('#cut').click(function () {
        websocket.send(cutJson);
    });

    var musicMinusObj = {"action":"music_vol", "value":0,"to": "123456"}; //定义音量减对象
    var musicMinusJson = JSON.stringify(musicMinusObj);//定义音量减JSON
    $('#musicMinus').click(function () {
        websocket.send(musicMinusJson);
    });

    var musicPlusObj = {"action":"music_vol", "value":1,"to": "123456"}; //定义音量加对象
    var musicPlusJson = JSON.stringify(musicPlusObj);//定义音量加JSON
    $('#musicPlus').click(function () {
        websocket.send(musicPlusJson);
    });

    var micMinusObj = {"action":"mic_vol", "value":0,"to": "123456"}; //定义麦克风减对象
    var micMinusJson = JSON.stringify(micMinusObj);//定义麦克风减JSON
    $('#micMinus').click(function () {
        websocket.send(micMinusJson);
    });

    var micPlusObj = {"action":"mic_vol", "value":1,"to": "123456"}; //定义麦克风加对象
    var micPlusJson = JSON.stringify(micPlusObj);//定义麦克风加JSON
    $('#micPlus').click(function () {
        websocket.send(micPlusJson);
    });

    var atmosphere1Obj = {"action":"atmosphere", "value":0,"to": "123456"}; //定义气氛口哨对象
    var atmosphere1Json = JSON.stringify(atmosphere1Obj);//定义气氛口哨JSON
    $('#atmosphere1').click(function () {
        websocket.send(atmosphere1Json);
    });

    var atmosphere2Obj = {"action":"atmosphere", "value":1,"to": "123456"}; //定义气氛欢呼对象
    var atmosphere2Json = JSON.stringify(atmosphere2Obj);//定义气氛欢呼JSON
    $('#atmosphere2').click(function () {
        websocket.send(atmosphere2Json);
    });

    var atmosphere3Obj = {"action":"atmosphere", "value":2,"to": "123456"}; //定义气氛鼓掌对象
    var atmosphere3Json = JSON.stringify(atmosphere3Obj);//定义气氛鼓掌JSON
    $('#atmosphere3').click(function () {
        websocket.send(atmosphere3Json);
    });

    var atmosphere4Obj = {"action":"atmosphere", "value":3,"to": "123456"}; //定义气氛倒彩对象
    var atmosphere4Json = JSON.stringify(atmosphere4Obj);//定义气氛倒彩JSON
    $('#atmosphere4').click(function () {
        websocket.send(atmosphere4Json);
    });

    var instrument1Obj = {"action":"instrument", "value":0,"to": "123456"}; //定义乐器默认对象
    var instrument1Json = JSON.stringify(instrument1Obj);//定义乐器默认JSON
    $('#instrument1').click(function () {
        websocket.send(instrument1Json);
    });

    var instrument2Obj = {"action":"instrument", "value":1,"to": "123456"}; //定义乐器手风琴对象
    var instrument2Json = JSON.stringify(instrument2Obj);//定义乐器手风琴JSON
    $('#instrument2').click(function () {
        websocket.send(instrument2Json);
    });

    var instrument3Obj = {"action":"instrument", "value":2,"to": "123456"}; //定义乐器口琴对象
    var instrument3Json = JSON.stringify(instrument3Obj);//定义乐器口琴JSON
    $('#instrument3').click(function () {
        websocket.send(instrument3Json);
    });

    var instrument4Obj = {"action":"instrument", "value":3,"to": "123456"}; //定义乐器尼龙吉他对象
    var instrument4Json = JSON.stringify(instrument4Obj);//定义乐器尼龙吉他JSON
    $('#instrument4').click(function () {
        websocket.send(instrument4Json);
    });

    var instrument5Obj = {"action":"instrument", "value":4,"to": "123456"}; //定义乐器小号对象
    var instrument5Json = JSON.stringify(instrument5Obj);//定义乐器小号JSON
    $('#instrument5').click(function () {
        websocket.send(instrument5Json);
    });

    var instrument6Obj = {"action":"instrument", "value":5,"to": "123456"}; //定义乐器萨克斯对象
    var instrument6Json = JSON.stringify(instrument6Obj);//定义乐器萨克斯JSON
    $('#instrument6').click(function () {
        websocket.send(instrument6Json);
    });

    var instrument7Obj = {"action":"instrument", "value":6,"to": "123456"}; //定义乐器双簧管对象
    var instrument7Json = JSON.stringify(instrument7Obj);//定义乐器双簧管JSON
    $('#instrument7').click(function () {
        websocket.send(instrument7Json);
    });

    var instrument8Obj = {"action":"instrument", "value":7,"to": "123456"}; //定义乐器单簧管对象
    var instrument8Json = JSON.stringify(instrument8Obj);//定义乐器单簧管JSON
    $('#instrument8').click(function () {
        websocket.send(instrument8Json);
    });

    var instrument9Obj = {"action":"instrument", "value":8,"to": "123456"}; //定义乐器长笛对象
    var instrument9Json = JSON.stringify(instrument9Obj);//定义乐器长笛JSON
    $('#instrument9').click(function () {
        websocket.send(instrument9Json);
    });

    var instrument10Obj = {"action":"instrument", "value":9,"to": "123456"}; //定义乐器陶笛对象
    var instrument10Json = JSON.stringify(instrument10Obj);//定义乐器陶笛JSON
    $('#instrument10').click(function () {
        websocket.send(instrument10Json);
    });

    var keyMinusObj = {"action":"key", "value":0,"to": "123456"}; //定义音调减对象
    var keyMinusJson = JSON.stringify(keyMinusObj);//定义音调减JSON
    $('#keyMinus').click(function () {
        websocket.send(keyMinusJson);
    });

    var keyPlusObj = {"action":"key", "value":1,"to": "123456"}; //定义音调加对象
    var keyPlusJson = JSON.stringify(keyPlusObj);//定义音调加JSON
    $('#keyPlus').click(function () {
        websocket.send(keyPlusJson);
    });

    var keyOriObj = {"action":"key", "value":-1,"to": "123456"}; //定义音调恢复默认对象
    var keyOriJson = JSON.stringify(keyOriObj);//定义音调恢复默认JSON
    $('#keyOri').click(function () {
        websocket.send(keyOriJson);
    });

    var tempoMinusObj = {"action":"tempo", "value":0,"to": "123456"}; //定义速度减对象
    var tempoMinusJson = JSON.stringify(tempoMinusObj);//定义速度减JSON
    $('#tempoMinus').click(function () {
        websocket.send(tempoMinusJson);
    });

    var tempoPlusObj = {"action":"tempo", "value":1,"to": "123456"}; //定义速度加对象
    var tempoPlusJson = JSON.stringify(tempoPlusObj);//定义速度加JSON
    $('#tempoPlus').click(function () {
        websocket.send(tempoPlusJson);
    });

    var tempoOriObj = {"action":"tempo", "value":-1,"to": "123456"}; //定义速度恢复默认对象
    var tempoOriJson = JSON.stringify(tempoOriObj);//定义速度恢复默认JSON
    $('#tempoOri').click(function () {
        websocket.send(tempoOriJson);
    });

    var echoMinusObj = {"action":"echo", "value":0,"to": "123456"}; //定义混响减对象
    var echoMinusJson = JSON.stringify(echoMinusObj);//定义混响减JSON
    $('#echoMinus').click(function () {
        websocket.send(echoMinusJson);
    });

    var echoPlusObj = {"action":"echo", "value":1,"to": "123456"}; //定义混响加对象
    var echoPlusJson = JSON.stringify(echoPlusObj);//定义混响加JSON
    $('#echoPlus').click(function () {
        websocket.send(echoPlusJson);
    });

    var echoOriObj = {"action":"echo", "value":-1,"to": "123456"}; //定义混响恢复默认对象
    var echoOriJson = JSON.stringify(echoOriObj);//定义混响恢复默认JSON
    $('#echoOri').click(function () {
        websocket.send(echoOriJson);
    });

    var melodyMinusObj = {"action":"melody_vol", "value":0,"to": "123456"}; //定义主旋律减对象
    var melodyMinusJson = JSON.stringify(melodyMinusObj);//定义主旋律减JSON
    $('#melodyMinus').click(function () {
        websocket.send(melodyMinusJson);
    });

    var melodyPlusObj = {"action":"melody_vol", "value":1,"to": "123456"}; //定义主旋律加对象
    var melodyPlusJson = JSON.stringify(melodyPlusObj);//定义主旋律加JSON
    $('#melodyPlus').click(function () {
        websocket.send(melodyPlusJson);
    });

    var melodyOriObj = {"action":"melody_vol", "value":-1,"to": "123456"}; //定义主旋律恢复默认对象
    var melodyOriJson = JSON.stringify(melodyOriObj);//定义主旋律恢复默认JSON
    $('#melodyOri').click(function () {
        websocket.send(melodyOriJson);
    });
});

/*点击乐器展示控制乐器的遮罩层*/
function showInstrument() {
    $('#mask').show();
    $('#instrument-mask').show();
    $('#soundEffect-mask').hide();
}
/*点击音效展示控制音效的遮罩层*/
function showSounds() {
    $('#mask').show();
    $('#soundEffect-mask').show();
    $('#instrument-mask').hide();
}