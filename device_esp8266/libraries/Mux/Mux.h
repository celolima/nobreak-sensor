#ifndef Mux_h
#define Mux_h

#include "Arduino.h"

class Mux
{
  public:
    Mux();
    int getAnalogValue(byte porta);
    float getConvertedAnalogValue(byte porta, float ref);
    double getCurrent();
};

#endif