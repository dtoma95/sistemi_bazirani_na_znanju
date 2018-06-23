restaurants.factory('registerKorisnikFactory', function($http) {
	
	var factory = {};
	
	factory.registerKorisnik = function(user) {		
		return $http.post('/admin/registerKorisnik', user);
	}
	
	return factory;
});

restaurants.factory('adminAllFactory', function($http) {
	var factory = {};
	
	factory.getPacijent = function(id) {	
		return $http.get('/getPacijent/'+id);
	}
	factory.getSastojak = function(id) {	
		return $http.get('/getSastojak/'+id);
	}
	factory.getLek = function(id) {	
		return $http.get('/getLek/'+id);
	}
	factory.getBolest = function(id) {	
		return $http.get('/getBolest/'+id);
	}
	factory.getSimptom = function(id) {	
		return $http.get('/getSimptom/'+id);
	}
	
	factory.addPacijent = function(item) {		
		return $http.post('/admin/registerPacijent', item);
	}
	factory.addSastojak = function(item) {		
		return $http.post('/admin/addSastojak', item);
	}
	factory.addLek = function(item) {		
		return $http.post('/admin/addLek', item);
	}
	factory.addBolest = function(item) {		
		return $http.post('/admin/addBolest', item);
	}
	factory.addSimptom = function(item) {		
		return $http.post('/admin/addSimptom', item);
	}
	
	factory.editPacijent = function(item) {		
		return $http.post('/admin/editPacijent', item);
	}
	factory.editSastojak = function(item) {		
		return $http.post('/admin/editSastojak', item);
	}
	factory.editLek = function(item) {		
		return $http.post('/admin/editLek', item);
	}
	factory.editBolest = function(item) {		
		return $http.post('/admin/editBolest', item);
	}
	factory.editSimptom = function(item) {		
		return $http.post('/admin/editSimptom', item);
	}
	
	factory.getSimptomi = function() {
		return $http.get('/getSimptomi');
	}
	factory.getLekovi = function() {
		return $http.get('/getLekovi');
	}
	factory.getSastojci = function() {
		return $http.get('/getSastojci');
	}
	return factory;
});