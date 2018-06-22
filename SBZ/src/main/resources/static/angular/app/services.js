restaurants.factory('loginFactory', function($http) {
	
	var factory = {};
	
	factory.loginKorisnik = function(user) {
		return $http.post('/login', {"username": user.email, "lozinka": user.password } );
	};
	
	return factory;
});

restaurants.factory('registerMenadzerFactory', function($http) {
	
	var factory = {};
	
	factory.registerSistemMenadzer = function(user) {
		return $http.put('/sistemMenadzer/registerSistemMenadzer', {"email" : user.email, "ime" : user.ime, "prezime" : user.prezime, "lozinka" : user.lozinka, "uloga" : 5});
	}
	
	factory.registerMenadzerRestorana = function(user) {
		return $http.put('/sistemMenadzer/registerMenadzerRestorana', {"email" : user.email, "ime" : user.ime, "prezime" : user.prezime, "lozinka" : user.lozinka, "uloga" : 1});
	}
	
	return factory;
});

/*restaurants.factory('confirmEmailFactory', function($http){
    var factory = {};
    
    factory.confirmEmail = function(info) {
    	return $http.post('/gost/confirmEmail', {"email" : info.email, "token" : info.token});
    }
    
    return factory;
});*/

restaurants.factory('changePasswordFactory', function($http) {
	
	var factory = {};
	
	factory.changePassword = function(info) {
		
		return $http.post('/changePassword', {"email" : info.email, "oldpassword" : info.oldpassword, "newpassword" : info.newpassword});
	}
	
	return factory;
});

/*restaurants.factory('friendsFactory', function($http){
	
	var factory = {};
	
	factory.getFriends = function(user){
		return $http.get('/prijatelji/getPrijatelji/' + user.email);
	}
	
	factory.addFriend = function(user, friend){
		return $http.put('/prijatelji/dodaj', {"email1" : user.email, "email2" : friend.email});
	}
	
	factory.removeFriend = function(user, friend){
		return $http.post('/prijatelji/obrisi', {"email1" : user.email, "email2" : friend.email});
	}
	
	factory.getRequests = function(user){
		return $http.get('/zahtevi/getZahtevi/' + user.email)	
	}
	
	factory.sendRequest = function(user, friendEmail){
		return $http.put('/zahtevi/posalji', {"email1" : user.email, "email2" : friendEmail});
	}
	
	factory.removeRequest = function(user, friend){
		return $http.post('/zahtevi/obrisi', {"email1" : user.email, "email2" : friend.email});
	}
	
	return factory;
});*/

restaurants.factory('registerRestoranFactory', function($http) {
	
	var factory = {};
	
	factory.registerRestoran = function(info) {
		return $http.put('/sistemMenadzer/registerRestoran',
				{"naziv" : info.naziv, "opis" : info.opis, "adresa" : info.adresa, "menadzer" : info.menadzer});
	}
	
	factory.getMenadzers = function() {
		return $http.get('/sistemMenadzer/slobodniMenadzeri');
	};
	
	return factory;
});

restaurants.factory('assignMenadzerFactory', function($http) {
	
	var factory = {};
	
	factory.assignMenadzer = function(info) {
		return $http.put('/sistemMenadzer/dodeliMenadzera',
				{"naziv" : info.naziv, "email" : info.menadzer});
	}
	
	factory.getMenadzers = function() {
		return $http.get('/sistemMenadzer/slobodniMenadzeri');
	};
	
	factory.getRestorans = function() {
		return $http.get('/sistemMenadzer/slobodniRestorani');
	};
	
	return factory;
});

/*restaurants.factory('viewRestoransFactory', function($http) {
	
	var factory = {};
	
	factory.getRestorans = function() {
		return $http.get('/gost/getRestorans');
	};
	
	return factory;
});*/

restaurants.factory('restoranFactory', function($http){
	
	var factory = {}
	
	factory.getRestoran = function(nazivRestorana){
		return $http.get('/restorani/' + nazivRestorana);
	}
	
	factory.getGrades = function(email, naziv){
		
		return $http.post('/gost/getGrades', {"naziv" : naziv, "email" : email} )
	}
	
	return factory;
});
