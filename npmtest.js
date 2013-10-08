var skynet = require('skynet');

var conn = skynet.createConnection({
  "host":"localhost",
  "port": 3000,
  "uuid": "ad698900-2546-11e3-87fb-c560cb0ca47b",
  "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9"
});


conn.on('message', function(data){
  console.log('status received');
  console.log(data);
});

conn.send({
  "devices": "all",
  "message": {
    "contra":"is cool"
  }
});

