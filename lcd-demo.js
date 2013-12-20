var five = require("johnny-five"),
    board, lcd;
 
board = new five.Board();
 
board.on("ready", function() {
  var back = new five.Pin(10);
  lcd = new five.LCD({
    pins: [ 8, 9, 4, 5, 6, 7 ],
  });
 
  lcd.on("ready", function() {
    lcd.useChar('heart');
    lcd.clear().print("Hello Chris!");
    lcd.cursor(1, 0);
    lcd.print("We :heart: johnny-five");
  });
 
  this.repl.inject({
    lcd: lcd,
    back: back
  });
 
});