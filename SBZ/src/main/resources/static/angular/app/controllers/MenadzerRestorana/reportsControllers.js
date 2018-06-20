/* 
*controller za izvestaj prihoda
 */
restaurants.controller('incomeController', function($scope, incomeFactory){	
	
	var chart;
	
	$scope.income = {};
	$scope.income.pocetakPerioda = new Date();
	var d = new Date();
	d.setDate(d.getDate() + 1)
	$scope.income.krajPerioda = d
	
	$scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    
    $scope.popup2 = {
    	opened: false
    };
    
    $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(),
        	minDate: new Date(2016,1,1),
        	startingDay: 1
        };
    
    $scope.altInputFormats = 'd!/M!/yy';
	
	function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.konobariList = [];
		$scope.restoran = {};
		incomeFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
			incomeFactory.getKonobari(data).success(function (data) {
	        	$scope.konobariList = data;
			});
		});
		
		if($('#optionsRadios1').is(':checked')) { 
			$('#konobari').hide();
			$('#konobar').hide();
		} else {
			$('#restoran').hide();
		}
	}
	
	init();
	
	$scope.change = function() {
		if($('#optionsRadios1').is(':checked')) {
			$('#datum1').show();
			$('#datum2').show();
			$('#konobari').hide();
			$('#konobar').hide();
			$('#restoran').show();
		} else {
			$('#datum1').hide();
			$('#datum2').hide();
			$('#konobari').show();
			$('#konobar').show();
			$('#restoran').hide();
		}
	}
	
	$scope.restaurantReport = function(income) {
		
		if (chart != null || chart != undefined) {
			chart.destroy();
			$('#myChart1').remove();
			$('#chartDiv1').append('<canvas id="myChart1"><canvas>');
		}
		
		var labels = [];
		var dataSet = [];
		
		var incomeReport = {};
		
		incomeReport.nazivRestorana = $scope.restoran;
		var datum1 = new Date(income.pocetakPerioda);
		var datum2 = new Date(income.krajPerioda);
		datum2.setDate(datum2.getDate()+1);
		incomeReport.pocetakPerioda = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
		incomeReport.krajPerioda = datum2.getDate() + "/" + (datum2.getMonth()+1) + "/" + (datum2.getUTCFullYear()-2000);
		
		incomeFactory.restaurantIncome(incomeReport).success(function (data) {
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					labels.push(key);
					dataSet.push(data[key]);
				}
			}
			
			var ctx = document.getElementById('myChart1').getContext('2d');
			
			chart = new Chart(ctx, {
			    // The type of chart we want to create
			    type: 'bar',

			    // The data for our dataset
			    data: {
			        labels: labels,
			        datasets: [{
			            label: "Restaurant income report",
			            backgroundColor: 'rgb(255, 99, 132)',
			            borderColor: 'rgb(255, 99, 132)',
			            data: dataSet,
			        }]
			    },

			    // Configuration options go here
			    options: { }
			});
		});
	}
	
	$scope.waiterReport = function(income) {
		
		if (chart != null && chart != undefined) {
			chart.destroy();
			$('#myChart1').remove();
			$('#chartDiv1').append('<canvas id="myChart1"><canvas>');
		}
		
		var labels = [];
		var dataSet = [];
		
		var incomeReport = {};
		
		if (income.waiter === undefined || income.waiter === null) {
			toastr.info("Select an waiter!");
		}  else {
			incomeReport.nazivRestorana = $scope.restoran;
			incomeReport.username = income.waiter.email;
			
			
			incomeFactory.waiterIncome(incomeReport).success(function (data) {
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						labels.push(key);
						dataSet.push(data[key]);
					}
				}
				
				var ctx = document.getElementById('myChart1').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'bar',

				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Restaurant income report",
				            backgroundColor: 'rgb(255, 99, 132)',
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },

				    // Configuration options go here
				    options: {  }
				});
			});
		}
	}
});


/*
 *controller za prikaz posecenosti
 */
