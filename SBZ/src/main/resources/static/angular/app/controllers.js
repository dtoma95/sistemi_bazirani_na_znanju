restaurants.controller('navBarSistemMenadzerController', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null || user.uloga != "MENADZERSISTEMA"){
		window.location = "#/";		
	}
	$scope.logout = function(){
    	localStorage.removeItem("user");
    }	
	
});

restaurants.controller('navBarPonudjacController', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null || user.uloga != "PONUDJAC"){
		window.location = "#/";		
	}
	else if(user.fresh == true){
		window.location = "#/changePassword";
	}
	$scope.logout = function(){
    	localStorage.removeItem("user");
    }	
	
});

restaurants.controller('navBarMenadzerRestoranaController', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null || user.uloga != "MENADZERRESTORANA"){
		window.location = "#/";		
	}
	$scope.logout = function(){
    	localStorage.removeItem("user");
    }	
	
});

restaurants.controller('loginController', function($scope, loginFactory){
	
	$scope.loginKorisnik = function(user, form) {
		if (form.email.$error.required){
			toast("Please enter email.");
		} else if (form.password.$error.required) {
			toast("Please enter password.")
		} else {
			loginFactory.loginKorisnik(user).success(function(data, form) {
				if(!data.enabled && data.uloga === "GOST"){
					localStorage.setItem("user", JSON.stringify(data));
					window.location = '#/confirmEmail';
				}
				else if(data.fresh && data.uloga === "PONUDJAC"){
					localStorage.setItem("user", JSON.stringify(data));
					window.location = "#/changePassword";
				}
				else if (data.uloga === "MENADZERRESTORANA") {
					window.location = "#/menadzerRestorana";
					localStorage.setItem("user", JSON.stringify(data));
				}
				else if (data.uloga === "MENADZERSISTEMA") {
					window.location = "#/sistemMenadzer";
					localStorage.setItem("user", JSON.stringify(data));
				}
				else if (data.uloga === "GOST") {
					window.location = "#/gost";
					localStorage.setItem("user", JSON.stringify(data));
				}
				else if (data.uloga === "SANKER" || data.uloga === "KUVAR" || data.uloga === "KONOBAR") {
					if(data.fresh == true)
						window.location = "#/changePassword";
					else
						window.location = "#/radnik";
					localStorage.setItem("user", JSON.stringify(data));
				}
				else if (data.uloga === "PONUDJAC") {
					window.location = "#/ponudjac";
					localStorage.setItem("user", JSON.stringify(data));
				}
				if (data.email == null || data.email == "") {
					toast("Invalid username or password!");
				}
			});
		}
	}
});

restaurants.controller('sistemMenadzerController', function($scope, registerMenadzerFactory){
	$scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	$scope.passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
	
	$scope.registerSistemMenadzer = function(user, registerForm) {
		var required = registerForm.inputEmail.$error.required || registerForm.inputIme.$error.required
		|| registerForm.inputPrezime.$error.required || registerForm.inputPassword.$error.required;
		if(required){
			toast("Please fill out all the required fields.");
		}
		else if (registerForm.inputEmail.$error.pattern){
			toast("Please enter a correct email address.");
		}
		else if (registerForm.inputPassword.$error.required){
			toast("Please enter a correct password");
		}
		else{
			registerMenadzerFactory.registerSistemMenadzer(user).success(function(data) {			
				if (data != "Successful registration") {
					toast(data);
				} else {
					toastr.info(data);
					window.location = "#/sistemMenadzer";
				}
			
			});
		}
	}
	
	$scope.registerMenadzerRestorana = function(user, registerForm) {
		var required = registerForm.inputEmail.$error.required || registerForm.inputIme.$error.required
		|| registerForm.inputPrezime.$error.required || registerForm.inputPassword.$error.required;
		if(required){
			toast("Please fill out all the required fields.");
		}
		else if (registerForm.inputEmail.$error.pattern){
			toast("Please enter a correct email address.");
		}
		else if (registerForm.inputPassword.$error.required){
			toast("Please enter a correct password");
		}
		else{
			registerMenadzerFactory.registerMenadzerRestorana(user).success(function(data) {			
				if (data != "Successful registration") {
					toast(data);
				} else {
					toastr.info(data);
					window.location = "#/sistemMenadzer";
				}
			
			});
		}
	}
});

