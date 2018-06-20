restaurants.factory('registerGostFactory', function($http) {
	var factory = {};
	
	factory.registerGost = function(user) {
		return $http.put('/gost/registerGost', {"email" : user.email, "ime" : user.ime, "prezime" : user.prezime, "lozinka" : user.lozinka, "uloga" : 0});
	}
	
	return factory;
});

restaurants.factory('confirmEmailFactory', function($http){
    var factory = {};
    
    factory.confirmEmail = function(info) {
    	return $http.post('/gost/confirmEmail', {"email" : info.email, "token" : info.token});
    }
    
    factory.confirm = function(token) {
    	return $http.post('/gost/confirm/' + token);
    }
    return factory;
});

restaurants.factory('gostFactory', function($http){
	
	var factory = {}
	
	factory.getGost = function(u){
		return $http.get('/gost/getGost/' + u.email);
	}
	
	factory.getNumberOfVisits = function(u){
		return $http.get('/gost/getNumberOfVisits/' + u.email);
	}
	
	factory.update = function(email, newInfo, changePassword){
		return $http.post('/gost/update/', {"email": email, "ime": newInfo.firstName, "prezime": newInfo.lastName,
			"staraLozinka": newInfo.oldPassword, "izmenaLozinke": changePassword, "novaLozinka": newInfo.newPassword,
			"potvrdaLozinke": newInfo.confirmPassword});
	}
	
	return factory;
});

restaurants.factory('profileFactory', function($http){
	var factory = {};
	
	factory.getGost = function(id){
		return $http.get('/gost/getGostByID/' + id);
	}
	
	factory.getNumberOfVisits = function(user){
		return $http.get('/gost/getNumberOfVisits/' + user.email);
	}
	
	return factory;
});

restaurants.factory('friendsFactory', function($http){
	
	var factory = {};
	
	factory.getGuests = function(){
		return $http.get('/gost/getAll');
	}
	
	factory.getGost = function(email){
		return $http.get('/gost/getGost/' + email);
	}
	
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
		return $http.post('/zahtevi/obrisi', {"email1" : friend.email, "email2" : user.email});
	}
	
	return factory;
});

restaurants.factory('visitsFactory', function($http){
	var factory = {};
	
	factory.getVisits = function(user){
		return $http.get('/gost/getVisits/' + user.email);
	}
	
	factory.grade = function(user, id, food, service, general){
		return $http.post('/gost/grade/', {"user": user, "poseta": id,
			"ocena": {"ocenaHrane" : food, "ocenaUsluge": service, "ocenaRestorana":general}} );
	}
	
	return factory;
});

restaurants.factory('viewRestoransFactory', function($http) {
	
	var factory = {};
	
	factory.getRestorans = function() {
		return $http.get('/gost/getRestorans');
	};
	
	factory.getGrades = function(email, naziv){
		return $http.post('/gost/getGrades', {"naziv" : naziv, "email" : email} )
	}
	
	return factory;
});

restaurants.factory('reserveFactory', function($http) {
	
	var factory = {};
	
	factory.getFriends = function(user){
		return $http.get('/prijatelji/getPrijatelji/' + user.email);
	};
	
	factory.getStolovi = function(reserve) {
		return $http.post('/restorani/getStolovi', {"nazivRestorana": reserve.restaurant.naziv, "vreme": reserve.dateAndTime, "trajanje": reserve.duration});
	}
	
	factory.getReoni = function(id) {
		return $http.get('/restorani/getReoni/' + id);
	}
	
	factory.makeReservation = function(reserve) {
		console.log(reserve.restaurant.naziv);
		console.log(reserve.creator.email);
		console.log(reserve.dateAndTime);
		console.log(reserve.duration);
		console.log(reserve.tables);
		console.log(reserve.guests);
		return $http.put('/rezervacije/napraviRezervaciju', {"nazivRestorana" : reserve.restaurant.naziv, "kreatorEmail" : reserve.creator.email,
			"datumIVreme" : reserve.dateAndTime, "trajanje" : reserve.duration, "stolovi" : reserve.tables, "pozvaniGosti" : reserve.guests});
	};

	return factory;
});

restaurants.factory('viewReservationsFactory', function($http) {
	
	var factory = {};
	
	factory.getReservations = function(user){
		return $http.get('/gost/getRezervacije/' + user.email);
	};
	
	factory.deleteReservation = function(id) {
		return $http.post('/rezervacije/obrisi', id);
	};
	
	return factory;
});

restaurants.factory('reservationFactory', function($http) {
	
	var factory = {};
	
	/*factory.getReservation = function(user){
		return $http.get('/gost/getRezervacija/' + user.email);
	};*/
	
	factory.getReservation = function(id){
		return $http.get('/rezervacije/getRezervacija/' + id);
	}
	
	factory.setAnswer = function(id, user, answer){
		return $http.post('/rezervacije/azurirajOdgovor', {"idRezervacije" : id, "email" : user.email, "odgovor" : answer});
	};
	
	factory.deleteReservation = function(id) {
		return $http.post('/rezervacije/obrisi', id);
	};
	
	return factory;
});

restaurants.factory('reservationOrderFactory', function($http) {
	
	var factory = {};
	
	factory.makeOrder = function(reservation, food, drinks, prepare) {		
		return $http.put('/rezervacije/makeOrder', {"idRezervacije": reservation.id, "jela": food, "pica": drinks, "spremi": prepare});
	}
	
	return factory;
});