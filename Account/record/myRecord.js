

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
        //点击播放录音跳转获取该首歌曲的Id
        openRecordInfo:function (e) {
            var id = e.currentTarget.getAttribute('uid');
            window.location.href = "./myRecord_page.html?id=" + id;
        },
        //弹窗出现将点击的歌曲的id传给播放录音；将序列号传给删除录音
        showLayout:function (id,index) {
            $('#layout').show();
            $('#playRecord').attr("uid",id);
            $('#deleteRecord').attr("uIndex",index);
        },
        closeLayout:function(){
            $('#layout').hide();
        },
        //点击删除录音，删除该录音
        deleteRecord: function(e) {
            var index = e.currentTarget.getAttribute('uIndex');
            $('#layout').hide();
            dialog.alert({
                msg:'是否删除该录音？',
                buttons:['取消','确定']
            },function(ret){
                if(ret.buttonIndex == 2){
                  vmm.records.splice(index,1);
            }
          });
        }
    }
});

apiready = function () {
    api.parseTapmode();
};
var dialog = new auiDialog();