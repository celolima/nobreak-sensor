#ifndef ExtInterrupt_h
#define ExtInterrupt_h

#include "Arduino.h"

class Mux
{
  public:
    ExtInterrupt();
    double getF1();
    double getF2();
  private:
    void handleInterruptF1();
    void handleInterruptF2();
};

#endif