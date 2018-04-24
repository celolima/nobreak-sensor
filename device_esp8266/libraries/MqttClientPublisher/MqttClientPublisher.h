/*
  MqttClientPublisher.h - Library to configure and publish on MQTT borker by ESP8266
  Created by Marcelo Lima, April 18, 2018.
*/

/*
 Basic ESP8266 MQTT example

 This sketch demonstrates the capabilities of the pubsub library in combination
 with the ESP8266 board/library.

 It connects to an MQTT server then:
  - publishes "hello world" to the topic "outTopic" every two seconds
  - subscribes to the topic "inTopic", printing out any messages
    it receives. NB - it assumes the received payloads are strings not binary
  - If the first character of the topic "inTopic" is an 1, switch ON the ESP Led,
    else switch it off

 It will reconnect to the server if the connection is lost using a blocking
 reconnect function. See the 'mqtt_reconnect_nonblocking' example for how to
 achieve the same result without blocking the main loop.

 To install the ESP8266 board, (using Arduino 1.6.4+):
  - Add the following 3rd party board manager under "File -> Preferences -> Additional Boards Manager URLs":
       http://arduino.esp8266.com/stable/package_esp8266com_index.json
  - Open the "Tools -> Board -> Board Manager" and click install for the ESP8266"
  - Select your ESP8266 in "Tools -> Board"

*/


#ifndef MqttClientPublisher_h
#define MqttClientPublisher_h

#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

class MqttClientPublisher
{
  public:
    MqttClientPublisher();
    MqttClientPublisher(String server, int port, WiFiClient espClient);
    boolean publish(String topic, int value);
    void connect();    
    boolean isConnected();
  private:    
    void reconnect();
    PubSubClient _client;
};

#endif