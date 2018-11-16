var app = angular.module('dashboard',['ngRoute','dashboard-module','lamps-module','fans-module','container-module']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "dashboard.html"
    })
    .when("/lamps", {
        templateUrl : "lamps.html"
    })
    .when("/fans", {
        templateUrl : "fans.html"
    })
    .when("/container", {
        templateUrl : "container.html"
    });
});

app.controller('dashboardCtrl',function($scope,$routeParams,$location,$timeout,dashboard,lamps,fans,container) {

	$scope.dashboard = dashboard;
	
	$scope.dashboard.data($scope);	
	
	$scope.view = {};
	$scope.view.page_title = "Dashboard";
	
	$scope.view.selected = {};
	
	$scope.view.selected.dashboard = true;
	$scope.view.selected.lamps = false;
	$scope.view.selected.fans = false;
	$scope.view.selected.container = false;
	
	$scope.$on('$routeChangeSuccess', function(scope, next, current) {
	   
		switch (next.$$route.originalPath) {
		   
			case "/":
			
				$scope.view.page_title = "Dashboard";
				$scope.view.selected.dashboard = true;
				$scope.view.selected.lamps = false;
				$scope.view.selected.fans = false;
				$scope.view.selected.container = false;
			
				$timeout(function() {
					dashboard.temperature($scope);
					dashboard.waterLevel($scope);
					dashboard.feeder($scope);
				}, 1000);
			
			break;
		   
			case "/lamps":

				$scope.view.page_title = "Lamps";
				$scope.view.selected.dashboard = false;
				$scope.view.selected.lamps = true;
				$scope.view.selected.fans = false;
				$scope.view.selected.container = false;
		   
			break;
		   
			case "/fans":
		   
				$scope.view.page_title = "Fans";
				$scope.view.selected.dashboard = false;
				$scope.view.selected.lamps = false;
				$scope.view.selected.fans = true;
				$scope.view.selected.container = false;				   	
		   
			break;
		   
			case "/container":
			
				$scope.view.page_title = "Container";
				$scope.view.selected.dashboard = false;
				$scope.view.selected.lamps = false;
				$scope.view.selected.fans = false;
				$scope.view.selected.container = true;			
				
			break;
		   
	   };
	   
	});

	$scope.menu = {};
	
	$scope.menu.click = function() {
				
		$('#main-wrapper').removeClass('show-sidebar');
		$('#ti-').addClass('ti-menu');

	};
	
	$scope.lamps = lamps;
	$scope.fans = fans;
	$scope.container = container;

});