restaurants.controller('attendanceController', function($scope, attendanceFactory){	
	var chart;
	
	$scope.attendance = {};
	$scope.attendance.pocetakPeriodaDan = new Date();
	$scope.attendance.pocetakPeriodaNedelja = new Date();
	
	$scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    
    $scope.popup2 = {
    	opened: false
    };
    
    $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(),
        	minDate: new Date(2016,1,1),
        	startingDay: 1
        };
    
    $scope.altInputFormats = 'd!/M!/yy';
    
    function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.restoran = {};
		attendanceFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
		});
		
		if($('#optionsRadios3').is(':checked')) {
			$('#posecenostDan').show();
			$('#posecenostNedelja').hide();
			$('#posecenostDanDugme').show();
			$('#posecenostNedeljaDugme').hide();
			$('#labelWeek').hide();
		} else {
			$('#posecenostDan').hide();
			$('#posecenostNedelja').show();
			$('#posecenostDanDugme').hide();
			$('#posecenostNedeljaDugme').show();
			$('#labelWeek').hide().show();
		}
	}
	
	init();
	
	$scope.change = function() {
		if($('#optionsRadios3').is(':checked')) {
			$('#posecenostDan').show();
			$('#posecenostNedelja').hide();
			$('#posecenostDanDugme').show();
			$('#posecenostNedeljaDugme').hide();
			$('#labelWeek').hide();
		} else {
			$('#posecenostDan').hide();
			$('#posecenostNedelja').show();
			$('#posecenostDanDugme').hide();
			$('#posecenostNedeljaDugme').show();
			$('#labelWeek').show();
		}
	}
	
	$scope.$watch('attendance.pocetakPeriodaNedelja',function(dateVal){
        var datum = new Date(dateVal);
        var first = datum.getDate() - datum.getDay() + 1;
		var last = first + 6;
		var first1 = new Date(datum.setDate(first))
		last = new Date(datum.setDate(last));
		if (!isNaN(last.getTime())) {
			if (first1.getDate() > last.getDate()) {
				$('#labelWeek').text("Week from " + first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000) + "   to   " +
						last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000));
			} else {
				$('#labelWeek').text("Week from " + first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000) + "   to   " +
						last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000));
			}
		}	
    });
	
	$scope.attendanceReport = function(attendance) {
		
		if (chart != null && chart != undefined) {
			chart.destroy();
			$('#myChart2').remove();
			$('#chartDiv2').append('<canvas id="myChart2"><canvas>');
		}
		
		$scope.attendance.nazivRestorana = $scope.restoran;
		var labels = [];
		var dataSet = [];
				
		//grupisanje labela po nedeljama
		if($('#optionsRadios4').is(':checked')) { 
			var datum1 = new Date(attendance.pocetakPeriodaNedelja);
			var first = datum1.getDate() - datum1.getDay() + 1;
			var last = first + 7;
			var first1 = new Date(datum1.setDate(first))
			last = new Date(datum1.setDate(last));
			
			if (first1.getDate() > last.getDate()) {
				last = last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000);
			} else {
				last = last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000);
			}
			first1 = first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000);
			
			attendanceFactory.restaurantAttendanceWeek(attendance, first1, last).success(function (data) {
				for (var i = 0; i < data.length; i++) {
					labels.push(data[i].datum);
					dataSet.push(data[i].posecenost);
				}
			
				var ctx = document.getElementById('myChart2').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'line',
	
				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Restaurant attendance report",
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },
	
				    // Configuration options go here
				    options: {
				        scales: {
				            xAxes: [{
				                ticks: {
				                	autoSkip: true,
				                    maxTicksLimit: 10
				                }
				            }]
				        }
				    }
				});
			});	
		} else {
			var datum1 = new Date(attendance.pocetakPeriodaDan);
			datum1 = datum1.getDate() + "/" + (datum1.getMonth()+1) + "/" + (datum1.getUTCFullYear()-2000);
			
			attendanceFactory.restaurantAttendanceDay(attendance, datum1).success(function (data) {
				for (var i = 0; i < data.length; i++) {
					labels.push(data[i].datum);
					dataSet.push(data[i].posecenost);
				}
			
				var ctx = document.getElementById('myChart2').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'line',
	
				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Restaurant attendance report",
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },
	
				    // Configuration options go here
				    options: {
				        scales: {
				            xAxes: [{
				                ticks: {
				                	autoSkip: true,
				                    maxTicksLimit: 10
				                }
				            }]
				        }
				    }
				});
			});
		}
	}
});

/*
 *controller za prikaz ocena restorana
 */
