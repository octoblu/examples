var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "742401f1-87a4-11e3-834d-670dadc0ddbf",
  "token": "xjq9h3yzhemf5hfrme8y08fh0sm50zfr",
  "protocol": "mqtt"
});

conn.on('ready', function(data){

  console.log('connected to skynet');

  conn.message({
    "devices": "2bf8d781-89d3-11e3-834d-670dadc0ddbf",
    "message": "this is a test from skynet"
  });

  conn.on('message', function(channel, data){
      console.log(data);
  });

});
