/**
 * Created by enter on 2018/2/3.
 */
$(function () {
    //意见反馈点击提交
    $('#submitBtn').click(function () {
        var adviceTextarea=$('#adviceTextarea').val();
        var advicePhone=$('#advicePhone').val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(!adviceTextarea){
            showDefault('fail_advice_empty');
            return false;
        }
        if(!advicePhone){
            showDefault('fail_phone_empty');
            return false;
        }
        if(!reg.test(advicePhone)){
            showDefault('fail_phone_error');
            return false;
        }
        $("#adviceForm").submit();
    });
    //缺歌反馈点击提交
    $('#submitBtnSong').click(function () {
        var songName=$('#songName').val();
        var singerName=$('#singerName').val();
        if(!songName){
            showDefault('fail_song_empty');
            return false;
        }
        if(!singerName){
            showDefault('fail_singer_empty');
            return false;
        }
        $("#lackSongForm").submit();
    });
    //版权申诉点击提交
    $('#copySubmitBtn').click(function () {
        var copySongName=$('#copySongName').val();
        var copySingerName=$('#copySingerName').val();
        var copyPhoneNum=$('#copyPhoneNum').val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(!copySongName){
            showDefault('fail_song_empty');
            return false;
        }
        if(!copySingerName){
            showDefault('fail_singer_empty');
            return false;
        }
        if(!copyPhoneNum){
            showDefault('fail_phone_empty');
            return false;
        }
        if(!reg.test(copyPhoneNum)){
            showDefault('fail_phone_error');
            return false;
        }
        $("#copyForm").submit();
    })
});

apiready = function(){
    api.parseTapmode();
};
var toast = new auiToast({});
function showDefault(type){
    switch (type) {
        case "success":
            toast.success({
                title:"提交成功",
                duration:1000
            });
            break;
        case "fail_phone_empty":
            toast.fail({
                title:"请填写您的手机号",
                duration:1000
            });
            break;
        case "fail_phone_error":
            toast.fail({
                title:"请填写正确的手机号",
                duration:1000
            });
            break;
        case "fail_advice_empty":
            toast.fail({
                title:"亲，请填写您的宝贵意见！",
                duration:1000
            });
            break;
        case "fail_song_empty":
            toast.fail({
                title:"请填写歌曲名称",
                duration:1000
            });
            break;
        case "fail_singer_empty":
            toast.fail({
                title:"请填写歌手名称",
                duration:1000
            });
            break;

        case "fail":
            toast.fail({
                title:"提交失败",
                duration:1000
            });
            break;

        case "loading":
            toast.loading({
                title:"加载中",
                duration:2000
            },function(ret){
                console.log(ret);
                setTimeout(function(){
                    toast.hide();
                }, 3000)
            });
            break;
        default:
            // statements_def
            break;
    }
}
