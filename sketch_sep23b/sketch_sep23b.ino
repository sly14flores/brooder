#define LED_PIN D7

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(10);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  Serial.println(" Turn Off LED! " );
}

void loop() {
  // put your main code here, to run repeatedly:

}
