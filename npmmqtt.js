var skynet = require('skynet-mqtt');

var conn = skynet.createConnection({
  "uuid": "aa4f9fe1-0ed7-11e4-ba98-ed547cf24cbd",
  "token": "zlolqmvobl8oajormboq7dvaq8kkpgb9",
  "qos": 0 // MQTT Quality of Service (0=no confirmation, 1=confirmation, 2=N/A)
  // "host": "localhost", // optional - defaults to skynet.im
  // "port": 1883  // optional - defaults to 1883
});

conn.on('ready', function(){

  console.log('UUID AUTHENTICATED!');

  //Listen for messages
  conn.on('message', function(message){
    console.log('message received', message);
  });


  // // Send a message to another device
  // conn.message({
  //   "devices": "xxxxxxx-some-other-uuid-xxxxxxxxx",
  //   "payload": {
  //     "skynet":"online"
  //   }
  // });


  // Broadcast a message to any subscribers to your uuid
  conn.message({
    "devices": "*",
    "payload": {
      "hello":"skynet"
    }
  });


  // // Subscribe to broadcasts from another device
  // conn.subscribe('xxxxxxx-some-other-uuid-xxxxxxxxx');


  // Log sensor data to skynet
  conn.data({temperature: 75, windspeed: 10});

});