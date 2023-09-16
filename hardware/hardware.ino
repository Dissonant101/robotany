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
const int ADC7 = 35;
WiFiMulti wifiMulti;

void setup() {
    Serial.begin(115200);
    Serial.println("Connecting to wifi...");

    wifiMulti.addAP("HackTheNorth", "HTNX2023");
    delay(500);
    Serial.println("Wifi Connected");
}

void loop() {
    if ((wifiMulti.run() == WL_CONNECTED)) {
        int humidity = analogRead(ADC0);
        int light = analogRead(ADC7);
        Serial.println("H:");
        Serial.println(humidity);
        delay(10);
        //      Serial.println("");
        Serial.println("L:");
        Serial.println(light);
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
        delay(1000);
    } else {
        Serial.print(".");
    }
}
