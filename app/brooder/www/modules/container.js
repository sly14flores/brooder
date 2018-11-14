angular.module('container-module', []).factory('container', function() {
	
	function container() {
		
		var self = this;
		
		self.data = function(scope) {
			
			scope.container = {};
			scope.container.status = false;
			
		};
		
		self.toggle = function(scope,opt) {

			var option = (opt)?"1":"0";
			
			message = new Paho.MQTT.Message(option);
			message.destinationName = "brooder/container";
			// message.destinationName = "brooder/container/status";
			scope.client.send(message);
			
		};

	};

	return new container();

});