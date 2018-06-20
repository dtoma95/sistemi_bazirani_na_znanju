/*
 *controller za registrovanje radnika
 */
restaurants.controller('registerRadnikController', function($scope, registerRadnikFactory){
	$scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	$scope.passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
	$scope.kBrojPattern = /^\d+$/;
	$scope.velicinaPattern = /^\d+$/;
	$scope.notSamePasswords = false;
	
	$scope.checkPasswords = function() {
		if ($scope.user.lozinka == $scope.user.potvrdaLozinke){
			$scope.notSamePasswords = false;
		} else {
		    $scope.notSamePasswords = true;
		}
	}
	
	$('#cooks').hide();
	
	$scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
    
    $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(),
        	startingDay: 1
    };
    
    $scope.optionsRole = [
		{ name: 'Waiter', value: '2' }, 
	    { name: 'Cook', value: '3' }, 
	    { name: 'Bartender', value: '4' }
	];
    
    $scope.optionsRoleCook = [
  		{ name: 'Cook for salads', value: '0' }, 
  	    { name: 'Cook for roasted dishes', value: '1' }, 
  	    { name: 'Cook for boiled dishes', value: '2' }
  	];
    
    $scope.change = function() {
    	if($('#userRole :selected').text() === "Cook") {
    		$('#cooks').show();
    	} else {
    		$('#cooks').hide();
    	}
    }
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.restoran = {};
		$scope.radniciList = [];
		$scope.trenutniRadniciList = [];
		registerRadnikFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
			
			registerRadnikFactory.getRadnici().success(function (data) {
	        	$scope.radniciList = data;	
			});
			
			registerRadnikFactory.getTrenutniRadnici($scope.restoran).success(function (data) {
	        	$scope.trenutniRadniciList = data;	
			});
		});
	}

	init();
	
	$scope.registerRadnik = function(user, form) {		
		if (user.datumRodj != null && user.datumRodj != undefined) {
			var datum1 = new Date(user.datumRodj);
			var datumRodjenja = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
		}
		
		var required = form.email.$error.required || form.ime.$error.required ||
	    form.prezime.$error.required || form.lozinka.$error.required || 
	    form.potvrdaLozinke.$error.required || form.datumRodj.$error.required || form.kBroj.$error.required ||
	    form.velicina.$error.required;
		
		var emailValid = form.email.$error.pattern;
		var passwordValid = form.lozinka.$error.pattern;
		var kBrojValid = form.kBroj.$error.pattern;
		var velicinaValid = form.velicina.$error.pattern;
		
		if (required){
			toastr.info("Please fill all fields.");
		} else if (emailValid) {
		    toastr.info("Email is not valid.")	
		} else if (passwordValid){
			toastr.info("Password is not valid.")
		} else if (kBrojValid){
			toastr.info("Confection number is not valid.")
		} else if (velicinaValid){
			toastr.info("Shoe size is not valid.")
		} else if($scope.notSamePasswords){
			toastr.info("Passwords are not same.")
		} else {
			var nazivRestorana = $scope.restoran;
			registerRadnikFactory.registerRadnik(user, nazivRestorana, datumRodjenja).success(function(data) {			
				toastr.info(data);
				init();
			}).error(function (response, status) {
				toastr.info(response);
		    });
		}
	}
	
	$scope.assignRadnik = function(info) {
		
		if (info === undefined || info === null) {
			toastr.info("Select an option!");
		} else {
			var nazivRestorana = $scope.restoran;
			registerRadnikFactory.assignRadnik(info, nazivRestorana).success(function(data) {				
				toastr.info("Successful assigning!");
				init();
			}).error(function (response, status, error) {
				toastr.info("Error assinging worker!");
		    });
		}	
	}
	
	$scope.fireRadnik = function(info) {
		
		if (info === undefined || info === null) {
			toastr.info("Select an option!");
		} else {
			var nazivRestorana = $scope.restoran;
			registerRadnikFactory.fireRadnik(info, nazivRestorana).success(function(data) {			
				toastr.info("Successful firing!");
				init();
			}).error(function (response, status, error) {
				toastr.info("Error firing worker!");
		    });
		}
	}
});


/*
 *controller za registrovanje ponudjaca 
 */
restaurants.controller('registerPonudjacController', function($scope, registerPonudjacFactory){
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
	
	$scope.registerPonudjac = function(user, form) {
		
		var required = form.email2.$error.required || form.ime2.$error.required ||
	    form.prezime2.$error.required || form.lozinka2.$error.required || 
	    form.potvrdaLozinke2.$error.required;
		
		var emailValid = form.email2.$error.pattern;
		var passwordValid = form.lozinka2.$error.pattern;
		
		if (required){
			toastr.info("Please fill all fields.");
		} else if (emailValid) {
		    toastr.info("Email is not valid.")	
		} else if (passwordValid){
			toastr.info("Password is not valid.")
		} else if ($scope.notSamePasswords){
			toastr.info("Passwords are not same.")
		} else {
			registerPonudjacFactory.registerPonudjac(user).success(function(data) {			
				toastr.info(data);	
			}).error(function (response, status, error) {
				toastr.info(response);
		    });
		}
	}
});