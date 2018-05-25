/*
  ExtInterrupt.h - Library to configure externel interrupt

  Pin interrupts are supported through attachInterrupt, detachInterrupt functions. 
  Interrupts may be attached to any GPIO pin, except GPIO16. 
  Standard Arduino interrupt types are supported: CHANGE, RISING, FALLING

  Created by Marcelo Lima, May 20, 2018.
*/
#include "Arduino.h"
#include "ExtInterrupt.h"

#define F1 15 // D8
#define F2 5 // D1

volatile unsigned long timeFirst1 = 0;
volatile unsigned long timeSecond1 = 0;

volatile double f1 = 0;
volatile byte clk1 = 1;

volatile unsigned long timeFirst2 = 0;
volatile unsigned long timeSecond2 = 0;

volatile double f2 = 0;
volatile byte clk2 = 1;

ExtInterrupt::ExtInterrupt() {
    pinMode(F1, INPUT_PULLUP);
    pinMode(F2, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(F1), handleInterruptF1, FALLING);
    attachInterrupt(digitalPinToInterrupt(F2), handleInterruptF2, FALLING);
}

void ExtInterrupt::handleInterruptF1() {
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

void ExtInterrupt::handleInterruptF2() {
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

double ExtInterrupt::getF1() {
    return f1;
}

double ExtInterrupt::getF2() {
    return f2;
}