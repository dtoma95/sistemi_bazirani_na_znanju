restaurants.controller('navBarAdminController', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null || user.uloga != "ADMIN"){
		window.location = "#/";		
	}
	$scope.logout = function(){
    	localStorage.removeItem("user");
    }	
	
});

restaurants.controller('navBarLekarController1', function($scope){
	var user = JSON.parse(localStorage.getItem("user"));
	if(user == null || user.uloga != "LEKAR"){
		window.location = "#/";		
	}
	else{
		var socket = new SockJS('/nekiEndpoint');
		var stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			
				stompClient.subscribe("/javiGotovo/", function(data) {
					var message = data.body;
					toastr.warning(message);
				});
		});
	}
	
	$scope.logout = function(){
    	localStorage.removeItem("user");
    }	
	
});

restaurants.controller('loginController', function($scope, loginFactory){
	
	$scope.loginKorisnik = function(user, form) {
		if (form.email.$error.required){
			toast("Please enter username.");
		} else if (form.password.$error.required) {
			toast("Please enter password.")
		} else {
			loginFactory.loginKorisnik(user).success(function(data, form) {
				if(data.uloga === "LEKAR"){
					localStorage.setItem("user", JSON.stringify(data));
					window.location = '#/lekar';
				}
				else if(data.uloga === "ADMIN"){
					localStorage.setItem("user", JSON.stringify(data));
					window.location = "#/admin";
				}
				if (data.username == null || data.username == "") {
					toast("Invalid username or password!");
				}
			}).error(function (response, status) {
				toastr.error(response);
		    });
		}
	}
});
