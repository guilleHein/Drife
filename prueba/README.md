Demonstration of IoT devkit v1
===============================

This example drives a JHD1313m1 LCD as found in the *Grove Starter Kit. This connects
to an i2c buss.Light sensor from the kit connects to A0 socket and LED connects to D2 socket.

The code for Display(LCD) be used in either of two ways. By default, it will use the upm module. This
is much the simpler way to drive a upm supported device. 

The purpose of this is to demonstrate that multiple sensors in this case LCD, LED and Light sensor can work together.
UseUpm is the main function which contains all the intilatization of different module and variables. It compares the 
lux value as it reaches to threshold value it switches on/off between LED.For scrolling long strings i.e.(length > 16) 
there are two functions scroll and loop which are resposible.The Values in the array are taken from *seed grove wiki page.


Now at the end Comparing all the lux values to display appropriate message on LCD. 


Intel(R) XDK
-------------------------------------------
This template is part of the Intel(R) XDK IoT Edition.
Download the Intel(R) XDK at http://software.intel.com/en-us/html5. To see the technical details of the sample,
please visit the sample article page at https://software.intel.com/en-us/creating-project-with-lightsensor-led-lcd


Important App Files
---------------------------
* main.js
* package.json
* README.md

License Information Follows
---------------------------
Copyright (c) 2015, Intel Corporation. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

- Neither the name of Intel Corporation nor the names of its contributors
  may be used to endorse or promote products derived from this software
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

mraa
--------------------------------------------
* Included on the IoTDevkit Linux Image

* source:  https://github.com/intel-iot-devkit/mraa
* license:  https://github.com/intel-iot-devkit/mraa/blob/9d488c8e869e59e1dff2c68218a8f38e9b959cd7/cmake/modules/LICENSE_1_0.txt

upm
--------------------------------------------
* Included on the IoTDevkit Linux Image

* source: https://github.com/intel-iot-devkit/upm
* license: https://github.com/intel-iot-devkit/upm/LICENSE
