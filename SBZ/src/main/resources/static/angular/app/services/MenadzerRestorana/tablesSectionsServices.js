/*
 *servis editovanje reona
 */
restaurants.factory('reonFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.addSection = function(item) {
		return $http.put('/menadzerRestorana/addReon', {"nazivRestorana" : item.nazivRestorana, "nazivReona" : item.nazivReona, "bojaReona" : item.bojaReona});
	};
	
	factory.removeSection = function(nazivReona, bojaReona, id, nazivRestorana) {
		return $http.post('/menadzerRestorana/deleteReon', {"id" : id, "nazivRestorana" : nazivRestorana, "nazivReona" : nazivReona, "bojaReona" : bojaReona});
	};
	
	factory.getSections = function(user) {
		return $http.get('/menadzerRestorana/getReoni/' + user.email);
	};
	
	return factory;
});

/*
 *servis editovanje stolova
 */
restaurants.factory('tableFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.getReoni = function(user) {
		return $http.get('/menadzerRestorana/getReoni/' + user.email);
	};
	
	factory.saveStolovi = function(listaStolova) {
		return $http.post('/menadzerRestorana/saveStolovi', {"stolovi" : listaStolova.stolovi, "nazivRestorana" : listaStolova.nazivRestorana});
	};
	
	factory.getStolovi = function(user) {
		return $http.get('/menadzerRestorana/getStolovi/' + user.email);
	};
	
	return factory;
});

/*
 *servis dodeljivanje reona konobarima
 */
restaurants.factory('assignSectionFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.getReoni = function(user) {
		return $http.get('/menadzerRestorana/getReoni/' + user.email);
	};
	
	factory.getKonobari = function(nazivRestorana) {
		return $http.get('/menadzerRestorana/sviKonobari/' + nazivRestorana);
	};
	
	factory.assignSection = function(shift, nazivRestorana) {
		return $http.put('/menadzerRestorana/assignSection/', {"id" : shift.section.id, "nazivReona" : shift.section.nazivReona, "nazivRestorana" : nazivRestorana, "email": shift.bartender.email});
	};
	
	return factory;
});