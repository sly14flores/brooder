angular.module('dashboard-module', []).factory('dashboard', function() {
	
	function dashboard() {
		
		var self = this;
		
		self.data = function(scope) {
			
			client = new Paho.MQTT.Client("192.168.10.1", 1884, "");
			
			// set callback handlers
			client.onConnectionLost = onConnectionLost;
			client.onMessageArrived = onMessageArrived;

			// connect the client
			client.connect({onSuccess:onConnect});

			// called when the client connects
			function onConnect() {
			  // Once a connection has been made, make a subscription and send a message.
			  console.log("onConnect");
			  client.subscribe("ledStatus");
			}

			// called when the client loses its connection
			function onConnectionLost(responseObject) {
			  if (responseObject.errorCode !== 0) {
				console.log("onConnectionLost:"+responseObject.errorMessage);
			  }
			}

			// called when a message arrives
			function onMessageArrived(message) {
			  console.log(JSON.parse(message.payloadString));
			}
			
		};
		
		self.on = function() {
			
			message = new Paho.MQTT.Message("1");
			message.destinationName = "ledCommand";
			client.send(message);
			
		};

		self.off = function() {

			message = new Paho.MQTT.Message("0");
			message.destinationName = "ledCommand";
			client.send(message);

		};
		
	};
	
	return new dashboard();
	
});