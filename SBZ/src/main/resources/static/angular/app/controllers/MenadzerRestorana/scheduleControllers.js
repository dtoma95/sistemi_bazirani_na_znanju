/*
 *controller za editovanje rasporeda rada
 *za sve radnike restorana
 */
restaurants.controller('scheduleController', function($scope, scheduleFactory, $uibModal, $rootScope) {
	
	$rootScope.$on("CallParentMethod", function(){
        init();
     });
	
	$scope.rad = {};
	
	$scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    
    $scope.popup2 = {
    	opened: false
    };
    
    $scope.rad.pocetakRada = new Date();
    var d = new Date();
    d.setDate(d.getDate()+1);
    $scope.rad.krajRada = d;
    
    $scope.time1 = new Date();
    $scope.time1.setMinutes($scope.time1.getMinutes());
    
    $scope.time2 = new Date();
    $scope.time2.setMinutes($scope.time2.getMinutes());
    
    $scope.hstep = 1;
    $scope.mstep = 1;
    
    $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(2025, 1, 1),
        	minDate: new Date(),
        	startingDay: 1
        };
    
    $scope.altInputFormats = 'd!/M!/yy';
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.radniciList = [];
		$scope.rasporediList = [];
		$scope.restoran = {};
		var item = {};
		
		scheduleFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
			scheduleFactory.getRadnici($scope.restoran).success(function(data) {
				$scope.radniciList = data;
			});
			
			scheduleFactory.getSections(user).success(function(data) {
				$scope.reoniList = data;
			});
		});
		
		scheduleFactory.getSchedules(user).success(function(data) {
			for (var i = 0; i < data.length; i++) {
				var datum1 = new Date(data[i].pocetakRada);
				var datum2 = new Date(data[i].krajRada);
				datum2.setDate(datum2.getDate()-1);
				data[i].pocetakRada = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
				data[i].krajRada = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
			}
			$scope.rasporediList = data;
		});
		
		$('#reoni').hide();
	}
	
	init();
	
	$scope.update = function() {
		if ($scope.rad.radnik != undefined && $scope.rad.radnik != null) {
			if ($scope.rad.radnik.uloga === "KONOBAR") {
				$('#reoni').show();
			} else {
				$('#reoni').hide();
			}
		}	
	}
	
	$scope.removeSchedule = function(rad) {
		rad.nazivRestorana = $scope.restoran;
		scheduleFactory.removeSchedule(rad).success(function(data) {
			if (data === "Successful deleting schedule!") {
				var index = -1;		
				var comArr = eval( $scope.rasporediList );
				for( var i = 0; i < comArr.length; i++ ) {
					if( comArr[i].id === rad.id) {
						index = i;
						break;
					}
				}
				if( index === -1 ) {
					alert( "Something gone wrong" );
				}
				$scope.rasporediList.splice( index, 1 );
				toastr.info(data);
			}			
		}).error(function (response, status) {
			toastr.info("Unsuccessful deleting!");
	    });
	}
	
	$scope.assignSchedule = function(rad, time1, time2) {		
		
		if (rad.radnik === undefined || rad.radnik === null) {
			toastr.info("Select worker!");
		} else if (rad.radnik.uloga === "KONOBAR" && (rad.reon === undefined || rad.reon === null)) {
			toastr.info("Select section!");
		} else {
			var nazivRestorana = $scope.restoran;
			
			var datum1 = new Date(rad.pocetakRada);
			var datum2 = new Date(rad.krajRada);
			datum2.setDate(datum2.getDate()+1);
			var d1 = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
			var d2 = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
			
			datum1 = new Date(time1);
			datum2 = new Date(time2);
			if (datum1.getHours() < 10 && datum1.getMinutes() < 10) {
				rad.vremePocetkaRada = "0" + datum1.getHours() + ":" + "0" + datum1.getMinutes();
			} else if (datum1.getHours() >= 10 && datum1.getMinutes() < 10) {
				rad.vremePocetkaRada = datum1.getHours() + ":" + "0" + datum1.getMinutes();
			} else if (datum1.getHours() < 10 && datum1.getMinutes() > 10) {
				rad.vremePocetkaRada = "0" + datum1.getHours() + ":" + datum1.getMinutes();
			} else {
				rad.vremePocetkaRada = datum1.getHours() + ":" + datum1.getMinutes();
			}
			
			if (datum2.getHours() < 10 && datum2.getMinutes() < 10) {
				rad.vremeKrajaRada = "0" + datum2.getHours() + ":" + "0" + datum2.getMinutes();
			} else if (datum1.getHours() >= 10 && datum1.getMinutes() < 10) {
				rad.vremeKrajaRada = datum2.getHours() + ":" + "0" + datum2.getMinutes();
			} else if (datum1.getHours() < 10 && datum1.getMinutes() > 10) {
				rad.vremeKrajaRada = "0" + datum2.getHours() + ":" + datum2.getMinutes();
			} else {
				rad.vremeKrajaRada = datum2.getHours() + ":" + datum2.getMinutes();
			}
			
			scheduleFactory.assignSchedule(rad, nazivRestorana, d1, d2).success(function(data) {	
				if(data != null && data != "") {
					//definisanje itema kog dodajemo
					var item = {};
					//formatiranje vremena
					var datum1 = new Date(data.pocetakRada);
					var datum2 = new Date(data.krajRada);
					datum2.setDate(datum2.getDate()-1);
					var datumPocetka = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
					var datumKraja = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
					
					item.email = data.email;
					if (data.reon === null || data.reon === undefined) {
						item.reon = "Not needed"
					} else {
						item.reon = data.reon;
					}
					item.id = data.id;
					item.nazivRestorana = data.nazivRestorana;
					item.pocetakRada = datumPocetka;
					item.krajRada = datumKraja;
					item.vremePocetkaRada = data.vremePocetkaRada;
					item.vremeKrajaRada = data.vremeKrajaRada;
					item.uloga = data.uloga;
					
					$scope.rasporediList.push(item);
					toastr.info("Successful assigning!");
				}
			}).error(function (response, status) {
				toastr.info("Unsuccessful assigning!");
		    });
		}
	}
	
	$scope.modifySchedule = function(rad) {
		var modalInstance = $uibModal.open({
	          templateUrl: 'angular/partials/MenadzerRestorana/ChangeSchedule.html',
	          controller: 'modifyScheduleController',
	          resolve: {
	            item: function () {
	              return rad;
	            },
	            nazivRestorana : function() {
	        		return $scope.restoran;
	        	}
	          }
	        });
	}
});

