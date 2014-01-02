var skynet = require('../npm');
// var skynet = require('skynet');

var conn = skynet.createConnection({
  // "host":"localhost",
  // "port": 3000,
  // "host":"http://skynet.im",
  // "port": 80,
  // "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  // "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "uuid": "1234567890",
  "token": "1234567890",
  "qos": 0
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  // subscribe to uuid
  conn.subscribe({  
    "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
    "token": "qirqglm6yb1vpldixflopnux4phtcsor"
  }, function (data) {
    console.log(data);
  });

  // Send and receive messages
  // conn.message({
  //   "devices": "*",
  //   "message": {
  //     "test":"54321"
  //   },
  //   "qos": 0
  // });

  // conn.message({
  //   "devices": ["0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "1234567890"],
  //   "message": {
  //     "test":"12345"
  //   },
  //   "qos": 0
  // });

  conn.message({
    "devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
    "message": {
      "test":"0000"
    },
    "qos": 0
  });
  conn.message({
    "devices": "1234567890",
    "message": {
      "test":"0001"
    },
    "qos": 0
  });


  // conn.message({
  //   "devices": "*",
  //   "message": {
  //     "test":"with qos"
  //   },
  //   "qos":0
  // });
  // conn.message({
  //   "devices": "*",
  //   "message": {
  //     "test":"without qos"
  //   }
  // });



  conn.on('message', function(channel, message){
    console.log('message received', channel, message);
  });

  // Event triggered when device loses connection to skynet
  conn.on('disconnect', function(data){
    console.log('disconnected from skynet');
  });

});

