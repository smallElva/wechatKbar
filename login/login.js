/**
 * Created by elva on 2018/1/8.
 */
/**
 * =================================================================================================
 */

$(function(){
    // 密码输入框内容的显示隐藏方法
    $('#showPwd').click(function () {
        $(this).find('.aui-iconfont').toggleClass('aui-icon-hide aui-icon-display');
        if($('.aui-iconfont').hasClass('aui-icon-display')){
            $('#login_pwd').attr('type','text');
        }else{
            $('#login_pwd').attr('type','password');
        }

    });
    //获取cookie
    var cusername = getCookie('customername');
    var cpassword = getCookie('customerpass');
    if(cusername != "" && cpassword != ""){
        $("#login_num").val(cusername);
        $("#login_pwd").val(cpassword);
    }
    // 回车键登录
    $("body").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
            login();
        }
    });

    //登录
    $(document).on('click','#loginIn',function(){
        login();
    });

    //登录验证
    function login(){
        var Laccount = $('#login_num').val();
        var Lpassword = $('#login_pwd').val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        var filter=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;

        if( !Laccount){
            showDefault('fail_user_empty');
            return false;
        }
        if(!reg.test(Laccount)){
            showDefault('fail_user_error');
            return false;
        }
        if(!Lpassword){
            showDefault('fail_pwd_empty');
            return false;
        }
        if(!filter.test(Lpassword)){
            showDefault('fail_pwd_error');
            return false;
        }
        $.ajax({
            url:"",
            type:"POST",
            data:{num:Laccount,password:Lpassword},
            success:function(result){
                if($("#rememberLogin").is(":checked")){
                    setCookie('customername', $('#username').val().trim(), 7);
                    setCookie('customerpass', $('#password').val().trim(), 7)
                }else{
                    clearCookie('customername');
                    clearCookie('customerpass');
                }
                window.location.href = result.url;
            },
            fail:function (msg) {
                showDefault('fail');
            }
        });
    }
    /**
     * ================================================登录end=================================================
     */


     //手机号验证
     $(document).on('click','#send_yz',function(){
         var findPwdNum = $('#findPwd_num').val();
         var reg = /^1[3|4|5|7|8]\d{9}$/;

         if (!findPwdNum) {
             showDefault('fail_user_empty');
             return false;
         }
         if(!reg.test(findPwdNum)){
             showDefault('fail_user_error');
             return false;
         }
         if(checked == 0){
             time = 60;
             timeCountDown("send_yz");
             $.ajax({
                 url:"",
                 type:"POST",
                 data:{phone:""},
                 success:function (result){
                     if(result.code == 1){

                     }else {
                         clearCount("send_yz");
                         alert(result.msg);
                     }
                }
            })
         }
     });
     $(document).on('click','#findPwdSure',function(){
         var findPwdPwd = $('#findPwd_pwd').val();
         if(!findPwdPwd){
             showDefault('fail_yz_empty');
             return false;
         }
         if(findPwdPwd.length < 6){
             showDefault('fail_yz_error');
             return false;
         }
         $.ajax({
             url:"",
             type:"POST",
             data:{validCode:""},
             success:function (result){
                 if(result.code == 1){
                     window.location.href=result.url;
                 }else {
                     clearCount("send_yz");
                     alert(result.msg);
                 }
             }
         })

     });



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
        case "fail_user_empty":
            toast.fail({
                title:"手机号不得为空",
                duration:1000
            });
            break;
        case "fail_user_error":
            toast.fail({
                title:"请填写正确的手机号",
                duration:1000
            });
            break;
        case "fail_pwd_empty":
            toast.fail({
                title:"密码不得为空",
                duration:1000
            });
            break;
        case "fail_yz_empty":
            toast.fail({
                title:"验证码不得为空",
                duration:1000
            });
            break;
        case "fail_pwd_error":
            toast.fail({
                title:"请输入正确的密码",
                duration:1000
            });
            break;
        case "fail_yz_error":
            toast.fail({
                title:"验证码不正确",
                duration:1000
            });
            break;
        case "fail":
            toast.fail({
                title:"提交失败",
                duration:1000
            });
            break;
        default:
            // statements_def
            break;
    }
}



//设置cookie
function setCookie(name, value, iDay)
{
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);

    document.cookie=name+'='+value+';expires='+oDate;
}
//获取cookie
function getCookie(name)
{
    var arr=document.cookie.split('; ');

    for(var i=0;i<arr.length;i++)
    {
        var arr2=arr[i].split('=');

        if(arr2[0]==name)
        {
            return arr2[1];
        }
    }

    return '';
}


//清除cookie
function clearCookie(cname) {
    setCookie(cname, "", -1);
}




