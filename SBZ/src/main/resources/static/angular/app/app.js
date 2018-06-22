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
	})
	
	//Lekar
	.when('/lekar', {
		templateUrl : 'angular/partials/Lekar/lekar.html'
	}).when('/lekarPacijenti', {
		templateUrl : 'angular/partials/Lekar/lekarPacijenti.html'
	}).when('/lekarDijagnoza', {
		templateUrl : 'angular/partials/Lekar/lekarDijagnoza.html'
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