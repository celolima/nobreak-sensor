/*
  ExternalInterrupt.h - Library to configure externel interrupt

  Pin interrupts are supported through attachInterrupt, detachInterrupt functions. 
  Interrupts may be attached to any GPIO pin, except GPIO16. 
  Standard Arduino interrupt types are supported: CHANGE, RISING, FALLING

  Created by Marcelo Lima, May 20, 2018.
*/
#include "Arduino.h"
#include "ExternalInterrupt.h"

#define F1 5 // D1
#define F2 15 // D8

unsigned long timeFirst1 = 0;
unsigned long timeSecond1 = 0;

double f1 = 0;
byte clk1 = 1;

unsigned long timeFirst1 = 0;
unsigned long timeSecond1 = 0;

double f2 = 0;
byte clk2 = 1;

ExternalInterrupt::ExternalInterrupt() {
    pinMode(interruptPin, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(F1), handleInterruptF1, FALLING);
    attachInterrupt(digitalPinToInterrupt(F2), handleInterruptF2, FALLING);
}

void ExternalInterrupt::handleInterruptF1() {
    if(clk1 == 1) {
        timeFirst1 = millis();    
        clk1++;
    } else if(clk1 == 2) {
        unsigned long total = 0;
        timeSecond1 = millis();
        total = (timeSecond1 - timeFirst1);
        f1 = (double)( (double)1/((double)total/(double)1000) );
        clk1 = 1;
    }
}

void ExternalInterrupt::handleInterruptF2() {
    if(clk2 == 1) {
        timeFirst2 = millis();    
        clk2++;
    } else if(clk2 == 2) {
        unsigned long total = 0;
        timeSecond2 = millis();
        total = (timeSecond2 - timeFirst2);
        f2 = (double)( (double)1/((double)total/(double)1000) );
        clk2 = 1;
    }
}

double ExternalInterrupt::getF1() {
    return f1;
}

double ExternalInterrupt::getF2() {
    return f2;
}