var io = require('socket.io-client')
socket = io.connect('http://skynet.im', {
    port: 80
});

socket.on('connect', function(){
  console.log('Requesting websocket connection to SkyNet');

  socket.on('identify', function(data){
    console.log('Websocket connecting to SkyNet with socket id: ' + data.socketid);
    socket.emit('identity', {uuid: '0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc', socketid: data.socketid, token: 'qirqglm6yb1vpldixflopnux4phtcsor'});
  });

  socket.on('notReady', function(data){
    if (data.status == 401){
      console.log('Device not authenticated with SkyNet');
    }
  });
  socket.on('ready', function(data){
    if (data.status == 201){
      console.log('Device authenticated with SkyNet');

      console.log('Sending device uuid: 5d6e9c91-820e-11e3-a399-f5b85b6b9fd0');

      // // Send/Receive messages
      // socket.emit("message",{
      //   "devices": "5d6e9c91-820e-11e3-a399-f5b85b6b9fd0",
      //   "message": {
      //     "hello":"world"
      //   }
      // });
      socket.on('message', function(channel, message){
        console.log('message received', channel, message);
      });

      // Test API calls
      // socket.emit('whoami', {uuid: "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc"}, function(data){console.log(data);});      

      // Test Gateway
      socket.emit('gatewayConfig', {uuid: "4935a683-c960-4814-8dba-2e7629e5a809"}, function(data){console.log(data);});      

    }
  });
});
