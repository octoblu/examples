var io = require('socket.io-client')
// socket = io.connect('http://0.0.0.0', {
//     port: 3000
// });
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

      // Test Gateway
      socket.emit('gatewayConfig', {uuid: "4935a683-c960-4814-8dba-2e7629e5a809", token: "c81d29a7698d4df0aa3edb0ab422e0ex", method: "getPlugins"}, function(data){console.log(data);});      

    }
  });
});
