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
    $submit_button = $('#submit-button'), // submint button in des part
    $delete_button = $('#delete-button'); // delete button in des part



// =============== END global variables=============================


// =============== plugin init=============================
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
    // $('.demo-test-datetime').scroller('destroy').scroller($.extend(opt['datetime'], opt['default']));
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


// ================ END add event to button ====================

// ================ call in main parts====================


// click task-item to call description on middle size windows
function move_to_despage() {
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
    console.log('$this.data("task_id"): ', $this.data("task_id"));
    if ($this.data("task_id")===undefined) {
        render_description('t001');
    } else {
        render_description($this.data("task_id"));
    }

}
function test() {
    console.log('catch click on task item.');
}

$(function () {
    (function () {
        $things_list_task_item.on('click', move_to_despage);
    })();
});


// call things-list on small size page

(function () {
    function small_call_things_list(){
        if(size < 2) {
            $summary.hide();
            $things_list.show();
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
    share_people: [], // user id
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
var friend_index = ['u001'];
// ================ END localstorage ====================


// ================ test data ====================

var task1 = {
    task_id: 't001',
    name: 'just try the app',
    content: 'hello world, here is the content.',
    start_time: now_timestamp,
    end_time: now_timestamp+60*60*1000,
    reminder_time: now_timestamp,
    share_people: [], // user id
    email_remind: true,
    message_remind: false
}

var friend1 = {
    user_id: 'u001',
    user_name: 'hu'
}

// get the final data
var task_insert = $.extend({}, task_template, task1);

store.set(task_insert.task_id, task_insert);
store.set('u001', friend1);
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
    var item = store.get(task_id);
    console.log('task_id: ', task_id);
    console.log('item: ', item);
    $('#id-des-item-name').attr("value", item.name);
    $('#id-des-item-time-start').attr("value", tran_time(item.start_time));
     $('#id-des-item-time-end').attr("value", tran_time(item.end_time));
    $('#id-des-item-reminder').attr("value", tran_time(item.reminder_time));
    $('#des-item-reminder-email').bootstrapSwitch('state', item.email_remind);
    $('#des-item-reminder-message').bootstrapSwitch('state', item.message_remind);
    $('#id-des-item-content').text(item.content);
}


// $('input[name="my-checkbox"]').bootstrapSwitch('state', true, true);
// ================ END render content====================


// ================ add and delete task====================

// ================ END add and delete task====================







