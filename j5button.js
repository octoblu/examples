var five = require('johnny-five'), button, led;
five.Board().on('ready', function(){
  // five.Led(13).strobe(1000);
  button = new five.Button(8);
  led = new five.Led(13);
  button.on('down', function(){
    led.on();
  })
  button.on('up', function(){
    led.off();
  })
})