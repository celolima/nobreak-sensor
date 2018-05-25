#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Mux.h>
#include <ExtInterrupt.h>

#define LED_BUILTIN 2
#define LED_WIFI 13
#define LED_TENSAOIN 12
#define LED_TENSAOBATT 14

#define NUMBER_OF_SENSORS 7

//String ssid = "NET_2GDB14C2";
//String password = "4BDB14C2";
String ssid = "3Com";
String password = "adminadmin";

String mqtt_server = "iot.eclipse.org";
int mqtt_port = 1883;

/*
    M13 -   Tensão de entrada
    M14 -   Tensão de saída
    M15 -   Tensão da bateria
    M05 -   Corrente de saída
    M01 -   Temperatura
*/

String topics[NUMBER_OF_SENSORS] = {"/nobreak01/tensao-entrada/c83036a4-124a-4fa4-b635-5f53ec1c8d04",
                                    "/nobreak01/tensao-saida/c83036a4-124a-4fa4-b635-5f53ec1c8d04",
                                    "/nobreak01/tensao-bateria/c83036a4-124a-4fa4-b635-5f53ec1c8d04",
                                    "/nobreak01/corrente-saida/c83036a4-124a-4fa4-b635-5f53ec1c8d04",
                                    "/nobreak01/temperatura/c83036a4-124a-4fa4-b635-5f53ec1c8d04",
                                    "/nobreak01/frequencia-entrada/c83036a4-124a-4fa4-b635-5f53ec1c8d04",
                                    "/nobreak01/frequencia-saida/c83036a4-124a-4fa4-b635-5f53ec1c8d04"};

long previousMsgMills = 0;
byte porta[NUMBER_OF_SENSORS] = {0,1,2,5,4};

long previousLEDMillis = 0;
byte ledState;

WiFiClient espClient;
PubSubClient client(espClient);
Mux mux;
ExtInterrupt extInt;

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
      // TEN-IN || TEN-OUT || TEN-BATT
      if(i<=2) {
        val = mux.getConvertedAnalogValue(porta[i], 3.3);
      } else if (i==3) { // CORRENTE
        val = mux.getCurrent(porta[i]);
      } else if (i==4) { // TEMPERATURA
        val = mux.getTemperature(porta[i]);
      } else if(i==5) { // FREQIN
        val = extInt.getF1();
      } else { // FREQOUT
        val = extInt.getF2();
      }
      publick(topics[i],val);
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
      digitalWrite(LED_WIFI, ledState);
    }
  } else {
    digitalWrite(LED_WIFI, LOW);
  }
}

void initConnectionsLED() {
  ledState = LOW;

  pinMode(LED_TENSAOIN, OUTPUT);
  pinMode(LED_TENSAOBATT, OUTPUT);
  pinMode(LED_WIFI, OUTPUT);   

  digitalWrite(LED_TENSAOIN, ledState);
  digitalWrite(LED_TENSAOBATT, ledState);
  digitalWrite(LED_WIFI, ledState);
}
