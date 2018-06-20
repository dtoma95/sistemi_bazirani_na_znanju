/*
 *controller za editovanje karte pica
 */
restaurants.controller('beveregeController', function($scope, beveregeFactory, $uibModal, $rootScope){
	$scope.costPattern = /^[+-]?\d+(\.\d+)?$/;
	
	$rootScope.$on("CallParentMethod1", function(){
        init();
     });
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));	
        beveregeFactory.getItems(user).success(function (data) {
        	$scope.item = {};
        	$scope.items = {};
        	$scope.item.nazivRestorana = data.nazivRestorana;
        	$scope.items = data.stavke;
		});
    }

	init();
	
	$scope.removeItem = function(nazivStavke, opisStavke, cenaStavke, id) {		
		beveregeFactory.removeItem(nazivStavke, opisStavke, cenaStavke, id, $scope.item.nazivRestorana).success(function(data) {
			if (data === "Successful item deleting.") {
				var index = -1;		
				var comArr = eval( $scope.items );
				for( var i = 0; i < comArr.length; i++ ) {
					if( comArr[i].nazivStavke === nazivStavke ) {
						index = i;
						break;
					}
				}
				if( index === -1 ) {
					alert( "Something gone wrong" );
				}
				$scope.items.splice( index, 1 );
			}
			toastr.info(data);
		}).error(function (response, status) {
			toastr.info(response);
	    });
	}
	
	$scope.addItem = function(item, form) {
		
		var required = form.inputName2.$error.required || form.inputDescription2.$error.required ||
	    form.inputCost2.$error.required;
		
		var costValid = form.inputCost2.$error.pattern;
		
		if (required){
			toastr.info("Please fill all fields.");
		} else if (costValid) {
		    toastr.info("Cost is not valid.")	
		} else {
			item.nazivRestorana = $scope.item.nazivRestorana;
			beveregeFactory.addItem(item).success(function(data) {
				$scope.items.push(data);
				toastr.info("Successful adding!");	
			}).error(function (response, status) {
				toastr.info("Unsuccessful adding!");
		    });
		}
	}
	
	//otvaranje dialoga
    $scope.modifyItem = function (item) {

        var modalInstance = $uibModal.open({
          templateUrl: 'angular/partials/MenadzerRestorana/ChangeDrinks.html',
          controller: 'drinksChangeController',
          resolve: {
            item: function () {
              return item;
            },
            nazivRestorana : function() {
        		return $scope.item.nazivRestorana;
        	}
          }
        });

      };
});


/*
 *controller za editovanje jelovnika
 */
restaurants.controller('MenuController', function($scope, menuFactory, $uibModal, $rootScope){
	$scope.costPattern = /^[+-]?\d+(\.\d+)?$/;
	
	$rootScope.$on("CallParentMethod", function(){
        init();
     });
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));		
        menuFactory.getRestoran(user).success(function (data) {
        	$scope.item = {};
        	$scope.items = {};
        	$scope.item.nazivRestorana = data.nazivRestorana;
        	$scope.items = data.stavke;
		});
    }

	init();
	
	$scope.removeItem = function(nazivStavke, opisStavke, cenaStavke, id) {		
		menuFactory.removeItem(nazivStavke, opisStavke, cenaStavke, id, $scope.item.nazivRestorana).success(function(data) {
			if (data === "Successful item deleting.") {
				var index = -1;		
				var comArr = eval( $scope.items );
				for( var i = 0; i < comArr.length; i++ ) {
					if( comArr[i].nazivStavke === nazivStavke ) {
						index = i;
						break;
					}
				}
				if( index === -1 ) {
					toast( "Something gone wrong" );
				}
				$scope.items.splice( index, 1 );
			}
			toastr.info(data);
		}).error(function (response, status) {
			toastr.info(response);
	    });
	}
	
	$scope.addItem = function(item, form) {
		
		var required = form.inputName1.$error.required || form.inputDescription1.$error.required ||
	    form.inputCost1.$error.required;
		
		var costValid = form.inputCost1.$error.pattern;
		
		if (required){
			toastr.info("Please fill all fields.");
		} else if (costValid) {
		    toastr.info("Cost is not valid.")	
		} else {
			item.nazivRestorana = $scope.item.nazivRestorana;
			menuFactory.addItem(item).success(function(data) {				
				$scope.items.push(data);
				toastr.info("Successful adding!");	
			}).error(function (response, status) {
				toastr.info("Unsuccessful adding!");
		    });
		}		
	}
	
	$scope.modifyItem = function (item) {
		
        var modalInstance = $uibModal.open({
          templateUrl: 'angular/partials/MenadzerRestorana/ChangeMenu.html',
          controller: 'menusChangeController',
          resolve: {
            item: function () {
              return item;
            },
        	nazivRestorana : function() {
        		return $scope.item.nazivRestorana;
        	}
          }
        });

      };
});

//modal change controller
restaurants.controller('drinksChangeController', function($scope, $uibModalInstance, item, nazivRestorana, drinksChangeFactory) {
	$scope.costPattern = /^[+-]?\d+(\.\d+)?$/;
	
	$scope.itemChanged = angular.copy(item);
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveDrink = function (i, form) {
		var required = form.modifyName2.$error.required || form.modifyDescription2.$error.required ||
	    form.modifyCost2.$error.required;
		
		var costValid = form.modifyCost2.$error.pattern;
		
		if (required){
			toastr.info("Please fill all fields.");
		} else if (costValid) {
		    toastr.info("Cost is not valid.")	
		} else {
			drinksChangeFactory.changeDrinkItem(i, nazivRestorana).success(function(data) {
				toastr.info(data);
				$uibModalInstance.close();
				$rootScope.$emit("CallParentMethod", {});
			}).error(function (response, status) {
				toastr.info(response);
		    });	
		}		
	};
});

//modal change controller
restaurants.controller('menusChangeController', function($scope, $uibModalInstance, item, nazivRestorana, menusChangeFactory, $rootScope) {
	$scope.costPattern = /^[+-]?\d+(\.\d+)?$/;
	
	$scope.itemChanged = angular.copy(item);
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveMenu = function(i, form) {
		var required = form.modifyName1.$error.required || form.modifyDescription1.$error.required ||
	    form.modifyCost1.$error.required;
		
		var costValid = form.modifyCost1.$error.pattern;
		
		if (required){
			toastr.info("Please fill all fields.");
		} else if (costValid) {
		    toastr.info("Cost is not valid.")	
		} else {
			menusChangeFactory.changeMenuItem(i, nazivRestorana).success(function(data) {
				toastr.info(data);
				$uibModalInstance.close();
				$rootScope.$emit("CallParentMethod1", {});
			}).error(function (response, status) {
				toastr.info(response);
		    });
		}
	};
});