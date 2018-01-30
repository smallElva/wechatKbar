var time = 60;
var timer ;
var checked = 0;//可以点击
//点击发送验证码的状态改变成60s倒计时的方法
function _timeCountDown(obj){
    return function(){
        timeCountDown(obj);
    }
}
function timeCountDown(obj){
    if(time == 60){
        time --;
        $('#'+obj).addClass('btn-grey').html(time+"s后点击重新获取");
        //可以点击，进行倒数，不能打断
        checked = 1;//不能点击
        timer = setInterval(_timeCountDown(obj),1000,obj);
    }else if(time == 0){
        //清楚定时器
        clearCount(obj);
        return;
    }else{
        time--;
        //不能点击
        $('#'+obj).addClass('btn-grey').html(time+"s后点击重新获取");
    }
}

function clearCount(obj){
    clearInterval(timer);
    $('#'+obj).removeClass('btn-grey').html("发送验证码");
    checked = 0;
}

