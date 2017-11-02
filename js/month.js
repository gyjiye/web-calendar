// ===============global variables=============================
var $hamburger = $('.hamburger'), // hamburger to call sidebar
    $sidebar = $('.sidebar'), // sidebar
    $mask = $('.mask'), // mask
    $arrow_right = $('.glyphicon.glyphicon-menu-right'), // arrow_left to move next month
    $arrow_left = $('.glyphicon.glyphicon-menu-left'); // arrow_left to move last month

var year_shown = YEAR, // 正显示的年份
    month_shown = MONTH // 正显示的月份

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
function render_date_num(y, m, d) {
    update_time_title(m, d);
    var date = new Date();
    date.setFullYear(y);
    date.setMonth(m-1);
    date.setDate(1);
    var first_day = date.getDay(), // 当月第一天星期几
        $table_items = $('.table-item');
    // init the table, clear all numbers and today's style
    for(i=0; i<$table_items.length; i++) {
        $($table_items[i]).find('div').first().text(' ');
    }
    $('.now-table-item').removeClass('now-table-item');
    $('.now-first-div').removeClass('now-first-div');
    // 迭代渲染
    // i--table的第i个空格
    // j--当月的第j天
    for(i=first_day, j=1; i<$table_items.length; i++) {
            var nextday = tomorrow_date(y, m, j);
            if (nextday[1] === m) {
                $($table_items[i]).find('div').first().text(j);
            } else {
                $($table_items[i]).find('div').first().text(j);
                break;
            }
            // show the item today only in this month
            if (j === DATE && month_shown===MONTH) {
                $($table_items[i]).addClass('now-table-item');
                $($table_items[i]).find('div').first().addClass('now-first-div');
            }
            j++;

    }
    // judge whether delete last line or not
    if ($($table_items[35]).first().text()===" ")
    {
        $($table_items[40]).parent().hide();
    } else {
        $($table_items[40]).parent().show();
    }
}

// init once page loaded
render_date_num(YEAR, MONTH, DATE);

// click right arrow to move to next month
function move_to_next_month() {
    if (month_shown===12) {
        month_shown = 1;
        year_shown += 1;
    } else {
        month_shown += 1;
    }

    render_date_num(year_shown, month_shown, DATE);
}

(function () { $arrow_right.on('click', move_to_next_month); })();

// click left arrow to move to last month
function move_to_last_month() {
    if (month_shown===1) {
        month_shown = 12;
        year_shown -= 1;
    } else {
        month_shown -= 1;
    }

    render_date_num(year_shown, month_shown, DATE);
}

(function () { $arrow_left.on('click', move_to_last_month); })();

// click date to move back to today
function move_back() {
    month_shown = MONTH;
    year_shown = YEAR;
    render_date_num(year_shown, month_shown, DATE);
}

(function () { $date.on('click', move_back); })();


// ================ END render the content ==========================
