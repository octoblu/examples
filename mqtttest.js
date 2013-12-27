var skynet = require('../npm');

var conn = skynet.createConnection({
  "host":"localhost",
  "port": 3000,
  // "host":"http://skynet.im",
  // "port": 80,
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
    "uuid": "0000",
    "token": "qirqglm6yb1vpldixflopnux4phtcsor"
  }, function (data) {
    console.log(data);
  });

  // Send and receive messages
  conn.message({
    "devices": "*",
    "message": {
      "test":"54321"
    }
  });

  conn.message({
    "devices": ["0000", "1234567890"],
    "message": {
      "test":"12345"
    }
  });

  conn.message({
    "devices": "0000",
    "message": {
      "test":"0000"
    }
  });

  conn.on('message', function(channel, message){
    console.log('message received', channel, message);
  });

  // Event triggered when device loses connection to skynet
  conn.on('disconnect', function(data){
    console.log('disconnected from skynet');
  });

});

