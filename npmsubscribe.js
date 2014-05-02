var skynet = require('skynet');
// var skynet = require('./../npm');

var conn = skynet.createConnection({
  // "uuid": "7ca1a4a1-a292-11e3-ad2d-c5fcbb05136c",
  // "token": "cvtpz3iomdl8r529jhmryyz4a38fr",
  "uuid": "dbb14ce1-a29a-11e3-ad2d-c5fcbb05136c",
  "token": "p1oxom15ql0daemiovfuuamllnnx9a4ix",
  "protocol": "websocket"
  // "server": "localhost",
  // "port": 3000

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
    // "uuid": "1b6aa961-b3be-11e3-bc92-7f78881a7955",
    // "token": "po04kbj0lfw53ik9iq9jrnegpgbymn29"
    "uuid": "b590df60-c28b-11e3-8c4a-e367dba8a82e",
    "token": "0x2vq83apebchaoricfpr80p4ebl0udi"

  }, function (data) {
    // console.log('subscribed to 0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc');
    console.log(data);
  });


  conn.on('message', function(data){
    console.log('message received');
    console.log(JSON.stringify(data));
  });

});