restaurants.controller('restaurantMarkController', function($scope, restaurantMarkFactory){	
	var chart;
	
	$scope.mark = {};
	$scope.mark.period1 = new Date();
	$scope.mark.period2 = new Date();
	
	$scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    
    $scope.popup2 = {
    	opened: false
    };
    
    $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(),
        	minDate: new Date(2016,1,1),
        	startingDay: 1
    };
    
    $scope.$watch('mark.period1',function(dateVal){
        var datum = new Date(dateVal);
        var first = datum.getDate() - datum.getDay() + 1;
		var last = first + 6;
		var first1 = new Date(datum.setDate(first))
		last = new Date(datum.setDate(last));
		if (!isNaN(last.getTime())) {
			if (first1.getDate() > last.getDate()) {
				$('#labelWeek1').text("Week from " + first1.getDate() + "/" + (first1.getMonth()+2) + "/" + (first1.getUTCFullYear()-2000) + "   to   " +
						last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000));
			} else {
				$('#labelWeek1').text("Week from " + first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000) + "   to   " +
						last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000));
			}
		}	
    });
    
    $scope.altInputFormats = 'd!/M!/yy';
    
    function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.restoran = {};
		restaurantMarkFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
		});
		
		if($('#optionsRadios5').is(':checked')) {
			$('#week1').show();
			$('#month1').hide();
		} else {
			$('#week1').hide();
			$('#month1').show();
		}
	}
	
	init();
	
	$scope.change = function() {
		if($('#optionsRadios5').is(':checked')) {
			$('#week1').show();
			$('#labelWeek1').show();
			$('#month1').hide();
		} else {
			$('#week1').hide();
			$('#labelWeek1').hide();
			$('#month1').show();
		}
	}
	
	$scope.restaurantMarkReport = function(mark) {
		if (chart != null && chart != undefined) {
			chart.destroy();
			$('#myChart3').remove();
			$('#chartDiv3').append('<canvas id="myChart3"><canvas>');
		}
		
		var labels = [];
		var dataSet = [];
		mark.nazivRestorana = $scope.restoran;
		
		if($('#optionsRadios5').is(':checked')) {			
			var datum1 = new Date(mark.period1);
			var first = datum1.getDate() - datum1.getDay() + 1;
			var last = first + 7;
			var first1 = new Date(datum1.setDate(first))
			last = new Date(datum1.setDate(last));
			
			if (first1.getDate() > last.getDate()) {
				last = last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000);
			} else {
				last = last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000);
			}
			first1 = first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000);
			
			restaurantMarkFactory.markReport(mark, first1, last).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					labels.push(data[i].ocena);
					dataSet.push(data[i].vrednost);
				}
				
				var ctx = document.getElementById('myChart3').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'bar',

				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Restaurant marks",
				            backgroundColor: 'rgb(255, 99, 132)',
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },

				    // Configuration options go here
				    options: {  }
				});
			});
		} else {
			var datum1 = new Date(mark.period2);
			var first = new Date(datum1.getFullYear(), datum1.getMonth(), 1);
			var last = new Date(datum1.getFullYear(), datum1.getMonth() + 1, 1);
			
			if (first.getDate() > last.getDate()) {
				last = last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000);
			} else {
				last = last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000);
			}
			first = first.getDate() + "/" + (first.getMonth()+1) + "/" + (first.getUTCFullYear()-2000);
			
			restaurantMarkFactory.markReport(mark, first, last).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					labels.push(data[i].ocena);
					dataSet.push(data[i].vrednost);
				}
				
				var ctx = document.getElementById('myChart3').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'bar',

				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Restaurant marks",
				            backgroundColor: 'rgb(255, 99, 132)',
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },

				    // Configuration options go here
				    options: {  }
				});
			});
		}
	}
});

/*
 *controller za prikaz ocena konobara
 */
