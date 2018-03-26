

/**
 * Created by enter on 2018/3/16.
 */
var vmm=new Vue({
    el: "#record-content",
    data: {
        records: []

    },
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            $.ajax({
                type: 'Get',
                url: "myRecord.json",
                // data:{type:type,ext:ext},
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        vmm.records.push(data[i]);
                    }
                }
            });

        },
        openRecordInfo:function (e, id) {
            window.location.href = "./myRecord_page.html?id=" + id;
        },
        showLayout:function () {
            $('#layout').show();
        },
        closeLayout:function(){
            $('#layout').hide();
        },
        deleteRecord: function(rel) {
            dialog.alert({
                msg:'是否删除该录音？',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2){
                $(rel).parent().parent().parent().parent().parent().remove();
            }
          });
        }
    }
});

apiready = function () {
    api.parseTapmode();
};
var dialog = new auiDialog();