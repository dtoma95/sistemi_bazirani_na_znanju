restaurants.factory('updateRadnikInfoFactory', function($http) {
	
	var factory = {};
	
	factory.updateRadnikInfo = function(radnik) {
		
		return $http.post('/updateRadnik', radnik);
	}
	
	factory.getInfo = function(user) {
		
		return $http.post('/getRadnikInfo', user);
	}
	
	return factory;
});

restaurants.factory('getRasporedFactory', function($http) {
	
	var factory = {};
	
	factory.getRaspored = function(user) {
		
		return $http.post('/getRaspored', {"email" : user.email, "uloga" : user.uloga
			,"fresh" : user.fresh});
	}
	
	factory.getInfo = function(user) {
		
		return $http.post('/getRadnikInfo', user);
	}
	
	return factory;
});

restaurants.factory('addPorudzbinaFactory', function($http) {
	
	var factory = {};
	
	factory.getJelovnik = function(user) {
		
		return $http.post('/getJelovnik', {"email" : user.email, "uloga" : user.uloga
			,"fresh" : user.fresh});
	}
	
	factory.getKartaPica = function(user) {
		
		return $http.post('/getKartaPica', {"email" : user.email, "uloga" : user.uloga
			,"fresh" : user.fresh});
	}
	
	factory.addPorudzbina = function(table, email, jela, pica) {
		
		return $http.put('/konobar/addPorudzbina', {"id": table, "email" : email, "jela" : jela
			,"pica" : pica});
	}
	
	return factory;
});

restaurants.factory('konobarPorudzbineFactory', function($http) {
	
	var factory = {};
	
	factory.getReoni = function(user) {
		
		return $http.post('/getReoni', user);
	}
	
	factory.getReon = function(user) {
		
		return $http.post('/konobar/getReon', user);
	}
	
	factory.getReonPorudzbine = function(user) {
		
		return $http.post('/konobar/getReonPorudzbine', user);
	}
	return factory;
});

restaurants.factory('sankerPicaFactory', function($http){
	
	var factory = {}
	
	factory.getPica = function(user){
		return $http.post('/sanker/getPica', {"email" : user.email, "uloga" : user.uloga});
	}
	
	factory.finishPice = function(item){
		return $http.post('/sanker/zavrsiPice', item);
		}
	
		
	return factory;
});

restaurants.factory('kuvarJelaFactory', function($http){
	
	var factory = {}
	
	factory.getJela = function(user){
		return $http.post('/kuvar/getJela', {"email" : user.email, "uloga" : user.uloga});
	}
	
	factory.getPreuzetaJela = function(user){
		return $http.post('/kuvar/getPreuzetaJela', {"email" : user.email, "uloga" : user.uloga});
	}
	
	factory.finishJelo = function(item){
		return $http.post('/kuvar/zavrsiJelo', item);
	}
	
	factory.takeJelo = function(item){
		return $http.post('/kuvar/preuzmiJelo', item);
	}
		
	return factory;
});

restaurants.factory('konobarPregledFactory', function($http) {
	
	var factory = {};
	
	factory.getReonPorudzbine = function(user) {
		
		return $http.post('/konobar/getReonPorudzbine', user);
	}
	
	factory.finishPorudzbina = function(user,  id) {
		
		return $http.post('/konobar/finishPorudzbina', {"user" : user, "id" : id});
	}
	
	return factory;
});

restaurants.factory('viewRezervacijeFactory', function($http) {
	
	var factory = {};
	
	factory.getReonRezervacije = function(user) {
		
		return $http.post('/konobar/getReonRezervacije', user);
	}
	
	factory.rezervacijaToPorudzbina = function(user, id) {
		
		return $http.post('/konobar/rezervacijaToPorudzbina', {"user" : user, "id": id});
	}
	
	return factory;
});

restaurants.factory('konobarEditPorudzbinaFactory', function($http) {
	
	var factory = {};
	
	factory.getPorudzbina = function(id, user) {
		
		return $http.post('/konobar/getPorudzbina', {"user" : user, "id" : id});
	}
	
	factory.finishPorudzbina = function(user,  id) {
		
		return $http.post('/konobar/finishPorudzbina', {"user" : user, "id" : id});
	}
	
	factory.getJelovnik = function(user) {
		
		return $http.post('/getJelovnik', {"email" : user.email, "uloga" : user.uloga
			,"fresh" : user.fresh});
	}
	
	factory.getKartaPica = function(user) {
		
		return $http.post('/getKartaPica', {"email" : user.email, "uloga" : user.uloga
			,"fresh" : user.fresh});
	}
	
	factory.editPorudzbina = function(user, jela, pica, id) {
		
		return $http.post('/konobar/editPorudzbina', {"user" : user, "jela" : jela
			,"pica" : pica, "id" : id});
	}
	
	return factory;
});