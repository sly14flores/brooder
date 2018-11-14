angular.module('dashboard-module', []).factory('dashboard', function() {
	
	function dashboard() {
		
		var self = this;
		
		self.data = function(scope) {
			
			scope.levels = {};
			scope.levels.temperature = "0";
			scope.levels.water = "0";		
			scope.levels.feeder = "0";		
			
			scope.client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "");

			// set callback handlers
			scope.client.onConnectionLost = onConnectionLost;
			scope.client.onMessageArrived = onMessageArrived;

			// connect the client
			scope.client.connect({onSuccess:onConnect});

			// called when the client connects
			function onConnect() {
			  // Once a connection has been made, make a subscription and send a message.
			  console.log("onConnect");
			  scope.client.subscribe("brooder/water");
			  scope.client.subscribe("brooder/temperature");
			  scope.client.subscribe("brooder/feeder");
			}

			// called when the client loses its connection
			function onConnectionLost(responseObject) {
				
				if (responseObject.errorCode !== 0) {
					
					console.log("onConnectionLost:"+responseObject.errorMessage);
					
				};
				
			};

			// called when a message arrives
			function onMessageArrived(message) {
				
				var msgObj = JSON.parse(message.payloadString);
				
				console.log(msgObj);
				
				switch (msgObj.device) {
					
					case "Water":
					
						scope.water.set(msgObj.distance);
						scope.levels.water = msgObj.distance.toString();
					
					break;
					
					case "Temperature":
					
						scope.temperature.set(msgObj.degrees);
						scope.levels.temperature = msgObj.degrees.toString();
					
					break;

					case "Feeder":
					
						scope.feeder.set(msgObj.weight);
						scope.levels.feeder = msgObj.weight.toString();					
					
					break;
					
				};
				
				scope.$apply();				
			  
			};
			
		};
		
		self.temperature = function(scope) {
			
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
			scope.temperature = new Gauge(target).setOptions(opts); // create sexy gauge!
			scope.temperature.maxValue = 100; // set max gauge value
			scope.temperature.setMinValue(0);  // Prefer setter over gauge.minValue = 0
			scope.temperature.animationSpeed = 32; // set animation speed (32 is default value)
			scope.temperature.set(0); // set actual value
			
		};
		
		self.waterLevel = function(scope) {
			
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
			scope.water = new Donut(target).setOptions(opts); // create sexy gauge!
			scope.water.maxValue = 100; // set max gauge value
			scope.water.setMinValue(0);  // Prefer setter over gauge.minValue = 0
			scope.water.animationSpeed = 32; // set animation speed (32 is default value)
			scope.water.set(0); // set actual value			
			
		};
		
		self.feeder = function(scope) {
			
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
			  colorStart: '#cb3434',   // Colors
			  colorStop: '#f09d9d',    // just experiment with them
			  strokeColor: '#EEEEEE',  // to see which ones work best for you
			  generateGradient: true,
			  highDpiSupport: true,     // High resolution support
			  
			};
			var target = document.getElementById('feeder'); // your canvas element
			scope.feeder = new Donut(target).setOptions(opts); // create sexy gauge!
			scope.feeder.maxValue = 100; // set max gauge value
			scope.feeder.setMinValue(0);  // Prefer setter over gauge.minValue = 0
			scope.feeder.animationSpeed = 32; // set animation speed (32 is default value)
			scope.feeder.set(0); // set actual value				
			
		};
		
	};
	
	return new dashboard();
	
});