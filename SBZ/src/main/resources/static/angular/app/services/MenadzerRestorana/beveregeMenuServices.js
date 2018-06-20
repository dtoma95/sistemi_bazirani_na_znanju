/*
 *servis za editovanje karte pica
 */
restaurants.factory('beveregeFactory', function($http) {
	
	var factory = {};
	
	factory.addItem = function(item) {
		return $http.put('/menadzerRestorana/addStavkuKartePica', {"nazivRestorana" : item.nazivRestorana, "nazivStavke" : item.nazivStavke, "opisStavke" : item.opisStavke, "cenaStavke" : item.cenaStavke});
	};
	
	factory.removeItem = function(nazivStavke, opisStavke, cenaStavke, id, nazivRestorana) {
		return $http.post('/menadzerRestorana/deleteStavkuKartePica', {"id" : id, "nazivRestorana" : nazivRestorana, "nazivStavke" : nazivStavke, "opisStavke" : opisStavke, "cenaStavke" : cenaStavke});
	};
	
	factory.getItems = function(user) {
		return $http.get('/menadzerRestorana/getStavkeKartePica/' + user.email);
	};
	
	return factory;
});

/*
 *servis editovanje jelovnika
 */
restaurants.factory('menuFactory', function($http) {
	
	var factory = {};
	
	factory.addItem = function(item) {
		return $http.put('/menadzerRestorana/addStavkuJelovnika', {"nazivRestorana" : item.nazivRestorana, "nazivStavke" : item.nazivStavke, "opisStavke" : item.opisStavke, "cenaStavke" : item.cenaStavke});
	};
	
	factory.removeItem = function(nazivStavke, opisStavke, cenaStavke, id, nazivRestorana) {
		return $http.post('/menadzerRestorana/deleteStavkuJelovnika', {"id" : id, "nazivRestorana" : nazivRestorana, "nazivStavke" : nazivStavke, "opisStavke" : opisStavke, "cenaStavke" : cenaStavke});
	};
	
	factory.getRestoran = function(user) {
		return $http.get('/menadzerRestorana/getStavkeJelovnika/' + user.email);
	};
	
	return factory;
});

restaurants.factory('drinksChangeFactory', function($http) {
	
	var factory = {};
	
	factory.changeDrinkItem = function(item, nazivRestorana) {
		return $http.post('/menadzerRestorana/modifyStavkuKartePica', {"id" : item.id, "nazivRestorana" : nazivRestorana, "nazivStavke" : item.nazivStavke, "opisStavke" : item.opisStavke, "cenaStavke" : item.cenaStavke});
	};
	
	return factory;
});

restaurants.factory('menusChangeFactory', function($http) {
	
	var factory = {};
	
	factory.changeMenuItem = function(item, nazivRestorana) {
		return $http.post('/menadzerRestorana/modifyStavkuJelovnika', {"id" : item.id, "nazivRestorana" : nazivRestorana, "nazivStavke" : item.nazivStavke, "opisStavke" : item.opisStavke, "cenaStavke" : item.cenaStavke});
	};
	
	return factory;
});