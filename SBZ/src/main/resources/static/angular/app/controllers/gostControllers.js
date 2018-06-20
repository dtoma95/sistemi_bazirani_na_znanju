restaurants.controller('registerGostController', function($scope, registerGostFactory){	
	$scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	$scope.passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
	$scope.notSamePasswords = false;
	
	$scope.checkPasswords = function() {
		if ($scope.user.lozinka == $scope.user.potvrdaLozinke){
			$scope.notSamePasswords = false;
		} else {
		    $scope.notSamePasswords = true;
		}
	}
	
	$scope.registerGost = function(user, form) {
		var required = form.email.$error.required || form.ime.$error.required ||
		    form.prezime.$error.required || form.lozinka.$error.required || 
		    form.potvrdaLozinke.$error.required;
		var emailValid = form.email.$error.pattern;
		var passwordValid = form.lozinka.$error.pattern;
		if (required){
			toast("Please fill out all the fields.");
		} else if (emailValid) {
		    toast("Email is not valid.")	
		} else if (passwordValid){
			toast("Password is not valid.")
		} else if($scope.notSamePasswords){
			toast("Passwords are not same.")
		} else {
			registerGostFactory.registerGost(user).success(function(data) {			
				if (data == "Successful registration.") {
					toast(data);
					window.location = "#/";
				} else {
					toast(data);
				}	
			});
		}
	}
});

restaurants.controller('confirmEmailController', function($scope, confirmEmailFactory){
	$scope.noToken = false;
	$scope.userLoged = false;
	$scope.goToHome = false;
	$scope.successful = false;
	
	function init(){
        // TODO:PROVERI DA LI JE ISTI GOST CIJI JE I TOKEN
		var path = window.location.href;
		if (path.indexOf("?token=") > -1){
			$scope.noToken = false;
			
			var token = path.split("=")[1];
			console.log(token);
			
			confirmEmailFactory.confirm(token).success(function(data) {
				if (data.result == "Email confirmed successfully."){
					$scope.message = "Email " + data.gostEmail + " confirmed successfully.";
					$scope.successful = true;
					if (localStorage.getItem("user") === null){
						$scope.goToHome = false;
					} else {
						var user = JSON.parse(localStorage.getItem("user"));
						if (user.email == data.gostEmail && user.enabled == true){
						    window.location.href = "#/gost";
						} else if (user.email == data.gostEmail && user.enabled == false){
							user.enabled = true;
							localStorage.setItem("user", JSON.stringify(user));
							$scope.goToHome = true;
						} else {
							$scope.goToHome = false;
						}
					}
				} else {
					$scope.message = data.result;
					$scope.successful = false;
				}
			});
		} else {
			$scope.noToken = true;
			if (localStorage.getItem("user") === null){
				$scope.userLoged = false;
			} else {
				$scope.userLoged = true;
			}
		}
	}
	
	init();
	
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
});

restaurants.controller('navBarGostController', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null || user.uloga != "GOST"){
		window.location = "#/";		
	}
	
    $scope.logout = function(){
    	localStorage.removeItem("user");
    }	
});

