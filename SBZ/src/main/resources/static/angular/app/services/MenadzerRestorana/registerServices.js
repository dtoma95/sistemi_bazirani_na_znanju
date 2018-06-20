/*
 *servis za registrovanje ponudjaca
 */
restaurants.factory('registerPonudjacFactory', function($http) {
	
	var factory = {};
	
	factory.registerPonudjac = function(user) {
		return $http.put('/menadzerRestorana/registerPonudjac', {"email" : user.email, "ime" : user.ime, "prezime" : user.prezime, "lozinka" : user.lozinka, "uloga" : 6});
	};
	
	return factory;
});

/*
 *servis za registrovanje radnika
 */
restaurants.factory('registerRadnikFactory', function($http) {
	var factory = {};
	
	//razmisli kako sa kuvarom
	factory.registerRadnik = function(user, nazivRestorana, datumRodjenja) {
		return $http.put('menadzerRestorana/registerRadnik', {"email" : user.email, "ime" : user.ime, "prezime" : user.prezime, "lozinka" : user.lozinka, "uloga" : user.uloga, "datumRodj" : datumRodjenja, "kBroj" : user.kBroj, "velicina" : user.velicina, "ulogaKuvara" : user.ulogaKuvara, "nazivRestorana" : nazivRestorana});
	};
	
	factory.getRadnici = function() {
		return $http.get('menadzerRestorana/slobodniRadnici');
	};
	
	factory.getTrenutniRadnici = function(nazivRestorana) {
		return $http.get('menadzerRestorana/trenutniRadnici/' + nazivRestorana);
	};
	
	factory.getRestoran = function(user) {
		return $http.get('menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.assignRadnik = function(info, nazivRestorana) {
		return $http.post('menadzerRestorana/assignRadnik', {"email" : info.radnik.email, "naziv" : nazivRestorana});
	};
	
	factory.fireRadnik = function(info, nazivRestorana) {
		return $http.post('menadzerRestorana/fireRadnik', {"email" : info.radnik.email, "naziv" : nazivRestorana});
	};
	
	return factory;
});