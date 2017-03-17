var SearchResultModel = function() {
    var self = this;
    var clock;
    this.allRet = [];
    this.foursquare = new FoursquareModel();
    this.searchText = ko.observable();
    this.searchRet = ko.observableArray();
    this.filterText = ko.observable();

    // this subscribe function is to delay requesting
    this.searchText.subscribe(function(value) {
        if (value) {
            clearTimeout(clock);
            clock = setTimeout(search, 1000, value);
        }
    });

    this.filterText.subscribe(function(value) {
        if (!value) {
            toogleFilter();
            self.searchRet(self.allRet);
            self.allRet.forEach(function(ret) {
                putMarker(ret);
            });
            return;
        }
        var array = [];
        for (var i = 0; i < self.allRet.length; i++) {
            var place = self.allRet[i].hookplace;
            if (place.name.toLowerCase().indexOf(value.toLowerCase()) != -1) {
                array.push(self.allRet[i]);
                putMarker(self.allRet[i]);
            } else {
                clearMarker(self.allRet[i]);
            }
        }
        self.searchRet(array);
    });

    // this callback function will be called when google text search location service is complete.
    this.callback = function(results, status) {
        clearTimeout(timeout);
        self.searchRet([]);
        markerList = [];
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                console.log(place);
                var marker = createMarker(place);
                marker.hookplace = place;
                marker.name = place.name;
                marker.formatted_address = place.formatted_address;
                self.searchRet.push(marker);
                markerAddClickListener(createInfoWindow(place), marker);
                putMarker(marker);
            }
            fitMarkers(self.searchRet());
            self.allRet = self.searchRet();
        }
        globalCallback();
    };
    this.showOnMap = function(marker) {
        setCenter(marker);
        triggerClick(marker);
    };
};

var FoursquareModel = function() {
    this.place = ko.observable();
    this.recommendplace = ko.observable();
    this.url = ko.observable();
};

var model = new SearchResultModel();
ko.applyBindings(model);
