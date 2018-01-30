/**
 * Created by enter on 2018/1/20.
 */
$(function() {
    /***
     * 点击全部门店筛选
     */
    $("#showStore").click(function () {
        $('#store-top').toggleClass('toggleShow');
        $(this).find('.aui-iconfont').toggleClass('aui-icon-down aui-icon-top');
        $('#state-top').removeClass('toggleShow');
    });

    $('#store-top .aui-list-item').click(function () { //点击门店选择栏里的任何一个选项，切换选项值，并刷新页面
        var storeName = $(this).find('.bill-store-name').text();
        $('#showStore .order-store-name').html(storeName);
    });

    //点击页面除了id="showStore"和id="showOrder"之外的任何区域都关闭该div
    $(document).on('click', function (e) {
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id == 'showStore') {
                return;
            }
            elem = elem.parentNode;
        }
        $('#store-top').removeClass('toggleShow'); //关闭该div

    });
});
