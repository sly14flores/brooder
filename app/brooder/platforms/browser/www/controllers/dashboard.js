var app = angular.module('dashboard',['dashboard-module']);

app.controller('dashboardCtrl',function($scope,dashboard) {

	$scope.dashboard = dashboard;
	
	$scope.dashboard.data($scope);
	
});