restaurants.controller('waiterMarkController', function($scope, waiterMarkFactory){	
	var chart;
	
	$scope.mark = {};
	$scope.mark.period1 = new Date();
	$scope.mark.period2 = new Date();
	
	$scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    
    $scope.popup2 = {
    	opened: false
    };
    
    $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(),
        	minDate: new Date(2016,1,1),
        	startingDay: 1
    };
    
    $("#inputIme").on('awesomplete-selectcomplete',function(){
  	   $scope.mark.username = this.value;
    });
    
    $scope.$watch('mark.period1',function(dateVal){
        var datum = new Date(dateVal);
        var first = datum.getDate() - datum.getDay() + 1;
		var last = first + 6;
		var first1 = new Date(datum.setDate(first))
		last = new Date(datum.setDate(last));
		if (!isNaN(last.getTime())) {
			if (first1.getDate() > last.getDate()) {
				$('#labelWeek2').text("Week from " + first1.getDate() + "/" + (first1.getMonth()+2) + "/" + (first1.getUTCFullYear()-2000) + "   to   " +
						last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000));
			} else {
				$('#labelWeek2').text("Week from " + first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000) + "   to   " +
						last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000));
			}
		}	
    });
    
    $scope.altInputFormats = 'd!/M!/yy';
    
    function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		$scope.restoran = {};
		waiterMarkFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
			waiterMarkFactory.getKonobari(data).success(function (data) {
				var listAutoComplete = [];
				
	        	for (var i = 0; i < data.length; i++) {
	        		var radnik = {};
	        		radnik.label = data[i].ime + " " + data[i].prezime;
	        		radnik.value = data[i].email;
	        		listAutoComplete.push(radnik);
	        	}
	        	
	        	var input = document.getElementById("inputIme");
	        	
	        	new Awesomplete(input, {
	        		minChars: 0,
	        		maxItems: 7,
	        		autoFirst: true,
	        		list: listAutoComplete
	        	});
			});
		});
		
		if($('#optionsRadios7').is(':checked')) {
			$('#week2').show();
			$('#month2').hide();
		} else {
			$('#week2').hide();
			$('#month2').show();
		}
	}
	
	init();
	
	$scope.change = function() {
		if($('#optionsRadios7').is(':checked')) {
			$('#week2').show();
			$('#labelWeek2').show();
			$('#month2').hide();
		} else {
			$('#week2').hide();
			$('#labelWeek2').hide();
			$('#month2').show();
		}
	}
	
	$scope.waiterMarkReport = function(mark) {
		if (chart != null && chart != undefined) {
			chart.destroy();
			$('#myChart4').remove();
			$('#chartDiv4').append('<canvas id="myChart4"><canvas>');
		}
		
		var labels = [];
		var dataSet = [];
		mark.nazivRestorana = $scope.restoran;
		
		if($('#optionsRadios7').is(':checked')) {			
			var datum1 = new Date(mark.period1);
			var first = datum1.getDate() - datum1.getDay() + 1;
			var last = first + 7;
			var first1 = new Date(datum1.setDate(first))
			last = new Date(datum1.setDate(last));
			
			if (first1.getDate() > last.getDate()) {
				last = last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000);
			} else {
				last = last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000);
			}
			first1 = first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000);
			
			waiterMarkFactory.markReport(mark, first1, last).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					labels.push(data[i].ocena);
					dataSet.push(data[i].vrednost);
				}
				
				var ctx = document.getElementById('myChart4').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'bar',

				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Waiter marks",
				            backgroundColor: 'rgb(255, 99, 132)',
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },

				    // Configuration options go here
				    options: {  }
				});
			});
		} else {
			var datum1 = new Date(mark.period2);
			var first = new Date(datum1.getFullYear(), datum1.getMonth(), 1);
			var last = new Date(datum1.getFullYear(), datum1.getMonth() + 1, 1);
			
			if (first.getDate() > last.getDate()) {
				last = last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000);
			} else {
				last = last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000);
			}
			first = first.getDate() + "/" + (first.getMonth()+1) + "/" + (first.getUTCFullYear()-2000);
			
			waiterMarkFactory.markReport(mark, first, last).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					labels.push(data[i].ocena);
					dataSet.push(data[i].vrednost);
				}
				
				var ctx = document.getElementById('myChart4').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'bar',

				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Waiter marks",
				            backgroundColor: 'rgb(255, 99, 132)',
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },

				    // Configuration options go here
				    options: {  }
				});
			});
		}
	}
});

/*
 *controller za prikaz ocena jela
 */
