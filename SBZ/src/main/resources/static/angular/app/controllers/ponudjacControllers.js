restaurants.controller('updatePonudjacInfoController', function($scope, updatePonudjacInfoFactory){
	
	$scope.user = {};
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		updatePonudjacInfoFactory.getPonudjacInfo(user).success(function(data) {
			$scope.user.ime = data.ime;
			$scope.user.prezime = data.prezime;
		});
	}
	
	init();
	
	$scope.updatePonudjacInfo = function(user, form) {
		var required = form.inputIme.$error.required || form.inputPrezime.$error.required;
		
		if (required) {
			toastr.info("Enter all fields!");
		} else {
			user.email = JSON.parse(localStorage.getItem("user")).email;
			updatePonudjacInfoFactory.updatePonudjacInfo(user).success(function(data) {			
				toastr.info("Successful updating info!");
			}).error(function(response, code) {
				toastr.info("Unsuccessful updating info!");
			});
		}
	}
});

restaurants.controller('offersPonudjacController', function($scope, offersPonudjacFactory, $uibModal, $rootScope){
	$scope.costPattern = /^[+-]?\d+(\.\d+)?$/;
	
	$rootScope.$on("CallParentMethod", function(){
        init();
        mojePonude();
     });
	
	$scope.opened = [];
	$scope.openDatePicker = function($event, index) {

	    $scope.opened[index] = true;
	};
	
	$scope.offer = {};
	$scope.offer.rokIsporuke = new Date();
	
	$scope.dateOptions = {
        	//dateDisabled: disabled,
            // DODATI DISABLOVANJE SVIH DATUMA PRE DANASNJEG
        	formatYear: 'yy',
        	maxDate: new Date(2025, 1, 1),
        	minDate: new Date(),
        	startingDay: 1
    };
    
    $scope.altInputFormats = 'd!/M!/yy';
    
    //otvaranje dialoga
    $scope.open = function (item) {

        var modalInstance = $uibModal.open({
          templateUrl: 'angular/partials/Ponudjac/changeOffer.html',
          controller: 'modalChangeController',
          resolve: {
            item: function () {
              return item;
            }
          }
        });

      };
    
    function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.ponudeList = [];
		
		offersPonudjacFactory.getPonude().success(function(data) {
			for (var i = 0; i < data.length; i++) {
				var datum1 = new Date(data[i].pocetakPonude);
				var datum2 = new Date(data[i].krajPonude);
				datum2.setDate(datum2.getDate()-1);
				data[i].pocetakPonude = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
				data[i].krajPonude = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
			}
			$scope.ponudeList = data;
		});
	}
    
    function mojePonude() {
    	var user = JSON.parse(localStorage.getItem("user"));
    		
    	$scope.mojePonudeList = [];
    	
    	offersPonudjacFactory.getMojePonude(user.email).success(function(data) {
    		for (var i = 0; i < data.length; i++) {
				var datum1 = new Date(data[i].rokIsporuke);
				datum1.setDate(datum1.getDate()-1);
				data[i].rokIsporuke = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
				if (data[i].garancijaIsporuke === true) {
					data[i].garancijaIsporuke = "Yes";
				} else {
					data[i].garancijaIsporuke = "No";
				}
				if (data[i].status === null) {
					data[i].status = "Not considered";
				} else if (data[i].status === true) {
					data[i].status = "Accepted";
				} else {
					data[i].status = "Declined";
				}
			}
    		$scope.mojePonudeList = data;
    	});
    }
    
	init();
	mojePonude();
    
    $scope.sendOffer = function(offer, nazivRestorana, ponudaId, form) {
    	if (offer.garancijaIsporuke === null || offer.garancijaIsporuke === undefined) {
    		toastr.info("Select delivery guarantee!");
    	} else {
    		var required = form.inputCena.$error.required || form.inputDescription.$error.required;
        	
        	var cost = form.inputCena.$error.pattern;
        	
        	if (required) {
        		toastr.info("Enter all fields");
        	} else if (cost) {
        		toastr.info("Cost is not valid");
        	} else {
        		var email = JSON.parse(localStorage.getItem("user")).email;
            	
            	var datum1 = new Date(offer.rokIsporuke);
            	datum1.setDate(datum1.getDate()+1);
            	var d1 = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
            	
            	if (offer.garancijaIsporuke === "Yes") {
            		offer.garancijaIsporuke = true;
            	} else {
            		offer.garancijaIsporuke = false;
            	}
            	
            	offersPonudjacFactory.addPonuda(offer, nazivRestorana, email, ponudaId, d1).success(function(data) {
            		toastr.info(data);
            	}).error(function (response, status) {
        			toastr.info(response);
        	    });
        	}	
    	}
    }
    
    $scope.removeOffer = function(offer) {
    	var email = JSON.parse(localStorage.getItem("user")).email;
    	
    	if (offer.garancijaIsporuke === "Yes") {
    		offer.garancijaIsporuke = true;
    	} else {
    		offer.garancijaIsporuke = false;
    	}
    	if (offer.status === "Not considered") {
			offer.status = null;
		} else if (data[i].status === "Accepted") {
			offer.status = true;
		} else {
			offer.status = false;
		}
    	
		offersPonudjacFactory.removePonuda(offer, email).success(function(data) {
			if (data === "Successful offer deleting.") {
				var index = -1;		
				var comArr = eval( $scope.mojePonudeList );
				for( var i = 0; i < comArr.length; i++ ) {
					if( comArr[i].id === offer.id ) {
						index = i;
						break;
					}
				}
				if( index === -1 ) {
					alert( "Something gone wrong" );
				}
				$scope.mojePonudeList.splice( index, 1 );
			}
			toastr.info(data);
		}).error(function (response, status) {
			toastr.info(response);
			$rootScope.$emit("CallParentMethod", {});
	    });
	}
});