restaurants.controller('gostController', function($scope, gostFactory){
	$scope.updateMode = false;
	$scope.passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
	$scope.newInfo = {};
	$scope.notSamePasswords = false;
	
	function init() {
		var u = JSON.parse(localStorage.getItem("user"));
		
		gostFactory.getGost(u).success(function(data){
			$scope.user = data;
		});
		
		gostFactory.getNumberOfVisits(u).success(function(data){
			$scope.numberOfVisits = data;
		});
	}
	
	init();
	
	$scope.editProfile = function() {
		$scope.newInfo.firstName = $scope.user.ime;
		$scope.newInfo.lastName = $scope.user.prezime;
		$scope.newInfo.oldPassword = "";
		$scope.newInfo.newPassword = "";
		$scope.newInfo.confirmPassword = "";
		$scope.changePassword = false;
		$scope.updateMode = true;
	}
	
	$scope.changePasswordCheckBox = function(){
		$scope.newInfo.oldPassword = "";
		$scope.newInfo.newPassword = "";
		$scope.newInfo.confirmPassword = "";
		$scope.notSamePasswords = false;
		//$scope.changePassword = !$scope.changePassword;
	}
	
	$scope.checkPasswords = function() {
		if ($scope.newInfo.newPassword == $scope.newInfo.confirmPassword){
			$scope.notSamePasswords = false;
		} else {
		    $scope.notSamePasswords = true;
		}
	}
	
	$scope.cancel = function() {
		$scope.updateMode = false;
	}
	
	$scope.edit = function(form) {
		var required = false;
		if ($scope.changePassword){
			required = form.firstName.$error.required || form.lastName.$error.required ||
		        form.oldPassword.$error.required || form.newPassword.$error.required;
		} else {
			required = form.firstName.$error.required || form.lastName.$error.required;
		}
		if (required){
			toast("Unsuccessful editing. Please enter all required fields.");
		} else if (form.oldPassword.$error.pattern && $scope.changePassword) {
			toast("Unsuccessful editing. Old password need to have 8 characters, one capital latter and one number.")
		} else if (form.newPassword.$error.pattern && $scope.changePassword) {
			toast("Unsuccessful editing. New password need to have 8 characters, one capital latter and one number.")
	    } else if ($scope.notSamePasswords && $scope.changePassword) {
			toast("Unsuccessful editing. New and confirm password are not match!");
		} else {
			gostFactory.update($scope.user.email, $scope.newInfo, $scope.changePassword).success(function(data) {
				if (data == "Successful editing."){
					toast(data);
					$scope.user.ime = $scope.newInfo.firstName;
					$scope.user.prezime = $scope.newInfo.lastName;
					$scope.updateMode = false;
				} else {
					toast(data);
				}
			});
		}
	}
});

restaurants.controller('profileController', function($scope, profileFactory){
	function init(){
		var path = window.location.href;
		var id = path.split("=")[1];
		
		profileFactory.getGost(id).success(function(data){
			$scope.user = data;
			profileFactory.getNumberOfVisits($scope.user).success(function(data){
				$scope.numberOfVisits = data;
			});
		});
	}
	
	init();
});

restaurants.controller('friendsController', function($scope, friendsFactory){
	$scope.haveRequest = false;
	$scope.friends = {}
	$scope.requests = {}
	$scope.newFriend = {};
	$scope.orderByField = 'ime';
	$scope.reverseSort = false;
		
	function init(){
		var user = JSON.parse(localStorage.getItem("user"));
		
		friendsFactory.getFriends(user).success(function (data){
			$scope.friends = data;
		});
		
		friendsFactory.getRequests(user).success(function (data){
			$scope.requests = data;
			if ($scope.requests.length == 0){
				$scope.haveRequest = false;
			} else {
				$scope.haveRequest = true;
			}
		});
		
		friendsFactory.getGuests().success(function (data){
			var listAutoComplete = [];
			
        	for (var i = 0; i < data.length; i++) {
        		var guest = {};
        		if (data[i].email != user.email){
	        		guest.label = data[i].ime + " " + data[i].prezime;
	        		guest.value = data[i].email;
	        		listAutoComplete.push(guest);
        		}
        	}
        	
        	var input = document.getElementById("addFriend");
        	
        	new Awesomplete(input, {
        		minChars: 0,
        		maxItems: 7,
        		autoFirst: true,
        		list: listAutoComplete
        	});
		})
	}
	
	init();
	
    $("#addFriend").on('awesomplete-selectcomplete',function(){
   	   $scope.newFriend.email = this.value;
   	   friendsFactory.getGost($scope.newFriend.email).success(function(data){
   		  $scope.newFriend.name = data.ime + " " + data.prezime;
   	   });
    });
    
	$scope.addFriend = function(f){
		var user = JSON.parse(localStorage.getItem("user"));
		friendsFactory.addFriend(user, f).success(function(data){
			if (data == "Successful adding "){
				toast(data + f.ime + " " + f.prezime + " for friend.");
				init();
			} else {
				toast(data);
			}
		});
	}
	
	$scope.removeFriend = function(f){
		var user = JSON.parse(localStorage.getItem("user"));
		friendsFactory.removeFriend(user, f).success(function(data){
			if (data == "Successful removing "){
				toast(data + f.ime + " " + f.prezime + " from friends.");
				init();
			} else {
				toast(data);
			}
		});
	}
	
	$scope.sendRequest = function(){
		var user = JSON.parse(localStorage.getItem("user"));
		if ($scope.newFriend.email == null){
			toast("Unsuccessful sending request. Guest not found");
		}
		else {
			friendsFactory.sendRequest(user, $scope.newFriend.email).success(function(data){
				if (data == "Request is sent successfully to "){
					toast(data + $scope.newFriend.name + ".");
					init();
				} else if (data == "Unsuccessful sending request. Guest not found."){
					toast(data);
				} else {
					toast(data + $scope.newFriend.name + ".");
				}
			});
		}
	}
	
	$scope.removeRequest = function(f){
		var user = JSON.parse(localStorage.getItem("user"));
		friendsFactory.removeRequest(user, f).success(function(data){
			if (data == "Successful removing request from "){
				toast(data + f.ime + " " + f.prezime + ".");
				init();
			} else {
				toast(data);
			}
		});
	}
});

