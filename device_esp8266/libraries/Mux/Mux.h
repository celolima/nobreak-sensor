#ifndef Mux_h
#define Mux_h

#include "Arduino.h"

class Mux
{
  public:
    Mux();
    int getAnalogValue(byte porta);
    double getConvertedAnalogValue(byte porta, float ref);
    double Mux::getCurrent(byte porta);
  private:
    void setMuxPort(byte porta);
};

#endif