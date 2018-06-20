
restaurants.controller('navBarSankerController', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null || user.uloga != "SANKER"){
		window.location = "#/";		
	}
	else if(user.fresh == true){
		window.location = "#/changePassword";
	}
	
	$scope.logout = function(){
    	localStorage.removeItem("user");
    }	
	
});

restaurants.controller('navBarKuvarController', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null || user.uloga != "KUVAR"){
		window.location = "#/";		
	}
	else if(user.fresh == true){
		window.location = "#/changePassword";
	}
	
	$scope.logout = function(){
    	localStorage.removeItem("user");
    }	
	
});
	

restaurants.controller('navBarKonobarController', function($scope, konobarPorudzbineFactory){
	var user = JSON.parse(localStorage.getItem("user"));
	
	if(user == null || user.uloga != "KONOBAR"){
		window.location = "#/";		
	}
	else if(user.fresh == true){
		window.location = "#/changePassword";
	}
	else{
		konobarPorudzbineFactory.getReonPorudzbine(user).success(function (data) {
			var socket = new SockJS('/nekiEndpoint');
			var stompClient = Stomp.over(socket);
			stompClient.connect({}, function(frame) {
				for (var i = 0; i < data.length; i++) {
					stompClient.subscribe("/javiGotovo/" + data[i].id, function(data) {
						var message = data.body;
						toastr.info(message);
					});
				}
			});
			
			
		});
	}
	$scope.logout = function(){
    	localStorage.removeItem("user");
    }	
	
});
	
restaurants.controller('navBarController', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null){
		window.location = "#/";		
	}
	else if(user.uloga != "KONOBAR" && user.uloga != "KUVAR" && user.uloga != "SANKER"){
		window.location = "#/";	
	}
	
	$scope.getInclude = function() {
		var user = JSON.parse(localStorage.getItem("user"));
		if(user == null)
			return;
		var retval = JSON.parse(localStorage.getItem("user")).uloga;
		if(retval == "SANKER"){
			return "angular/partials/Radnik/sankerNavBar.html";
		}
		else if (retval == "KUVAR"){
			return "angular/partials/Radnik/kuvarNavBar.html";
		}
		else if (retval == "KONOBAR"){
			return "angular/partials/Radnik/konobarNavBar.html";
		}
		return "";
	}
});


restaurants.controller('updateRadnikInfoController', function($scope, updateRadnikInfoFactory){
	
	$scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	
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
    function init() {
    	$scope.radnik = {}
    	var user = JSON.parse(localStorage.getItem("user"));
		
    	updateRadnikInfoFactory.getInfo(user).success(function (data) {
			$scope.radnik = {};
			datum1 = new Date(data.datumRodj);
			$scope.radnik = data;
    		
		});
    }
    
	if(localStorage.getItem("user") != null)
		init();
    
	
	$scope.updateRadnikInfo = function() {
		
		$scope.radnik.email = JSON.parse(localStorage.getItem("user")).email;
		var datum1 = new Date($scope.radnik.datumRodj);
		$scope.radnik.datumRodj = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
		updateRadnikInfoFactory.updateRadnikInfo($scope.radnik).success(function(data) {			
			if (data == "true") {
				toastr.info("Success");
				window.location = "#/radnik";
			} else {
				if(data == "")
					toast("Unsuccessful, please fill out all the fields properly!");
				else
					toast(data);
			}
			
		});
	}
});


