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

  // Subscribe to device
  conn.subscribe({
    "uuid": "f828ef20-29f7-11e3-9604-b360d462c699",
    "token": "syep2lu2d0io1or305llz5u9ijrwwmi"
  }, function (data) {
    console.log(data); 
  });


  conn.on('message', function(data){
    console.log('message received');
    console.log(data);
  });

});

