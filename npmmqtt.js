var skynet = require('skynet-mqtt');

var conn = skynet.createConnection({
  // "uuid": "aa4f9fe1-0ed7-11e4-ba98-ed547cf24cbd",
  // "token": "zlolqmvobl8oajormboq7dvaq8kkpgb9",
  "uuid": "a446d2b0-33f0-11e4-9857-9919b8a9f68e",
  "token": "05oiih6c08hestt9rbk5f0kxolohto6r",
  "qos": 1, // MQTT Quality of Service (0=no confirmation, 1=confirmation, 2=N/A)
  "server": "192.168.100.20", // optional - defaults to skynet.im
  // "port": 1883  // optional - defaults to 1883
});

conn.on('ready', function(){

  console.log('UUID AUTHENTICATED!');

  //Listen for messages
  conn.on('message', function(message){
    console.log('message received', new Date().getTime(), message);
  });


  // // Send a message to another device
  // conn.message({
  //   "devices": "xxxxxxx-some-other-uuid-xxxxxxxxx",
  //   "payload": {
  //     "skynet":"online"
  //   }
  // });


  // // Broadcast a message to any subscribers to your uuid
  // console.log('sending message', new Date().getTime());
  // conn.message({
  //   "devices": "aa4f9fe1-0ed7-11e4-ba98-ed547cf24cbd",
  //   "payload": {
  //     "hello":"skynet"
  //   }
  // });

  setInterval(function(){
    console.log("sending message");
    // Send and receive messages
    conn.message({
      "devices": "28cdd331-33f1-11e4-9857-9919b8a9f68e",
      "payload": {
        "hello":"world"
      }
    });
  },300);



  // // Subscribe to broadcasts from another device
  // conn.subscribe('xxxxxxx-some-other-uuid-xxxxxxxxx');


  // Log sensor data to skynet
  conn.data({temperature: 75, windspeed: 10});

});