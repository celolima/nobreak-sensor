#include <MqttClientPublisher.h>
#include <Conecta.h>
#include <Mux.h>

//#define LED_BUILTIN 2
#define NUMBER_OF_SENSORS 2

//String ssid = "NET_2GDB14C2";
//String password = "4BDB14C2";
String ssid = "SkyLock";
String password = "12345678";

String mqtt_server = "iot.eclipse.org";
int mqtt_port = 1883;
String topics[NUMBER_OF_SENSORS] = {"/dev-15/temperatura/0c27556f-a1b0-4d54-bcc2-255dc8f1b185","/dev-15/corrente/0c27556f-a1b0-4d54-bcc2-255dc8f1b185"};

int counter = 0;
byte porta = 4;
long lastMsg = 0;

Conecta conecta;
MqttClientPublisher mqtt;
Mux mux;

void setup() {
  Serial.begin(115200);
  Serial.println(" --- Inicializando a aplicação ESP8266 --- ");
  conecta = Conecta(ssid, password);
  //pinMode(LED_BUILTIN, OUTPUT);
  mqtt = MqttClientPublisher(mqtt_server, mqtt_port, conecta.getClient());
}

void loop() {

  if(!isReady()) {
    Serial.print(".");
    delay(3000);
  } else {
    if(porta > 5) {
      porta = 0;
    }

    long now = millis();

    if (now - lastMsg > 5000) {
      lastMsg = now;

      for(int i=0;i<NUMBER_OF_SENSORS;i++) {
        if(topics[i]) {
          mqtt.publish(topics[i], ++counter);
        }
        if(i == 0) {
          porta = 4;
        } else {
          porta = 6;
        }
        Serial.println(mux.getConvertedAnalogValue(porta, 3.3));
      }

    }
  }
}

boolean isReady() {
  boolean isOk = true;
  if (!conecta.isConnected()) {
    isOk = false;
    // Pisca led de conexão Wifi;  
    conecta.setupWifi();    
  } else {
    // Acende led de conexão Wifi;
  }

  boolean flg = mqtt.isConnected();
  
  if (!flg) {
    isOk = false;
    // Pisca led de conexão com o broker;
    Serial.println("Mqtt -- disconnected");
    mqtt.connect();
  } else {
    // Acende led de conexão com o broker;
  }
 
  return isOk;
}

/*
void blinkLed() {
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
}
*/
