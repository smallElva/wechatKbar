/**
 * Created by enter on 2018/1/23.
 */

$(function () {
    /***
     * 轮播效果
     */
    $('.slide-content').slick({
        autoplay: true,
        arrows: false
    });


    var url = window.location.search;
    var state = url.split('serialNo=')[1];

    //获取设备号，存储在sessionStorage中；
    var objStorage = {"deviceId": state,"openId": 123};
    objStorage = JSON.stringify(objStorage); //转化为JSON字符串
    localStorage.setItem("resultStorage", objStorage);//返回{"deviceId": state,"openId": 123}

        /***
         * 请求判断用户登录状态和支付状态
         */
        var websocket = null;
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            websocket = new WebSocket("ws://118.190.204.56:8081/webSocketServer?serialNo="+state);
        }
        else {
            alert('当前浏览器 Not support websocket')
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function() {
            websocket.close();
        };
        websocket.onopen = function () {
            // alert('websocket已连接');
        };
        //获得消息事件(判断是否购买套餐，从k伴获取订单信息)
        websocket.onmessage = function(msg) {
            var deal = JSON.parse(msg.data).action; //获取套餐
            // alert(msg.data);
            /***
             * 点击遥控
             */
            $('#control-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){  //只有在已经登录并且购买了套餐的情况下才能点击进去；其他情况都要弹窗提醒登录或者购买套餐
                    window.location.href = 'control/control.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){ //点击确认后跳转到购买套餐页面
                            wx.scanQRCode();
                        }
                    });
                }
            });
            /***
             * 点击歌手点歌
             */
            $('#singer-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){
                    window.location.href = 'singer/singer.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){ //点击确认后开启扫码功能
                            wx.scanQRCode();//扫码结果微信自行处理结果
                        }
                    });
                }
            });
            /***
             * 点击歌名点歌
             */
            $('#songName-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){
                    window.location.href = 'songName/songName.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode();
                        }
                    });
                }
            });
            /***
             * 点击乐谱点歌
             */
            $('#musicScore-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){
                    window.location.href = 'musicScore/musicScore.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode();
                        }
                    });
                }
            });
            /***
             * 点击热门歌曲
             */
            $('#hotSong-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){
                    window.location.href = 'hotSong/hotSong.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode();
                        }
                    });
                }
            });
            /***
             * 点击语种点歌
             */
            $('#language-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){
                    window.location.href = 'hotSong/hotSong.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode();
                        }
                    });
                }
            });
            /***
             * 点击新歌推荐
             */
            $('#newSong-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){
                    window.location.href = 'newSong/newSong.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode();
                        }
                    });
                }
            });
            /***
             * 点击已点歌曲
             */
            $('#haveSong-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){
                    window.location.href = 'haveSongs/haveSongs.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode();
                        }
                    });
                }
            });
            /***
             * 点击已唱歌曲
             */
            $('#haveSang-btn').click(function () {
                if(deal && deal!='' && url.indexOf("serialNo")!=-1){
                    window.location.href = 'haveSang/haveSang.html';
                }else{
                    dialog.alert({
                        title:"是否购买套餐畅享K歌体验？",
                        buttons:['取消','确定']
                    },function(ret){
                        if(ret.buttonIndex==2){
                            wx.scanQRCode();
                        }
                    });
                }
            });

        };
        /***
        * 如果没有登录则弹窗提示登录，所有的按钮只有在已经登录的情况下才能点击进去
        */
        $('#buy-package').click(function () {
            if(url.indexOf("serialNo")!=-1){
                window.location.href='http://wechat.uniquemusic.cn/packagesPage?serialNo='+state;
            }else{
                dialog.alert({
                    title:"是否扫码畅享点歌体验？",
                    buttons:['取消','确定']
                },function(ret){
                    if(ret.buttonIndex==2){
                        wx.scanQRCode();
                    }
                });
            }
        });


        /***
         * 如果没有登录则弹窗提示登录，所有的按钮只有在已经登录的情况下才能点击进去
         */
        // if(url.indexOf("serialNo")==-1){
        //     $('#singer-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     $('#songName-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     $('#musicScore-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     $('#hotSong-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     $('#language-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     $('#newSong-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     $('#haveSong-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     $('#haveSang-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     $('#control-btn').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        //     /***
        //      * 没有登录点击购买套餐
        //      */
        //     $('#buy-package').click(function () {
        //         dialog.alert({
        //             title:"是否扫码畅享点歌体验？",
        //             buttons:['取消','确定']
        //         },function(ret){
        //             if(ret.buttonIndex==2){
        //                 wx.scanQRCode();
        //             }
        //         });
        //     });
        // }else{
        //     /***
        //      * 已经登录了点击购买套餐
        //      */
        //     $('#buy-package').click(function () {
        //         window.location.href='http://wechat.uniquemusic.cn/packagesPage?serialNo='+state;
        //     })
        // }

        /***
         * 点击扫描二维码
         */
        $('#scanQRCode').click(function () {
            wx.scanQRCode();
        });


});
apiready = function(){
    api.parseTapmode();
};
/***
 * 点击搜索跳转到搜索页面
 */
var searchBar = document.querySelector(".aui-searchbar");
var searchBarInput = document.querySelector(".aui-searchbar input");
if(searchBar){
    searchBarInput.onclick = function(){
        window.location.href='search/search.html';
    };
    searchBarInput.oninput = function(){
        window.location.href='search/search.html';
    }
}

/***
 * 初始化弹窗
 */
var dialog = new auiDialog();

