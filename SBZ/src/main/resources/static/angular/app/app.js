//ruter

var restaurants = angular.module('restaurants', ['ngRoute', 'jkuri.datepicker', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

restaurants.config(function($routeProvider){
	$routeProvider.when('/', {
	//General
		templateUrl : 'angular/partials/login.html'
	}).when('/changePassword', {
		templateUrl : 'angular/partials/changePassword.html'
	})
	
	//Gost
	.when('/registerGost', {
		templateUrl : 'angular/partials/Gost/register.html'
	}).when('/confirmEmail', {
		templateUrl : 'angular/partials/Gost/confirmEmail.html'
	}).when('/gost', {
		templateUrl : 'angular/partials/Gost/gost.html'
	}).when('/profile', {
		templateUrl : 'angular/partials/Gost/profile.html'
	}).when('/friends', {
		templateUrl : 'angular/partials/Gost/friends.html'
	}).when('/restorans', {
		templateUrl : 'angular/partials/Gost/viewRestorans.html'
	}).when('/restoran', {
		templateUrl : 'angular/partials/restoran.html'
	}).when('/reserve1', {
		templateUrl : 'angular/partials/Gost/reserve1.html'
	}).when('/reserve2', {
		templateUrl : 'angular/partials/Gost/reserve2.html'
	}).when('/reserve3', {
		templateUrl : 'angular/partials/Gost/reserve3.html'
	}).when('/reservations', {
		templateUrl : 'angular/partials/Gost/viewReservations.html'
	}).when('/reservation', {
		templateUrl : 'angular/partials/Gost/reservation.html'
	}).when('/reservationOrder', {
		templateUrl : 'angular/partials/Gost/reservationOrder.html'
	}).when('/visits', {
		templateUrl : 'angular/partials/Gost/visits.html'
	})
	
	//MenadzerRestorana
	.when('/menadzerRestorana', {
		templateUrl : 'angular/partials/MenadzerRestorana/menadzerRestorana.html'
	}).when('/menadzerRestorana/Menu', {
		templateUrl : 'angular/partials/MenadzerRestorana/Menus.html'
	}).when('/menadzerRestorana/editSchedules', {
		templateUrl : 'angular/partials/MenadzerRestorana/EditSchedules.html'
	}).when('/menadzerRestorana/TablesAndSections', {
		templateUrl : 'angular/partials/MenadzerRestorana/TablesAndSections.html'
	}).when('/menadzerRestorana/assignSections', {
		templateUrl : 'angular/partials/MenadzerRestorana/AssignSections.html'
	}).when('/menadzerRestorana/editOffers', {
		templateUrl : 'angular/partials/MenadzerRestorana/EditOffers.html'
	}).when('/menadzerRestorana/viewBidderOffers', {
		templateUrl : 'angular/partials/MenadzerRestorana/viewBidderOffers.html'
	}).when('/menadzerRestorana/register', {
		templateUrl : 'angular/partials/MenadzerRestorana/Register.html'
	}).when('/menadzerRestorana/Report', {
		templateUrl : 'angular/partials/MenadzerRestorana/Reports.html'
	}).when('/menadzerRestorana/EditRestaurant', {
		templateUrl : 'angular/partials/MenadzerRestorana/EditRestaurant.html'
	})
	
	//Ponudjac
	.when('/ponudjac', {
		templateUrl : 'angular/partials/Ponudjac/Ponudjac.html'
	}).when('/ponudjac/updatePonudjacInfo', {
		templateUrl : 'angular/partials/Ponudjac/updatePonudjacInfo.html'
	}).when('/ponudjac/addPonuda', {
		templateUrl : 'angular/partials/Ponudjac/addPonuda.html'
	}).when('/ponudjac/viewOffers', {
		templateUrl : 'angular/partials/Ponudjac/viewOffers.html'
	})
	
	//Radnik
	.when('/radnik', {
		templateUrl : 'angular/partials/Radnik/radnik.html'
	}).when('/updateRadnikInfo', {
		templateUrl : 'angular/partials/Radnik/updateRadnikInfo.html'
	}).when('/addPorudzbina', {
		templateUrl : 'angular/partials/Radnik/addPorudzbina.html'
	}).when('/kuvarJela', {
		templateUrl : 'angular/partials/Radnik/kuvarJela.html'
	}).when('/sankerPica', {
		templateUrl : 'angular/partials/Radnik/sankerPica.html'
	}).when('/konobarPorudzbine', {
		templateUrl : 'angular/partials/Radnik/konobarPorudzbine.html'
	}).when('/konobarPregled', {
		templateUrl : 'angular/partials/Radnik/konobarPregled.html'
	}).when('/konobarEditPorudzbina', {
		templateUrl : 'angular/partials/Radnik/konobarEditPorudzbina.html'
	}).when('/viewReservations', {
		templateUrl : 'angular/partials/Radnik/viewRezervacije.html'
	})
	
	//SistemMenadzer
	.when('/registerRestoran', {
		templateUrl : 'angular/partials/registerRestoran.html'
	}).when('/assignMenadzer', {
		templateUrl : 'angular/partials/assignMenadzer.html'
	}).when('/sistemMenadzer', {
		templateUrl : 'angular/partials/sistemMenadzer.html'
	}).when('/registerSistemMenadzer', {
		templateUrl : 'angular/partials/registerSistemMenadzer.html'
	}).when('/registerMenadzerRestorana', {
		templateUrl : 'angular/partials/registerMenadzerRestorana.html'
	});
});

restaurants.config(function($logProvider){
    $logProvider.debugEnabled(true);
});

// u Angularu 1.6 je promenjeno rutiranje
// ovim se podesava da bude isto kao i u ranijim verzijama
//restaurants.config(['$locationProvider', function($locationProvider) {
//	  $locationProvider.hashPrefix('');
//}]);