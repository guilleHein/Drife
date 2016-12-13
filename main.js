var http = require('http');
var mq303a = require('jsupm_mq303a');
var groveSensor = require('jsupm_grove');
var groveSensor = require('jsupm_grove');
var jsUpmI2cLcd  = require ('jsupm_i2clcd');
var limitx=50;
//var led = new groveSensor.GroveLed(514);
var motor1 = new groveSensor.GroveLed(519);
var motor2 = new groveSensor.GroveLed(518);
var button = new groveSensor.GroveButton(517);

// Read the input and print, waiting one second between readings
var myAlcoholObj = new mq303a.MQ303A(515, 530);
var lcd = new jsUpmI2cLcd.Jhd1313m1(512, 0x3E, 0x62); // Initialize the LCD
//var valan=0;
var driver_max_tax=1.0;
var license_plate = '4569BTF';
var request_done = false;

//---------------------------REQUEST-----------------------------------------------------------------------------------------
function request(){
    var options = {
        host: 'www.drifeiot.com',
        path: '/car/auth/driver?license_plate='+license_plate,
    };

    var req = http.get(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        res.on('data', function(chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
        }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        var parsed_body = JSON.parse(body);
        if(parsed_body.success){
            driver_max_tax = parsed_body.driver.alcoholemic_tax;
            console.log('DRIVER NAME: ' + parsed_body.driver.name)
            console.log('TAX: ' + parsed_body.driver.alcoholemic_tax)
        }
        lcd.setCursor(0,1); // go to the 1st row, 2nd column (0-indexed)
        lcd.write(parsed_body.driver.name);
        //lcd.write("hola Dani")
        console.log('BODY: ' + body);
        request_done = true;
        // ...and/or process the entire body here.
        })
    });

    req.on('error', function(e) {
      console.log('ERROR: ' + e.message);
    });
}



// ---------------------------------------------Load alcohol sensor module------------------------------------------------------------------



// Instantiate an mq303a sensor on analog pin A0
// This device uses a heater powered from an analog I/O pin. 
// If using A0 as the data pin, then you need to use A1, as the heater
// pin (if using a grove mq303a).  For A1, we can use the D15 gpio, 
// setup as an output, and drive it low to power the heater.
function alcoholwarmup(){
   // var myAlcoholObj = new mq303a.MQ303A(515, 530);

    console.log("Enabling heater and waiting 2 minutes for warmup.");

// give time updates every 30 seconds until 2 minutes have passed
// for the alcohol sensor to warm up
    statusMessage(1);
    statusMessage(2);
    statusMessage(3);
}

    
function statusMessage(amt)
{
	setTimeout(function()
	{
		console.log((amt * 30) + " seconds have passed");
	}, 30000 * amt);
}

// run the alcohol sensor in 2 minutes
//setTimeout(runAlcoholSensor, 120000);

function runAlcoholSensor()
{
    var j = 0;
	var notice = "This sensor may need to warm " +
				"until the value drops below about 450."
	console.log(notice);

    // Print the detected alcohol value every second
	var waiting1 = setInterval(function()
	{  
        var val = myAlcoholObj.value();
		var msg = "Alcohol detected ";
		msg += "(higher means stronger alcohol): ";
		console.log(msg + val);
        
        if (val<limitx){
            ledon();
            //clearInterval(waiting1);
        }else{
            motor1.off();
            motor2.off();
        }
        j++;
        if ( j == 30) clearInterval(waiting1);
	}, 200);
        
}

function ledon(){

    // Turn the LED on and off 10 times, pausing one second
    // between transitions
    var i = 0;
    motor1.on();
    motor2.on();

    /*var waiting2 = setInterval(function() {
            if ( i % 2 == 0 ) {
                led.on();
            } else {
                led.off();
            }
            i++;
            if ( i == 20 ) clearInterval(waiting2);
            }, 1000);*/
}

// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});


 

function writeLCD(String){
    lcd.setCursor(0,1); // go to the 1st row, 2nd column (0-indexed)
    lcd.write(String); // print characters to the LCD screen
}




function main(){
    request();
    setInterval(function(){
        if(request_done){
            motor1.off();
            motor2.off();
            limitx = driver_max_tax*1000;
            if(button.value() == '1' ){
                runAlcoholSensor();
           }
        }
    },4000);
}

main();
console.log("test->");
