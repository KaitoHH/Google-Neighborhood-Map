var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}

function search(text) {
    var request = {
        minPriceLevel: 3,
        maxPriceLevel: 4,
        query: text
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, model.callback);
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
    var infowindow = new google.maps.InfoWindow({
        content: '<div class="map-infowindow">' + place.name + '</div>'
    });
    return infowindow;
}

function markerAddClickListener(infowindow, marker) {
    marker.addListener('click', function() {
        if (map.openedwindow) {
            map.openedwindow.close();
        }
        infowindow.open(map, marker);
        map.openedwindow = infowindow;
    });
}

function setCenter(marker) {
    map.setCenter(marker.position);
}

function triggerClick(object) {
    google.maps.event.trigger(object, 'click');
}
