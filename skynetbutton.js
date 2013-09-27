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

    socket.on('identify', function(data){
      console.log('connected with socket id: ' + data.socketid);
      console.log('sending device uuid: ad698900-2546-11e3-87fb-c560cb0ca47b');
      socket.emit('identity', {uuid: 'ad698900-2546-11e3-87fb-c560cb0ca47b', socketid: data.socketid, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'});
    });

    socket.on('authentication', function(data){
      if (data.status == 201){
        console.log('authenticated');
      } else { // 401
        console.log('not authenticated');
      }
    });

    socket.on('message', function(data){
      console.log(data);
      // var jdata = JSON.parse(data);
      console.log(data.blink);
      if (data.blink == 'start'){
        console.log("strobe request received from skynet");
        led.strobe();
      } else {
        console.log("stop strobe request received from skynet");
        led.stop().off();
      }
      
    });
    socket.on('disconnect', function(){
      console.log('disconnect');
    });
  });

});





// socket = io.connect('localhost', {
//     port: 3000
// });

// socket.on('connect', function(){
//   console.log('websocket connected to skynet');

//   socket.on('identify', function(data){
//     console.log('connected with socket id: ' + data.socketid);
//     console.log('sending device uuid: ad698900-2546-11e3-87fb-c560cb0ca47b');
//     socket.emit('identity', {uuid: 'ad698900-2546-11e3-87fb-c560cb0ca47b', socketid: data.socketid});
//   });


//   socket.on('message', function(data){
//     console.log(data);
//   });
//   socket.on('disconnect', function(){
//     console.log('disconnect');
//   });
// });

