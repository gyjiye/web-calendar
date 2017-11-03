// ===============global variables=============================
var size = 3,// window size with 3 for large, 2 for middle, 1 for small
    prior_size = 0, // screen size before, initial value 0 to check at beginning
    $sidebar = $('.sidebar'), // sidebar
    $summary = $('.summary'), // summary
    $things_list = $('.things-list'), // things list
    $description = $('.description'), // description
    $part_share = $('.part-share'), //description part-share
    $des_close = $('.part-des .close'), // description des-part close
    $things_list_task_item = $('.task-item'), // things-list task-list
    $task_item_container = $('.things-list .nano-content'), // container of task-items
    $summary_task = $('#tasks'), // task part on summary panel
    $things_list_close = $('#things-list-close'), // close button in things list part
    $greet_content = $('#greet-content'), // greet content on summary part, click to call sidebar
    $mask = $('.mask'), // mask
    $add_task_button = $('.add-task-button'), // circle add task button
    $share_button = $('#share-button'), // share button in des part
    $submit_button = $('#submit-button'), // submint button in des part
    $delete_button = $('#delete-button'), // delete button in des part
    $share_list = $('.list-group'), // the list of share target
    $share_items = $('.share-item'); // the item in share list



// =============== END global variables=============================


// =============== plugin init=============================
// init the date input plugin
function init_date_plugin() {
    var curr = new Date().getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};

    opt.default = {
        theme: 'android-holo light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        stepMinute: 5,
        startYear: curr - 0, //开始年份
        endYear: curr + 4 //结束年份
    };
    $('.settings').bind('change', function() {
        var demo = 'datetime';
        if (!demo.match(/select/i)) {
            $('.demo-test-' + demo).val('');
        }
        $('.demo-test-' + demo).scroller('destroy').scroller($.extend(opt['datetime'], opt['default']));
        $('.demo').hide();
        $('.demo-' + demo).show();
    });
    $('#demo').trigger('change');
}
// ready event
$(function() {
    //    init the scroller
    $(".nano").nanoScroller();
    //    init the textarea for flexText
    $('textarea').flexText();
    //    init the bootstrapSwitch checkbox;
    $('input[name=my-checkbox]').bootstrapSwitch({});
    // add task button draggable
    // $('#add-task-button-draggable').draggabilly({containment: '.mypanel'});
//     $('#add-task-button-draggable').udraggable({
//         containment: '.mypanel'
//     });
    $add_task_button.drag({
        container:'.mypanel',
        click_function: move_to_despage
    });
    init_date_plugin();

});
// =============== END plugin init=============================

// =============== media query =============================
// page init with different screen size

function page_init_large() {
    $summary.css({'width':'25%', 'min-width':'300px'});
    // $summary.css('width', '25%');
    $things_list.css('width', '35%');
    $description.show();
    $description.css('width', '40%');
    $des_close.hide();
    // console.log('test - page_init_large');
}

function page_init_middle() {
    $summary.show();
    $things_list.show();
    $description.css('display', 'none');
    $summary.css({'width':'35%', 'min-width':'300px'});
    // $summary.css('width', '35%');
    $things_list.css('width', '65%');
    $description.css('width', '65%');
    $des_close.show();
    $things_list_close.hide();
    // console.log('test - page_init_middle');
}

function page_init_small() {
    $summary.css('width', '100%');
    $things_list.css('width', '100%');
    $description.css('width', '100%');
    $des_close.show();
    $things_list_close.show();
    $things_list.hide();
    $description.hide();
}

$(window).resize(function () {
    var windowWidth = $(window).width();
    // console.log(windowWidth);
    if(windowWidth >= 1200) {
        size = 3;
        page_init_large();
    }else if (windowWidth >= 650) {
        size =  2;
        page_init_middle();
    } else {
        size = 1;
    }
    // console.log(prior_size, size);
    if (size !== prior_size) {
        prior_size = size;
        switch (size) {
            case 3:
                page_init_large();
                break;
            case 2:
                page_init_middle();
                break;
            case 1:
                page_init_small();
                break;
            default:
                console.log('size has been changes, but no init function to choice.');
        }
    }
});

// check size once page opened
$(window).resize();

// =============== END media query =============================


// ================ add event to button ====================

// share
function move_to_sharepage() {
    if(!$part_share.hasClass('part-share-show')){
        $part_share.addClass('part-share-show');
    }
    else { console.log('part-share already have class part-share-show') }
}

(function () {
   var share = $('#share-button');
   share.on('click', move_to_sharepage);
})();

function move_away_sharepage() {
    if($part_share.hasClass('part-share-show')){
        $part_share.removeClass('part-share-show');
    }
    else {
        console.log("part-share doesn't have class part-share-show");
    }
}

// share close
(function () {
    var share_close = $('#share-close');
    share_close.on('click', move_away_sharepage);
})();

// des close
function move_away_despage() {
    $description.hide();
    $things_list.show();
    $add_task_button.show();
    $share_button.data("task_id", "");
}

(function () { $des_close.on('click', move_away_despage); })();

