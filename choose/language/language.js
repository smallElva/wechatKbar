/**
 * Created by enter on 2018/4/3.
 */
$(function () {

});

function getLanguageHref(obj) {
    var val = parseInt($(obj).attr('uid'));
    window.location.href =  'language_page.html?id='+val;
}
