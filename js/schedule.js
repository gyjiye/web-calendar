// ===============global variables=============================
var size = 1,// window size with 3 for large, 2 for middle, 1 for small
    things_list = $('.things-list'), // things list
    description = $('.description'), // description
    part_share = $('.part-share'), //description part-share
    des_close = $('.part-des .close'); // description des-part close


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
    description.show();
    description.css('width', '40%');
    des_close.hide();
}

function page_init_middle() {
    description.css('width', '65%');
    des_close.show();
}

$(window).resize(function () {
    var windowWidth = $(window).width();
    console.log(windowWidth);
    if(windowWidth >= 1200) {
        size = 3;
        page_init_large();
    }else if (windowWidth >= 650) {
        size =  2;
        page_init_middle();
    } else {
        size = 1;
    }
    // console.log(large, middle, small);
});
// =============== END media query =============================


// ================ add event to button ====================
// share
(function () {
   var share = $('#share-button');
    function move_to_sharepage() {
        if(!part_share.hasClass('part-share-show')){
            part_share.addClass('part-share-show');
        }
        else { console.log('part-share already have class part-share-show') }
    }
   share.on('click', move_to_sharepage);
})();

function move_away_sharepage() {
    if(part_share.hasClass('part-share-show')){
        part_share.removeClass('part-share-show');
    }
    else {
        console.log("part-share doesn't have class part-share-show");
    }
};

// share close
(function () {
    var share_close = $('#share-close');
    share_close.on('click', move_away_sharepage);
})();

function move_away_despage() {
    description.hide();
    things_list.show();
}

// des close
(function () { des_close.on('click', move_away_despage); })();

// =========================================
// on middle size windows

// click task-item to call description
(function () {
    var task_item_middle = $('.task-item');
    function move_to_despage() {
        if(size < 3) {
            // only works on middle and small screen
            // console.log("click");
            things_list.hide();
            description.show();
        }
    };

    task_item_middle.on('click', move_to_despage);
})();



// ================ END add event to button ====================
