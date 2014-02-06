var Gpio = require('onoff').Gpio;
var led = new Gpio(4, 'out');
var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor"
});

conn.on('ready', function(data){

  console.log('Connected to Skynet');
  led.writeSync(1);
  setTimeout(function(){led.writeSync(0);},500);

  conn.on('message', function(channel, databits){
      console.log(databits);
      if(typeof databits !== 'object'){
        data = JSON.parse(databits);
      } else {
        data = databits;        
      }     
      if(data.red == 'on'){
        console.log("red on request received from skynet");
        led.writeSync(1);
      } else if(data.red == 'off'){
        console.log("red off request received from skynet");
        led.writeSync(0);
      } 

  });
    
});
