/*
 * 
 * var socket = new SockJS('/nekiEndpoint');
	var stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		var path = window.location.href;
		var id = path.split("=")[1];
		stompClient.subscribe("/javiGotovo/" + id, function(data) {
			init();
		});

	});
 */

restaurants.controller('lekarPacijentiController', function($scope, lekarPacijentiFactory){
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		lekarPacijentiFactory.getPacijenti().success(function (data) {
        	$scope.items = {};
        	$scope.items = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.dijagnoza = function(item){
		window.location = '#/lekarDijagnoza?id='+ item.id;
	}
	
	$scope.viewItem = function(item) {
		window.location = '#/pacijent?id='+ item.id;
	}
	
});


restaurants.controller('lekarDijagnozaController', function($scope, lekarDijagnozaFactory){
	
	
	
	function init() {
		
		lekarDijagnozaFactory.getSimptomi().success(function (data) {
        	
        	$scope.simptomi = {};
        	$scope.mojiSimptomi = [];
        	$scope.simptomi = data;
		});
		
		lekarDijagnozaFactory.getBolesti().success(function (data) {
        	
        	$scope.bolesti = {};
        	$scope.bolesti = data;
		});
		
		var path = window.location.href;
		var id = path.split("=")[1];
		lekarDijagnozaFactory.getPacijent(id).success(function (data) {
			
        	$scope.pacijent = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.izaberiBolest = function(i){
		var path = window.location.href;
		var id = path.split("=")[1];
		
		var user = JSON.parse(localStorage.getItem("user"));
		var dijagnoza = {"lekar" : user, "simptomi" : $scope.mojiSimptomi, "bolest" : i}

		localStorage.setItem("dijagnoza", JSON.stringify(dijagnoza));
		window.location = '#/dijagnozaLekovi?id='+ id;
		
	}

	$scope.preporuci = function() {
		var path = window.location.href;
		var id = path.split("=")[1];
		var user = JSON.parse(localStorage.getItem("user"));
		
		lekarDijagnozaFactory.getPreporuka(id, user, $scope.mojiSimptomi).success(function (data) {
			
        	$scope.preporuka = data;
		});
	}
	
	$scope.addSimptom = function(i) {
		$scope.mojiSimptomi.push(i);
		
		var comArr = eval( $scope.simptomi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.simptomi.splice( index, 1 );
	}
	
	$scope.removeSimptom = function(i) {
		$scope.simptomi.push(i);
		
		var comArr = eval( $scope.mojiSimptomi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.mojiSimptomi.splice( index, 1 );
	}
	
});

restaurants.controller('dijagnozaLekoviController', function($scope, dijagnozaLekoviFactory){
	function init() {
		
		dijagnozaLekoviFactory.getLekovi().success(function (data) {
			for (var i = 0; i < data.length; i++) {
        		data[i].sastojciStr = "";
        		for (var j = 0; j < data[i].sastojci.length; j++) {
            		data[i].sastojciStr += data[i].sastojci[j].naziv + ", ";
            		
            	}
        		data[i].sastojciStr = data[i].sastojciStr.substring(0, data[i].sastojciStr.length - 2);
        	}
			
        	$scope.lekovi = {};
        	$scope.mojiLekovi = [];
        	$scope.lekovi = data;
		});
		
		var path = window.location.href;
		var id = path.split("=")[1];
		dijagnozaLekoviFactory.getPacijent(id).success(function (data) {
			
        	$scope.pacijent = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.dodajDijagnozu = function(){
		var dijagnoza = JSON.parse(localStorage.getItem("dijagnoza"));
		dijagnoza.propisano = $scope.mojiLekovi;
		var path = window.location.href;
		var id = path.split("=")[1];
		
		//var dijagnoza = {"lekar" : user, "simptomi" : $scope.mojiSimptomi, "bolest" : i}
		dijagnozaLekoviFactory.validiraj(dijagnoza, id).success(function (data) {
			$scope.alergije = [];
			
			for (var i = 0; i < data.lekovi.length; i++) {
        		data.lekovi[i].tipAl = "Lek";
        		$scope.alergije.push(data.lekovi[i]);
        	}
			for (var j = 0; j < data.sastojci.length; j++) {
        		data.sastojci[j].tipAl = "Sastojak";
        		$scope.alergije.push(data.sastojci[j]);
        	}
			if($scope.alergije.length == 0){
				$scope.alergije = undefined;
				dijagnozaLekoviFactory.dodajDijagnozu(dijagnoza, id).success(function (data) {
					toast("Uspesno dodata Dijagnoza");
					window.location = '#/lekar';
				});
			}
			else
				toast("Error: Pacijent je alergican na neke od lekova ili sastojaka");
		});
	}
	
	$scope.addLek = function(i) {
		$scope.mojiLekovi.push(i);
		
		var comArr = eval( $scope.lekovi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.lekovi.splice( index, 1 );
	}
	
	$scope.removeLek = function(i) {
		$scope.lekovi.push(i);
		
		var comArr = eval( $scope.mojiLekovi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.mojiLekovi.splice( index, 1 );
	}
	
});

restaurants.controller('izvestajiController', function($scope, izvestajiFactory){
	function init() {
		
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.izvestaj = function(izvestaj){
		var user = JSON.parse(localStorage.getItem("user"));
		$scope.pressed = izvestaj;
		//var dijagnoza = {"lekar" : user, "simptomi" : $scope.mojiSimptomi, "bolest" : i}
		izvestajiFactory.izvestaj(izvestaj, user.username).success(function (data) {
			$scope.pacijenti = data;
			
		});
	}
	
	$scope.viewItem = function(item) {
		window.location = '#/pacijent?id='+ item.id;
	}
	
});
