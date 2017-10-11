// ===============global variables=============================
var size = 1; // window size with 3 for large, 2 for middle, 1 for small


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
$(window).resize(function () {
    var windowWidth = $(window).width();
    console.log(windowWidth);
    if(windowWidth >= 1200) {
        size = 3;
    }else if (windowWidth >= 650) {
        size =  2;
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
        var part_share = $('.part-share');
        if(!part_share.hasClass('part-share-show')){
            part_share.addClass('part-share-show');
        }
        else {
            console.log('part-share already have class part-share-show');
        }
    }
   share.on('click', move_to_sharepage);
})();

function move_away_sharepage() {
    var part_share = $('.part-share');
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

// =========================================
// on middle size windows

// click task-item to call description
(function () {
    var task_item_middle = $('.task-item');
    var description = $('.description');
    function move_to_despage() {
        // console.log("click");
        var things_list = $('.things-list');
        things_list.hide();
        description.show();
        description.css('width', '65%');
    };

    task_item_middle.on('click', move_to_despage);
})();



// ================ END add event to button ====================
