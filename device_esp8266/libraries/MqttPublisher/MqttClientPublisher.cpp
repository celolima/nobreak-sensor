/*
  MqttClientPublisher.h - Library to configure and publish on MQTT broker by ESP8266
  Created by Marcelo Lima, April 18, 2018.
*/

#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "MqttClientPublisher.h"

MqttClientPublisher::MqttClientPublisher(const char* server, const int port, WiFiClient espClient) {
    PubSubClient client(espClient);
    client.setServer(server, port);
    _client = client;
    connect();
}

void MqttClientPublisher::connect() {
    if (!_client.connected()) {
        reconnect();
    }
    _client.loop();
}

void MqttClientPublisher::reconnect() {
    // Loop until we're reconnected
    while (!_client.connected()) {
        Serial.print("Attempting MQTT connection...");

        // Create a random client ID
        String clientId = "ESP8266Client-";
        clientId += String(random(0xffff), HEX);

        // Attempt to connect
        if (_client.connect(clientId.c_str())) {
            Serial.println("connected");            
        } else {
            Serial.print("failed, rc=");
            Serial.print(_client.state());
            Serial.println(" try again in 5 seconds");
            // Wait 5 seconds before retrying
            delay(5000);
        }
    }
}

boolean MqttClientPublisher::isConnected() {
    return _client.connected();
}

boolean MqttClientPublisher::publish(char* topic, int value) {
   _client.publish(topic, String(value).c_str());
}