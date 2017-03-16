(function() {
    var $expend = $('#expend');
    var $menu = $('#menu');
    var $board = $('#board');
    var isExpend = true;

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
