var five = require('johnny-five'), button, led;
var skynet = require('skynet');

var conn = skynet.createConnection({
  // "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  // "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "uuid": "a587eb41-a292-11e3-ad2d-c5fcbb05136c",
  "token": "2715lxsogusdcxrmtqdj7hwzcdz33di"
  // "server": "localhost",
  // "port": 3000


});

conn.on('ready', function(data){
  console.log('Connected to SkyNet');

  five.Board({ port: "/dev/cu.usbmodem1451"}).on('ready', function(){
  // five.Board().on('ready', function(){
    led = new five.Led(13);
    ledy = new five.Led(12);

    console.log('Ready');

    conn.on('message', function(data){
      // if(data.fromUuid != "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc"){
        console.log(data);
        if(typeof data == "string"){
          data = JSON.parse(data);
        }
        if(data.payload.red == 'on'){
          console.log("red on request received from skynet");
          led.on();
          conn.message({
            "devices": "f1b7fe90-653b-11e3-b2eb-91cf874fce76",
            "payload": {
              "red":"on"
            }
          });

        } else if(data.payload.red == 'off'){
          console.log("red off request received from skynet");
          led.off();
          conn.message({
            "devices": "f1b7fe90-653b-11e3-b2eb-91cf874fce76",
            "payload": {
              "red":"off"
            }
          });

        } else if(data.payload.yellow == 'on'){
          console.log("yellow on request received from skynet");
          ledy.on();
        } else if(data.payload.yellow == 'off'){
          console.log("yellow off request received from skynet");
          ledy.off();
        }

      // }

    });

  });

});
