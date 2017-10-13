// where the target element moves
var $container;
// target element to drag
var $target;

$.fn.drag = function (options) {
    // the container string - optional
    var container = options && options.container;

    $container = $(container);
    $target = this;
    // add eventlisterer for mousedown
    $target.mousedown(fnDown);
};

function fnDown(event) {
    // 光标按下时光标和target边缘之间的距离
    // 注意 offset 是否 需要块级元素
    var target_offset = $target.offset();
    var disX = event.pageX - target_offset.left;
    var disY = event.pageY - target_offset.top;

    // target move
    $target.mousemove(fnMove, disX, disY);
}

function fnMove(event, posX, posY) {
    // target 边缘距离视窗边界距离
    // 光标到窗口距离 - target到窗口的距离
    var target_left_coor = event.pageX - posX;
    var target_top_coor = event.pageY - posY;
    // 获取窗口尺寸
    var winW = $(window).width();
    var winH = $(window).height();
    // 计算 target 正向不越过窗口的极限偏移量
    // 窗口尺寸 - 
     maxW = winW -
}
