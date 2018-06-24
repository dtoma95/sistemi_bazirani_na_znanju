/*
 *controller za registrovanje korisnika
 */
restaurants.controller('registerKorisnikController', function($scope, registerKorisnikFactory){

	$scope.notSamePasswords = false;
	
	$scope.checkPasswords = function() {
		if ($scope.user.lozinka == $scope.user.potvrdaLozinke){
			$scope.notSamePasswords = false;
		} else {
		    $scope.notSamePasswords = true;
		}
	}
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
	}

	init();
	
	$scope.registerKorisnik = function(user, form) {		
		
		var required = form.email.$error.required || form.ime.$error.required ||
	    form.prezime.$error.required || form.lozinka.$error.required || 
	    form.potvrdaLozinke.$error.required ;

		if (required){
			toastr.error("Please fill all fields.");
		} else {
			registerKorisnikFactory.registerKorisnik(user).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		}
	}
	
});

restaurants.controller('adminSastojakController', function($scope, adminAllFactory){
	function init() {
		var path = window.location.href;
		var id = path.split("=")[1];
		$scope.editing = false;
		
		if(id != undefined && id != ""){
			adminAllFactory.getSastojak(id).success(function(data) {
				$scope.item = data;
				$scope.editing = true;
			}).error(function (response, status) {
				toastr.error(response);
	    	});
		}
	}

	init();
	
	$scope.submit = function(item, form) {		
		
		var required = form.email.$error.required;
		
		
		if (required){
			toastr.error("Please fill all fields.");
		} else if($scope.editing == false){
			adminAllFactory.addSastojak(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		} else {
			adminAllFactory.editSastojak(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		}
	}
	
});

restaurants.controller('adminSimptomController', function($scope, adminAllFactory){
	function init() {
		var path = window.location.href;
		var id = path.split("=")[1];
		$scope.editing = false;
		
		if(id != undefined && id != ""){
			adminAllFactory.getSimptom(id).success(function(data) {
				$scope.item = data;
				$scope.editing = true;
			}).error(function (response, status) {
				toastr.error(response);
	    	});
		}
	}

	init();
	
	$scope.submit = function(item, form) {		
		
		var required = form.email.$error.required;
		
		
		if (required){
			toastr.error("Please fill all fields.");
		} else if($scope.editing == false){
			adminAllFactory.addSimptom(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		} else {
			adminAllFactory.editSimptom(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		}
	}
	
});
/*
restaurants.controller('adminBolestController', function($scope, adminAllFactory){
	function init() {
		var path = window.location.href;
		var id = path.split("=")[1];
		$scope.editing = false;
		
		if(id != undefined && id != ""){
			adminAllFactory.getBolest(id).success(function(data) {
				$scope.item = data;
				$scope.editing = true;
			}).error(function (response, status) {
				toastr.error(response);
	    	});
		}
	}

	init();
	
	$scope.submit = function(item, form) {		
		
		var required = form.email.$error.required;
		
		
		if (required){
			toastr.error("Please fill all fields.");
		} else if($scope.editing == false){
			adminAllFactory.addBolest(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		} else {
			adminAllFactory.editBolest(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		}
	}
});*/

restaurants.controller('adminLekController', function($scope, adminAllFactory){
	function init() {
		var path = window.location.href;
		var id = path.split("=")[1];
		$scope.editing = false;
		
		
		adminAllFactory.getSastojci().success(function (data) {  	
        	$scope.sastojci = [];
        	$scope.sastojci = data;
		});
		
		$scope.item = {};
		$scope.item.sastojci = [];
		
		if(id != undefined && id != ""){
			adminAllFactory.getLek(id).success(function(data) {
				$scope.item = data;
				for (var i =0; i< $scope.item.sastojci.length; i++){
					for (var j = $scope.sastojci.length - 1; j >= 0; --j) {
					    if ($scope.sastojci[j].id == $scope.item.sastojci[i].id) {
					    	$scope.sastojci.splice(j,1);
					    	break;
					    }
					}
				}
				
				$scope.editing = true;
			}).error(function (response, status) {
				toastr.error(response);
	    	});
		}
	}

	init();
	
	$scope.submit = function(item, form) {		
		
		var required = form.email.$error.required;
		
		
		if (required){
			toastr.error("Please fill all fields.");
		} else if($scope.editing == false){
			adminAllFactory.addLek(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		} else {
			adminAllFactory.editLek(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		}
	}
	
	$scope.addSastojak = function(i) {
		$scope.item.sastojci.push(i);
		
		var comArr = eval( $scope.sastojci );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.sastojci.splice( index, 1 );
	}
	
	$scope.removeSastojak = function(i) {
		$scope.sastojci.push(i);
		
		var comArr = eval( $scope.item.sastojci );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.item.sastojci.splice( index, 1 );
	}
});

restaurants.controller('adminPacijentController', function($scope, adminAllFactory){
	function init() {
		var path = window.location.href;
		var id = path.split("=")[1];
		$scope.editing = false;
		
		adminAllFactory.getLekovi().success(function (data) {  	
        	$scope.lekovi = [];
        	$scope.lekovi = data;
		});
		adminAllFactory.getSastojci().success(function (data) {  	
        	$scope.sastojci = [];
        	$scope.sastojci = data;
		});
		
		$scope.item = {};
		$scope.item.alergijeLek = [];
		$scope.item.alergijeSastojci = [];
		
		if(id != undefined && id != ""){
			adminAllFactory.getPacijent(id).success(function(data) {
				$scope.item = data;
				
				for (var i =0; i< $scope.item.alergijeLek.length; i++){
					for (var j = $scope.lekovi.length - 1; j >= 0; --j) {
					    if ($scope.lekovi[j].id == $scope.item.alergijeLek[i].id) {
					    	$scope.lekovi.splice(j,1);
					    	break;
					    }
					}
				}
				for (var i =0; i< $scope.item.alergijeSastojci.length; i++){
					for (var j = $scope.sastojci.length - 1; j >= 0; --j) {
					    if ($scope.sastojci[j].id == $scope.item.alergijeSastojci[i].id) {
					    	$scope.sastojci.splice(j,1);
					    	break;
					    }
					}
				}
				$scope.editing = true;
			}).error(function (response, status) {
				toastr.error(response);
	    	});
		}
	}

	init();
	
	$scope.submit = function(item, form) {		
		var required = form.ime.$error.required ||
	    form.prezime.$error.required;

		if (required){
			toastr.error("Please fill all fields.");
		} else if($scope.editing == false){
			adminAllFactory.addPacijent(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		} else {
			adminAllFactory.editPacijent(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		}
	}
	
	$scope.addLek = function(i) {
		$scope.item.alergijeLek.push(i);
		
		var comArr = eval( $scope.lekovi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.lekovi.splice( index, 1 );
	}
	
	$scope.removeLek = function(i) {
		$scope.lekovi.push(i);
		
		var comArr = eval( $scope.item.alergijeLek );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.item.alergijeLek.splice( index, 1 );
	}
	
	$scope.addSastojak = function(i) {
		$scope.item.alergijeSastojci.push(i);
		
		var comArr = eval( $scope.sastojci );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.sastojci.splice( index, 1 );
	}
	
	$scope.removeSastojak = function(i) {
		$scope.sastojci.push(i);
		
		var comArr = eval( $scope.item.alergijeSastojci );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.item.alergijeSastojci.splice( index, 1 );
	}
});

restaurants.controller('adminBolestController', function($scope, adminAllFactory){
	function init() {
		var path = window.location.href;
		var id = path.split("=")[1];
		$scope.editing = false;
		adminAllFactory.getSimptomi().success(function (data) {  	
        	$scope.simptomi = [];
        	$scope.simptomi = data;
		});
		$scope.item = {};
		$scope.item.simptomi = [];
		$scope.item.specificniSimptomi = [];
		if(id != undefined && id != ""){
			adminAllFactory.getBolest(id).success(function(data) {
				$scope.item = data;
				for (var i =0; i< $scope.item.simptomi.length; i++){
					for (var j = $scope.simptomi.length - 1; j >= 0; --j) {
					    if ($scope.simptomi[j].id == $scope.item.simptomi[i].id) {
					    	$scope.simptomi.splice(j,1);
					    	break;
					    }
					}
				}
				for (var i =0; i< $scope.item.specificniSimptomi.length; i++){
					for (var j = $scope.simptomi.length - 1; j >= 0; --j) {
					    if ($scope.simptomi[j].id == $scope.item.specificniSimptomi[i].id) {
					    	$scope.simptomi.splice(j,1);
					    	break;
					    }
					}
				}
				
				$scope.editing = true;
			}).error(function (response, status) {
				toastr.error(response);
	    	});
		}
	}

	init();
	
	$scope.submit = function(item, form) {		
		var required = form.email.$error.required;

		if (required){
			toastr.error("Please fill all fields.");
		} else if($scope.editing == false){
			adminAllFactory.addBolest(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		} else {
			adminAllFactory.editBolest(item).success(function(data) {			
				toastr.success(data);
				init();
			}).error(function (response, status) {
				toastr.error(response);
		    });
		}
	}
	
	$scope.addSimptom = function(i) {
		$scope.item.simptomi.push(i);
		
		var comArr = eval( $scope.simptomi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.simptomi.splice( index, 1 );
	}
	
	$scope.removeSimptom = function(i) {
		$scope.simptomi.push(i);
		
		var comArr = eval( $scope.item.simptomi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.item.simptomi.splice( index, 1 );
	}
	
	$scope.addSpecSimptom = function(i) {
		$scope.item.specificniSimptomi.push(i);
		
		var comArr = eval( $scope.simptomi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.simptomi.splice( index, 1 );
	}
	
	$scope.removeSpecSimptom = function(i) {
		$scope.simptomi.push(i);
		
		var comArr = eval( $scope.item.specificniSimptomi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.item.specificniSimptomi.splice( index, 1 );
	}
});

restaurants.controller('sviPacijentiController', function($scope, adminAllFactory){
	function init() {		
		adminAllFactory.getPacijenti().success(function (data) {
        	$scope.items = {};
        	$scope.items = data;
		});
    }
	if(localStorage.getItem("user") != null)
		init();
	$scope.novi = function() {
		window.location = '#/adminPacijent';
	}
	$scope.izmeni = function(item){
		window.location = '#/adminPacijent?id='+ item.id;
	}
	$scope.obrisi = function(item) {
		adminAllFactory.deletePacijent(item).success(function (data) {
        	toastr.success("Uspeh!");
        	init();
		}).error(function (response, status) {
			toastr.error(response);
    	});
	}
});

restaurants.controller('sviKorisniciController', function($scope, adminAllFactory){
	function init() {		
		adminAllFactory.getKorisnici().success(function (data) {
        	$scope.items = {};
        	$scope.items = data;
		});
    }
	if(localStorage.getItem("user") != null)
		init();
	$scope.novi = function() {
		window.location = '#/registerKorisnik';
	}
});

restaurants.controller('sviBolestiController', function($scope, adminAllFactory){
	function init() {		
		adminAllFactory.getBolesti().success(function (data) {
        	$scope.items = {};
        	$scope.items = data;
		});
    }
	if(localStorage.getItem("user") != null)
		init();
	$scope.novi = function() {
		window.location = '#/adminBolest';
	}
	$scope.izmeni = function(item){
		window.location = '#/adminBolest?id='+ item.id;
	}
	$scope.obrisi = function(item) {
		adminAllFactory.deleteBolest(item).success(function (data) {
        	toastr.success("Uspeh!");
        	init();
		}).error(function (response, status) {
			toastr.error(response);
    	});
	}
});

restaurants.controller('sviLekoviController', function($scope, adminAllFactory){
	function init() {		
		adminAllFactory.getLekovi().success(function (data) {
        	$scope.items = {};
        	$scope.items = data;
		});
    }
	if(localStorage.getItem("user") != null)
		init();
	$scope.novi = function() {
		window.location = '#/adminLek';
	}
	$scope.izmeni = function(item){
		window.location = '#/adminLek?id='+ item.id;
	}
	$scope.obrisi = function(item) {
		adminAllFactory.deletePacijent(item).success(function (data) {
        	toastr.success("Uspeh!");
        	init();
		}).error(function (response, status) {
			toastr.error(response);
    	});
	}
});

restaurants.controller('sviSimptomiController', function($scope, adminAllFactory){
	function init() {		
		adminAllFactory.getSimptomi().success(function (data) {
        	$scope.items = {};
        	$scope.items = data;
		});
    }
	if(localStorage.getItem("user") != null)
		init();
	$scope.novi = function() {
		window.location = '#/adminSimptom';
	}
	$scope.izmeni = function(item){
		window.location = '#/adminSimptom?id='+ item.id;
	}
	$scope.obrisi = function(item) {
		adminAllFactory.deleteSimptom(item).success(function (data) {
        	toastr.success("Uspeh!");
        	init();
		}).error(function (response, status) {
			toastr.error(response);
    	});
	}
});

restaurants.controller('sviSastojciController', function($scope, adminAllFactory){
	function init() {		
		adminAllFactory.getSastojci().success(function (data) {
        	$scope.items = {};
        	$scope.items = data;
		});
    }
	if(localStorage.getItem("user") != null)
		init();
	$scope.novi = function() {
		window.location = '#/adminSastojak';
	}
	$scope.izmeni = function(item){
		window.location = '#/adminSastojak?id='+ item.id;
	}
	$scope.obrisi = function(item) {
		adminAllFactory.deleteSastojak(item).success(function (data) {
        	toastr.success("Uspeh!");
        	init();
		}).error(function (response, status) {
			toastr.error(response);
    	});
	}
});