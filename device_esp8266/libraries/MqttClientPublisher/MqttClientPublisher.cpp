/*
  MqttClientPublisher.h - Library to configure and publish on MQTT broker by ESP8266
  Created by Marcelo Lima, April 18, 2018.
*/

#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "MqttClientPublisher.h"

boolean isOk = false;

MqttClientPublisher::MqttClientPublisher() {
    isOk = false;
}

MqttClientPublisher::MqttClientPublisher(String server, int port, WiFiClient espClient) {
    PubSubClient client(espClient);
    client.setServer(server.c_str(), port);
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
            isOk = true;
            delay(3000);
        } else {
            Serial.print("failed, rc=");
            Serial.print(_client.state());
            Serial.println(" try again in 5 seconds");
            isOk = false;
            // Wait 5 seconds before retrying
            delay(1000);
        }
    }
}

boolean MqttClientPublisher::isConnected() {
    return isOk;
}

boolean MqttClientPublisher::publish(String topic, int value) {
    char const* pchar = String(value).c_str();
    Serial.print("Trying to publish: ");
    Serial.println(pchar);
    _client.publish(topic.c_str(), pchar);
}