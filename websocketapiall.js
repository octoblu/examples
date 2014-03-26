var io = require('socket.io-client')
socket = io.connect('http://skynet.im', {
    port: 80
});

socket.on('connect', function(){
  console.log('Requesting websocket connection to SkyNet');

  socket.on('identify', function(data){
socket.emit('identity', {uuid: '0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc', socketid: data.socketid, token: 'qirqglm6yb1vpldixflopnux4phtcsor'});
  });

  socket.on('notReady', function(data){
    if (data.status == 401){
      console.log('Device not authenticated with SkyNet:', data);
    }
  });
  socket.on('ready', function(data){
    if (data.status == 201){
      console.log('Device authenticated with SkyNet');

      // Send/Receive messages
      socket.emit("message",{
        "devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "payload": {
          "red":"on"
        }
      }, function (data) {
        console.log("emit message:", JSON.stringify(data));
      });
      socket.on('message', function(message){
        console.log('message received', message);
      });

      // Sample SkyNet API calls:
      socket.emit('status', function(data){
        console.log("status received:", JSON.stringify(data));
      });

      // Subscribe and unsubscribe to a device's messages and events
      socket.emit('subscribe', {
        "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "token": "qirqglm6yb1vpldixflopnux4phtcsor"
      }, function (data) {
        console.log("subscribed:", JSON.stringify(data));

      });

      socket.emit('unsubscribe', {"uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc"}, function (data) {
        console.log("unsubscribed:", JSON.stringify(data));
      });

      // Register device
      socket.emit('register', {
        "type":"drone"
      }, function (data) {
        console.log("register:", JSON.stringify(data));
      });


      // Update device
      socket.emit('update', {
        "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "token": "qirqglm6yb1vpldixflopnux4phtcsor",
        "armed":true
      }, function (data) {
        console.log("update:", JSON.stringify(data));
      });

      // WhoAmI?
      socket.emit('whoami', {"uuid":"0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc"}, function (data) {
        console.log("whoami:", JSON.stringify(data));
      });

      // Receive last 10 device events
      socket.emit('events', {
        "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "token": "qirqglm6yb1vpldixflopnux4phtcsor"
      }, function (data) {
        console.log("events:", JSON.stringify(data));
      });

    }
  });
});
