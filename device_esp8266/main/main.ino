#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Mux.h>

//#define LED_BUILTIN 2
#define NUMBER_OF_SENSORS 2

//String ssid = "NET_2GDB14C2";
//String password = "4BDB14C2";
String ssid = "3Com";
String password = "adminadmin";

String mqtt_server = "iot.eclipse.org";
int mqtt_port = 1883;
String topics[NUMBER_OF_SENSORS] = {"/dev-15/temperatura/0c27556f-a1b0-4d54-bcc2-255dc8f1b185","/dev-15/corrente/0c27556f-a1b0-4d54-bcc2-255dc8f1b185"};

int counter = 0;
byte porta = 4;
long lastMsg = 0;

WiFiClient espClient;
PubSubClient client(espClient);
Mux mux;

void setup() {
  Serial.begin(115200);
  Serial.println(" --- Inicializando a aplicação ESP8266 --- ");
  setupWifi();
  setupMqtt();
  //pinMode(LED_BUILTIN, OUTPUT);  
}

void setupWifi() {
  Serial.print("Connecting to: ");
  Serial.println(ssid);

  WiFi.begin(ssid.c_str(), password.c_str());

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
   
  Serial.println("");
  Serial.print("WiFi connected -- ");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void setupMqtt() {
  client.setServer(mqtt_server.c_str(), mqtt_port);
}

void loop() {
  chkConn();
  long now = millis();

  if (now - lastMsg > 5000) {
    lastMsg = now;
    for(int i=0;i<NUMBER_OF_SENSORS;i++) {
      if(topics[i]) {
        porta = i == 0 ? 4 : 6;
        publick(topics[i],mux.getConvertedAnalogValue(porta, 3.3));
      }
    }
  }
}

void publick(String topic, float value) {
  const char* t = topic.c_str(); 
  client.publish(t, String(value).c_str());
}

void chkConn() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

/*
void blinkLed() {
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
}
*/