// button to add task
// function add_task_button() {
//     console.log('catch click on button to add task.');
// }
// //
// (function () {
//     var $add_task_button = $('#add-task-button-draggable');
//     $add_task_button.on('click', add_task_button);
// })();

// things-list close
function move_away_things_list() {
    $things_list.hide();
    $summary.show();
}
(function () { $things_list_close.on('click', move_away_things_list); })();

// call sidebar
function sidebar_show() {
    if($sidebar.css('left')==='-220px') {
        $mask.show();
        $sidebar.addClass('sidebar-show');
    }
}
(function () { $greet_content.on('click', sidebar_show); })();

// hide sidebar
function sidebar_hide() {
    $mask.hide();
    $sidebar.removeClass('sidebar-show');
}
(function () { $mask.on('click', sidebar_hide); })();

// add task button
function add_task_button() {
    move_to_sharepage();
    // clear the content of descript page
}
// call the function in drag.js

// add the trainsition effect to share item
// to distinguish is it is selected
// TODO: something crash, can't catch the click,
// it seems that the bind fails after refreshing the DOM
function share_item_checked() {
    console.log('catch click on share item.');
    var $this = $(this);
    if ($this.prop('checked')) {
        // selected,drop
        $this.removeClass('share-item active');
    } else {
        $this.addClass('share-item active');
    }
}

(function () {
    $share_items.on('click', share_item_checked);
})();

// ================ END add event to button ====================

// ================ call in main parts====================


// click task-item to call description on middle size windows
function move_to_despage() {
    // console.log('catch click on task item');
    var $this = $(this);

    if(size < 3) {
        // only works on middle and small screen
        if (size===1) {
            $summary.hide();
        }
        $add_task_button.hide();
        $things_list.hide();
        $description.show();
        // console.log('test - click task-item to call description');
    }
    // click task items to render the content in description part
    // console.log('$this.data("task_id"): ', $this.data("task_id"));
    if ($this.data("task_id")===undefined) {
        // come from add task button
        render_description('t001');
        var now = new Date();
        var now_timestamp = now.getTime();
        $share_button.data("task_id", now_timestamp);
    } else {
        render_description($this.data("task_id"));
    }

}
function test() {
    console.log('catch click on task item.');
}


(function () {
    $things_list_task_item = $('.task-item');
    // console.log('$things_list_task_item: ', $things_list_task_item);
    $things_list_task_item.on('click', move_to_despage);
    // $things_list_task_item.on('click', test);
})();



// call things-list on small size page

(function () {
    function small_call_things_list(){
        if(size < 2) {
            $summary.hide();
            $things_list.show();
            render_things_list();
        }
    };

    $summary_task.on('click', small_call_things_list);
})();

// ================ END call in main parts====================

// ================  localstorage ====================
// get now time and its timestamp
var now = new Date();
var now_timestamp = now.getTime();

// storage templates
// use task_id as index
var task_template = {
    task_id: 't000',
    name: 'task_name',
    content: ' ',
    start_time: ' ',
    end_time: ' ',
    reminder_time: ' ',
    share_people: ['u001'], // user id
    email_remind: true,
    message_remind: false
}

// use user_id as index
var friend_template = {
    user_id: 'u000',
    user_name: 'humoufeng'
}

// other data
// list to record task_id
// use 'task_index' as index
var task_index = ['t001'];
// list of friends(user_id)
// use 'friend_index' as index
var friend_index = ['u001', 'u002'];
// ================ END localstorage ====================


// ================ test data ====================

var task1 = {
    task_id: 't001',
    name: 'just try the app',
    content: 'hello world, here is the content.',
    start_time: now_timestamp,
    end_time: now_timestamp+60*60*1000,
    reminder_time: now_timestamp,
    share_people: ['u001'], // user id
    email_remind: true,
    message_remind: false
}

var friend1 = {
    user_id: 'u001',
    user_name: 'hu'
};
var friend2 = {
    user_id: 'u002',
    user_name: 'hu2'
};

// get the final data
var task_insert = $.extend({}, task_template, task1);

store.set(task_insert.task_id, task_insert);
store.set('u001', friend1);
store.set('u002', friend2);
store.set('task_index', task_index);
store.set('friend_index', friend_index);

// ================ END test data ======================

// ================ render content===========================

// render single task in things-list part
// return the jQuery object of a task shortcut
function render_one_task(task_id) {
    var template ='<div class="task-item" data-task_id="' + task_id + '">'
        + '<span><input type="checkbox" data-task_id="' + task_id + '"></span>'
        + '<span class="task-name">' + store.get(task_id).name + '</span>'
        + '</div>';

    return $(template);
}

// render the things-list
function render_things_list() {
    $task_item_container.html('');
    var temp_task_index = store.get('task_index');
    for (i=0; i<temp_task_index.length; i++) {
        // var item = store.get(temp_task_index[i]);
        // console.log('temp_task_index[i]: ', temp_task_index[i]);
        // console.log('store.get(task_id): ', store.get(temp_task_index[i]));
        var $item = render_one_task(temp_task_index[i]);
        $task_item_container.prepend($item);
    }
    // reload the variable after changing the DOM
    $things_list_task_item = $('.task-item');
    $things_list_task_item.on('click', move_to_despage);

}

