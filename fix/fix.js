/**
 * Created by enter on 2018/2/3.
 */
$(function () {
    // 动态添加报修设备
    $.ajax({
        type:"GET",
        url:"equip.json",
        dataType:"json",
        // data:"department="+$("#fix-equip-name").val(),
        success:function(data){
            var $select = $('#fix-equip-name');
            for(var i=0, len = data.length;i<len;i++){
                $select.append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>');
            }
        }
    });
    //我要报修点击提交按钮
    $('#submitBtn').click(function () {
        var contactName=$('#contactName').val();
        var contactPhone=$('#contactPhone').val();
        var fixEquipName=$('#fix-equip-name').val();
        var fixWord=$('#fix-word').val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(!contactName){
            showDefault('fail_name_empty');
            return false;
        }
        if(!contactPhone){
            showDefault('fail_phone_empty');
            return false;
        }
        if(!reg.test(contactPhone)){
            showDefault('fail_phone_error');
            return false;
        }
        if(!fixEquipName){
            showDefault('fail_equip_empty');
            return false;
        }
        if(!fixWord){
            showDefault('fail_advice_empty');
            return false;
        }
        $.ajax({
            url:"http://192.168.1.121:8082/apply/createRepair",
            type:"POST",
            contentType: 'application/json',
            dataType: "json",
            data:JSON.stringify({"ownerId":36,"contactName":contactName,"phone":contactPhone,"deviceId":fixEquipName,"content":fixWord}),
            success:function(result){
                if(result.status==200){
                    showDefault('success');
                    setTimeout(function(){
                        window.location.href = "../index.html";
                    }, 1000);
                }else{
                    showDefault('fail');
                }

            },
            fail:function (msg) {
                showDefault('fail');
            }
        });

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
                title:"亲，请描述设备问题！",
                duration:1000
            });
            break;
        case "fail_name_empty":
            toast.fail({
                title:"请填写联系人姓名",
                duration:1000
            });
            break;
        case "fail_equip_empty":
            toast.fail({
                title:"请选择报修设备",
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
