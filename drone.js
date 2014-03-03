console.log("Initializing...");

var arDrone = require('ar-drone');
var client = arDrone.createClient();

var skynet = require('skynet');
var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor"
});

conn.on('ready', function(data){

  console.log("Connected to SkyNet");
  conn.on('message', function(databits){
    console.log(databits);
    data = JSON.parse(databits);

    if (data.fly == "up") {
      client.takeoff();
    } else if (data.fly == "down") {
      client.land();
    } else if (data.fly == "stop") {
      client.stop();
    } else if (data.fly == "spin") {
      client.clockwise(0.5);
    } else if (data.fly == "flip") {
      client.animate('flipLeft', 1000);
    } else if (data.red == "on") {
      client.animateLeds('blinkRed', 5, 2)
    } else if (data.red == "off") {
      client.animateLeds('blinkRed', 0, 0)
    } else if (data.green == "on") {
      client.animateLeds('blinkGreen', 5, 2)
    } else if (data.green == "off") {
      client.animateLeds('blinkGreen', 0, 0)
    } else if (data.demo == true) {
      client.takeoff();
      client
        .after(5000, function() {
          this.clockwise(0.5);
        })
        .after(3000, function() {
          this.stop();
          this.land();
        });
    }

  });

});

// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"red":"on"}}' http://skynet.im/messages
// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"red":"off"}}' http://skynet.im/messages

// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"green":"on"}}' http://skynet.im/messages
// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"green":"off"}}' http://skynet.im/messages

// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"fly":"up"}}' http://skynet.im/messages
// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"fly":"down"}}' http://skynet.im/messages
// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"fly":"stop"}}' http://skynet.im/messages
// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"fly":"spin"}}' http://skynet.im/messages
// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"fly":"flip"}}' http://skynet.im/messages

// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "message": {"demo":true}}' http://skynet.im/messages
