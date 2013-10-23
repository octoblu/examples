var skynet = require('skynet');

var conn = skynet.createConnection({
  "host":"localhost",
  "port": 3000,
  // "host":"http://skynet.jit.su",
  // "port": 80,
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor"
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  // Send and receive messages
  conn.send({
    "devices": "all",
    "message": {
      "skynet":"online"
    }
  });

  // Subscribe to device
  conn.subscribe({
    "uuid": "f828ef20-29f7-11e3-9604-b360d462c699",
    "token": "syep2lu2d0io1or305llz5u9ijrwwmi"
  }, function (data) {
    console.log(data); 
  });

  // Subscribe to device
  conn.unsubscribe({
    "uuid": "f828ef20-29f7-11e3-9604-b360d462c699"
  }, function (data) {
    console.log(data); 
  });


  conn.on('message', function(data){
    console.log('message received');
    console.log(data);
  });

  // Event triggered when device loses connection to skynet
  conn.on('disconnect', function(data){
    console.log('disconnected from skynet');
  });

  // Register a device
  conn.register({
    "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", 
    "type": "drone"
  }, function (data) {
    console.log(data); 
    conn.unregister({
      "uuid": data.uuid, 
      "token": data.token
    }, function (data) {
      console.log(data); 
    });  
  });

  // UnRegister a device
  // conn.unregister({
  //   "uuid": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", 
  //   "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9"
  // }, function (data) {
  //   console.log(data); 
  // });


  // Update device
  conn.update({
    "uuid":"0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", 
    "token": "qirqglm6yb1vpldixflopnux4phtcsor", 
    "armed":true
  }, function (data) {
    console.log(data); 
  });

  // WhoAmI?
  conn.whoami({"uuid":"0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc"}, function (data) {
    console.log(data); 
  });

  // Receive an array of device UUIDs based on user defined search criteria
  conn.devices({
    // "type":"drone"
    "key":"123456"
  }, function (data) {
    console.log(data); 

    // Send hello world to the array of device uuids
    conn.send({
      "devices": data.devices,
      "message": {
        "hello":"world"
      }
    });

  });

  // Skynet status
  conn.status(function (data) {
    console.log(data); 
  });

});