restaurants.controller('visitsController', function($scope, visitsFactory){
	function init(){
		$scope.user = JSON.parse(localStorage.getItem("user"));
		
		visitsFactory.getVisits($scope.user).success(function(data){
			var datum1;
        	for (var i = 0; i < data.length; i++) {
        		datum1 = new Date(data[i].datum);
        		data[i].datum = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear())+
        			" " + datum1.getHours() + ":" + (datum1.getMinutes());
        	}
        	$scope.visits = data;
		});
		
		$scope.setFoodRating = function(v) {
			visitsFactory.grade($scope.user, v.id, v.ocenaHrane, 0, 0).success(function(data){
				if(data == "true"){
					toast("Successs");
				}
				else{
					toast(data);
					v.ocenaHrane = 0;
				}
					
			});
		};
		
		$scope.setServiceRating = function(v) {
			visitsFactory.grade($scope.user, v.id, 0, v.ocenaUsluge,  0).success(function(data){
				if(data == "true"){
					toast("Successs");
				}
				else{
					toast(data);
					v.ocenaUsluge = 0;
				}
			});
		};
		
		$scope.setGeneralRating = function(v) {
			visitsFactory.grade($scope.user, v.id, 0, 0, v.ocenaRestorana).success(function(data){
				if(data == "true"){
					toast("Successs");
				}
				else{
					toast(data);
					v.ocenaRestorana = 0;
				}
			});
		};
		
	}
	
	
	init();
});

restaurants.controller('viewRestoransController', function($scope, viewRestoransFactory){
	$scope.orderByField = 'naziv';
	$scope.reverseSort = false;
	
	$scope.myLatitude = null;
	$scope.myLongitude = null;
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
	    $scope.restorans = {};
	    viewRestoransFactory.getRestorans().success(function (data) {
        	$scope.restorans = data;
        	
        	for (var key = 0; key < data.length; key++){ //ISPRAVITI OVAJ DEO POSTO ASIHRONO POZIVA GETGRADES
    	        viewRestoransFactory.getGrades(user.email, $scope.restorans[key].naziv).success((function(key) {
            	    return function(data) {
            	    	$scope.restorans[key].generalnaOcena = data.generalnaOcena;
        	        	$scope.restorans[key].ocenaPrijatelja = data.ocenaPrijatelja;
            	    }
            	})(key));
    	    }
        	
        		
    	    /*for (var i = 0; i < data.length; i++){ //ISPRAVITI OVAJ DEO POSTO ASIHRONO POZIVA GETGRADES
    	        viewRestoransFactory.getGrades(user.email, $scope.restorans[i].naziv).success((function(i) {
    	        		return function(data, i){
    	        	$scope.restorans[i].generalnaOcena = data.generalnaOcena;
    	        	$scope.restorans[i].ocenaPrijatelja = data.ocenaPrijatelja;
    	        		}
    	        })(i));
    	    }*/
    	    
    	    var koordinate = [];
	    	var myPos = {};
        	for (var i = 0; i < data.length; i++) {
        		var geocoder = new google.maps.Geocoder();
        		   		
        		geocoder.geocode( { 'address' : data[i].adresa }, function(results, status ) {
        	        if( status == google.maps.GeocoderStatus.OK ) {
        	            koordinate.push(results[0].geometry.location);
        	            
        	            if (koordinate.length == data.length) {
	                        someOtherFunction(koordinate);
	                    }     	            
        	            
        	            
        	        } else {
        	            alert( 'Geocode was not successful for the following reason: ' + status );
        	        }
        	    } );
        		
        	}
		});
    }

	init();
	
	var rad = function(x) {
		  return x * Math.PI / 180;
    };
	
	function someOtherFunction(koordinate) {
		
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
        	
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
            
            for (var i = 0; i<koordinate.length; i++) {
            	var R = 6378137;
            	var dLat = rad(pos.lat - koordinate[i].lat());
                var dLong = rad(pos.lng - koordinate[i].lng());
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(rad(pos.lat)) * Math.cos(rad(koordinate[i].lat())) *
                  Math.sin(dLong / 2) * Math.sin(dLong / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;  
            	
                $scope.restorans[i].udaljenost = (d/1000).toFixed(3) + "km";
            }
            $scope.$apply();
            });
        }
	}
	
	/*$scope.goToRestoran = function(restoran){
		//var path = "#/restorani/" + restoranName;
		//window.location = path;
		//$location.path("#/" + restoranName);
		localStorage.setItem("restoran", JSON.stringify(restoran));
		window.location = "#/restoran";
	};*/
	
	$scope.goToReservation = function(restaurant){
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
	
});

