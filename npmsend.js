var skynet = require('skynet');
// var skynet = require('./../npm');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "protocol": "websocket"
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  // Send and receive messages
  conn.message({
    "devices": "7386de51-942b-11e3-a1bc-05c340dd8ee7",
    "message": {
      "hello":"world"
    }
  });

  conn.on('message', function(channel, data){
    console.log('message received');
    console.log(channel);
    console.log(data);
  });

});