/*restaurants.controller('confirmEmailController', function($scope, confirmEmailFactory){
	$scope.confirmEmail = function(info){
		info.email = JSON.parse(localStorage.getItem("user")).email;
		confirmEmailFactory.confirmEmail(info).success(function(data) {
			if (data != "Email confirmed") {
				toast(data);
			} else {
				toast(data);
				window.location = "#/gost";
			}
		});
	}
});*/

restaurants.controller('changePasswordController', function($scope, changePasswordFactory){
	$scope.notSamePasswords = false;
	$scope.passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
	
	$scope.checkPasswords = function() {
		if ($scope.info.newpassword == $scope.info.confirmPassword){
			$scope.notSamePasswords = false;
		} else {
		    $scope.notSamePasswords = true;
		}
	}
	$scope.changePassword = function(info, editForm) {
		var required = editForm.newPassword.$error.required || editForm.oldPassword.$error.required
		|| editForm.newPassword.$error.pattern || editForm.oldPassword.$error.pattern;
		if (required || $scope.notSamePasswords){
			toast("Please fill out all the field correctly.")
		}
		else{
			info.email = JSON.parse(localStorage.getItem("user")).email;
			changePasswordFactory.changePassword(info).success(function(data) {			
				if (data != "true") {
					toast(data);
				} else {
					var u = JSON.parse(localStorage.getItem("user"));
					u.fresh = false;
					localStorage.setItem("user", JSON.stringify(u));
					toastr.info("Password changed successfuly");
					data = JSON.parse(localStorage.getItem("user"))
					
					if (data.uloga === "MENADZERRESTORANA") {
						window.location = "#/menadzerRestorana";
					}
					else if (data.uloga === "MENADZERSISTEMA") {
						window.location = "#/sistemMenadzer"
					}
					else if (data.uloga === "GOST") {
						window.location = "#/gost";
					}
					else if (data.uloga === "SANKER" || data.uloga === "KUVAR" || data.uloga === "KONOBAR") {
						window.location = "#/radnik";
					}
					else if (data.uloga === "PONUDJAC") {
						window.location = "#/ponudjac";
					}
				}
			
			});
		}
	}
});

/*restaurants.controller('friendsController', function($scope, friendsFactory){
	$scope.friends = {}
	$scope.requests = {}
	$scope.orderByField = 'ime';
	$scope.reverseSort = false;
	
	//$scope.sort = function(property){
	//	if ($scope.reverseSort == false){
	//		$scope.orderByField = property;
	//		$scope.reverseSort = true;
	//	} else {
	//		$scope.orderByField = "-" + property;
	//		$scope.reverseSort = false;
	//	}
	//}
	
	function init(){
		var user = JSON.parse(localStorage.getItem("user"));
		
		friendsFactory.getFriends(user).success(function (data){
			$scope.friends = data;
		});
		
		friendsFactory.getRequests(user).success(function (data){
			$scope.requests = data;
		});
	}
	
	init();
    
	$scope.addFriend = function(f){
		var user = JSON.parse(localStorage.getItem("user"));
		friendsFactory.addFriend(user, f).success(function(data){
			if (data == true){
				//toast("Successful adding!");
				init()
			} else {
				//toast("Unsuccessful adding!");
				init();
			}
		});
	}
	
	$scope.removeFriend = function(f){
		var user = JSON.parse(localStorage.getItem("user"));
		friendsFactory.removeFriend(user, f).success(function(data){
			if (data == true){
				//toast("Successful removing!");
				init();
			} else {
				//toast("Unsuccessful removing!");
				init();
			}
		});
	}
	
	$scope.sendRequest = function(){
		var user = JSON.parse(localStorage.getItem("user"));
		friendsFactory.sendRequest(user, $scope.newFriend).success(function(data){
			if (data == true){
				//toast("Successful adding!");
				init()
			} else {
				//toast("Unsuccessful adding!");
				init();
			}
		});
	}
	
	$scope.removeRequest = function(f){
		var user = JSON.parse(localStorage.getItem("user"));
		friendsFactory.removeRequest(user, f).success(function(data){
			if (data == true){
				//toast("Successful removing!");
				init();
			} else {
				//toast("Unsuccessful removing!");
				init();
			}
		});
	}
});*/