restaurants.controller('reserveFirstController', function($scope, reserveFactory){
	$scope.reserve = null;
	$scope.date = new Date();
	$scope.time = new Date();
	$scope.time.setMinutes($scope.time.getMinutes()+35);
	
	// rezervacija
	function init() {
	    $scope.reserve = JSON.parse(localStorage.getItem("reserve"));
	    if ($scope.reserve.dateAndTime != null){
	    	var d = new Date($scope.reserve.dateAndTime);
	    	console.log(d);
	    	$scope.date.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
	    	$scope.time.setHours(d.getHours(), d.getMinutes());
	    }
	};
	init();
	
	$scope.itemList = [1,2,3,4,5,6,7,8,9,10,11,12];
	// prva stavka u padajucoj listi
	$scope.reserve.duration = $scope.itemList[0];
	
	function setDateAndTime() {
		$scope.reserve.dateAndTime = $scope.date;
		$scope.reserve.dateAndTime.setHours($scope.time.getHours(), $scope.time.getMinutes());
	};
	
	$scope.next = function() {
		setDateAndTime();
		
		localStorage.setItem("reserve", JSON.stringify($scope.reserve));
		window.location.href = "#/reserve2";
	};
		
	// datum
	
    // postavljanje datuma na danasnji
    $scope.clear = function() {
        //$scope.date = null;
    };
    
    $scope.format = 'dd/MM/yyyy';
    $scope.altInputFormats = 'd!/M!/yyyy';
    
    $scope.inlineOptions = {
    	customClass: getDayClass,
    	minDate: new Date(),
    	showWeeks: true,
    };
    
    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);
            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    };

    $scope.dateOptions = {
    	formatYear: 'yyyy',
    	maxDate: new Date(2025, 1, 1),
    	minDate: new Date(),
    	startingDay: 1
    };
    
    //$scope.toggleMin = function() {
    //    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    //    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    //};
    //$scope.toggleMin();
      
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
 
    // vreme
    $scope.hstep = 1;
    $scope.mstep = 5;
    
    $scope.changed = function () {
    	// sprecavanje da se rezervise za vreme koje je vec proslo
    	// ukoliko se pritinse na clear kod izbora datuma vracamo datum na danasnji
    	if ($scope.date == null){
    		$scope.date = new Date();
    	}
    	var now = new Date();
    	now.setMinutes(now.getMinutes()+35);
    	var changed = $scope.time;
    	changed.setFullYear($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate());
    	if (changed < now){
    	    $scope.time = now;
    	}
        console.log('Time changed to: ' + $scope.time);
    };
});

