angular.module('dashboard-module', []).factory('dashboard', function() {
	
	function dashboard() {
		
		var self = this;
		
		self.data = function(scope) {		
			
/* 			client = new Paho.MQTT.Client("192.168.10.1", 1884, "");
			
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
			} */
			
			
			temperature(scope);	
			waterLevel(scope);	
			
		};
		
		function temperature(scope) {
			
			var opts = {
			  angle: 0.15, // The span of the gauge arc
			  lineWidth: 0.44, // The line thickness
			  radiusScale: 1, // Relative radius
			  pointer: {
				length: 0.6, // // Relative to gauge radius
				strokeWidth: 0.035, // The thickness
				color: '#000000' // Fill color
			  },
			  limitMax: false,     // If false, max value increases automatically if value > maxValue
			  limitMin: false,     // If true, the min value of the gauge will be fixed
			  colorStart: '#6FADCF',   // Colors
			  colorStop: '#8FC0DA',    // just experiment with them
			  strokeColor: '#E0E0E0',  // to see which ones work best for you
			  generateGradient: true,
			  highDpiSupport: true,     // High resolution support
			  
			};
			var target = document.getElementById('temperature'); // your canvas element
			var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
			gauge.maxValue = 100; // set max gauge value
			gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
			gauge.animationSpeed = 32; // set animation speed (32 is default value)
			gauge.set(40); // set actual value
			
		};
		
		function waterLevel(scope) {
			
			var opts = {
			  angle: 0.35, // The span of the gauge arc
			  lineWidth: 0.1, // The line thickness
			  radiusScale: 1, // Relative radius
			  pointer: {
				length: 0.6, // // Relative to gauge radius
				strokeWidth: 0.035, // The thickness
				color: '#000000' // Fill color
			  },
			  limitMax: false,     // If false, max value increases automatically if value > maxValue
			  limitMin: false,     // If true, the min value of the gauge will be fixed
			  colorStart: '#6F6EA0',   // Colors
			  colorStop: '#C0C0DB',    // just experiment with them
			  strokeColor: '#EEEEEE',  // to see which ones work best for you
			  generateGradient: true,
			  highDpiSupport: true,     // High resolution support
			  
			};
			var target = document.getElementById('water-level'); // your canvas element
			var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
			gauge.maxValue = 100; // set max gauge value
			gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
			gauge.animationSpeed = 32; // set animation speed (32 is default value)
			gauge.set(20); // set actual value			
			
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