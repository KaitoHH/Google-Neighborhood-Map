var map;

function initMap() {
    timeout = null;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lng: 121.48,
            lat: 31.22
        },
        zoom: 8
    });
    search('Shanghai,China');
    map.content = $('#map-template');
}

function search(text) {
    var request = {
        minPriceLevel: 3,
        maxPriceLevel: 4,
        query: text
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, model.callback);
    timeout = setTimeout(networkErrorTimer, 20000);
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        title: place.name
    });
    return marker;
}

function putMarker(marker) {
    marker.setMap(map);
}

function clearMarker(marker) {
    marker.setMap(null);
}

function fitMarkers(markers) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

function createInfoWindow(place) {
    var infowindow = new google.maps.InfoWindow();
    return infowindow;
}

function markerAddClickListener(infowindow, marker) {
    marker.addListener('click', function() {
        if (map.openedwindow) {
            map.openedwindow.close();
            map.clickedmarker.setAnimation(null);
        }
        model.foursquare.place(marker.name);
        model.foursquare.recommendplace("loading...");
        model.foursquare.url("#");
        infowindow.open(map, marker);
        infowindow.setContent(map.content.html());
        requestFourSquare(marker.position);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        map.openedwindow = infowindow;
        map.clickedmarker = marker;
    });
}

function setCenter(marker) {
    map.setCenter(marker.position);
}

function triggerClick(object) {
    google.maps.event.trigger(object, 'click');
}
