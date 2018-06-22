/*
 * 
 * var socket = new SockJS('/nekiEndpoint');
	var stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		var path = window.location.href;
		var id = path.split("=")[1];
		stompClient.subscribe("/javiGotovo/" + id, function(data) {
			init();
		});

	});
 */

restaurants.controller('lekarPacijentiController', function($scope, lekarPacijentiFactory){
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		lekarPacijentiFactory.getPacijenti().success(function (data) {
        	$scope.items = {};
        	$scope.items = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.dijagnoza = function(item){
		window.location = '#/lekarDijagnoza?id='+ item.id;
	}
	
	$scope.viewItem = function(item) {
		window.location = '#/pacijent?id='+ item.id;
	}
	
});


restaurants.controller('lekarDijagnozaController', function($scope, lekarDijagnozaFactory){
	
	
	
	function init() {
		
		lekarDijagnozaFactory.getSimptomi().success(function (data) {
        	
        	$scope.simptomi = {};
        	$scope.mojiSimptomi = [];
        	$scope.simptomi = data;
		});
		
		lekarDijagnozaFactory.getBolesti().success(function (data) {
        	
        	$scope.bolesti = {};
        	$scope.bolesti = data;
		});
		
		var path = window.location.href;
		var id = path.split("=")[1];
		lekarDijagnozaFactory.getPacijent(id).success(function (data) {
			
        	$scope.pacijent = data;
		});
    }

	if(localStorage.getItem("user") != null)
		init();
	
	$scope.izaberiBolest = function(i){
		var path = window.location.href;
		var id = path.split("=")[1];
		
		var user = JSON.parse(localStorage.getItem("user"));
		var dijagnoza = {"lekar" : user, "simptomi" : $scope.mojiSimptomi, "bolest" : i}

		localStorage.setItem("dijagnoza", JSON.stringify(dijagnoza));
		window.location = '#/dijagnozaLekovi?id='+ id;
		
	}

	$scope.preporuci = function() {
		var path = window.location.href;
		var id = path.split("=")[1];
		var user = JSON.parse(localStorage.getItem("user"));
		
		lekarDijagnozaFactory.getPreporuka(id, user, $scope.mojiSimptomi).success(function (data) {
			
        	$scope.preporuka = data;
		});
	}
	
	$scope.addSimptom = function(i) {
		$scope.mojiSimptomi.push(i);
		
		var comArr = eval( $scope.simptomi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.simptomi.splice( index, 1 );
	}
	
	$scope.removeSimptom = function(i) {
		$scope.simptomi.push(i);
		
		var comArr = eval( $scope.mojiSimptomi );
		var index = comArr.indexOf(i);	
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.mojiSimptomi.splice( index, 1 );
	}
	
});