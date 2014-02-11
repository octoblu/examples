var skynet = require('skynet');
// var skynet = require('./../npm');

var conn = skynet.createConnection({
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);

  // Register a device
  conn.register({
    "type": "drone"
  }, function (data) {
    console.log(data); 

    // Login to SkyNet to fire onready event
    conn.authenticate({
      "uuid": data.uuid, 
      "token": data.token
    }, function (data) {
      console.log(data); 
    });

  });

});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  // // Authentication check
  // conn.authenticate({
  //   "uuid": "f828ef20-29f7-11e3-9604-b360d462c699",
  //   "token": "syep2lu2d0io1or305llz5u9ijrwwmi"
  // }, function (data) {
  //   console.log(data); 
  // });

  conn.on('message', function(channel, data){
    console.log('message received');
    console.log(channel);
    console.log(data);
  });

  // Event triggered when device loses connection to skynet
  conn.on('disconnect', function(data){
    console.log('disconnected from skynet');
  });

});

