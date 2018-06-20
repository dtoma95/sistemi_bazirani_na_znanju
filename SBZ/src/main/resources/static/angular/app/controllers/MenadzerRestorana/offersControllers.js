restaurants.controller('offersController', function($scope, offersFactory){
	
	$scope.restoran = {};
	
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
    
    $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(2025, 1, 1),
        	minDate: new Date(),
        	startingDay: 1
    };
    
    $scope.offer = {};
	$scope.offer.pocetakPonude = new Date();
	var d = new Date();
	d.setDate(d.getDate() + 1)
	$scope.offer.krajPonude = d
    
    $scope.altInputFormats = 'd!/M!/yy';
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		$scope.ponudeList = [];
		
		offersFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
			offersFactory.getPonude(user).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					var datum1 = new Date(data[i].pocetakPonude);
					var datum2 = new Date(data[i].krajPonude);		
					datum2.setDate(datum2.getDate()-1);
					data[i].pocetakPonude = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
					data[i].krajPonude = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
				}
				$scope.ponudeList = data;
			});
		});
	}
	
	init();
	
	$scope.addOffer = function(offer) {		
		offer.restoran = $scope.restoran;
		offer.namirnice = [];
		
		var table = $('#offers');
		
		var trs = table.find('tr');
		
		table.find('tr').each(function (i, el) {
			var namirnica = {};
			if (i === 0) {
				return;
			}
	        var $tds = $(this).find('td');
	        namirnica.nazivNamirnice = $tds.eq(0).text();
	        namirnica.kolicinaNamirnice = $tds.eq(1).text();
	        offer.namirnice.push(namirnica);
	    });
		
		var datum1 = new Date(offer.pocetakPonude);
		var datum2 = new Date(offer.krajPonude);
		datum2.setDate(datum2.getDate()+1);
		var d1 = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
		var d2 = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
			
		offersFactory.addPonuda(offer, d1, d2).success(function(data) {
			toastr.info("Successful adding!");
			var datum1 = new Date(data.pocetakPonude);
			var datum2 = new Date(data.krajPonude);
			datum2.setDate(datum2.getDate()-1);
			data.pocetakPonude = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
			data.krajPonude = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
			$scope.ponudeList.push(data);		
		}).error(function (response, status) {
			toastr.info("Unsuccessful adding!");
	    });
	}
	
	$scope.removeOffer = function(offer) {
		offer.restoran = $scope.restoran;
		offersFactory.removePonuda(offer).success(function(data) {
			toastr.info(data);
			$('#'+offer.id).remove();
		}).error(function (response, status) {
			toastr.info(response);
	    });
	}
	
	$scope.addGroceryToOffer = function(grocery, form) {
		var required = form.inputName.$error.required || form.inputAmount.$error.required;
		
		if (required) {
			toastr.info("Enter all fields!");
		} else {
			var red = $('<tr class=\"grocery\"><td>' + grocery.name + '</td><td>' + grocery.amount + 
			'</td><td><button class=\"btn btn-primary\" onclick=\"$(this).closest(\'tr\').remove();\">Delete</button></td></tr>');
			$('#offers').append(red);
		}
	}
});

restaurants.controller('bidderOffersController', function($scope, bidderOffersFactory, $rootScope) {
	
	$rootScope.$on("CallParentMethod", function(){
        init();
     });
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
				
		$scope.restoran = {};
		$scope.ponudeList = [];
		
		bidderOffersFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
			bidderOffersFactory.getPonudePonudjaca($scope.restoran).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					for (var j = 0; j < data[i].ponudjacPonude.length; j++) {
						var datum1 = new Date(data[i].ponudjacPonude[j].rokIsporuke);
						datum1.setDate(datum1.getDate()-1);
						data[i].ponudjacPonude[j].rokIsporuke = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
						if (data[i].ponudjacPonude[j].garancijaIsporuke === true) {
							data[i].ponudjacPonude[j].garancijaIsporuke = "Yes";
						} else {
							data[i].ponudjacPonude[j].garancijaIsporuke = "No";
						}
					}	
					var datum1 = new Date(data[i].pocetakPonude);
					var datum2 = new Date(data[i].krajPonude);	
					datum2.setDate(datum2.getDate()-1);
					data[i].pocetakPonude = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
					data[i].krajPonude = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
				}
				$scope.ponudeList = data;
			});
		});
	}
	
	init();
	
	$scope.acceptOffer = function(offer) {
		if (offer.garancijaIsporuke === "Yes") {
    		var isporuka = true;
    	} else {
    		var isporuka = false;
    	}
		bidderOffersFactory.acceptPonuda(offer, isporuka).success(function(data){
			toastr.info(data);		
			$rootScope.$emit("CallParentMethod", {});
		}).error(function (response, status) {
			toastr.info(response);
	    });
	}
	
	$scope.declineOffer = function(offer) {
		if (offer.garancijaIsporuke === "Yes") {
    		var isporuka = true;
    	} else {
    		var isporuka = false;
    	}
		bidderOffersFactory.declinePonuda(offer, isporuka).success(function(data){
			toastr.info(data);
			$rootScope.$emit("CallParentMethod", {});
		}).error(function (response, status) {
			toastr.info(response);
	    });
	}
});