restaurants.controller('menuMarkController', function($scope, menuMarkFactory){	
	var chart;
	
	$scope.mark = {};
	$scope.mark.period1 = new Date();
	$scope.mark.period2 = new Date();
	
	$scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    
    $scope.popup1 = {
    	opened: false
    };
    
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    
    $scope.popup2 = {
    	opened: false
    };
    
    $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(),
        	minDate: new Date(2016,1,1),
        	startingDay: 1
    };
    
    var input = document.getElementById("inputMenuItem");
    
    $scope.$watch('mark.period1',function(dateVal){
        var datum = new Date(dateVal);
        var first = datum.getDate() - datum.getDay() + 1;
		var last = first + 6;
		var first1 = new Date(datum.setDate(first))
		last = new Date(datum.setDate(last));
		if (!isNaN(last.getTime())) {
			if (first1.getDate() > last.getDate()) {
				$('#labelWeek3').text("Week from " + first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000) + "   to   " +
						last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000));
			} else {
				$('#labelWeek3').text("Week from " + first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000) + "   to   " +
						last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000));
			}
		}	
    });
    
    $scope.altInputFormats = 'd!/M!/yy';
    
    function init() {
		var user = JSON.parse(localStorage.getItem("user"));
		
		menuMarkFactory.getItems(user).success(function (data) {
			listAutoComplete = [];
			
			for (var i = 0; i < data.stavke.length; i++) {
        		var stavka = {};
        		stavka.label = data.stavke[i].nazivStavke;
        		stavka.value = data.stavke[i].nazivStavke;
        		listAutoComplete.push(stavka);
        	}
			
			new Awesomplete(input, {
        		list: listAutoComplete
        	});
		});
		
		menuMarkFactory.getRestoran(user).success(function (data) {
			$scope.restoran = data;
		});
		
		if($('#optionsRadios9').is(':checked')) {
			$('#week3').show();
			$('#month3').hide();
		} else {
			$('#week3').hide();
			$('#month3').show();
		}
	}
	
	init();
	
	$("#inputMenuItem").on('awesomplete-selectcomplete',function(){
	    $scope.mark.menuItemName = this.value;
	});
	
	$scope.change = function() {
		if($('#optionsRadios9').is(':checked')) {
			$('#week3').show();
			$('#labelWeek3').show();
			$('#month3').hide();
		} else {
			$('#week3').hide();
			$('#labelWeek3').hide();
			$('#month3').show();
		}
	}
	
	$scope.menuMarkReport = function(mark) {
		if (chart != null && chart != undefined) {
			chart.destroy();
			$('#myChart5').remove();
			$('#chartDiv5').append('<canvas id="myChart5"><canvas>');
		}
		
		var labels = [];
		var dataSet = [];
		mark.nazivRestorana = $scope.restoran;
		
		if($('#optionsRadios9').is(':checked')) {			
			var datum1 = new Date(mark.period1);
			var first = datum1.getDate() - datum1.getDay() + 1;
			var last = first + 7;
			var first1 = new Date(datum1.setDate(first))
			last = new Date(datum1.setDate(last));
			
			if (first1.getDate() > last.getDate()) {
				last = last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000);
			} else {
				last = last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000);
			}
			first1 = first1.getDate() + "/" + (first1.getMonth()+1) + "/" + (first1.getUTCFullYear()-2000);
			
			menuMarkFactory.markReport(mark, first1, last).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					labels.push(data[i].ocena);
					dataSet.push(data[i].vrednost);
				}
				
				var ctx = document.getElementById('myChart5').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'bar',

				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Waiter marks",
				            backgroundColor: 'rgb(255, 99, 132)',
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },

				    // Configuration options go here
				    options: {  }
				});
			});
		} else {
			var datum1 = new Date(mark.period2);
			var first = new Date(datum1.getFullYear(), datum1.getMonth(), 1);
			var last = new Date(datum1.getFullYear(), datum1.getMonth() + 1, 1);
			
			if (first.getDate() > last.getDate()) {
				last = last.getDate() + "/" + (last.getMonth()+2) + "/" + (last.getUTCFullYear()-2000);
			} else {
				last = last.getDate() + "/" + (last.getMonth()+1) + "/" + (last.getUTCFullYear()-2000);
			}
			first = first.getDate() + "/" + (first.getMonth()+1) + "/" + (first.getUTCFullYear()-2000);
			
			menuMarkFactory.markReport(mark, first, last).success(function(data) {
				for (var i = 0; i < data.length; i++) {
					labels.push(data[i].ocena);
					dataSet.push(data[i].vrednost);
				}
				
				var ctx = document.getElementById('myChart5').getContext('2d');
				
				chart = new Chart(ctx, {
				    // The type of chart we want to create
				    type: 'bar',

				    // The data for our dataset
				    data: {
				        labels: labels,
				        datasets: [{
				            label: "Waiter marks",
				            backgroundColor: 'rgb(255, 99, 132)',
				            borderColor: 'rgb(255, 99, 132)',
				            data: dataSet,
				        }]
				    },

				    // Configuration options go here
				    options: {  }
				});
			});
		}
	}
});