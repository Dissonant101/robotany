/* IMPORTANT!!!
How to upload this program to an ESP32:
1. Add
"https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json"
2. Select the board "Node32s" in Tools > Board > ESP32 Arduino > Node23s (or
whatever model of the board we're using)
3. You may need to install the Wifi library through the Library Manager. I'm not
sure if it's installed by default or not
*/

#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiMulti.h>

const int ADC0 = 36;
const int ADC5 = 33;
const int GPIO16 = 16;
const int GPIO17 = 17;
WiFiMulti wifiMulti;

const int pollDelay = 50;

// 0 = not spinning, 1 = clockwise, 2 = counter-clockwise
int motorState = 0;
int timeUntilSwitchMotorState = 1000;

int previousLightLevel = 0;
int previousMoisture = 0;

void setup() {
    Serial.begin(115200);
    Serial.println("Connecting to wifi...");

    wifiMulti.addAP("HackTheNorth", "HTNX2023");
    delay(500);
    Serial.println("Wifi Connected");

    pinMode(GPIO16, OUTPUT);
    pinMode(GPIO17, OUTPUT);
}

void updateMotor() {
  if (motorState == 0) {
    digitalWrite(GPIO16, LOW);
    digitalWrite(GPIO17, LOW);
    return;
  } else if (motorState == 1) {
    digitalWrite(GPIO16, HIGH);
    digitalWrite(GPIO17, LOW);
  } else if (motorState == 2) {
    digitalWrite(GPIO16, LOW);
    digitalWrite(GPIO17, HIGH);
  }
  timeUntilSwitchMotorState -= pollDelay;
  if (timeUntilSwitchMotorState <= 0) {
    motorState = (motorState + 1) % 3;
    timeUntilSwitchMotorState = 1000;
  }
}

void loop() {
    updateMotor();
    if ((wifiMulti.run() == WL_CONNECTED)) {
        int lightLevel = analogRead(ADC0);
        int moisture = analogRead(ADC5);
        int smoothedLightLevel = (previousLightLevel + lightLevel) / 2;
        int smoothedMoisture = (previousMoisture + moisture) / 2;
        Serial.print("L:");
        Serial.print(smoothedLightLevel);
        delay(10);
        //      Serial.println("");
        Serial.print(" M:");
        Serial.println(moisture);
        previousLightLevel = smoothedLightLevel;
        previousMoisture = smoothedMoisture;
        //      HTTPClient http;
        //      http.begin("https://hackthenorth2022.uc.r.appspot.com/api/velocities");
        //      http.addHeader("Content-Type", "application/json");
        //
        //      String payload = "{\"humidity\": ";
        //      payload += humidity;
        //      payload += ", \"light\": ";
        //      payload += light;
        //      payload += "}";
        //      int httpCode = http.POST(payload);
        //
        //      if(httpCode > 0) {
        //          Serial.printf("HTTP POST\nCode: %d\n", httpCode);
        //
        //          if(httpCode == HTTP_CODE_OK) {
        //              Serial.println("Ok");
        //          }
        //      } else {
        //          Serial.printf("Error: %s\n",
        //          http.errorToString(httpCode).c_str());
        //      }
        //
        //      http.end();
        delay(pollDelay);
    } else {
        Serial.print(".");
    }
}