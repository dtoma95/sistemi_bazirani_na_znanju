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
