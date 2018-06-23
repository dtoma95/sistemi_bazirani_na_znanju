restaurants.factory('lekarPacijentiFactory', function($http) {
	
	var factory = {};
	
	factory.getPacijenti = function() {
		
		return $http.get('/getPacijenti');
	}
	
	return factory;
});

restaurants.factory('lekarDijagnozaFactory', function($http) {
	
	var factory = {};
	
	factory.getSimptomi = function() {
		
		return $http.get('/getSimptomi');
	}
	
	factory.getBolesti = function() {
		
		return $http.get('/getBolesti');
	}
	
	factory.getPacijent = function(id) {
		
		return $http.get('/getPacijent/'+id);
	}
	
	factory.getPreporuka = function(id, user, simptomi) {
		
		return $http.post('/lekar/dijagnoza/'+id, {"lekar": user, "simptomi": simptomi});
	}
	
	return factory;
});

restaurants.factory('dijagnozaLekoviFactory', function($http) {
	
	var factory = {};
	
	factory.getLekovi = function() {
		
		return $http.get('/getLekovi');
	}
	
	factory.getPacijent = function(id) {
		
		return $http.get('/getPacijent/'+id);
	}
	
	factory.validiraj = function(d, id) {
		
		return $http.post('/lekar/validacija/'+id, d);
	}
	
	factory.dodajDijagnozu = function(d, id) {
		
		return $http.post('/lekar/addDijagnoza/'+id, d);
	}
	
	return factory;
});

restaurants.factory('izvestajiFactory', function($http) {
	
	var factory = {};
	
	factory.izvestaj = function(izvestaj, lekar) {
		
		return $http.get('/lekar/izvestaj/'+izvestaj+'/'+lekar);
	}
	
	return factory;
});
