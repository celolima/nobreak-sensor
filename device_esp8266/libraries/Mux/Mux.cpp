/*
  Mux.h - Library to configure and get analog value from mux 4051
  Created by Marcelo Lima, April 25, 2018.
*/
#include "Arduino.h"
#include "Mux.h"
#include "EmonLib.h"


#define ANALOG_PORT A0
#define A 16 // D0
#define B 5 // D1
#define C 4 // D2 - Bit mais significativo
/*
#define A 12 // D6
#define B 13 // D7
#define C 15 // D8 - Bit mais significativo
*/

Mux::Mux() {
    // seta os pinos select como saída
    pinMode(A,OUTPUT);
    pinMode(B,OUTPUT);
    pinMode(C,OUTPUT);    
}

int Mux::getAnalogValue(byte porta) {        
    digitalWrite(A,bitRead(porta, 0));
    digitalWrite(B,bitRead(porta, 1));
    digitalWrite(C,bitRead(porta, 2));
    int sensorValue = analogRead(ANALOG_PORT);
    return sensorValue;
}

double Mux::getCurrent() {    
    digitalWrite(A,bitRead(4, 0));
    digitalWrite(B,bitRead(4, 1));
    digitalWrite(C,bitRead(4, 2));
    EnergyMonitor emon1;
    emon1.current(ANALOG_PORT, 111.1);
    return emon1.calcIrms(1480);
}

/*
    Recebe o byte da porta e a referência para conversão do valor lido do canal analógico
*/
float Mux::getConvertedAnalogValue(byte porta, float ref) {
    int sensorValue = getAnalogValue(porta);
    float ret = sensorValue * (ref / 1024);
    return ret;
}