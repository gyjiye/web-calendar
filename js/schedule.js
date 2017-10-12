// ===============global variables=============================
var size = 3,// window size with 3 for large, 2 for middle, 1 for small
    prior_size = 0, // screen size before, initial value 0 to check at beginning
    $summary = $('.summary'), // summary
    $things_list = $('.things-list'), // things list
    $description = $('.description'), // description
    $part_share = $('.part-share'), //description part-share
    $des_close = $('.part-des .close'), // description des-part close
    $things_list_task_item = $('.task-item'), // things-list task-list
    $task_item_container = $('.things-list .nano-content'); // container of task-items




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
    $things_list.show();
    $description.css('display', 'none');
    $summary.css({'width':'35%', 'min-width':'300px'});
    // $summary.css('width', '35%');
    $things_list.css('width', '65%');
    $description.css('width', '65%');
    $des_close.show();
    // console.log('test - page_init_middle');
}

function page_init_small() {
    $summary.css('width', '100%');
    $things_list.hide();
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
// =============== END media query =============================


// ================ add event to button ====================
// share
(function () {
   var share = $('#share-button');
    function move_to_sharepage() {
        if(!$part_share.hasClass('part-share-show')){
            $part_share.addClass('part-share-show');
        }
        else { console.log('part-share already have class part-share-show') }
    }
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

function move_away_despage() {
    $description.hide();
    $things_list.show();
}

// des close
(function () { $des_close.on('click', move_away_despage); })();


// ================ END add event to button ====================

// ================ call in main parts====================


// click task-item to call description on middle size windows
(function () {
    function move_to_despage() {
        if(size < 3) {
            // only works on middle and small screen
            // console.log("click");
            $things_list.hide();
            $description.show();
            // console.log('test - click task-item to call description');
        }
    }

    $things_list_task_item.on('click', move_to_despage);
})();

// ================ END call in main parts====================

// ================ render content===========================


// ================ END render content====================