restaurants.controller('getRasporedController', function($scope, getRasporedFactory){
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		if(user.uloga != "KONOBAR" && user.uloga != "KUVAR" && user.uloga != "SANKER")
			return;
		getRasporedFactory.getInfo(user).success(function (data) {
			$scope.radnik = {};
			datum1 = new Date(data.datumRodj);
			data.birth = 
    			datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear());
    		
			if(data.uloga == "KONOBAR"){
				data.role = "Waiter";
				if(data.reon == null)
					data.section = "N/A"
				else
					data.section = data.reon.nazivReona;
			}
			else if(data.uloga == "KUVAR"){
				data.role = "Cook";
				if(data.ulogaKuvara == "KUVARZASALATE")
					data.cookrole = "Salads"
				else if(data.ulogaKuvara == "KUVARZAKUVANAJELA")
					data.cookrole = "Boiled dishes"
				else if(data.ulogaKuvara == "KUVARZAPECENAJELA")
					data.cookrole = "Roasted dishes"
			}
			else if(data.uloga == "SANKER")
				data.role = "Bartender";
			
			$scope.radnik = data;
    		
		});
			
		getRasporedFactory.getRaspored(user).success(function (data) {
			$scope.items = {};
        	var datum1;
        	var datum2;
        	for (var i = 0; i < data.length; i++) {
        		datum1 = new Date(data[i].pocetakRada);
        		datum2 = new Date(data[i].krajRada);
        		data[i].pocetakRada = 
        			datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear());
        		data[i].krajRada = 
        			datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear());
        		
        	}
        	$scope.items = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
});

restaurants.controller('addPorudzbinaController', function($scope, addPorudzbinaFactory){
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		addPorudzbinaFactory.getJelovnik(user).success(function (data) {
        	
        	$scope.menu = {};
        	$scope.menuOrder = [];
        	$scope.menu = data.stavke;
		});
		
		addPorudzbinaFactory.getKartaPica(user).success(function (data) {
        	
        	$scope.drinks = {};
        	$scope.drinksOrder = [];
        	$scope.drinks = data.stavke;
		});
    }

	$scope.addMenuItem = function(i) {
		var itemm = {};
		itemm.cenaStavke = i.cenaStavke;
		itemm.id = i.id;
		itemm.nazivStavke = i.nazivStavke;
		$scope.menuOrder.push(itemm);
	}
	
	$scope.addDrinksItem = function(i) {
		var itemm = {};
		itemm.cenaStavke = i.cenaStavke;
		itemm.id = i.id;
		itemm.nazivStavke = i.nazivStavke;
		$scope.drinksOrder.push(itemm);
	}
	
	$scope.removeMenuOrderItem = function(item) {
				
		var comArr = eval( $scope.menuOrder );
		var index = comArr.indexOf(item);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.menuOrder.splice( index, 1 );
		toast(data);
	}
	
	$scope.removeDrinksOrderItem = function(item) {
		
		var comArr = eval( $scope.drinksOrder );
		var index = comArr.indexOf(item);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.drinksOrder.splice( index, 1 );
		toast(data);
	}
	
	$scope.addPorudzbina = function() {
		var user = JSON.parse(localStorage.getItem("user"));
		var path = window.location.href;
		var table = path.split("=")[1];
		addPorudzbinaFactory.addPorudzbina(table, user.email,$scope.menuOrder, $scope.drinksOrder ).success(function(data) {			
			if (data == "true") {
				toastr.info("Success");
				window.location = "#/konobarPregled";	
			} else {
				toast(data);
			}
			
		});
	}
	
	if(localStorage.getItem("user") != null)
		init();
	
});

restaurants.controller('konobarPorudzbineController', function($scope, konobarPorudzbineFactory){
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		konobarPorudzbineFactory.getReon(user).success(function (data) {
			$scope.myreon = {};
			$scope.myreon = data;
		});
		
		
		konobarPorudzbineFactory.getReoni(user).success(function (data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].reon.id == $scope.myreon.id){
					$('#tables').append('<div id=\"'+ data[i].id +'\"  class=\"clickradnik\"><p>Table '+ data[i].brojStola +'</p></div>');
				}
				else{
					$('#tables').append('<div id=\"'+ data[i].id +'\"  class=\"notmyreon\"><p>Table '+ data[i].brojStola +'</p></div>');
				}
				//dodavanje reona html elementu		
				$('#' + data[i].id).data("reon", data[i].reon);
				//editovanje boje
				$('#' + data[i].id).css('background-color', data[i].reon.bojaReona);
				$('#' + data[i].id).css('position', 'absolute');
				$('#' + data[i].id).css("left", data[i].x + "px").css("top", data[i].y + "px");
				$('#' + data[i].id).attr("data-x", "0").attr("data-y", "0");
			}
		});
		
		
    }

	if(localStorage.getItem("user") != null)
		init();
	
});

