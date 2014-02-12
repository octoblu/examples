var skynet = require('skynet');
var Cylon = require("cylon");

var conn = skynet.createConnection({
  "uuid": "742401f1-87a4-11e3-834d-670dadc0ddbf",
  "token": "xjq9h3yzhemf5hfrme8y08fh0sm50zfr",
  "protocol": "mqtt"
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

        conn.on('message', function(channel, data){
          console.log(data);
          data = JSON.parse(data);
          if(data.red == 'on'){
            console.log("red on request received from skynet");
            my.led.turnOn();

          } else if(data.red == 'off'){
            console.log("red off request received from skynet");
            my.led.turnOff();
          }     
        });

    }
  });
  robot.start();

});