// test
render_things_list();

// transform time from timestamp to 'y-m-d hour:minute'
function tran_time(timestamp) {
    var date = new Date(timestamp),
        y = date.getFullYear(),
        m = date.getMonth()+1,
        d = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes();
    if (min<10) {
        min = '0'+min;
    }
    return y + '-' + m + '-' + d + ' ' + h + ':' + min;
}
// render the description
function render_description(task_id) {
    // console.log('catch render descript')
    var item = store.get(task_id);
    // console.log('task_id: ', task_id);
    // console.log('item: ', item);
    // clear the val created by date input plugin when leave descript
    $('#id-des-item-time-start').val(undefined);
    $('#id-des-item-time-end').val(undefined);
    $('#id-des-item-reminder').val(undefined);
    $('#id-des-item-name').attr("value", item.name);
    // change the placeholder
    $('#id-des-item-time-start').attr("placeholder", tran_time(item.start_time));
    $('#id-des-item-time-end').attr("placeholder", tran_time(item.end_time));
    $('#id-des-item-reminder').attr("placeholder", tran_time(item.reminder_time));
    $('#des-item-reminder-message').bootstrapSwitch('state', item.message_remind);
    $('#des-item-reminder-email').bootstrapSwitch('state', item.email_remind);
    $('#id-des-item-content').text(item.content);
    $share_button.data("task_id", task_id);
    render_share();
}

// render one friend
function render_one_friend(user_id) {
    var this_share_list = store.get('friend_index');
    // var this_share_list = store.get($share_button.data("task_id")).share_people;
    var check_judge = "";
    for (i=0;i<this_share_list.length;i++) {
        if (user_id == this_share_list[i]){
            check_judge = "checked";
            break;
        }
    }

    var template = '<li class="checkbox list-group-item share-item">'
        + '<label>'
        + '<input type="checkbox"  name="share-item-checkbox" data-user_id="' + user_id + '"' + check_judge + '>'
        + store.get(user_id).user_name
        + '</label>'
        + '</li>';
    console.log(template);
    return $(template);
}
// render the share part with all friends
function render_share() {
    $share_list.html('');
    var temp_friend_index = store.get('friend_index');
    for (i=0; i<temp_friend_index.length; i++) {
        var $item = render_one_friend(temp_friend_index[i]);
        $share_list.prepend($item);
    }
    // reload the variable after changing the DOM
    $share_items = $('.share-item');
}



// ================ END render content====================


// ================ add and delete task====================

// transform time from str(e.g. 2017-11-3 23:07) to timestamp
function tran_time_to_stamp(string) {
    var y = string.slice(0, 4),
        m = string.slice(5, 7),
        d = string.slice(8, 10),
        h = string.slice(11, 13),
        min = string.slice(14);
    var time = new Date();
    time.setFullYear(y);
    time.setMonth(m);
    time.setDate(d);
    time.setHours(h);
    time.setMinutes(min);
    return time.getTime();
}
// add or change a task
// save the date through submit button
function save_task() {
    var task = {};
    task.task_id = $share_button.data("task_id");
    task.name = $('#id-des-item-name').val();
    task.start_time = tran_time_to_stamp($('#id-des-item-time-start').val());
    task.end_time = tran_time_to_stamp($('#id-des-item-time-end').val());
    task.reminder_time = tran_time_to_stamp($('#id-des-item-reminder').val());
    task.message_remind = $('#des-item-reminder-message').bootstrapSwitch('state');
    task.email_remind = $('#des-item-reminder-email').bootstrapSwitch('state');
    task.content = $('#id-des-item-content').text();

    var now = new Date();
    var now_stamp = now.getTime();
    (task.start_time<0) ?  task.start_time=now_stamp : pass;
    (task.end_time<0) ?  task.end_time=now_stamp+60*60*1000 : pass;
    (task.reminder_time<0) ?  task.reminder_time=now_stamp : pass;

    // get the share target
    var share_people = [];
    for(i=0; i<$share_items.length; i++) {
        if ($($share_items[i]).find("input").prop('checked')) {
            // checked
            share_people.push($($share_items[i]).find("input").data("user_id"));
        }
    }
    task.share_people = share_people;
    console.log('share_people: ', share_people);
    console.log('task: ', task);

    var temp_task_index = store.get('task_index');
    // 去重
    function getArray(a) {
        var hash = {},
            len = a.length,
            result = [];

        for (var i = 0; i < len; i++){
            if (!hash[a[i]]){
                hash[a[i]] = true;
                result.push(a[i]);
            }
        }
        return result;
    }

    temp_task_index.push(task.task_id);
    temp_task_index = getArray(temp_task_index);
    store.set('task_index', temp_task_index);
    store.remove($share_button.data("task_id"));
    store.set(task.task_id, task);


    // back to things list
    render_things_list();
    move_away_despage();
}

(function () {
    $submit_button.on('click', save_task);
})();

// delete task when click delete button ib part description
function delete_task() {

}


// ================ END add and delete task====================







