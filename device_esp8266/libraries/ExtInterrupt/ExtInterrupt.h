#ifndef ExtInterrupt_h
#define ExtInterrupt_h

#include "Arduino.h"

class ExtInterrupt
{
  public:
    ExtInterrupt();
    double getF1();
    double getF2();
  private:
    static void handleInterruptF1();
    static void handleInterruptF2();
};

#endif