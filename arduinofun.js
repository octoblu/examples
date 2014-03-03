var five = require('johnny-five'), button, led;
var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "protocol":"websocket"
});

conn.on('ready', function(data){


  five.Board().on('ready', function(){
  // five.Board({ port: "/dev/cu.usbmodemfa131"}).on('ready', function(){
  // five.Board({ port: "/dev/tty.usbmodem1441"}).on('ready', function(){

    button = new five.Button(8);
    led = new five.Led(13);
    yled = new five.Led(12);
    servo = new five.Servo({
      pin: 9
    });
    buzz = new five.Led(10);

    console.log('Ready');
    button.on('down', function(){
      led.on();
      yled.on();

      conn.update({
        "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "token": "qirqglm6yb1vpldixflopnux4phtcsor",
        "armed":true
      }, function (data) {
        console.log(data); 
      });    

      conn.message({
        "devices": "f1b7fe90-653b-11e3-b2eb-91cf874fce76",
        "message": {
          "red":"on"
        }
      });

      console.log('Device armed via Skynet');
    })

    button.on('up', function(){
      led.off();
      yled.off();      

      // Websocket API
      conn.update({
        "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "token": "qirqglm6yb1vpldixflopnux4phtcsor",
        "armed":false
      }, function (data) {
        console.log(data); 
      });  

      conn.message({
        "devices": "f1b7fe90-653b-11e3-b2eb-91cf874fce76",
        "message": {
          "red":"off"
        }
      });

      console.log('Device unarmed via Skynet');
    })

    conn.on('message', function(data){
        console.log(data);
        // data = JSON.parse(databits);
        if (data.blink == true){
          console.log("strobe request received from skynet");
          led.strobe();
          yled.strobe();
        } else if(data.blink == false){
          console.log("stop strobe request received from skynet");
          led.stop().off();
          yled.stop().off();
        } else if(data.yellow == 'on'){
          console.log("yellow on request received from skynet");
          yled.on();
        } else if(data.yellow == 'off'){
          console.log("yellow off request received from skynet");
          yled.off();
        } else if(data.red == 'on'){
          console.log("red on request received from skynet");
          led.on();
        } else if(data.red == 'off'){
          console.log("red off request received from skynet");
          led.off();
        } else if(data.motor == 'on'){
          console.log("motor request on received from skynet");
          // servo.cw();
          servo.sweep();
        } else if(data.motor == 'off'){
          console.log("motor request off received from skynet");
          // servo.sweep(0);
          servo.stop();
        } else if(data.buzz == 'on'){
          console.log("buzz request on received from skynet");
          // servo.cw();
          buzz.on();
        } else if(data.buzz == 'off'){
          console.log("buzz request off received from skynet");
          // servo.sweep(0);
          buzz.off();
        }
    });
    
  });

});

// curl -X POST -d '{"devices":"all", "message":{"yellow":"on"}}' http://localhost:3000/messages

// curl -X POST -d '{"devices":"all", "message":{"yellow":"on"}}' http://skynet.im/messages
// curl -X POST -d '{"devices":"all", "message":{"yellow":"off"}}' http://skynet.im/messages
// curl -X POST -d '{"devices":"all", "message":{"red":"on"}}' http://skynet.im/messages
// curl -X POST -d '{"devices":"all", "message":{"red":"off"}}' http://skynet.im/messages
// curl -X POST -d '{"devices":"all", "message":{"blink":true}}' http://skynet.im/messages
// curl -X POST -d '{"devices":"all", "message":{"blink":false}}' http://skynet.im/messages
// curl -X POST -d '{"devices":"all", "message":{"buzz":"on"}}' http://skynet.im/messages



