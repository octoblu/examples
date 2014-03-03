var five = require('johnny-five'), button, led;
var skynet = require('skynet');

var conn = skynet.createConnection({
  // "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  // "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "uuid": "742401f1-87a4-11e3-834d-670dadc0ddbf",
  "token": "xjq9h3yzhemf5hfrme8y08fh0sm50zfr"
  
});

conn.on('ready', function(data){


  five.Board().on('ready', function(){
    led = new five.Led(13);

    console.log('Ready');

    conn.on('message', function(data){
      // if(data.fromUuid != "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc"){
        console.log(data);
        if(typeof data == "string"){
          data = JSON.parse(data);
        }        
        if(data.message.red == 'on'){
          console.log("red on request received from skynet");
          led.on();
          // conn.message({
          //   "devices": "*",
          //   "message": {
          //     "red":"on"
          //   }
          // });

        } else if(data.message.red == 'off'){
          console.log("red off request received from skynet");
          led.off();
          // conn.message({
          //   "devices": "*",
          //   "message": {
          //     "red":"off"
          //   }
          // });

        } 

      // }

    });
    
  });

});
