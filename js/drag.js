    // where the target element moves
    // default window
var $container = 0,
    // target element to drag
    $target = 0,
    // boolean, user input container
    have_user_container = false;

$.fn.drag = function (options) {
    console.log("the plugin was found");
    // 获取窗口
    var $mywindow = $(window);
    // 设定默认值
    $.fn.drag.defaults = { container: $mywindow };
    // 合并默认值和用户设定值:
    var opt = $.extend({}, $.fn.drag.defaults, options);
    // 获取container
    // 用户有输入值
    if (options && options.container) {
        // the container string - optional
        var container = opt.container;
        $container = $(container);
        have_user_container = true;
    } else {
        $container = $mywindow;
    }
    // 获取target
    $target = this;
    // add eventlisterer for mousedown
    console.log("$target: ", $target);
    console.log("$container: ", $container);

    $target.mousedown(fnDown);

    $target.mouseup(fnUp);


    return this;
};

function fnDown(event) {
    console.log("work with mousedown-head");
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
    // $target.mousemove(dis, function(event) {
    $container.mousemove(dis, function(event) {
        fnMove(event, event.data.x, event.data.y);
    });

    // 释放鼠标
    // $target.off('mousedown', fnDown);
    // $target.off('mousemove', fnMove);
}

function fnMove(event, target_posX, target_posY) {
    console.log("work with mousemove-head");
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
    } else if (target_top_coor > maxH) {
        target_top_coor = maxH;
    }

    //移动traget
    $target.offset({left:target_left_coor, top: target_top_coor});


}

// 释放鼠标
function fnUp() {
    console.log('mouseup start!!!');
    // $target.off('mousedown', fnDown);
    // $target.off('mouseup', fnUp);
    $container.off('mousemove');

}
