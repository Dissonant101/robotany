/* IMPORTANT!!!
How to upload this program to an ESP32:
1. Add
"https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json"
2. Select the board "Node32s" in Tools > Board > ESP32 Arduino > Node23s (or
whatever model of the board we're using)
3. Download the ESP32Servo library.
4. You may need to install the Wifi library through the Library Manager. I'm not
sure if it's installed by default or not
*/

#include <Arduino.h>
#include <Arduino_JSON.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <ESP32Servo.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

const int ADC0 = 36;
const int ADC5 = 33;
const int GPIO16 = 16;
const int GPIO17 = 17;

const int pollDelay = 4000;

WiFiMulti wifiMulti;

int previousIsWatering = false;

int previousLightLevel = 0;
int previousMoistureLevel = 0;

Servo myServo;

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
  Serial.begin(115200);
  Serial.println("Connecting to wifi...");

  wifiMulti.addAP("HackTheNorth", "HTNX2023");
  delay(500);
  Serial.println("Wifi Connected");
  
  myServo.attach(GPIO16);
}

void updateMotor() {
  HTTPClient http;
  http.begin("http://ec2-54-242-100-215.compute-1.amazonaws.com/api/plants");
  
  int httpCode = http.GET();
      
  if (httpCode > 0) {
    String payload = http.getString();
    Serial.print("updateMotor: Received response from server");
    JSONVar data = JSON.parse(payload);
    boolean isWatering = data[0]["isWatering"];
    if (previousIsWatering && !isWatering) {
      Serial.println("updateMotor: Entering watering state");
      myServo.writeMicroseconds(1500);
      previousIsWatering = isWatering;
    } else if (!previousIsWatering && isWatering) {
      Serial.println("updateMotor: Entering not watering state");
      myServo.writeMicroseconds(1000);
      previousIsWatering = isWatering;
    } else {
      Serial.println("updateMotor: No changes to watering");
    }
  } else {
    Serial.print("updateMotor: Encountered error ");
    Serial.print(httpCode);
    Serial.println(http.errorToString(httpCode).c_str());
  }
  http.end();
}

void sendData(int lightLevel, int moistureLevel) {
  HTTPClient http;
  http.begin("http://ec2-54-242-100-215.compute-1.amazonaws.com/api/plantdata");
  http.addHeader("Content-Type", "application/json");

  String payload = "{\"name\": ";
  payload += "\"Jerry\"";
  payload += ", \"lightLevel\": ";
  payload += lightLevel;
  payload += ", \"moistureLevel\": ";
  payload += moistureLevel;
  payload += "}";
  int httpCode = http.POST(payload);

  if(httpCode > 0) {
    Serial.print("sendData: Posted data successfully");
  } else {
    Serial.print("sendData: Encountered error ");
    Serial.print(httpCode);
    Serial.println(http.errorToString(httpCode).c_str());
  }

  http.end();
}


void loop() {
  Serial.print("=== Next loop ===");
  if ((wifiMulti.run() == WL_CONNECTED)) {
    int lightLevel = analogRead(ADC0);
    int moistureLevel = analogRead(ADC5);
    int smoothedLightLevel = (previousLightLevel + lightLevel) / 2;
    int smoothedMoistureLevel = (previousMoistureLevel + moistureLevel) / 2;
    sendData(smoothedLightLevel, smoothedMoistureLevel);
    updateMotor();
    
    Serial.print("L:");
    Serial.print(smoothedLightLevel);
    Serial.print(" M:");
    Serial.println(smoothedMoistureLevel);
    previousLightLevel = smoothedLightLevel;
    previousMoistureLevel = smoothedMoistureLevel;
  } else {
    Serial.print(".");
  }
  delay(pollDelay);
}
