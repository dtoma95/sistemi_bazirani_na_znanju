/*
 *servis editovanje rasporeda rada
 */
restaurants.factory('scheduleFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.getRadnici = function(nazivRestorana) {
		return $http.get('/menadzerRestorana/sviRadnici/' + nazivRestorana);
	};
	
	factory.getSchedules = function(user) {
		return $http.get('/menadzerRestorana/getRasporediRada/' + user.email);
	};
	
	factory.getSections = function(user) {
		return $http.get('/menadzerRestorana/getReoni/' + user.email);
	};
	
	factory.assignSchedule = function(rad, nazivRestorana, d1, d2) {
		return $http.put('/menadzerRestorana/assignWorkingSchedule', {"nazivRestorana" : nazivRestorana, "email" : rad.radnik.email, "pocetakRada" : d1, "krajRada" : d2, "vremePocetkaRada" : rad.vremePocetkaRada, "vremeKrajaRada" : rad.vremeKrajaRada, "reon" : rad.reon});
	};
	
	factory.removeSchedule = function(item) {
		return $http.post('/menadzerRestorana/deleteWorkingSchedule', {"id" : item.id, "nazivRestorana" : item.nazivRestorana, "email" : item.email, "pocetakRada" : item.pocetakRada, "krajRada" : item.krajRada, "vremePocetkaRada" : item.vremePocetkaRada, "vremeKrajaRada" : item.vremeKrajaRada});
	};
	
	return factory;
});

restaurants.factory('modifyScheduleFactory', function($http) {
	
	var factory = {};
	
	factory.saveSchedule = function(id, email, d1, d2, nazivRestorana) {
		return $http.post('/menadzerRestorana/changeWorkingSchedule', {"id" : id, "vreme1" : d1, "vreme2" : d2, "email" : email, "nazivRestorana" : nazivRestorana});
	};
	
	return factory;
});