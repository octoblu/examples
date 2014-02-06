var five = require('johnny-five'), button, led;
console.log('> initializing firmata');
// five.Board().on('ready', function(){
five.Board({ port: "/dev/tty.XadowBLESlave-XadowBLES"}).on('ready', function(){
  // leds = pin 11 & 17
  console.log('> board ready');
  this.pinMode(17, five.Pin.OUTPUT);
  led = new five.Led(11);
  console.log('Ready');
  led.strobe();

});

