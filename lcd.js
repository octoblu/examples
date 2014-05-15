var five = require("johnny-five"),
    board, lcd;

board = new five.Board();
var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "bb875fb1-da10-11e3-a065-0b9815260ada",
  "token": "0ds1po1c2duyaxlxrbfooataxuu40a4i",
  "protocol": "websocket"
});

conn.on('ready', function(data){
  console.log('Connected to SkyNet');

  board.on("ready", function() {
    var back = new five.Pin(10);
    lcd = new five.LCD({
      pins: [ 8, 9, 4, 5, 6, 7 ],
    });
    console.log('LCD Ready');

    lcd.on("ready", function() {
      conn.on('message', function(databits){
        console.log(databits);
        if(typeof databits !== 'object'){
          data = JSON.parse(databits);
        } else {
          data = databits;
        }

        // data = JSON.parse(databits);
        if(typeof databits == "string"){
          data = JSON.parse(databits);
        }

        if (data.payload != "undefined") {
          lcd.useChar('heart');
          if (data.payload.text == 'clear'){
            lcd.clear()
          } else {
            lcd.clear().print(data.payload);
            lcd.cursor(1, 0);
            lcd.print("via SKYNET.im");
          }
        }
      });
    });
  });

});
