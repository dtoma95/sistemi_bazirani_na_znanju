//ruter

var restaurants = angular.module('restaurants', ['ngRoute', 'jkuri.datepicker', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

restaurants.config(function($routeProvider){
	$routeProvider.when('/', {
	//General
		templateUrl : 'angular/partials/login.html'
	})
	
	//Admin
	.when('/admin', {
		templateUrl : 'angular/partials/Admin/admin.html'
	}).when('/registerKorisnik', {
		templateUrl : 'angular/partials/Admin/registerKorisnik.html'
	}).when('/adminPacijent', {
		templateUrl : 'angular/partials/Admin/adminPacijent.html'
	}).when('/adminBolest', {
		templateUrl : 'angular/partials/Admin/adminBolest.html'
	}).when('/adminSimptom', {
		templateUrl : 'angular/partials/Admin/adminSimptom.html'
	}).when('/adminSastojakt', {
		templateUrl : 'angular/partials/Admin/adminSastojak.html'
	}).when('/adminLek', {
		templateUrl : 'angular/partials/Admin/adminLek.html'
	}).when('/sviKorisnici', {
		templateUrl : 'angular/partials/Admin/sviKorisnici.html'
	}).when('/sviPacijenti', {
		templateUrl : 'angular/partials/Admin/sviPacijenti.html'
	}).when('/sviLekovi', {
		templateUrl : 'angular/partials/Admin/sviLekovi.html'
	}).when('/sviBolesti', {
		templateUrl : 'angular/partials/Admin/sviBolesti.html'
	}).when('/sviSimptomi', {
		templateUrl : 'angular/partials/Admin/sviSimptomi.html'
	}).when('/sviSastojci', {
		templateUrl : 'angular/partials/Admin/sviSastojci.html'
	})
	
	//Lekar
	.when('/lekar', {
		templateUrl : 'angular/partials/Lekar/lekar.html'
	}).when('/lekarPacijenti', {
		templateUrl : 'angular/partials/Lekar/lekarPacijenti.html'
	}).when('/lekarDijagnoza', {
		templateUrl : 'angular/partials/Lekar/lekarDijagnoza.html'
	}).when('/dijagnozaLekovi', {
		templateUrl : 'angular/partials/Lekar/dijagnozaLekovi.html'
	}).when('/izvestaji', {
		templateUrl : 'angular/partials/Lekar/lekarIzvestaji.html'
	}).when('/upitBolesti', {
		templateUrl : 'angular/partials/Lekar/upitBolesti.html'
	}).when('/upitSimptomi', {
		templateUrl : 'angular/partials/Lekar/upitSimptomi.html'
	}).when('/karton', {
		templateUrl : 'angular/partials/Lekar/lekarKarton.html'
	})
	;
});

restaurants.config(function($logProvider){
    $logProvider.debugEnabled(true);
});

// u Angularu 1.6 je promenjeno rutiranje
// ovim se podesava da bude isto kao i u ranijim verzijama
//restaurants.config(['$locationProvider', function($locationProvider) {
//	  $locationProvider.hashPrefix('');
//}]);