angular.module('fans-module', []).factory('fans', function() {
	
	function fans() {
		
		var self = this;
		
		self.data = function(scope) {
			
			scope.fan = {};
			scope.fan.one = false;
			scope.fan.two = false;
			
		};
		
		self.one = function(scope,opt) {

			var option = (opt)?"1":"0";
			
			message = new Paho.MQTT.Message(option);
			// message.destinationName = "brooder/fan/1";
			message.destinationName = "brooder/fan/1/status";
			scope.client.send(message);
			
		};

		self.two = function(scope,opt) {

			var option = (opt)?"1":"0";		
		
			message = new Paho.MQTT.Message(option);
			// message.destinationName = "brooder/fan/2";
			message.destinationName = "brooder/fan/2/status";		
			scope.client.send(message);

		};

	};

	return new fans();

});