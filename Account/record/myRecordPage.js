$( function(){
    $( 'audio' ).audioPlayer();
    $('.audioplayer-playpause').click(function () {
        rotate();
    })
});

//旋转方法
var rot=10-0;
var time;
var is_rotate=false;
function rotate (){
    if(is_rotate==true){
        window.clearInterval(time);
        is_rotate=false;
    }
    else{
        time=window.setInterval(begin,15);
        is_rotate=true;
    }
}
function begin(){
    document.getElementById("pic").style.transform="rotatez("+rot+"deg)";
    rot+=1;
}