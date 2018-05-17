#ifndef Mux_h
#define Mux_h

#include "Arduino.h"

class Mux
{
  public:
    Mux();
    int getAnalogValue(byte porta);
    double getConvertedAnalogValue(byte porta, float ref);
    double getCurrent(byte porta);
    double getTemperature(byte porta);
  private:
    void setMuxPort(byte porta);
};

#endif