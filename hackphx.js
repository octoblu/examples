var five = require("johnny-five"),
    board, lcd;
 
board = new five.Board({ port: "/dev/tty.XadowBLESlave-XadowBLES"});
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

  board.on("ready", function() {
    console.log("Ready");
    led = new five.Led(17);

    conn.on('message', function(data){
      console.log(data);
      if(typeof data !== 'object'){
        data = JSON.parse(data);
      }

      if (data.message.led != "undefined") {
        if(data.message.led == true){
          // led.strobe();
          led.on();
        } else {
          // led.stop().off();
          led.off();
        }
      }

    });

  });

});
