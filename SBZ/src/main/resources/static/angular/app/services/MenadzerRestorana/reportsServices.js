restaurants.factory('incomeFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.getKonobari = function(nazivRestorana) {
		return $http.get('/menadzerRestorana/sviKonobari/' + nazivRestorana);
	};
	
	factory.restaurantIncome = function(incomeReport) {
		return $http.post('/menadzerRestorana/prihodRestoran', {"nazivRestorana" : incomeReport.nazivRestorana, "pocetakPerioda" : incomeReport.pocetakPerioda,
				"krajPerioda" : incomeReport.krajPerioda});
	};
	
	factory.waiterIncome = function(incomeReport) {
		return $http.post('/menadzerRestorana/prihodKonobar', {"nazivRestorana" : incomeReport.nazivRestorana, "usernameKonobara" : incomeReport.username});
	};
	
	return factory;
});

restaurants.factory('attendanceFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.restaurantAttendanceWeek = function(attendance, datum1, datum2) {
		return $http.post('/menadzerRestorana/posecenostRestoranNedelja', {"nazivRestorana" : attendance.nazivRestorana, "pocetakPerioda" : datum1,
				"krajPerioda" : datum2});
	};
	
	factory.restaurantAttendanceDay = function(attendance, datum1) {
		return $http.post('/menadzerRestorana/posecenostRestoranDan', {"nazivRestorana" : attendance.nazivRestorana, "pocetakPerioda" : datum1,
				"krajPerioda" : datum1});
	};

	return factory;
});

restaurants.factory('restaurantMarkFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.markReport = function(mark, first, last) {
		return $http.post('/menadzerRestorana/oceneRestoran', {"nazivRestorana" : mark.nazivRestorana, "pocetakPerioda" : first,
				"krajPerioda" : last});
	};

	return factory;
});

restaurants.factory('waiterMarkFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.getKonobari = function(nazivRestorana) {
		return $http.get('/menadzerRestorana/sviKonobariInfo/' + nazivRestorana);
	};
	
	factory.markReport = function(mark, first, last) {
		return $http.post('/menadzerRestorana/oceneKonobar', {"nazivRestorana" : mark.nazivRestorana, "pocetakPerioda" : first,
				"krajPerioda" : last, "usernameKonobara" : mark.username});
	};

	return factory;
});

restaurants.factory('menuMarkFactory', function($http) {
	
	var factory = {};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getRestoran/' + user.email);
	};
	
	factory.getItems = function(user) {
		return $http.get('/menadzerRestorana/getStavkeJelovnika/' + user.email);
	};
	
	factory.markReport = function(mark, first, last) {
		return $http.post('/menadzerRestorana/oceneJelo', {"nazivRestorana" : mark.nazivRestorana, "pocetakPerioda" : first,
				"krajPerioda" : last, "nazivJela" : mark.menuItemName});
	};

	return factory;
});