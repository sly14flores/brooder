/*  ___   ___  ___  _   _  ___   ___   ____ ___  ____  
 * / _ \ /___)/ _ \| | | |/ _ \ / _ \ / ___) _ \|    \ 
 *| |_| |___ | |_| | |_| | |_| | |_| ( (__| |_| | | | |
 * \___/(___/ \___/ \__  |\___/ \___(_)____)___/|_|_|_|
 *                  (____/ 
 * Remotely control LED with NodeMCU through MQTT IOT broker
 * Tutorial URL http://osoyoo.com/2016/11/25/remotely-control-led-with-nodemcu-through-mqtt-iot-broker/
 * CopyRight John Yu
 */

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// for temperature
int outputpin = A0;

// Update these with values suitable for your network.
const char* ssid = "Apps";
const char* password = "1010101010";
// const char* mqtt_server = "broker.mqtt-dashboard.com";
// const char* mqtt_server = "iot.eclipse.org";
const char* mqtt_server = "192.168.10.1";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

void setup_wifi() {
   delay(100);
  // We start by connecting to a WiFi network
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) 
    {
      delay(500);
      Serial.print(".");
    }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) 
{

  StaticJsonBuffer<300> JSONbuffer;
  JsonObject& JSONencoder = JSONbuffer.createObject();  

  JSONencoder["device"] = "LED";
  
  Serial.print("Command from MQTT broker is : [");
  Serial.print(topic);
  int p =(char)payload[0]-'0';

  Serial.println();

} //end callback

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) 
  {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    //if you MQTT broker has clientID,username and password
    //please change following line to    if (client.connect(clientId,userName,passWord))
    if (client.connect(clientId.c_str()))
    {
      Serial.println("connected");
      //once connected to MQTT broker, subscribe command if any
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 6 seconds before retrying
      delay(6000);
    }
  }
} //end reconnect()

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void temperature() {

  int analogValue = analogRead(outputpin);
  float millivolts = (analogValue/1024.0) * 3300; //3300 is the voltage provided by NodeMCU
  
  StaticJsonBuffer<300> JSONbuffer;
  JsonObject& JSONencoder = JSONbuffer.createObject(); 
  
  JSONencoder["device"] = "Temperature";
  
  float celsius = millivolts/10;
  Serial.print("in DegreeC=   ");
  Serial.println(celsius);
  
  JSONencoder["degrees"] = celsius;
  
  fan(celsius);
  
  //---------- Here is the calculation for Fahrenheit ----------//
  // float fahrenheit = ((celsius * 9)/5 + 32);
  // Serial.print(" in Farenheit=   ");
  // Serial.println(fahrenheit);

  // JSONencoder["fahrenheit"] = fahrenheit;
  
  char JSONmessageBuffer[100];
  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));    
  client.publish("brooder/temperature", JSONmessageBuffer);
  
  delay(1000);

}

void fan(float celsius) {

	if (celsius>=41) {
		client.publish("brooder/fan1", "1");
		client.publish("brooder/fan2", "1");
	}
	
}

void loop() {

	if (!client.connected()) {
		reconnect();
	}
		client.loop();

	// for temperature
	temperature();

}
