restaurants.factory('updateRestaurantFactory', function($http) {
	
	var factory = {};
	
	factory.getRestaurant = function(user) {
		return $http.get('/menadzerRestorana/getRestoranInfo/' + user.email);
	};
	
	factory.updateRestoranInfo = function(info, user) {
		return $http.post('/menadzerRestorana/updateRestoranInfo/' + user.email, {"naziv" : info.naziv, "adresa" : info.adresa, "opis" : info.opis});
	};
	
	return factory;
	
});