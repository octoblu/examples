var skynet = require('skynet');

var conn = skynet.createConnection({
  // "uuid": "b9937bc0-3461-11e4-9df4-6fc567623b09",
  // "token": "00tz16ey76p9cnmikuleqh8397c4bo6r"
});

conn.on('ready', function(data){
  console.log('Connected to SkyNet', data);

  var five = require("johnny-five"),
    board, lcd;

  board = new five.Board();
  board.on("ready", function() {
    var back = new five.Pin(10);
    back.high();
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
            lcd.cursor(0, 0);
            lcd.clear().print(data.payload);
            lcd.cursor(1, 0);
            lcd.print("via SKYNET.im");
          }
        }
      });
    });
  });

});
