var skynet = require('skynet');
// var skynet = require('./../npm');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "protocol": "websocket"
  // "host": "localhost",
  // "port": 3000
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  setInterval(function(){
    console.log("sending message");
    // Send and receive messages
    conn.message({
      "devices": "5d6e9c91-820e-11e3-a399-f5b85b6b9fd0",
      "payload": {
        "hello":"world"
      }
    });
  },300);

  // conn.message({
  //   "devices": "ed4bfc41-9acd-11e3-9550-cdad95b33498",
  //   "message": {
  //     "hello":"world"
  //   }
  // });


  conn.on('message', function(data){
    console.log('message received');
    console.log(data);
  });

});