//modal controller
restaurants.controller('modalChangeController', function($scope, $uibModalInstance, item, modalChangeFactory, $rootScope){
	$scope.costPattern = /^[+-]?\d+(\.\d+)?$/;
	
	$scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
	
	$scope.dateOptions = {
        	//dateDisabled: disabled,
            // DODATI DISABLOVANJE SVIH DATUMA PRE DANASNJEG
        	formatYear: 'yy',
        	maxDate: new Date(2025, 1, 1),
        	minDate: new Date(),
        	startingDay: 1
        };
    
    $scope.altInputFormats = 'd!/M!/yy';
	
	$scope.iChange = angular.copy(item);
	
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveOffer = function (iChange, form) {
		
		if (iChange.garancijaIsporuke === null || iChange.garancijaIsporuke === undefined) {
    		toastr.info("Select delivery guarantee!");
    	} else {
    		var required = form.inputCost.$error.required || form.inputDescription.$error.required;
        	
        	var cost = form.inputCost.$error.pattern;
        	
        	if (required) {
        		toastr.info("Enter all fields");
        	} else if (cost) {
        		toastr.info("Cost is not valid");
        	} else {
        		if (iChange.garancijaIsporuke === "Yes") {
            		iChange.garancijaIsporuke = true;
            	} else {
            		iChange.garancijaIsporuke = false;
            	}
        		
        		var datum1 = new Date(iChange.rokIsporuke);
        		datum1.setDate(datum1.getDate() + 1);
        		var d = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
        		
        		modalChangeFactory.changePonuda(iChange, d).success(function(data) {
        			toastr.info(data);
        			if (data === "Successful offer changing.") {
        				$uibModalInstance.close();
        				$rootScope.$emit("CallParentMethod", {});
        			}		
        		}).error(function (response, status) {
        			toastr.info(response);
        			$rootScope.$emit("CallParentMethod", {});
        	    });		
        	}
    	}
	};
});