restaurants.controller('modifyScheduleController', function($scope, item, nazivRestorana, modifyScheduleFactory, $uibModalInstance, $rootScope) {
	
	$scope.itemChanged = angular.copy(item);
	$scope.itemChanged.time1 = new Date();
	$scope.itemChanged.time2 = new Date();
    
    $scope.hstep = 1;
    $scope.mstep = 1;
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveSchedule = function(i) {
		
		datum1 = new Date(i.time1);
		datum2 = new Date(i.time2);
		
		var t1 = {};
		var t2 = {};
		
		if (datum1.getHours() < 10 && datum1.getMinutes() < 10) {
			t1 = "0" + datum1.getHours() + ":" + "0" + datum1.getMinutes();
		} else if (datum1.getHours() >= 10 && datum1.getMinutes() < 10) {
			t1 = datum1.getHours() + ":" + "0" + datum1.getMinutes();
		} else if (datum1.getHours() < 10 && datum1.getMinutes() > 10) {
			t1 = "0" + datum1.getHours() + ":" + datum1.getMinutes();
		} else {
			t1 = datum1.getHours() + ":" + datum1.getMinutes();
		}
		
		if (datum2.getHours() < 10 && datum2.getMinutes() < 10) {
			t2 = "0" + datum2.getHours() + ":" + "0" + datum2.getMinutes();
		} else if (datum1.getHours() >= 10 && datum1.getMinutes() < 10) {
			t2 = datum2.getHours() + ":" + "0" + datum2.getMinutes();
		} else if (datum1.getHours() < 10 && datum1.getMinutes() > 10) {
			t2 = "0" + datum2.getHours() + ":" + datum2.getMinutes();
		} else {
			t2 = datum2.getHours() + ":" + datum2.getMinutes();
		}
		
		modifyScheduleFactory.saveSchedule(i.id, i.email, t1, t2, nazivRestorana).success(function(data) {
			toastr.info(data);
			$uibModalInstance.close();
			$rootScope.$emit("CallParentMethod", {});
		}).error(function (response, status) {
			toastr.info(response);
	    });
	};
});