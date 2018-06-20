restaurants.factory('updatePonudjacInfoFactory', function($http) {
	
	var factory = {};
	
	factory.updatePonudjacInfo = function(user) {		
		return $http.post('/ponudjac/updatePonudjacInfo', {"email" : user.email, "ime" : user.ime,
			"prezime" : user.prezime});
	}
	
	factory.getPonudjacInfo = function(user) {		
		return $http.get('/ponudjac/getPonudjac/' + user.email);
	}
	
	return factory;
});

restaurants.factory('offersPonudjacFactory', function($http) {
	
	var factory = {};
	
	factory.getPonude = function() {
		return $http.get('/ponudjac/getPonude');
	}
	
	factory.getMojePonude = function(email) {
		return $http.get('/ponudjac/getPonude/' + email);
	}
	
	factory.addPonuda = function(offer, nazivRestorana, email, ponudaId, d) {
		return $http.put('ponudjac/addPonuda', {"cena" : offer.cena, "rokIsporuke" : d, "garancijaIsporuke" : offer.garancijaIsporuke,
			"opis" : offer.opis, "ponudaId" : ponudaId, "nazivRestorana" : nazivRestorana, "usernamePonudjaca" : email});
	}
	
	factory.removePonuda = function(offer, email) {
		return $http.post('ponudjac/deletePonuda', {"id" : offer.id, "cena" : offer.cena, "rokIsporuke" : offer.rokIsporuke, "garancijaIsporuke" : offer.garancijaIsporuke,
			"opis" : offer.opis, "ponudaId" : offer.ponudaId, "nazivRestorana" : offer.nazivRestorana, "usernamePonudjaca" : email});
	}
	
	return factory;
});

restaurants.factory('modalChangeFactory', function($http) {
	
	var factory = {};
	
	factory.changePonuda = function(offer, d) {
		return $http.post('ponudjac/changePonuda', {"id" : offer.id, "cena" : offer.cena, "rokIsporuke" : d, "garancijaIsporuke" : offer.garancijaIsporuke,
			"opis" : offer.opis, "ponudaId" : offer.ponudaId, "nazivRestorana" : offer.nazivRestorana, "usernamePonudjaca" : offer.usernamePonudjaca});
	}
	
	return factory;
});