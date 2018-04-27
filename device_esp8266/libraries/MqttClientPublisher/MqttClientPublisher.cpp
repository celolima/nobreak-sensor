/*
  MqttClientPublisher.h - Library to configure and publish on MQTT broker by ESP8266
  Created by Marcelo Lima, April 18, 2018.
*/

#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "MqttClientPublisher.h"

MqttClientPublisher::MqttClientPublisher() {
    isOk = false;
}

MqttClientPublisher::MqttClientPublisher(String server, int port, WiFiClient espClient) {
    _client = PubSubClient(espClient);
    _client.setServer(server.c_str(), port);
    isOk = false;
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


boolean MqttClientPublisher::publish(String topic, float value) {
    /*
    char const* pchar = String(value).c_str();
    Serial.print("Publishing: ");
    Serial.print(value);
    Serial.print(" on ");
    Serial.println(topic);
    */
    const char* t = "/dev-15/temperatura/0c27556f-a1b0-4d54-bcc2-255dc8f1b185";
    int v = 90;
    char msg[50];
    snprintf (msg, 75, "hello world #%ld", v);
    _client.publish(t, msg);
}