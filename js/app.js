var searchResultModel = function() {
    var self = this;
    var clock;
    this.searchText = ko.observable();
    this.searchRet = ko.observableArray();
    this.searchText.subscribe(function(value) {
        clearTimeout(clock);
        clock = setTimeout(search, 1000, value);
    });

    // this callback function will be called when google text search location service is complete.
    this.callback = function(results, status) {
        clearTimeout(timeout);
        self.searchRet([]);
        markerList = [];
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                var marker = createMarker(place);
                marker.name = place.name;
                marker.formatted_address = place.formatted_address;
                self.searchRet.push(marker);
                markerAddClickListener(createInfoWindow(place), marker);
                putMarker(marker);
            }
            fitMarkers(self.searchRet());
        }
        globalCallback();
    };
    this.showOnMap = function(marker) {
        setCenter(marker);
        triggerClick(marker);
    };
};

var model = new searchResultModel();
ko.applyBindings(model);
