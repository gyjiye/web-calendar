// ===============global variables=============================
var now = new Date(),
    YEAR = now.getFullYear(),
    MONTH = now.getMonth()+1,
    DATE = now.getDate(), // 日期
    DAY = now.getDay(), // 星期几
    day_shown = DAY,
    timestamp_shown = now.getTime(); // timestamp of the day shown


var $date = $('#data'),  // month and date in time title
    $hamburger = $('.hamburger'), // hamburger to call sidebar
    $sidebar = $('.sidebar'), // sidebar
    $mask = $('.mask'), // mask
    $date_items = $('.date-item'), // date items
    $date_item_months = $('.date-item-month'), // month shown above table
    $date_item_dates = $('.date-item-date'), // date shown above table
    $right_arrow = $('.glyphicon-menu-right'), // right arrow and left arrow in time title
    $left_arrow = $('.glyphicon-menu-left');



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

// update_time_title
function update_time_title(year, month) {
    // console.log('// update_time_title');
    var month_str = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
    $date.text(month_str[month] +" " + year);
}


// calculate the days around info
// accept one day's timestamp,
// return pre n day and next n day [year, month, date, day]
// month[1-12], day[0-6]
function get_pren_and_nextn_day(timestamp, n) {
    var preDate = new Date(timestamp - 24 * 60 * 60 * 1000*n);
    var nextDate = new Date(timestamp + 24 * 60 * 60 * 1000*n);

    function tran_date_info(dateobj) {
        var year = dateobj.getFullYear();
        var month = dateobj.getMonth()+1;
        var date = dateobj.getDate();
        var day = dateobj.getDay();
        return [year, month, date, day];
    }

    return {
        prenday: tran_date_info(preDate),
        nextnday: tran_date_info(nextDate)
    };
}
// render the weekday
// n是星期几
function render_weekday(timestamp_shown, n) {
    // update_time_title
    var time = new Date(timestamp_shown);
    var year = time.getFullYear();
    var month = time.getMonth();
    update_time_title(year, month);

    // render the weekday, month and date
    var sunday_timestamp_shown = timestamp_shown-24*60*60*1000*n;
    for (i = 0; i < 7; i++) {
        // draw weekdays
        var date_info = get_pren_and_nextn_day(sunday_timestamp_shown, i);
        var date_num = date_info.nextnday[2];
        if (date_num<10) {
            date_num = '0' + date_num;
        }
        $($date_item_months[i]).text(date_info.nextnday[1]);
        $($date_item_dates[i]).text(date_num);

        // catch and show today
        if (timestamp_shown===now.getTime() && i===DAY) {
            $($date_items[i]).addClass('now-date-item');
        }
        else {
            $($date_items[i]).removeClass('now-date-item');
        }
    }// update_time_title
}

// init once page loaded
render_weekday(timestamp_shown, day_shown);

// click right arrow to last week
function right_arrow() {
    timestamp_shown += 7*24*60*60*1000;
    render_weekday(timestamp_shown, day_shown);
}
$right_arrow.on('click', right_arrow);

// click left arrow to last week
function left_arrow() {
    timestamp_shown -= 7*24*60*60*1000;
    render_weekday(timestamp_shown, day_shown);
}
$left_arrow.on('click', left_arrow);

// click time title center to move back to now
function move_back() {
    timestamp_shown = now.getTime();
    render_weekday(timestamp_shown, day_shown);
}
$date.on('click', move_back);




// ================ END render the content ==========================


