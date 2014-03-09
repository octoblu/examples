var skynet = require('skynet');
// var skynet = require('./../npm');

var conn = skynet.createConnection({
  "uuid": "7ca1a4a1-a292-11e3-ad2d-c5fcbb05136c",
  "token": "cvtpz3iomdl8r529jhmryyz4a38fr",
  // "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  // "token": "qirqglm6yb1vpldixflopnux4phtcsor",
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
    "uuid": "7ca1a4a1-a292-11e3-ad2d-c5fcbb05136c",
    "token": "cvtpz3iomdl8r529jhmryyz4a38fr"
  }, function (data) {
    // console.log('subscribed to 0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc');
    console.log(data); 
  });


  conn.on('message', function(data){
    console.log('message received');
    console.log(data);
  });

});

