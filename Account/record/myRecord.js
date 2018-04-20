

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
            $('#lay-list').slideDown(300);
            $('#playRecord').attr("uid",id);
            $('#deleteRecord').attr("uIndex",index);
        },
        closeLayout:function(){
            setTimeout(function(){
                $('#layout').hide();
            },300);
            $('#lay-list').slideUp(300);
        },
        //点击删除录音，删除该录音
        deleteRecord: function(e) {
            var index = e.currentTarget.getAttribute('uIndex');
            setTimeout(function(){
                $('#layout').hide();
            },300);
            $('#lay-list').slideUp(300);
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

var dialog = new auiDialog();
$(function () {
    $('#lay-list').slideUp(300);
    apiready = function () {
        api.parseTapmode();
    };

    //点击页面除了id="layout"之外的任何区域都关闭该div
    $(document).on('click', function(e) {
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id == 'lay-list') {
                return;
            }
            elem = elem.parentNode;
        }
        setTimeout(function(){
            $('#layout').hide();
        },300);
        $('#lay-list').slideUp(300);
    });
});
