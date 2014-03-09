var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "a587eb41-a292-11e3-ad2d-c5fcbb05136c",
  "token": "2715lxsogusdcxrmtqdj7hwzcdz33di",
  "protocol": "websocket"
});

conn.on('notReady', function(data){
  console.log('not ready', data);
});

conn.on('ready', function(data){

  console.log('connected to skynet');

  conn.message({
    "devices": "2bf8d781-89d3-11e3-834d-670dadc0ddbf",
    "payload": "this is a test from skynet"
  });

  conn.on('message', function(data){
      console.log(data);
  });

});
