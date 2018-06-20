/*
 *controller za editovanje reona 
 */
restaurants.controller('sectionsController', function($scope, reonFactory, $rootScope){
	
	$scope.section = {};
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.section = {};
    	$scope.sections = {};
    			
        reonFactory.getRestoran(user).success(function (data) {
        	$scope.section.nazivRestorana = data;
        	reonFactory.getSections(user).success(function (data) {
        		$scope.sections = data;
        	});
		});
    }

	init();
	
	$scope.removeSection = function(section) {		
		reonFactory.removeSection(section.nazivReona, section.bojaReona, section.id, $scope.section.nazivRestorana).success(function(data) {
			if (data === "Successful section deleting.") {
				var index = -1;		
				var comArr = eval( $scope.sections );
				for( var i = 0; i < comArr.length; i++ ) {
					if( comArr[i].nazivReona === section.nazivReona ) {
						index = i;
						break;
					}
				}
				if( index === -1 ) {
					toastr.info( "Something gone wrong" );
				}
				$scope.sections.splice( index, 1 );
			}
			toastr.info(data);
		}).error(function (response, status) {
			toastr.info(response);
	    });
	}
	
	$scope.addSection = function(section) {
		
		if (section.nazivReona === undefined || section.nazivReona === null) {
			toastr.info("Enter section name!");
		} else if (section.bojaReona === undefined || section.bojaReona === null) {
			toastr.info("Select section color!");
		} else {
			section.nazivRestorana = $scope.section.nazivRestorana;
			reonFactory.addSection(section).success(function(data) {
				$scope.sections.push(data);
				toastr.info("Successful adding!");
				$rootScope.$emit("CallParentMethod", {});
			}).error(function (response, status) {
				toastr.info("Unsuccessful adding!");
		    });
		}
	}	
});

/*
 *controller za stolove
 */
restaurants.controller('tablesController', function($scope, tableFactory, $rootScope) {
	
	$rootScope.$on("CallParentMethod", function(){
        init();
        reoni();
     });
	
	function reoni() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.reoniList = [];
		tableFactory.getReoni(user).success(function(data) {
			$scope.reoniList = data;
		});
	}
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		tableFactory.getStolovi(user).success(function(data) {
			for (var i = 0; i < data.length; i++) {
				$('#tables').append('<div id=\"'+ data[i].brojStola +'\"  class=\"draggable\"><p>Table '+ data[i].brojStola +'</p></div>');
				//dodavanje reona html elementu		
				$('#' + data[i].brojStola).data("reon", data[i].reon);
				$('#' + data[i].brojStola).data("brojMesta", data[i].brojMesta);
				//editovanje boje
				$('#' + data[i].brojStola).css('background-color', data[i].reon.bojaReona);
				$('#' + data[i].brojStola).css('position', 'absolute');
				$('#' + data[i].brojStola).css("left", data[i].x + "px").css("top", data[i].y + "px");
				$('#' + data[i].brojStola).attr("data-x", "0").attr("data-y", "0");
			}
		});	
	}
	
	reoni();
	init();
	
	$scope.addTable = function(table) {
		
		//provera da li postoji div sa odredjenim nazivom
		if (table === undefined || table === null) {
			toastr.info("Not allowed table with empty number!");
			return;
		}
		
		if (table.reon === undefined || table.reon === null) {
			toastr.info("Section is not selected!");
			return;
		}
		
		if (table.brojMesta === undefined || table.brojMesta === null) {
			toastr.info("Number of seats is not specified!");
			return;
		}
		
		if (table.brojStola == "tables") {
			toastr.info("Not allowed!");
			return;
		}
		
		var len = $('#' + table.brojStola).length;
		if (len > 0) {
			toastr.info("There is already a table with that number!");
			return;
		}
		
		//dodavanje stola u skup svih stolova
		$('#tables').append('<div id=\"'+ table.brojStola +'\"  class=\"draggable\"><p>Table '+ table.brojStola +'</p></div>');
		//dodavanje reona html elementu		
		$('#' + table.brojStola).data("reon", table.reon);
		$('#' + table.brojStola).data("brojMesta", table.brojMesta);
		//editovanje boje
		$('#' + table.brojStola).css('background-color', table.reon.bojaReona);
		$('#' + table.brojStola).css('position', 'absolute');
		$('#' + table.brojStola).css("left", "10px").css("top", "10px");
		$('#' + table.brojStola).attr("data-x", "0").attr("data-y", "0");
	}
	
	$scope.removeTable = function(table) {
		
		if (table === undefined || table === null) {
			toastr.info("You did not enter anything!");
			return;
		}
		
		if (table.brojStola == "tables") {
			toastr.info("Not allowed!");
			return;
		}
		
		var len = $('#' + table.brojStola).length;
		if (len > 0) {
			$('#' + table.brojStola).remove();
		} else {
			toastr.info("There is no table with that number!");
		}
	}
	
	$scope.saveTables = function() {
		//izvuci sve odgovarajuce divove
		var user = JSON.parse(localStorage.getItem("user"));
		$scope.listaStolova = {};
		$scope.listaStolova.stolovi = [];
		tableFactory.getRestoran(user).success(function (data) {
        	$scope.listaStolova.nazivRestorana = data;
        	$('.draggable').each(function(index) {
    			
    			var sto = {};
    			sto.brojStola = $(this).attr('id');
    			sto.reon = $(this).data("reon");
    			sto.brojMesta = $(this).data("brojMesta");
    			sto.x = parseFloat($(this).attr('data-x')) + parseFloat($(this).css('left'));
    			sto.y = parseFloat($(this).attr('data-y')) + parseFloat($(this).css('top'));
    			$scope.listaStolova.stolovi.push(sto);
    			
    		});
        	tableFactory.saveStolovi($scope.listaStolova).success(function(data) {
        		toastr.info(data);
        	}).error(function (response, status) {
    			toastr.info(response);
    	    });
		});
	}
});

/*
 *controller za dodeljivanje reona radniku
 */
restaurants.controller('assignSectionController', function($scope, assignSectionFactory){
	
	$scope.shift = {};
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
				
		$scope.konobariList = [];
		$scope.restoran = {};
		assignSectionFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
			assignSectionFactory.getKonobari(data).success(function (data) {
	        	$scope.konobariList = data;
			});
		});
	}
	
	function reoni() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.reoniList = [];
		assignSectionFactory.getReoni(user).success(function (data) {
			$scope.reoniList = data;
		});
	}

	init();
	reoni();
	
	$scope.assignSection = function(shift) {
		
		if (shift.section === undefined || shift.section === null) {
			toastr.info("Select section!");
		} else if (shift.bartender === undefined || shift.bartender === null) {
			toastr.info("Select worker!");
		} else {
			var nazivRestorana = $scope.restoran;		
			assignSectionFactory.assignSection(shift, nazivRestorana).success(function(data) {
				if (data != null && data != "") {
								
					toast("Successful assigning!");
				} else {
					toast("Error assinging section!");
				}
				radnici();
			});
		}
	}
});