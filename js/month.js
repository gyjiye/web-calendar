// ===============global variables=============================
var $hamburger = $('.hamburger'), // hamburger to call sidebar
    $sidebar = $('.sidebar'), // sidebar
    $mask = $('.mask'), // mask
    $arrow_right = $('.glyphicon.glyphicon-menu-right'), // arrow_left to move next month
    $arrow_left = $('.glyphicon.glyphicon-menu-left'); // arrow_left to move last month


// ===============  END global variables=============================

// ================ add event to button ====================
// call sidebar
function sidebar_show() {
    if($sidebar.css('left')==='-220px') {
        // console.log('catch click on hamburger');
        $mask.show();
        $sidebar.addClass('sidebar-show');
    }
}
(function () { $hamburger.on('click', sidebar_show); })();

// hide sidebar
function sidebar_hide() {
    $mask.hide();
    $sidebar.removeClass('sidebar-show');
}
(function () { $mask.on('click', sidebar_hide); })();


// ================ END add event to button ====================

// ================ render the content ==========================
// change the date number on table
// params: y -- year(e.g. 2017), m--month(1-12)
function render_date_num(y, m) {
    var date = new Date();
    date.setFullYear(y);
    date.setMonth(m-1);
    date.setDate(1);
    var first_day = date.getDay(), // 当月第一天星期几
        $table_items = $('.table-item');
    // 迭代渲染
    // i--table的第i个空格
    // j--当月的第j天
    for(i=0, j=1; i<$table_items.length; i++) {
        if (i < first_day) {
            $($table_items[i]).first().text(' ');
        }
        if (i>=first_day) {
            var nextday = tomorrow_date(y, m, j);
            $($table_items[i]).first().text(j);
            j++;
            if (nextday[1] !== m) {
                // tomorrow is in next month
                break;
            }
        }
    }

    if ($($table_items[35]).first().text()==="") { $($table_items[40]).parent().hide();}


    // console.log($table_items);
}

render_date_num(2017, 11);


// ================ END render the content ==========================