restaurants.controller('reserveSecondController', function($scope, reserveFactory){
	$scope.reserve = null;
	$scope.reoni = {};
	
	function init() {
	    $scope.reserve = JSON.parse(localStorage.getItem("reserve"));
	    var tables = [];
	    localStorage.setItem("tables", JSON.stringify(tables));
	    
	    reserveFactory.getStolovi($scope.reserve).success(function (data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].zauzet == false){
					$('#tables').append('<div id=\"'+ data[i].sto.id +'\"  class=\"clickgost\"><p>Table '+ data[i].sto.brojStola +'</p></div>');
					//dodavanje reona html elementu		
					$('#' + data[i].sto.id).data("reon", data[i].sto.reon);
					//editovanje boje
					$('#' + data[i].sto.id).css('background-color', data[i].sto.reon.bojaReona);
					$('#' + data[i].sto.id).css('position', 'absolute');
					$('#' + data[i].sto.id).css("left", data[i].sto.x + "px").css("top", data[i].sto.y + "px");
					$('#' + data[i].sto.id).attr("data-x", "0").attr("data-y", "0");
				} else {
					$('#tables').append('<div id=\"'+ data[i].sto.id +'\"  class=\"noclickgost\"><p>Table '+ data[i].sto.brojStola +'</p></div>');
					//dodavanje reona html elementu		
					$('#' + data[i].sto.id).data("reon", data[i].sto.reon);
					//editovanje boje
					$('#' + data[i].sto.id).css('background-color', 'black');
					$('#' + data[i].sto.id).css('position', 'absolute');
					$('#' + data[i].sto.id).css("left", data[i].sto.x + "px").css("top", data[i].sto.y + "px");
					$('#' + data[i].sto.id).attr("data-x", "0").attr("data-y", "0");
				}
			}
		});
	    
	    reserveFactory.getReoni($scope.reserve.restaurant.id).success(function (data) {
	    	$scope.reoni = data;
	    });
	}
	
	init();
	
	
	$scope.back = function() {		
		//localStorage.setItem("reserve", JSON.stringify($scope.reserve));
		window.location = "#/reserve1";
	};
	
	$scope.next = function() {
		var tables = JSON.parse(localStorage.getItem("tables"));
		$scope.reserve.tables = tables;
		if (tables.length == 0){
		    toast("You must select tables.");
		} else {
			localStorage.setItem("reserve", JSON.stringify($scope.reserve));
			window.location = "#/reserve3";
		}
	};
});

restaurants.controller('reserveThirdController', function($scope, reserveFactory){
	$scope.reserve = null;
	$scope.friends = [];
	$scope.maxInvitations = 4;
	$scope.search = "";
	$scope.orderByField = 'ime';
	$scope.reverseSort = false;
	$scope.orderByField2 = 'ime';
	$scope.reverseSort2 = false;
	
	function init() {
	    $scope.reserve = JSON.parse(localStorage.getItem("reserve"));
	    reserveFactory.getFriends($scope.reserve.creator).success(function (data) {
        	$scope.friends = data;
		});
	};
	init();
	
	$scope.myFilter = function (item) { 
	    if ((item.ime.toLowerCase().indexOf($scope.search) != -1) || (item.prezime.toLowerCase().indexOf($scope.search) != -1)){
	    	return true;
	    }
	    return false;
	};
	
	$scope.inviteFriend = function(f, index) {
		$scope.reserve.guests.splice(-1,0,f);
		$scope.friends.splice(index,1);
		//$scope.maxInvitations--;
	};
	
	$scope.removeInvite = function(f, index) {
		$scope.friends.splice(-1,0,f);
		$scope.reserve.guests.splice(index,1);
		//$scope.maxInvitations++;
	};
	
	$scope.back = function() {		
		window.location = "#/reserve2";
	};
	
	$scope.reservation = function() {		
		reserveFactory.makeReservation($scope.reserve).success(function(data) {
			if (data == "Successful created reservation"){
	    		toast(data);
	    		window.location = "#/reservations";
			} else {
				toast(data);
			}
    	});
	};
});

// da li ima odredjeno radno vreme za restoran
// da li se nahnadno mogu pozivati gosti

restaurants.controller('viewReservationsController', function($scope, viewReservationsFactory){
	$scope.reservations = {};
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"))
	    viewReservationsFactory.getReservations(user).success(function (data) {
        	$scope.reservations = data;
		});
		for (var i = 0; i < $scope.reservations.length; i++){
			if (user.email == i.kreator.email){
				i.canDelete = true;
			} else {
				i.canDelete = false;
			}
		}
	};
	init();
	
	$scope.goToReservation = function(r) {		
		localStorage.setItem("reservation", JSON.stringify(r));
		window.location = "#/reservation";
	};
	
	$scope.delete = function() {
		viewReservationsFactory.deleteReservation($scope.reservation.id).success(function (data) {
			window.location.reload();
		});
	};
	
});

