var skynet = require('skynet');
// var skynet = require('./../npm');

var conn = skynet.createConnection({
  "uuid": "a587eb41-a292-11e3-ad2d-c5fcbb05136c",
  "token": "2715lxsogusdcxrmtqdj7hwzcdz33di",
  "protocol": "websocket",
  "server": "http://localhost",
  "port": 3000
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);


  // Update device
  conn.update({
    "uuid":"26cc6770-b9eb-11e3-a3c6-0b41aaf824e3",
    "token": "g9ydhs699d9ozuxrwgrt1ov52gap2e29",
    "settings":{"sensor":true, "GPS":false},
    "myArray": ["test1","test2"]
  }, function (data) {
    console.log(data);

    // WhoAmI?
    conn.whoami({"uuid":"26cc6770-b9eb-11e3-a3c6-0b41aaf824e3"}, function (data) {
      console.log(data);
    });

  });



});