restaurants.controller('sankerPicaController', function($scope, sankerPicaFactory){
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		sankerPicaFactory.getPica(user).success(function (data) {
        	
        	$scope.items = {};
        	$scope.items = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.removeItem = function(item) {
		
		sankerPicaFactory.finishPice(item).success(function(data) {
			var index = -1;		
			var comArr = eval( $scope.items );
			for( var i = 0; i < comArr.length; i++ ) {
				if( comArr[i].id === item.id ) {
					index = i;
					break;
				}
			}
			if( index === -1 ) {
				alert( "Something gone wrong" );
			}
			$scope.items.splice( index, 1 );
			toastr.info("Drink finished.");
		});
	}
	
});

restaurants.controller('kuvarJelaController', function($scope, kuvarJelaFactory){
	
	function update(){
		var user = JSON.parse(localStorage.getItem("user"));
		kuvarJelaFactory.getJela(user).success(function (data) {
        	$scope.items = data;
		});
		kuvarJelaFactory.getPreuzetaJela(user).success(function (data) {
        	$scope.preuzeto = data;
		});
	}
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		$scope.items = {};
		$scope.preuzeto = {};
		update();

    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.takeOrder = function(item) {
		var user = JSON.parse(localStorage.getItem("user"));
		item.user = user;
		
		kuvarJelaFactory.takeJelo(item).success(function(data) {
			toastr.info(data);
			update();
		});
	}
	
	$scope.finishOrder = function(item) {
		var user = JSON.parse(localStorage.getItem("user"));
		item.user = user;
		
		kuvarJelaFactory.finishJelo(item).success(function(data) {
			toastr.info(data);
			update();
		});
	}
	
});

restaurants.controller('konobarPregledController', function($scope, konobarPregledFactory){
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		konobarPregledFactory.getReonPorudzbine(user).success(function (data) {
        	
        	$scope.items = {};
        	var datum1;
        	var state;
        	for (var i = 0; i < data.length; i++) {
        		datum1 = new Date(data[i].datum);
        		data[i].datum = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000)+
        			" " + datum1.getHours() + ":" + (datum1.getMinutes());
        		state = true;
        		for(var j = 0; j < data[i].jela.length; j++){
        			if(data[i].jela[j].stanje != "GOTOVO"){
        				state = false; 
        				break;
        			}
        		}
        		if(state == true){
        			for(var j = 0; j < data[i].pica.length; j++){
        				if(data[i].pica[j].gotovo != true){
        					state = false;
        					break;
        				}
        			}
        		}
        		if(state){
        			data[i].state = "Completed";
        		}
        		else{
        			data[i].state = "Incomplete";
        		}
        	}
        	$scope.items = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.finishPorudzbina = function(item){
		var user = JSON.parse(localStorage.getItem("user"));
		konobarPregledFactory.finishPorudzbina(user,
				item.id).success(function (data) {
					toastr.info("Order Finished Successfuly");
					init();
		});
		
	}
	
	$scope.viewItem = function(item) {
		window.location = '#/konobarEditPorudzbina?id='+ item.id;
	}
	
});

restaurants.controller('konobarEditPorudzbinaController', function($scope, konobarEditPorudzbinaFactory){
	var socket = new SockJS('/nekiEndpoint');
	var stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		var path = window.location.href;
		var id = path.split("=")[1];
		stompClient.subscribe("/javiGotovo/" + id, function(data) {
			init();
		});

	});
	
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		konobarEditPorudzbinaFactory.getJelovnik(user).success(function (data) {
        	
        	$scope.menu = {};
        	$scope.menuOrder = [];
        	$scope.menu = data.stavke;
		});
		
		konobarEditPorudzbinaFactory.getKartaPica(user).success(function (data) {
        	
        	$scope.drinks = {};
        	$scope.drinksOrder = [];
        	$scope.drinks = data.stavke;
		});
		
		var path = window.location.href;
		var id = path.split("=")[1];
		konobarEditPorudzbinaFactory.getPorudzbina(id, user).success(function (data) {
			datum1 = new Date(data.datum);
    		data.datum = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000)+
    			" " + datum1.getHours() + ":" + (datum1.getMinutes());
        	
        	$scope.jela = {};
        	$scope.pica = {};
        	
        	$scope.unfinishedJela = [];
        	$scope.unfinishedPica = [];
        	var total = 0;
        	var lista = data.jela;
        	for (var i = 0; i < lista.length; i++) {
        		total += lista[i].stavka.cenaStavke;
        		if(lista[i].stanje == "GOTOVO"){
        			lista[i].state = "Completed";
        		}
        		else if (lista[i].stanje == "PREUZETO"){
        			lista[i].state = "Preparing"
        		}
        		else{
        			$scope.unfinishedJela.push(lista[i]);
        			lista[i].state = "Incomplete";
        		}
        	}
        	$scope.jela = lista
        	
        	lista = data.pica;
        	for (var i = 0; i < lista.length; i++) {
        		total += lista[i].stavka.cenaStavke;
        		if(lista[i].gotovo == true){
        			lista[i].state = "Completed";
        		}
        		else{
        			$scope.unfinishedPica.push(lista[i]);
        			lista[i].state = "Incomplete";
        		}
        	}
        	$scope.pica = lista;
        	
        	data.total = total;
        	$scope.order = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.finishPorudzbina = function(){
		var user = JSON.parse(localStorage.getItem("user"));
		konobarEditPorudzbinaFactory.finishPorudzbina(user,
				$scope.order.id).success(function (data) {
					toastr.info("Order Finished Successfuly");
					window.location = "#/konobarPregled";
		});
		
	}
	
	$scope.sendChanges = function() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		konobarEditPorudzbinaFactory.editPorudzbina(user, $scope.unfinishedJela,
				$scope.unfinishedPica, $scope.order.id).success(function (data) {
					if(data == "true")
						toastr.info("Order changed successfully");
					else
						toast(data);
					init();
			
		});
	}
	
	$scope.addMenuItem = function(i) {
		var itemm = {};
		itemm.id = i.id;
		itemm.stavka = i;
		$scope.unfinishedJela.push(itemm);
	}
	
	$scope.addDrinksItem = function(i) {
		var itemm = {};
		itemm.id = i.id;
		itemm.stavka = i;
		$scope.unfinishedPica.push(itemm);
	}
	
	$scope.removeMenuOrderItem = function(item) {
				
		var comArr = eval( $scope.unfinishedJela );
		var index = comArr.indexOf(item);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.unfinishedJela.splice( index, 1 );
		
	}
	
	$scope.removeDrinksOrderItem = function(item) {
		
		var comArr = eval( $scope.unfinishedPica );
		var index = comArr.indexOf(item);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.unfinishedPica.splice( index, 1 );
		
	}
});

restaurants.controller('viewRezervacijeController', function($scope, viewRezervacijeFactory){
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		viewRezervacijeFactory.getReonRezervacije(user).success(function (data) {
			var HALF_HOUR = 30 * 60 * 1000;
        	$scope.items = {};
        	var datum1;
        	var now = new Date();
        	for (var i = 0; i < data.length; i++) {
        		datum1 = new Date(data[i].datumIVreme);
        		data[i].datum = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000)+
        			" " + datum1.getHours() + ":" + (datum1.getMinutes());
        		if(data[i].spremi == true){
        			data[i].ready = "Yes";
        		}
        		else{
        			data[i].ready = "No";
        		}
        		
        		
        		if((datum1 - now) > HALF_HOUR){
        			data[i].state = false;
        		}
        		else{
        			data[i].state = true;
        		}
        	}
        	$scope.items = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.createOrder = function(item) {
		
		viewRezervacijeFactory.rezervacijaToPorudzbina(JSON.parse(localStorage.getItem("user")), item.id).success(function(data) {
			if(data == "true")
				toastr.info("Order created successfully");
			else
				toast("Something went wrong! Please try again.");
			init();
		});
	}
	
});