// var SerialPort = require("serialport").SerialPort
// var serialPort = new SerialPort("/dev/tty.XadowBLESlave-XadowBLES", {
//   baudrate: 57600
// });


// serialPort.on("open", function () {
//   console.log('open');
//   // serialPort.on('data', function(data) {
//   //   console.log('data received: ' + data);
//   // });
//   serialPort.write("qsetup", function(err, results) {
//     console.log('err ' + err);
//     console.log('results ' + results);
//   });
// });

// var firmata = require("firmata")
// var board = new firmata.Board('/dev/tty.XadowBLESlave-XadowBLES', function(err) {
//   console.log('connected!');
//   console.log('Firmware: ' + board.firmware.name + '-' + board.firmware.version.major + '.' + board.firmware.version.minor);

//   board.on('string',function(string){
//     console.log('receiving string:' + string);
//   });
//   setInterval(function() {
//     var string = 'Hello world';
//     console.log('sending string:' + string);
//     board.sp.write([0x71, string]);
//   }, 1000);

// });



var firmata = require("firmata")
// var board = new firmata.Board('/dev/tty.usbmodem1451', function(err) {
var board = new firmata.Board('/dev/tty.XadowBLESlave-XadowBLES', function(err) {
  console.log('connected!');
  console.log('Firmware: ' + board.firmware.name + '-' + board.firmware.version.major + '.' + board.firmware.version.minor);

  board.pinMode(6,0x01);
  board.analogWrite(6,255);
  // board.digitalWrite(17,Board.HIGH)
});


