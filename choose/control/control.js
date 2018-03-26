/**
 * Created by enter on 2018/3/22.
 */
$(function () {
    $('#closeMask').click(function () {
        $('#mask').hide();
    });
});

/*点击乐器展示控制乐器的遮罩层*/
function showInstrument() {
    $('#mask').show();
    $('#instrument-mask').show();
    $('#soundEffect-mask').hide();
}
/*点击音效展示控制音效的遮罩层*/
function showSounds() {
    $('#mask').show();
    $('#soundEffect-mask').show();
    $('#instrument-mask').hide();
}