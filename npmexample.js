var skynet = require('skynet');
var request = require('request');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "protocol": "websocket"
});

conn.on('ready', function(data){
  console.log('Ready');

  conn.on('message', function(data){
    console.log(data);
  });

  conn.status(function (data) {
    console.log(data);
  });

  conn.message({
    "devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
    "payload": {
      "hello":"world"
    }
  });


});
