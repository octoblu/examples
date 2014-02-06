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



// var firmata = require("firmata")
// var board = new firmata.Board('/dev/tty.XadowBLESlave-XadowBLES', function(err) {
//   console.log('connected!');
//   console.log('Firmware: ' + board.firmware.name + '-' + board.firmware.version.major + '.' + board.firmware.version.minor);

//   board.pinMode(17,0x01)
//   board.digitalWrite(17,Board.HIGH)
// });


var START_SYSEX = 0xF0;
var END_SYSEX = 0xF7;
var STRING_DATA = 0x71;

var firmata = require("firmata")
var board = new firmata.Board('/dev/tty.XadowBLESlave-XadowBLES', function(err) {
  console.log('connected!');
  console.log('Firmware: ' + board.firmware.name + '-' + board.firmware.version.major + '.' + board.firmware.version.minor);

  board.on('string', function(string){
    console.log('receiving string: "%s"', string);
  });

  var sendString = function(string) {
    console.log('sending string: ' + string);
    var bytes = new Buffer(string + '\0', 'utf8');
    var data = [];
    data.push(START_SYSEX);
    data.push(STRING_DATA);
    for (var i = 0, length = bytes.length; i < length; i++) {
        data.push(bytes[i] & 0x7F);
        data.push((bytes[i] >> 7) & 0x7F);
    }
    data.push(END_SYSEX);
    board.sp.write(data);
  }

  setInterval(function() {
    var string = 'HackPHX';
    sendString(string);
  }, 1000);


});

