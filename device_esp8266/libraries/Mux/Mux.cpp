/*
  Mux.h - Library to configure and get analog value from mux 4051
  Created by Marcelo Lima, April 25, 2018.
*/
#include "Arduino.h"
#include "Mux.h"
#include "EmonLib.h"
#include "Thermistor.h"

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
    setMuxPort(porta);
    int sensorValue = analogRead(ANALOG_PORT);
    return sensorValue;
}

double Mux::getCurrent(byte porta) {    
    setMuxPort(porta);
    EnergyMonitor emon1;
    emon1.current(ANALOG_PORT, 17.09);
    return emon1.calcIrms(1996);
}

double Mux::getTemperature(byte porta) {
    setMuxPort(porta);
    Thermistor temp(ANALOG_PORT);
    return (double)temp.getTemp();
}

/*
    Recebe o byte da porta e a referência para conversão do valor lido do canal analógico
*/
double Mux::getConvertedAnalogValue(byte porta, float ref) {
    int sensorValue = getAnalogValue(porta);
    double ret = sensorValue * (ref / 1024);
    return ret;
}

void Mux::setMuxPort(byte porta) {
    digitalWrite(A,bitRead(porta, 0));
    digitalWrite(B,bitRead(porta, 1));
    digitalWrite(C,bitRead(porta, 2));
}