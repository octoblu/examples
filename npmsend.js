// var skynet = require('skynet');
var skynet = require('./../npm');

var conn = skynet.createConnection({
  "uuid": "f0af1a01-fd5d-11e3-a290-ef9910e207d9",
  "token": "0wyjcbbffnely2e29zuz9ygnoaymygb9",
  "protocol": "websocket",
  "server": "54.186.44.23",
  "port": 80
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
      "devices": "c33e14c0-fd55-11e3-a290-ef9910e207d9",
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
