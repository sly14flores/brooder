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

// Update these with values suitable for your network.
const char* ssid = "TPLinkFiber";
const char* password = "ActiveEyeElyu5";
const char* mqtt_server = "broker.mqttdashboard.com";
// const char* mqtt_server = "192.168.10.1";

WiFiClient espClient;
PubSubClient client(espClient);

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

  JSONencoder["device"] = "Container";
  
  Serial.print("Command from MQTT broker is : [");
  Serial.print(topic);
  int p =(char)payload[0]-'0';
  // if MQTT comes a 0 turn off LED on D2
  if(p==0) 
  {
	digitalWrite(D2, HIGH); //magtuturn un motor reverse
	delay(1025);
	digitalWrite(D2, LOW); //magstop motor
  JSONencoder["Command"] = "Off";
  char JSONmessageBuffer[100];
  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
  client.publish("brooder/container/status", JSONmessageBuffer);   
    Serial.println(" Turn Off Container! ");
  } 
  // if MQTT comes a 1, turn on LED on pin D2
  if(p==1)
  {
	digitalWrite(D1, HIGH); //magtuturn un dc motor
	delay(1000);
	digitalWrite(D1, LOW); //magstop un motor
  JSONencoder["Command"] = "On";
  char JSONmessageBuffer[100];
  JSONencoder.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));    
  client.publish("brooder/container/status", JSONmessageBuffer);    
    Serial.println(" Turn On Container! ");
  }
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
      client.subscribe("brooder/container");
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
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
