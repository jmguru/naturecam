const rpio = require('rpio');
const Raspistill = require('node-raspistill').Raspistill;

const PIN_PIR=7;       // GPIO 4
const POLL_DELAY=8000;
const CAM_DELAY=100;
const OUTPUTDIR='/home/pi/photos';

const camera = new Raspistill({
    outputDir: OUTPUTDIR,
    awb: 'auto',
    time: CAM_DELAY,
    width: 2592,
    height: 1944
});

// Main loop

var intervalId = setInterval(function(){

    rpio.open(PIN_PIR, rpio.INPUT);
    pirVal=rpio.read(PIN_PIR);
    if(pirVal) {
        camera.takePhoto().then((photo) => {
            console.log("SNAP!"); 
        });
    } else {
        console.log("Stillness");
    }
}, POLL_DELAY);
