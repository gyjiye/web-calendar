// @param -- optional
// container [string]
// click_function [function]
// touch_function [function]

    // where the target element moves
    // default window
var $container = undefined,
    // target element to drag
    $target = undefined,
    // boolean, user input container
    have_user_container = false,
    // click_function
    click_function = undefined,
    // touch_function
    touch_function = undefined;

$.fn.drag = function (options) {
    // console.log("the plugin was found");
    // 获取窗口
    var $mywindow = $(window);
    // 设定默认值
    $.fn.drag.defaults = {
        container: $mywindow ,
        click_function : function () {
            console.log("catch click.");
        },
        touch_function : function () {
            console.log("catch click.");
        }
    };
    // 合并默认值和用户设定值:
    var opt = $.extend({}, $.fn.drag.defaults, options);
    // 获取container
    if (options && options.container) {
        // 用户有输入值
        // the container string - optional
        // var container_str = opt.container;
        // $container = $(container_str);
        $container = $(opt.container);
        have_user_container = true;
    } else {
        $container = opt.container;
    }
    // 获取target
    $target = this;
    console.log("$target: ", $target);
    console.log("$container: ", $container);
    // 获取click_function
    click_function = opt.click_function;
    // 获取touch_function
    touch_function = opt.touch_function;

    // 是否捕捉到长按
    var get_longpress = false;
    // 延时标识
    var timeout = 0;
    // check device_type, if it is pc(or mobile)
    if(device_type_pc()) {
    // pc
        // 定时
        $target.mousedown(function (event) {
            timeout = setTimeout(function () {
                get_longpress = true;
                console.log('get_longpress: ', get_longpress);
                fnDown(event);
            }, 120);
        });
        // 解除定时
        $target.mouseup(function () {

            if (get_longpress) {// 长按
                fnUp();
            } else {// click
                clearTimeout(timeout);
                click_function();
            }
            get_longpress = false;
        });

    } else {
    // mobile
        // 获取target
        target = $target.get(0);
        // 是否捕捉到长按
        get_longpress = false;
        // 延时标识
        timeout = 0;
        // 定时
        target.addEventListener('touchstart', function () {
            timeout = setTimeout(function () {
                get_longpress = true;
                console.log('get_longpress: ', get_longpress);
                handleMove();
            }, 2000);
        }, false);
        // 解除定时
        target.addEventListener('touchend', function () {
            if (get_longpress) {
                handleEnd();
            } else {
                clearTimeout(timeout);
                touch_function();
            }
            get_longpress = false;
        }, false);


    }
    // $target.mousedown(fnDown);
    // $target.mouseup(fnUp);

    return this;
};

function fnDown(event) {
    event.preventDefault();
    // 光标按下时光标和target边缘之间的距离
    // 注意 offset 是否 需要块级元素
    var target_offset = $target.offset(),
        disX = event.pageX - target_offset.left,
        disY = event.pageY - target_offset.top;

    // console.log("prepare for bind mousemove");
    // target move
    // 打包参数
    var dis = {
        x : disX,
        y : disY
    };


    // 检测在container内移动，并反应到target上，
    // 注意不是检测target内运动，容易出界后失效
    $container.mousemove(dis, function(event) {
        fnMove(event, event.data.x, event.data.y);
    });


}

function fnMove(event, target_posX, target_posY) {
    event.preventDefault();
    // console.log("work with mousemove-head");
    // target 边缘距离视窗边界距离
    // 光标到窗口距离 - target到窗口的距离
    var target_left_coor = event.pageX - target_posX,
        target_top_coor = event.pageY - target_posY,
        // 获取窗口尺寸
        winW = $(window).width(),
        winH = $(window).height(),
        // 获取target尺寸
        targetW = $target.width(),
        targetH = $target.height(),
        // 获取container尺寸
        containerW = $container.width(),
        containerH = $container.height();

    // 确认container是否为window
    // 默认为window
    if (!have_user_container) {
        containerW = winW;
        containerH = winH;
        container_posX = 0;
        container_posY = 0;
    } else {
        // container边界相对于window的偏移量
        var container_off = $container.offset(),
            container_posX = container_off.left,
            container_posY = container_off.top;
    }
    // 计算 target 正向不越过container的极限平移量
    // container尺寸 - target边缘距离container边界距离
    var maxW_translate = containerW - targetW,
        maxH_translate = containerH - targetH,
    // 计算 target 正向不越过container的极限偏移量
    // target 正向不越过container的极限平移量 + container偏移量
        maxW = maxW_translate + container_posX,
        maxH = maxH_translate + container_posY;


    // 确保target不会越过container边界
    // left
    if (target_left_coor < container_posX) {
        target_left_coor = container_posX;
    } else if (target_left_coor > maxW) {
        target_left_coor = maxW;
    }
    // top
    if (target_top_coor < container_posY) {
        target_top_coor = container_posY;
    } else if (target_top_coor > maxH-5) {
        target_top_coor = maxH-5;
    }

    //移动traget
    $target.offset({left:target_left_coor, top: target_top_coor});

}

// 释放鼠标
function fnUp() {
    // console.log('mouseup start!!!');
    // $target.off('mousedown', fnDown);
    // $target.off('mouseup', fnUp);
    $container.off('mousemove');
}

// check device_type, if it is pc(or mobile)
function device_type_pc() {
    var browser={
        versions:function(){
            var u = navigator.userAgent;
                // app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    };

    if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
        browser.versions.iPhone || browser.versions.iPad){
        // console.log('mobile');
        return false;
    }else{
        console.log('pc');
        return true;
    }
}

function handleMove(event) {
    // 获取接触点
    var touch = event.changedTouches[i];
}