restaurants.controller('reservationController', function($scope, reservationFactory){
	$scope.reservation = {};
	$scope.canAccept = false;
	$scope.canDelete = false;
	$scope.canOrder = false;
	var user = JSON.parse(localStorage.getItem("user"));
	
	$scope.noID = false;
	
	function init() {
		var path = window.location.href;
		if (path.indexOf("?id=") > -1){
			$scope.noID = false;
			
			var id = path.split("=")[1];
			
			reservationFactory.getReservation(id).success(function(data) {
				if (data != null && data != ""){
				    $scope.reservation = data;
				    $scope.reservation.pozvaniGosti.forEach(acceptInvite);
				    $scope.canAccept = checkInvite();
					$scope.canOrder = checkCanOrder();
					if (user.email == $scope.reservation.kreator.email){
						$scope.canDelete = true;
					}
					console.log("REZERVACIJA " + $scope.reservation.id);
				} else {
					$scope.noID = true;
				}
			});
		} else {
			$scope.noID = true;
		}
	}
	
	init();
	
	function acceptInvite (g){
		for (var i = 0; i < $scope.reservation.prihvatiliPoziv.length; i++){
			if (g.email == $scope.reservation.prihvatiliPoziv[i].email){
				g.prihvatio = "yes";
				return;
			}
		}
		g.prihvatio = "no";
		return;
	};
	
	// proveravam da li je korisnik vec prihavtio ili odbio poziv
	function checkInvite() {
		if (user.email == $scope.reservation.kreator.email){
			return false;
		}
		for (var i = 0; i < $scope.reservation.prihvatiliPoziv.length; i++){
			if (user.email == $scope.reservation.prihvatiliPoziv[i].email){
				return false;
			}
		}
		for (var i = 0; i < $scope.reservation.odbiliPoziv.length; i++){
			if (user.email == $scope.reservation.odbiliPoziv[i].email){
				return false;
			}
		}
		return true;
	};
	
	function checkCanOrder() {
		if (user.email == $scope.reservation.kreator.email){
			return true;
		}
		for (var i = 0; i < $scope.reservation.prihvatiliPoziv.length; i++){
			if (user.email == $scope.reservation.prihvatiliPoziv[i].email){
				return true;
			}
		}
	};
	
	$scope.accept = function() {
		reservationFactory.setAnswer($scope.reservation.id, user, "accept").success(function (data) {
			$scope.reservation.prihvatiliPoziv.splice(-1,0,user);
			window.location.reload();
		});
	};
	
	$scope.reject = function() {
		reservationFactory.setAnswer($scope.reservation.id, user, "reject").success(function (data) {
			$scope.reservation.odbiliPoziv.splice(-1,0,user);
			window.location.reload();
		});
	};
	
	$scope.order = function() {
		localStorage.setItem("reservation", JSON.stringify($scope.reservation));
		window.location = "#/reservationOrder";
	};
	
	$scope.delete = function() {
		reservationFactory.deleteReservation($scope.reservation.id).success(function (data) {
			toast(data);
			if (data == "Successful deleting"){
			    window.location = "#/reservations";
			}
		});
	};
});

restaurants.controller('reservationOrderController', function($scope, reservationOrderFactory){
	$scope.reservation = {}
	$scope.orderedFood = new Array();
	$scope.orderedDrinks = new Array();
	$scope.prepare = false;
	
	function init () {
		$scope.reservation = JSON.parse(localStorage.getItem("reservation"));
		for (var i = 0; i < $scope.reservation.jela.length; i++){
			$scope.orderedFood.splice(-1,0,$scope.reservation.jela[i].stavka)
		}
		for (var i = 0; i < $scope.reservation.pica.length; i++){
			$scope.orderedDrinks.splice(-1,0,$scope.reservation.pica[i].stavka)
		}
		$scope.prepare = $scope.reservation.spremi;
	};
	
	$scope.addMenuItem = function(i) {
		var item = {};
		item.cenaStavke = i.cenaStavke;
		item.id = i.id;
		item.nazivStavke = i.nazivStavke;
		$scope.orderedFood.splice(-1,0,item);
	}
	
	$scope.addDrinksItem = function(i) {
		var item = {};
		item.cenaStavke = i.cenaStavke;
		item.id = i.id;
		item.nazivStavke = i.nazivStavke;
		$scope.orderedDrinks.splice(-1,0,item);
	}
	
	$scope.removeMenuOrderItem = function(item, index) {
		$scope.orderedFood.splice(index,1);
	}
	
	$scope.removeDrinksOrderItem = function(item, index) {
		$scope.orderedDrinks.splice(index,1);
	}
	
	$scope.makeOrder = function() {
		reservationOrderFactory.makeOrder($scope.reservation, $scope.orderedFood, $scope.orderedDrinks, $scope.prepare).success(function(data) {			
			if (data == "Successful") {
				toast(data);
				//localStorage.setItem("reservation", JSON.stringify($scope.reservation));
				window.location = "#/reservations";
			} else {
				toast(data);
			}
			
		});
	}
	
	init();
});