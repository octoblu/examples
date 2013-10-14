var five = require('johnny-five'), button, led;
var skynet = require('skynet');

var conn = skynet.createConnection({
  "host":"localhost",
  "port": 3000,
  // "host":"http://skynet.jit.su",
  // "port": 80,
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor"
});

conn.on('ready', function(data){

  five.Board().on('ready', function(){

    button = new five.Button(8);
    led = new five.Led(13);
    yled = new five.Led(12);
    console.log('Ready');
    button.on('down', function(){
      led.on();

      conn.update({
        "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "token": "qirqglm6yb1vpldixflopnux4phtcsor",
        "armed":true
      }, function (data) {
        console.log(data); 
      });    

      console.log('Device armed via Skynet');
    })

    button.on('up', function(){
      led.off();

      // Websocket API
      conn.update({
        "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "token": "qirqglm6yb1vpldixflopnux4phtcsor",
        "armed":false
      }, function (data) {
        console.log(data); 
      });  

      console.log('Device unarmed via Skynet');
    })

    conn.on('message', function(data){
        console.log(data);
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
        }
    });
    
  });

});


