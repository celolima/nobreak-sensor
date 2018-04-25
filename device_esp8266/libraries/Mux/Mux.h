#ifndef Mux_h
#define Mux_h

#include "Arduino.h"

class Mux
{
  public:
    Mux();
    int Mux::getAnalogValue(byte porta);
    float Mux::getConvertedAnalogValue(byte porta, float ref);
};

#endif