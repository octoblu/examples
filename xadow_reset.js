var firmata = require("firmata")
// var board = new firmata.Board('/dev/tty.usbmodem1451', function(err) {
var board = new firmata.Board('/dev/tty.XadowBLESlave-XadowBLES', function(err) {
  console.log('connected!');
  console.log('Firmware: ' + board.firmware.name + '-' + board.firmware.version.major + '.' + board.firmware.version.minor);

  board.reset();
});

