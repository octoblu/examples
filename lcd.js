var five = require("johnny-five"),
    board, lcd;
 
board = new five.Board();
var skynet = require('skynet');

var conn = skynet.createConnection({
  // "host":"localhost",
  // "port": 3000,
  "host":"http://skynet.im",
  "port": 80,
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor"
});

conn.on('ready', function(data){

  board.on("ready", function() {
    var back = new five.Pin(10);
    lcd = new five.LCD({
      pins: [ 8, 9, 4, 5, 6, 7 ],
    });
   
    lcd.on("ready", function() {
      conn.on('message', function(data){

        if (data.text != "undefined") {
          lcd.useChar('heart');
          if (data.text == 'clear'){
            lcd.clear()
          } else {
            lcd.clear().print(data.text);
            lcd.cursor(1, 0);
            lcd.print("via SKYNET.im");                      
          }
        }
      });
    });
  });

});
