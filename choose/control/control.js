/**
 * Created by enter on 2018/3/22.
 */
$(function () {

    $('#closeMask').click(function () {
        $('#mask').hide();
    });

    //拿到存储在sessionStorage中的设备号
    var resultStorage =sessionStorage.getItem("resultStorage");
    var deviceId = resultStorage.deviceId;
    var openId = resultStorage.openId;

    console.dir(deviceId);
    console.dir(openId);

    var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://118.190.204.56:8081/webSocketServer?deviceId="+deviceId+"&openId="+openId+"&type=wechat");
    }
    else {
        alert('当前浏览器 Not support websocket')
    }
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
        websocket.close();
    };


    /**
        点击评分按钮
     */
    var scoreObj = {"deviceId": deviceId}; //定义评分对象
    var scoreJson = JSON.stringify(scoreObj); //定义评分JSON
    var scoreData = "msg_click_score:" + scoreJson;
    $('#score').click(function () {
        websocket.send(scoreData);
    });

    /**
        点击乐谱
     */
    var musical_note_obj = {"deviceId": deviceId}; //定义乐谱对象
    var musical_note_Json = JSON.stringify(musical_note_obj);//定义乐谱JSON
    var musical_noteData = "msg_click_musicalnote:" + musical_note_Json;
    $('#musical_note').click(function () {
        websocket.send(musical_noteData);
    });

    /**
        点击跳过前奏
     */
    var jumpObj = {"deviceId": deviceId}; //定义跳过前奏对象
    var jumpJson = JSON.stringify(jumpObj);//定义跳过前奏JSON
    var jumpData = "msg_click_jump:" + jumpJson;
    $('#jump').click(function () {
        websocket.send(jumpData);
    });

    /**
        点击重唱
     */
    var replayObj = {"deviceId": deviceId}; //定义重唱对象
    var replayJson = JSON.stringify(replayObj);//定义重唱JSON
    var replayData = "msg_click_replay:" + replayJson;
    $('#replay').click(function () {
        websocket.send(replayData);
    });

    /**
        点击播放暂停
     */
    var playObj = {"deviceId": deviceId}; //定义播放暂停对象
    var playJson = JSON.stringify(playObj);//定义播放暂停JSON
    var playData = "msg_click_play:" + playJson;
    $('#play').click(function () {
        websocket.send(playData);
    });

    /**
        点击原唱/伴唱
     */
    var vocalObj = {"deviceId": deviceId}; //定义原唱/伴唱对象
    var vocalJson = JSON.stringify(vocalObj);//定义原唱/伴唱JSON
    var vocalData = "msg_click_vocal:" + vocalJson;
    $('#vocal').click(function () {
        websocket.send(vocalData);
    });

    /**
        点击切歌
     */
    var cutObj = {"deviceId": deviceId}; //定义切歌对象
    var cutJson = JSON.stringify(cutObj);//定义切歌JSON
    var cutData = "msg_click_cut:" + cutJson;
    $('#cut').click(function () {
        websocket.send(cutData);
    });

    /**
       点击音量减
     */
    var musicMinusObj = {"deviceId": deviceId,"msg": 0}; //定义音量减对象
    var musicMinusJson = JSON.stringify(musicMinusObj);//定义音量减JSON
    var musicMinusData = "msg_set_music_volume:" + musicMinusJson;
    $('#musicMinus').click(function () {
        websocket.send(musicMinusData);
    });

    /**
        点击音量加
     */
    var musicPlusObj = {"deviceId": deviceId,"msg": 1}; //定义音量加对象
    var musicPlusJson = JSON.stringify(musicPlusObj);//定义音量加JSON
    var musicPlusData = "msg_set_music_volume:" + musicPlusJson;
    $('#musicPlus').click(function () {
        websocket.send(musicPlusData);
    });

    /**
        点击麦克风减
     */
    var micMinusObj = {"deviceId": deviceId,"msg": 0}; //定义麦克风减对象
    var micMinusJson = JSON.stringify(micMinusObj);//定义麦克风减JSON
    var micMinusData = "msg_set_mic_volume:" + micMinusJson;
    $('#micMinus').click(function () {
        websocket.send(micMinusData);
    });

    /**
        点击麦克风加
     */
    var micPlusObj = {"deviceId": deviceId,"msg": 1}; //定义麦克风加对象
    var micPlusJson = JSON.stringify(micPlusObj);//定义麦克风加JSON
    var micPlusData = "msg_set_mic_volume:" + micPlusJson;
    $('#micPlus').click(function () {
        websocket.send(micPlusData);
    });

    /**
        点击气氛口哨
     */
    var atmosphere1Obj = {"deviceId": deviceId,"msg": 0}; //定义气氛口哨对象
    var atmosphere1Json = JSON.stringify(atmosphere1Obj);//定义气氛口哨JSON
    var atmosphere1Data = "msg_set_atmosphere:" + atmosphere1Json;
    $('#atmosphere1').click(function () {
        websocket.send(atmosphere1Data);
    });

    /**
        点击气氛欢呼
     */
    var atmosphere2Obj = {"deviceId": deviceId,"msg": 1}; //定义气氛欢呼对象
    var atmosphere2Json = JSON.stringify(atmosphere2Obj);//定义气氛欢呼JSON
    var atmosphere2Data = "msg_set_atmosphere:" + atmosphere2Json;
    $('#atmosphere2').click(function () {
        websocket.send(atmosphere2Data);
    });

    /**
        点击气氛鼓掌
     */
    var atmosphere3Obj = {"deviceId": deviceId,"msg": 2}; //定义气氛鼓掌对象
    var atmosphere3Json = JSON.stringify(atmosphere3Obj);//定义气氛鼓掌JSON
    var atmosphere3Data = "msg_set_atmosphere:" + atmosphere3Json;
    $('#atmosphere3').click(function () {
        websocket.send(atmosphere3Data);
    });

    /**
        点击气氛倒彩
     */
    var atmosphere4Obj = {"deviceId": deviceId,"msg": 3}; //定义气氛倒彩对象
    var atmosphere4Json = JSON.stringify(atmosphere4Obj);//定义气氛倒彩JSON
    var atmosphere4Data = "msg_set_atmosphere:" + atmosphere4Json;
    $('#atmosphere4').click(function () {
        websocket.send(atmosphere4Data);
    });

    /**
        点击乐器默认
     */
    var instrument1Obj = {"deviceId": deviceId,"msg": 0}; //定义乐器默认对象
    var instrument1Json = JSON.stringify(instrument1Obj);//定义乐器默认JSON
    var instrument1Data = "msg_set_instrument:" + instrument1Json;
    $('#instrument1').click(function () {
        websocket.send(instrument1Data);
    });

    /**
        点击乐器手风琴
     */
    var instrument2Obj = {"deviceId": deviceId,"msg": 1}; //定义乐器手风琴对象
    var instrument2Json = JSON.stringify(instrument2Obj);//定义乐器手风琴JSON
    var instrument2Data = "msg_set_instrument:" + instrument2Json;
    $('#instrument2').click(function () {
        websocket.send(instrument2Data);
    });

    /**
        点击乐器口琴
     */
    var instrument3Obj = {"deviceId": deviceId,"msg": 2}; //定义乐器口琴对象
    var instrument3Json = JSON.stringify(instrument3Obj);//定义乐器口琴JSON
    var instrument3Data = "msg_set_instrument:" + instrument3Json;
    $('#instrument3').click(function () {
        websocket.send(instrument3Data);
    });

    /**
        点击乐器尼龙吉他
     */
    var instrument4Obj = {"deviceId": deviceId,"msg": 3}; //定义乐器尼龙吉他对象
    var instrument4Json = JSON.stringify(instrument4Obj);//定义乐器尼龙吉他JSON
    var instrument4Data = "msg_set_instrument:" + instrument4Json;
    $('#instrument4').click(function () {
        websocket.send(instrument4Data);
    });

    /**
        点击乐器小号
     */
    var instrument5Obj = {"deviceId": deviceId,"msg": 4}; //定义乐器小号对象
    var instrument5Json = JSON.stringify(instrument5Obj);//定义乐器小号JSON
    var instrument5Data = "msg_set_instrument:" + instrument5Json;
    $('#instrument5').click(function () {
        websocket.send(instrument5Data);
    });

    /**
        点击乐器萨克斯
     */
    var instrument6Obj = {"deviceId": deviceId,"msg": 5}; //定义乐器萨克斯对象
    var instrument6Json = JSON.stringify(instrument6Obj);//定义乐器萨克斯JSON
    var instrument6Data = "msg_set_instrument:" + instrument6Json;
    $('#instrument6').click(function () {
        websocket.send(instrument6Data);
    });

    /**
        点击乐器双簧管
     */
    var instrument7Obj = {"deviceId": deviceId,"msg": 6}; //定义乐器双簧管对象
    var instrument7Json = JSON.stringify(instrument7Obj);//定义乐器双簧管JSON
    var instrument7Data = "msg_set_instrument:" + instrument7Json;
    $('#instrument7').click(function () {
        websocket.send(instrument7Data);
    });

    /**
        点击乐器单簧管
     */
    var instrument8Obj = {"deviceId": deviceId,"msg": 7}; //定义乐器单簧管对象
    var instrument8Json = JSON.stringify(instrument8Obj);//定义乐器单簧管JSON
    var instrument8Data = "msg_set_instrument:" + instrument8Json;
    $('#instrument8').click(function () {
        websocket.send(instrument8Data);
    });

    /**
        点击乐器长笛
     */
    var instrument9Obj = {"deviceId": deviceId,"msg": 8}; //定义乐器长笛对象
    var instrument9Json = JSON.stringify(instrument9Obj);//定义乐器长笛JSON
    var instrument9Data = "msg_set_instrument:" + instrument9Json;
    $('#instrument9').click(function () {
        websocket.send(instrument9Data);
    });

    /**
        点击乐器陶笛
     */
    var instrument10Obj = {"deviceId": deviceId,"msg": 9}; //定义乐器陶笛对象
    var instrument10Json = JSON.stringify(instrument10Obj);//定义乐器陶笛JSON
    var instrument10Data = "msg_set_instrument:" + instrument10Json;
    $('#instrument10').click(function () {
        websocket.send(instrument10Data);
    });

    /**
        点击音调减
     */
    var keyMinusObj = {"deviceId": deviceId,"msg": 0}; //定义音调减对象
    var keyMinusJson = JSON.stringify(keyMinusObj);//定义音调减JSON
    var keyMinusData = "msg_set_key:" + keyMinusJson;
    $('#keyMinus').click(function () {
        websocket.send(keyMinusData);
    });

    /**
        点击音调加
     */
    var keyPlusObj = {"deviceId": deviceId,"msg": 1}; //定义音调加对象
    var keyPlusJson = JSON.stringify(keyPlusObj);//定义音调加JSON
    var keyPlusData = "msg_set_key:" + keyPlusJson;
    $('#keyPlus').click(function () {
        websocket.send(keyPlusData);
    });

    /**
        点击音调恢复默认
     */
    var keyOriObj = {"deviceId": deviceId,"msg": -1}; //定义音调恢复默认对象
    var keyOriJson = JSON.stringify(keyOriObj);//定义音调恢复默认JSON
    var keyOriData = "msg_set_key:" + keyOriJson;
    $('#keyOri').click(function () {
        websocket.send(keyOriData);
    });

    /**
        点击速度减
     */
    var tempoMinusObj = {"deviceId": deviceId,"msg": 0}; //定义速度减对象
    var tempoMinusJson = JSON.stringify(tempoMinusObj);//定义速度减JSON
    var tempoMinusData = "msg_set_tempo:" + tempoMinusJson;
    $('#tempoMinus').click(function () {
        websocket.send(tempoMinusData);
    });

    /**
        点击速度加
     */
    var tempoPlusObj = {"deviceId": deviceId,"msg": 1}; //定义速度加对象
    var tempoPlusJson = JSON.stringify(tempoPlusObj);//定义速度加JSON
    var tempoPlusData = "msg_set_tempo:" + tempoPlusJson;
    $('#tempoPlus').click(function () {
        websocket.send(tempoPlusData);
    });

    /**
        点击速度恢复默认
     */
    var tempoOriObj = {"deviceId": deviceId,"msg": -1}; //定义速度恢复默认对象
    var tempoOriJson = JSON.stringify(tempoOriObj);//定义速度恢复默认JSON
    var tempoOriData = "msg_set_tempo:" + tempoOriJson;
    $('#tempoOri').click(function () {
        websocket.send(tempoOriData);
    });

    /**
        点击混响减
     */
    var echoMinusObj = {"deviceId": deviceId,"msg": 0}; //定义混响减对象
    var echoMinusJson = JSON.stringify(echoMinusObj);//定义混响减JSON
    var echoMinusData = "msg_set_echo:" + echoMinusJson;
    $('#echoMinus').click(function () {
        websocket.send(echoMinusData);
    });

    /**
        点击混响加
     */
    var echoPlusObj = {"deviceId": deviceId,"msg": 1}; //定义混响加对象
    var echoPlusJson = JSON.stringify(echoPlusObj);//定义混响加JSON
    var echoPlusData = "msg_set_echo:" + echoPlusJson;
    $('#echoPlus').click(function () {
        websocket.send(echoPlusData);
    });

    /**
        点击混响恢复默认
     */
    var echoOriObj = {"deviceId": deviceId,"msg": -1}; //定义混响恢复默认对象
    var echoOriJson = JSON.stringify(echoOriObj);//定义混响恢复默认JSON
    var echoOriData = "msg_set_echo:" + echoOriJson;
    $('#echoOri').click(function () {
        websocket.send(echoOriData);
    });

    /**
      点击主旋律减
     */
    var melodyMinusObj = {"deviceId": deviceId,"msg": 0}; //定义主旋律减对象
    var melodyMinusJson = JSON.stringify(melodyMinusObj);//定义主旋律减JSON
    var melodyMinusData = "msg_set_melody_volume:" + melodyMinusJson;
    $('#melodyMinus').click(function () {
        websocket.send(melodyMinusData);
    });

    /**
        点击主旋律加
     */
    var melodyPlusObj = {"deviceId": deviceId,"msg": 1}; //定义主旋律加对象
    var melodyPlusJson = JSON.stringify(melodyPlusObj);//定义主旋律加JSON
    var melodyPlusData = "msg_set_melody_volume:" + melodyPlusJson;
    $('#melodyPlus').click(function () {
        websocket.send(melodyPlusData);
    });

    /**
        点击主旋律恢复默认
     */
    var melodyOriObj = {"deviceId": deviceId,"msg": -1}; //定义主旋律恢复默认对象
    var melodyOriJson = JSON.stringify(melodyOriObj);//定义主旋律恢复默认JSON
    var melodyOriData = "msg_set_melody_volume:" + melodyOriJson;
    $('#melodyOri').click(function () {
        websocket.send(melodyOriData);
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