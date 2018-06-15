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
    //回车键登录
    $("body").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
            login();
        }
    });

    //登录
    $('#loginIn').click(function(){
        login();
    });

    //登录验证
    function login(){
        var Laccount = $('#login_num').val().trim();
        var Lpassword = $('#login_pwd').val().trim();
        var reg = /^1[3|4|5|7|8]\d{9}$/;  //13680200070
        var filter=/^\d{6}\b/;

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
            url:"http://wechat.uniquemusic.cn/owner/login",
            type:"POST",
            contentType: 'application/json',
            dataType: "json",
            data:JSON.stringify({"iphone":Laccount, "password":Lpassword}),
            // data:JSON.stringify({"iphone":Laccount,"password":Lpassword}),
            success:function(result){
                if(result.status==200){
                    if($("#rememberLogin").is(":checked")){
                        setCookie('customername', Laccount, 7);
                        setCookie('customerpass', Lpassword, 7)
                    }else{
                        clearCookie('customername');
                        clearCookie('customerpass');
                    }
                    $('#login-form').submit();
                    window.location.href = "../owner.html";
                }else{
                    showDefault('fail');
                }

            },
            fail:function (msg) {
                showDefault('fail');
            }
        });
    }
    /**
     * ================================================登录end=================================================
     */


    /**
     * ================================================手机号验证start=================================================
     */
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
                     window.location.href="../login/rePassword.html";
                 }else {
                     clearCount("send_yz");
                     alert(result.msg);
                 }
             }
         })

     });
    /**
     * ================================================手机号验证end=================================================
     */


     /**
     * ================================================修改密码start=================================================
     */
    $(document).on('click','#reLoginIn',function(){
        var newPwd = $('#newPwd').val().trim();
        var reNewPwd = $('#reNewPwd').val().trim();
        var regTest = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if (!newPwd) {
            showDefault('fail_newPwd_empty');
            return false;
        }
        if(!regTest.test(newPwd)){
            showDefault('fail_newPwd_error');
            return false;
        }
        if (!reNewPwd) {
            showDefault('fail_reNewPwd_empty');
            return false;
        }
        if(!regTest.test(reNewPwd)){
            showDefault('fail_newPwd_error');
            return false;
        }
        if(newPwd!=reNewPwd){
            showDefault('fail_reNewPwd_error');
            return false;
        }
        $.ajax({
            url:"",
            type:"POST",
            data:{validCode:""},
            success:function (result){
                if(result.code == 1){
                    window.location.href="./owner.html";
                }else {
                    alert(result.msg);
                }
            }
        })
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
        case "fail_newPwd_empty":
            toast.fail({
                title:"密码不得为空",
                duration:1000
            });
            break;
        case "fail_reNewPwd_empty":
            toast.fail({
                title:"确认密码不得为空",
                duration:1000
            });
            break;
        case "fail_newPwd_error":
            toast.fail({
                title:"密码需为（6-16）位数字或字母",
                duration:1000
            });
            break;
        case "fail_reNewPwd_error":
            toast.fail({
                title:"两次密码不一致",
                duration:1000
            });
            break;
        case "fail":
            toast.fail({
                title:"用户名或密码错误",
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




