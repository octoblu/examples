var io = require('socket.io-client')
var request = require('request');
var five = require('johnny-five'), button, led;

five.Board().on('ready', function(){
  button = new five.Button(8);
  led = new five.Led(13);
  console.log('Ready');
  button.on('down', function(){
    led.on();
    request.put('http://localhost:3000/devices/ad698900-2546-11e3-87fb-c560cb0ca47b').form({online:true});
    console.log('Device online with Skynet');
  })
  button.on('up', function(){
    led.off();
    request.put('http://localhost:3000/devices/ad698900-2546-11e3-87fb-c560cb0ca47b').form({online:false});
    console.log('Device offline with Skynet');
  })

  // Websocket controls
  socket = io.connect('localhost', {
      port: 3000
  });

  socket.on('connect', function(){
    console.log('websocket connected to skynet');

    socket.on('message', function(data){
      console.log(data);
    });
    socket.on('disconnect', function(){
      console.log('disconnect');
    });
  });

});

