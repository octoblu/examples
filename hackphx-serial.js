var START_SYSEX = 0xF0;
var END_SYSEX = 0xF7;
var STRING_DATA = 0x71;

var firmata = require("firmata")
var skynet = require('skynet');

process.on("uncaughtException", function(error) {
  return console.log(error.stack);
});

var conn = skynet.createConnection({
  "uuid": "a79bd891-7fdf-11e3-a399-f5b85b6b9fd0",
  "token": "nsnm9234nf2bj4i1zr7xx6exicw61or",
  "protocol": "websocket"
});

conn.on('ready', function(data){
  console.log("Connected to Skynet!");

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

    // setInterval(function() {
    //   var string = 'Hello world';
    //   sendString(string);
    // }, 1000);

    conn.on('message', function(channel, data){
      console.log(data);
      if(typeof data !== 'object'){
        data = JSON.parse(data);
      }

      if (data.text != "undefined") {
        sendString(data.text);
      }
    })
  })

});

