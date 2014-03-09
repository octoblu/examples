var skynet = require('skynet');
var Cylon = require("cylon");

var conn = skynet.createConnection({
  "uuid": "a587eb41-a292-11e3-ad2d-c5fcbb05136c",
  "token": "2715lxsogusdcxrmtqdj7hwzcdz33di",
  "protocol": "websocket"
});

conn.on('notReady', function(data){
  console.log('not ready', data);
});

conn.on('ready', function(data){

  console.log('Connected to Skynet...');

  // Initialize the robot
  var robot = Cylon.robot({
    // Change the port to the correct port for your Arduino.
    connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/tty.usbmodem1451' },
    device: { name: 'led', driver: 'led', pin: 13 },

    work: function(my) {
      // we do our thing here
      // every((1).second(), function() { my.led.toggle(); });

        conn.on('message', function(data){
          console.log(data);
          if(typeof data == "string"){
            data = JSON.parse(data);
          }             
          if(data.payload.red == 'on'){
            console.log("red on request received from skynet");
            my.led.turnOn();

          } else if(data.payload.red == 'off'){
            console.log("red off request received from skynet");
            my.led.turnOff();
          }     
        });

    }
  });
  robot.start();

});
