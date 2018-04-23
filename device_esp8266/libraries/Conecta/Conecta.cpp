/*
  Conecta.h - Library for connecting on Wi-fi by ESP8266
  Created by Marcelo Lima, April 18, 2018.
*/

#include <ESP8266WiFi.h>
#include "Arduino.h"
#include "Conecta.h"

Conecta::Conecta(const char* ssid, const char* passwd) {
    _ssid = ssid;
    _passwd = passwd;
    setupWifi();
}

void Conecta::setupWifi() {
  if(!isConnected()){
    // We start by connecting to a WiFi network  
    Serial.print("Connecting to: ");
    Serial.println(_ssid);

    WiFi.begin(_ssid, _passwd);

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.print("WiFi connected -- ");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  }
}

boolean Conecta::isConnected() {
    return WiFi.status() == WL_CONNECTED;
}

WiFiClient Conecta::getClient() {
    return WiFiClient();
}