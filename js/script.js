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

function requestFourSquare(location) {
    var url = 'https://api.foursquare.com/v2/venues/explore';
    url += '?' + $.param({
        'client_id': 'VA4R5KR1RVUG3JMV5U5SZ1CHAQUONFSBGYP4CD0R3KCIVXMB',
        'client_secret': 'FMSPCNXPMSK4AEG51J2ES5Y4BOFMJTW23NXJBIXO2XXCTL2P',
        'v': '20170101',
        'll': location.lat() + ',' + location.lng(),
    });
    $.ajax({
        url: url,
        success: function(result) {
            var items = result.response.groups[0].items;
            var $a = $('#map-recommend-place');
            $a.html(items[0].venue.name);
            $a.attr('href', items[0].venue.url);
            //console.log(result.response.groups[0].items);
        }
    });
}
