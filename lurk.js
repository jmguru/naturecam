const rpio = require('rpio');
const Raspistill = require('node-raspistill').Raspistill;

const PIN_PIR=7;       // GPIO 4
const POLL_DELAY=8000;
const CAM_DELAY=100;

const camera = new Raspistill({
    // outputDir: '',
    awb: 'auto',
    time: CAM_DELAY,
    width: 800,
    height: 600
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
