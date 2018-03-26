/**
 * Created by enter on 2018/3/21.
 */

var songsm=new Vue({
    el: '#singer-song-result',
    data: {
        songs: []
    },
    mounted: function () {
        this.showData();
        //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
    methods: {
        showData: function () {
            $.ajax({
                url: 'haveSang.json',
                type: "GET",
                success: function (json) {
                    for (var i = 0; i < json.length; i++) {
                        songsm.songs.push(json[i]);
                    }
                }
            });
        },
        getGoodsHref:function(val){
            return '../../Account/record/myRecord_page.html?songsId='+val
        }
    }

});




