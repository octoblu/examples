// var skynet = require('skynet');
var skynet = require('./../npm');

var conn = skynet.createConnection({
  "uuid": "196798f1-b5d8-11e3-8c93-45a0c0308eaa",
  "token": "00cpk8akrmz8semisbebhe0358livn29",
  // "uuid": "a587eb41-a292-11e3-ad2d-c5fcbb05136c",
  // "token": "2715lxsogusdcxrmtqdj7hwzcdz33di",
  // "protocol": "mqtt",
  // "qos": 0
  "protocol": "websocket",
  "server": "localhost",
  "port": 3000
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  // // Store sensor data for device
  // conn.data({
  //   "uuid": "b590df60-c28b-11e3-8c4a-e367dba8a82e",
  //   "token": "0x2vq83apebchaoricfpr80p4ebl0udi",
  //   "temperature": 55
  // }, function (data) {
  //   console.log(data);
  // });


  // Get sensor data for device
  conn.getdata({
    "uuid": "b590df60-c28b-11e3-8c4a-e367dba8a82e",
    "token": "0x2vq83apebchaoricfpr80p4ebl0udi",
    "limit":1
  }, function (data) {
    console.log(data);
  });

  // Event triggered when device loses connection to skynet
  conn.on('disconnect', function(data){
    console.log('disconnected from skynet');
  });

});
