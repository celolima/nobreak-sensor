/*
  Conecta.h - Library for connecting on Wi-fi by ESP8266
  Created by Marcelo Lima, April 18, 2018.
*/

#ifndef Conecta_h
#define Conecta_h

#include "Arduino.h"
#include <ESP8266WiFi.h>

class Conecta
{
  public:
    Conecta();
    Conecta(String ssid, String passwd);
    boolean isConnected();
    WiFiClient getClient();
    void setupWifi();
  private:    
    String _ssid;
    String _passwd;    
};

#endif