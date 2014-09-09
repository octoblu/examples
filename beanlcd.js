var skynet = require('skynet');
var tinycolor = require('tinycolor2');

// {"ipAddress":"192.168.100.26","uuid":"48617f80-37f2-11e4-a534-c5a669a53a96","timestamp":"2014-09-09T07:24:06.391Z","token":"00xmmkpya7d9sk0529ng6alzccq8h0k9","channel":"main","online":false,"geo":null}

var conn = skynet.createConnection({
  "uuid": "48617f80-37f2-11e4-a534-c5a669a53a96",
  "token": "00xmmkpya7d9sk0529ng6alzccq8h0k9",
  // "uuid": "b9937bc0-3461-11e4-9df4-6fc567623b09",
  // "token": "00tz16ey76p9cnmikuleqh8397c4bo6r"
  "server": "192.168.100.20",
  "port": 3000
});

conn.on('ready', function(data){
  console.log('Connected to Meshblu', data);

  var five = require("johnny-five"),
    board, lcd;

  board = new five.Board();
  board.on("ready", function() {
    var back = new five.Pin(10);
    back.high();
    lcd = new five.LCD({
      pins: [ 8, 9, 4, 5, 6, 7 ],
    });
    lcd.useChar("heart");
    console.log('LCD Ready');

    lcd.on("ready", function() {

      conn.subscribe({
        // "uuid": "feadee3e-7cb5-4fb5-93bd-1bcdba8de1c5",
        // "token": "c1b066c28d1f4a4aa42b53fe514519d"
        "uuid": "5da39cbf-94a0-4ca7-8518-dfc27bbb0e12",
        "token": "352f8f3e8450469daf6e3ca95bb1e9a"
      }, function (data) {
        console.log(data);
      });

      setInterval(function(){
        console.log("getting accelerometer data");
        conn.message({
          "devices": "5da39cbf-94a0-4ca7-8518-dfc27bbb0e12",
          "subdevice": "bean",
          "payload": {
            getAccelerometer: {}
          },
          "ack":1
        });        
      },1000);


      conn.on('message', function(accel){
          console.log(accel);
          // return;
          if(accel.payload && accel.payload.x !== undefined){
            // Update LCD
            var msg = "x:" + accel.payload.x + " y:" + accel.payload.y;          
            lcd.cursor(0, 0);
            lcd.clear().print(msg);
            lcd.cursor(1, 0);
            lcd.print("z:" + accel.payload.z + " :heart:Octoblu");

            // Convert to Hue
            var rgb = tinycolor({h:accel.payload.x/182.04, s: 1, l:.5}).toRgb();
            console.log(rgb);

            // // Send to Bean
            conn.message({
              "devices": "5da39cbf-94a0-4ca7-8518-dfc27bbb0e12",
              "subdevice": "bean",
              "payload": {
                setColor: {
                  r: rgb.r,
                  g: rgb.g,
                  b: rgb.b
                }
              } 
            });        

            // conn.message({
            //   "devices": "feadee3e-7cb5-4fb5-93bd-1bcdba8de1c5",
            //   "subdevice": "bean",
            //   "payload": {
            //     setColor: {
            //       r: accel.payload.x,
            //       g: accel.payload.y,
            //       b: accel.payload.z
            //     }
            //   } 
            // });        

            // Send message to Hue
            conn.message({
              "devices": "5da39cbf-94a0-4ca7-8518-dfc27bbb0e12",
              "subdevice": "privatehue",
              "payload": {"setState":{"lightNumber":1, "options":{"on":true, "hue": accel.payload.x, "bri":255, "sat":255}}} 
            });        

            // Send to moon island
            // conn.message({
            //   "devices": "5da39cbf-94a0-4ca7-8518-dfc27bbb0e12",
            //   "subdevice": "privatehue",
            //   "payload": {"setState":{"lightNumber":1, "options":{"on":true, "hue": accel.payload.x, "bri":255, "sat":255}}} 
            // });        


          }
      });
    });
  });

});