restaurants.controller('registerRestoranController', function($scope, registerRestoranFactory){
	
	function init() {
	    $scope.menadzerList = [];
		
        registerRestoranFactory.getMenadzers().success(function (data) {
        	$scope.menadzerList = data;
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
	
	
	$scope.registerRestoran = function(info) {
		var required = registerForm.inputName.$error.required || registerForm.inputOpis.$error.required
		|| registerForm.inputAddress.$error.pattern;
		if (required){
			toast("Please fill out all the required fields.")
		}
		else{
			registerRestoranFactory.registerRestoran(info).success(function(data) {			
				if (data == "true") {
					toastr.info("Restaurant successfuly registered.");
				} else {
					toast(data);
				}
			
			});
		}
	}
});

restaurants.controller('assignMenadzerController', function($scope, assignMenadzerFactory){
	   
	function init() {
	    $scope.menadzerList = [];
	    $scope.restoranList = [];
	    assignMenadzerFactory.getMenadzers().success(function (data) {
        	$scope.menadzerList = data;
		});
	    
	    assignMenadzerFactory.getRestorans().success(function (data) {
        	$scope.restoranList = data;
		});
    }

	init();
	
	
	$scope.assignMenadzer = function(info) {
		assignMenadzerFactory.assignMenadzer(info).success(function(data) {			
			if (data != "true") {
				toast("Operation successful");
			} else {
				toast(data);
			}
			
		});
	}
});

/*restaurants.controller('viewRestoransController', function($scope, viewRestoransFactory){
	$scope.orderByField = 'naziv';
	$scope.reverseSort = false;
	
	function init() {
	    $scope.restorans = [];
	    viewRestoransFactory.getRestorans().success(function (data) {
        	$scope.restorans = data;
		});
    }

	init();
	
	$scope.goToRestoran = function(restoran){
		//var path = "#/restorani/" + restoranName;
		//window.location = path;
		//$location.path("#/" + restoranName);
		localStorage.setItem("restoran", JSON.stringify(restoran));
		window.location = "#/restoran";
	};
	
	$scope.goToReservation = function(restaurant){
		//var path = "#/restorani/" + restoranName;
		//window.location = path;
		//$location.path("#/" + restoranName);
		$scope.reserve = new Object();
		$scope.reserve.restaurant = restaurant;
		$scope.reserve.creator = JSON.parse(localStorage.getItem("user"));
		$scope.reserve.dateAndTime = null;
		$scope.reserve.duration = null;
		$scope.reserve.tables = [];
		$scope.reserve.guests = [];
		
		localStorage.setItem("reserve", JSON.stringify($scope.reserve));
		window.location = "#/reserve1";
	};
	
});*/

restaurants.controller('restoranController', function($scope, restoranFactory){

	function init() {
		//var r = JSON.parse(localStorage.getItem("restoran"));
		var path = window.location.href;
		var nazivRestorana = path.split("=")[1];
		
		var user = JSON.parse(localStorage.getItem("user"));
		$scope.restoran = {};
		restoranFactory.getRestoran(nazivRestorana).success(function(data){
        	$scope.restoran = data;
        	restoranFactory.getGrades(user.email, data.naziv).success(function(data){
            	$scope.general = data.generalnaOcena;
            	$scope.friends = data.ocenaPrijatelja;
            });
        	
        	
    		var geocoder = new google.maps.Geocoder();
    		
    		geocoder.geocode( { 'address' : data.adresa }, function( results, status ) {
    	        if( status == google.maps.GeocoderStatus.OK ) {
    	        	
    	        	var map = new google.maps.Map(document.getElementById('map'), {
    	    		    center: results[0].geometry.location,
    	    		    zoom: 13,
    	    		    mapTypeId: 'roadmap'
    	    		});

    	            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
    	            map.setCenter( results[0].geometry.location );
    	            var marker = new google.maps.Marker( {
    	                map     : map,
    	                position: results[0].geometry.location
    	            });
    	            
    	            if (navigator.geolocation) {
    	                navigator.geolocation.getCurrentPosition(function(position) {
    	                	
    	                  var pos = {
    	                    lat: position.coords.latitude,
    	                    lng: position.coords.longitude
    	                  };
    	                  
    	                  var marker = new google.maps.Marker( {
    	    	                map     : map,
    	    	                position: {lat: pos.lat, lng: pos.lng}
    	    	            });
    	                });
    	            }
    	            
    	        } else {
    	            alert( 'Geocode was not successful for the following reason: ' + status );
    	        }
    	    } );
        });
        
        
	}
	
	init();
});


