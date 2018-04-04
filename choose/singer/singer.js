/**
 * Created by enter on 2018/4/2.
 */


$(function () {

});

function getSingerHref(obj) {
    var val = parseInt($(obj).attr('uid'));
    window.location.href =  'singerList.html?id='+val;
}