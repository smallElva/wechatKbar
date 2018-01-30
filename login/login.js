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
            data:{user:"",password:""},
            success:function(result){
                if($("#rememberLogin").is(":checked")){
                    setCookie('customername', $('#username').val().trim(), 7);
                    setCookie('customerpass', $('#password').val().trim(), 7)
                }else{
                    clearCookie('customername');
                    clearCookie('customerpass');
                }
                window.location.href=result.url;
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

//设置cookie
var passKey = '4c05c54d952b11e691d76c0b843ea7f9';
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + encrypt(escape(cvalue), passKey) + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1){
            var cnameValue = unescape(c.substring(name.length, c.length));
            return decrypt(cnameValue, passKey);
        }
    }
    return "";
}
//清除cookie
function clearCookie(cname) {
    setCookie(cname, "", -1);
}



eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('A G(a,b){x(b==v||b.7<=0){D.y("z R P O");t v}6 c="";s(6 i=0;i<b.7;i++){c+=b.u(i).n()}6 d=m.r(c.7/5);6 e=l(c.9(d)+c.9(d*2)+c.9(d*3)+c.9(d*4)+c.9(d*5));6 f=m.M(b.7/2);6 g=m.B(2,C)-1;x(e<2){D.y("L K J z");t v}6 h=m.F(m.H()*N)%I;c+=h;w(c.7>q){c=(l(c.o(0,q))+l(c.o(q,c.7))).n()}c=(e*c+f)%g;6 j="";6 k="";s(6 i=0;i<a.7;i++){j=l(a.u(i)^m.r((c/g)*E));x(j<p){k+="0"+j.n(p)}Q k+=j.n(p);c=(e*c+f)%g}h=h.n(p);w(h.7<8)h="0"+h;k+=h;t k}A S(a,b){6 c="";s(6 i=0;i<b.7;i++){c+=b.u(i).n()}6 d=m.r(c.7/5);6 e=l(c.9(d)+c.9(d*2)+c.9(d*3)+c.9(d*4)+c.9(d*5));6 f=m.F(b.7/2);6 g=m.B(2,C)-1;6 h=l(a.o(a.7-8,a.7),p);a=a.o(0,a.7-8);c+=h;w(c.7>q){c=(l(c.o(0,q))+l(c.o(q,c.7))).n()}c=(e*c+f)%g;6 j="";6 k="";s(6 i=0;i<a.7;i+=2){j=l(l(a.o(i,i+2),p)^m.r((c/g)*E));k+=T.U(j);c=(e*c+f)%g}t k}',57,57,'||||||var|length||charAt||||||||||||parseInt|Math|toString|substring|16|10|floor|for|return|charCodeAt|null|while|if|log|key|function|pow|31|console|255|round|encrypt|random|100000000|the|change|plesae|ceil|1000000000|empty|be|else|cannot|decrypt|String|fromCharCode'.split('|'),0,{}))

