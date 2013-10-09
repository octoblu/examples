var skynet = require('skynet');

var conn = skynet.createConnection({
  "host":"localhost",
  "port": 3000,
  "uuid": "ad698900-2546-11e3-87fb-c560cb0ca47b",
  "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9"
});

// Send and receive messages
conn.send({
  "devices": "all",
  "message": {
    "skynet":"online"
  }
});
conn.on('message', function(data){
  console.log('status received');
  console.log(data);

  if (data.request == "register"){
    conn.unregister({
      "uuid": data.uuid, 
      "token": data.token
    });
  }

});

// Event triggered when device loses connection to skynet
conn.on('disconnect', function(data){
  console.log('disconnected from skynet');
});

// Register a device
conn.register({
  "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", 
  "type": "drone"
});

// UnRegister a device
// conn.unregister({
//   "uuid": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", 
//   "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9"
// });


// Update device
conn.update({
  "uuid":"ad698900-2546-11e3-87fb-c560cb0ca47b", 
  "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", 
  "armed":true
});

// WhoAmI?
conn.whoami({});

// Receive an array of device UUIDs based on user defined search criteria
conn.devices({
  "type":"drone"
});

// Skynet status
conn.status({});

