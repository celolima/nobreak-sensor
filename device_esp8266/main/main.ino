#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Mux.h>

#define LED_BUILTIN 2
#define LED_WIFI 0
#define NUMBER_OF_SENSORS 2

//String ssid = "NET_2GDB14C2";
//String password = "4BDB14C2";
String ssid = "3Com";
String password = "adminadmin";

String mqtt_server = "iot.eclipse.org";
int mqtt_port = 1883;
String topics[NUMBER_OF_SENSORS] = {"/dev-15/temperatura/0c27556f-a1b0-4d54-bcc2-255dc8f1b185","/dev-15/corrente/0c27556f-a1b0-4d54-bcc2-255dc8f1b185"};

long previousMsgMills = 0;
byte porta[NUMBER_OF_SENSORS] = {4,6};

long previousLEDMillis = 0;
byte ledState;

WiFiClient espClient;
PubSubClient client(espClient);
Mux mux;

double val = 0;

void setup() {
  Serial.begin(115200);
  Serial.println(" --- Inicializando a aplicação ESP8266 --- ");
  setupWifi();
  setupMqtt();
  initConnectionsLED();  
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

  unsigned long now = millis();  
  if (now - previousMsgMills > 2000) {
    previousMsgMills = now;

    for(int i=0;i<NUMBER_OF_SENSORS;i++) {
      if(topics[i]) {        
        // Corrente
        if(i == 0) {
          val = mux.getTemperature(porta[i]);
          Serial.print("Temperatura:  ");
        } if (i == 1) {
          val = mux.getCurrent(porta[i]);
          Serial.print("Corrente:  ");
        } else {
          // Outros
          // val = mux.getConvertedAnalogValue(porta[i], 3.3);
        }
        Serial.println(val);
        publick(topics[i],val);
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
    blinkLed(false);
    reconnect();    
  } else {
    blinkLed(true);
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
      delay(5000);
    }
  }
}

void blinkLed(boolean flg) {
  if(flg) {
    unsigned long currentMillis = millis();
    if (currentMillis - previousLEDMillis >= 700) {
      previousLEDMillis = currentMillis;  
      ledState = !ledState;
      digitalWrite(LED_BUILTIN, ledState);
    }
  } else {
    digitalWrite(LED_BUILTIN, HIGH);
  }
}

void initConnectionsLED() {
  // Inicializa led do Wifi
  pinMode(LED_WIFI, OUTPUT);
  digitalWrite(LED_WIFI, HIGH);

  // Inicializa led do MQTT
  pinMode(LED_BUILTIN, OUTPUT);
  ledState = HIGH;
  digitalWrite(LED_BUILTIN, ledState);
}
