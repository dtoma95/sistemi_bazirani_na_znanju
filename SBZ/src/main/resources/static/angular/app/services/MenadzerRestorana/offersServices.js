/*
 *servis dodavanje ponuda
 */
restaurants.factory('offersFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.getPonude = function(user) {
		return $http.get('/menadzerRestorana/getPonude/' + user.email);
	};
	
	factory.addPonuda = function(offer, d1, d2) {
		return $http.put('/menadzerRestorana/addPonuda', {"pocetakPonude" : d1, "krajPonude" : d2, "namirnice" : offer.namirnice, "nazivRestorana" : offer.restoran});
	};
	
	factory.removePonuda = function(offer) {
		return $http.post('/menadzerRestorana/deletePonuda', {"id" : offer.id, "pocetakPonude" : offer.pocetakPonude, "krajPonude" : offer.krajPonude, "namirnice" : offer.namirnice, "nazivRestorana" : offer.restoran});
	};
	
	return factory;
});

restaurants.factory('bidderOffersFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.getPonudePonudjaca = function(nazivRestorana) {
		return $http.get('/menadzerRestorana/getPonudePonudjaca/' + nazivRestorana);
	};
	
	factory.acceptPonuda = function(offer, isporuka) {
		return $http.post('menadzerRestorana/acceptPonuda', {"id" : offer.id, "cena" : offer.cena, "rokIsporuke" : offer.rokIsporuke, "garancijaIsporuke" : isporuka,
			"opis" : offer.opis, "ponudaId" : offer.ponudaId, "nazivRestorana" : offer.nazivRestorana, "usernamePonudjaca" : offer.email});
	}
	
	factory.declinePonuda = function(offer, isporuka) {
		return $http.post('menadzerRestorana/declinePonuda', {"id" : offer.id, "cena" : offer.cena, "rokIsporuke" : offer.rokIsporuke, "garancijaIsporuke" : isporuka,
			"opis" : offer.opis, "ponudaId" : offer.ponudaId, "nazivRestorana" : offer.nazivRestorana, "usernamePonudjaca" : offer.email});
	}
	
	return factory;
});