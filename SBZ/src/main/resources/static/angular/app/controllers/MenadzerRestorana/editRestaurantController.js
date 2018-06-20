restaurants.controller('editRestaurantController', function($scope, updateRestaurantFactory){
	
	$scope.info = {};
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
        updateRestaurantFactory.getRestaurant(user).success(function (data) {
        	$scope.info.naziv = data.naziv;
        	$scope.info.opis = data.opis;
        	$scope.info.adresa = data.adresa;
		});
    }

	init();
	
	function initAutocomplete() {
		var map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: 45.255, lng: 19.844722},
		    zoom: 13,
		    mapTypeId: 'roadmap'
		  });

		  // Create the search box and link it to the UI element.
		  var input = document.getElementById('inputAddress');
		  var searchBox = new google.maps.places.SearchBox(input);

		  // Bias the SearchBox results towards current map's viewport.
		  map.addListener('bounds_changed', function() {
		    searchBox.setBounds(map.getBounds());
		  });

		  var markers = [];
		  // Listen for the event fired when the user selects a prediction and retrieve
		  // more details for that place.
		  searchBox.addListener('places_changed', function() {
		    var places = searchBox.getPlaces();

		    if (places.length == 0) {
		      return;
		    }

		    // Clear out the old markers.
		    markers.forEach(function(marker) {
		      marker.setMap(null);
		    });
		    markers = [];

		    // For each place, get the icon, name and location.
		    var bounds = new google.maps.LatLngBounds();
		    places.forEach(function(place) {
		      if (!place.geometry) {
		        console.log("Returned place contains no geometry");
		        return;
		      }
		      var icon = {
		        url: place.icon,
		        size: new google.maps.Size(71, 71),
		        origin: new google.maps.Point(0, 0),
		        anchor: new google.maps.Point(17, 34),
		        scaledSize: new google.maps.Size(25, 25)
		      };

		      // Create a marker for each place.
		      markers.push(new google.maps.Marker({
		        map: map,
		        icon: icon,
		        title: place.name,
		        position: place.geometry.location
		      }));

		      if (place.geometry.viewport) {
		        // Only geocodes have viewport.
		        bounds.union(place.geometry.viewport);
		      } else {
		        bounds.extend(place.geometry.location);
		      }
		    });
		    map.fitBounds(bounds);
		  });
	} 
	
	initAutocomplete();
	
	$scope.editRestoran = function(info, editForm) {
		var user = JSON.parse(localStorage.getItem("user"));
		var required = editForm.inputName.$error.required || editForm.inputOpis.$error.required
		|| editForm.inputAddress.$error.pattern;
		if (required){
			toastr.info("Please fill out all the required fields.")
		}
		else{
			updateRestaurantFactory.updateRestoranInfo(info, user).success(function(data) {			
				toastr.info("Restaurant successfuly updated.");
				init();
			}).error(function(data) {			
				toastr.info("Error on updating.");
			});
		}
	}
});