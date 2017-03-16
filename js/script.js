(function() {
    var $expend = $('#expend');
    var $menu = $('#menu');
    var $board = $('#board');
    var isExpend = true;
    $('#networkerror').hide();

    // toogle menu
    $expend.click(function() {
        isExpend = !isExpend;
        if (isExpend) {
            $menu.removeClass('unexpend');
            $menu.addClass('expend');
            $board.removeClass('expend');
            $board.addClass('unexpend');
        } else {
            $board.removeClass('unexpend');
            $board.addClass('expend');
            $menu.removeClass('expend');
            $menu.addClass('unexpend');
        }
    });

})();

function loadGoogleApiTimer() {
    $('#map').html('<h3>Oh no! We can\'t connect to google api server :(</h3>');
}

function networkerrorTimer() {
    $('#networkerror').show();
}

function globalCallback() {
    $('#networkerror').hide();
}

var timeout;
$(document).ready(function() {
    timeout = setTimeout(loadGoogleApiTimer, 20000);
});
