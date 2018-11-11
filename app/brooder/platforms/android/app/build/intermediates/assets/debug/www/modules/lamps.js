angular.module('lamps-module', []).factory('lamps', function() {
	
	function lamps() {
		
		var self = this;
		
		self.data = function(scope) {
			
			scope.lamp = {};
			scope.lamp.one = false;
			scope.lamp.two = false;
			
		};
		
		self.one = function(scope,opt) {
			console.log(opt);
			var option = (opt)?"1":"0";
			
			message = new Paho.MQTT.Message(option);
			message.destinationName = "brooder/lamp/1";
			// message.destinationName = "brooder/lamp/1/status";
			scope.client.send(message);
			
		};

		self.two = function(scope,opt) {

			var option = (opt)?"1":"0";		
		
			message = new Paho.MQTT.Message(option);
			message.destinationName = "brooder/lamp/2";
			// message.destinationName = "brooder/lamp/2/status";		
			scope.client.send(message);

		};

	};

	return new lamps();

});