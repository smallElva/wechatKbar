/**
 * Created by enter on 2018/1/29.
 */
$(function () {
    /***
     * 轮播效果
     */
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination'
        }
    });
});
