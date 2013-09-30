var io = require('socket.io-client')
var request = require('request');
var five = require('johnny-five'), button, led;

five.Board().on('ready', function(){
  button = new five.Button(8);
  led = new five.Led(13);
  yled = new five.Led(12);
  console.log('Ready');
  button.on('down', function(){
    led.on();
    // request.put('http://localhost:3000/devices/ad698900-2546-11e3-87fb-c560cb0ca47b').form({armed:true, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'});
    request.put('http://localhost:3000/devices/ad698900-2546-11e3-87fb-c560cb0ca47b', {form:{armed:true, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'}}, function (error, response, body){
      console.log(body);
    });

    console.log('Device armed via Skynet');
  })
  button.on('up', function(){
    led.off();
    // request.put('http://localhost:3000/devices/ad698900-2546-11e3-87fb-c560cb0ca47b').form({armed:false, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'});
    request.put('http://localhost:3000/devices/ad698900-2546-11e3-87fb-c560cb0ca47b', {form:{armed:false, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'}}, function (error, response, body){
      console.log(body);
    });
    console.log('Device unarmed via Skynet');
  })

  // Websocket controls
  socket = io.connect('localhost', {
      port: 3000
  });

  socket.on('connect', function(){
    console.log('Requesting websocket connection to Skynet');

    socket.on('identify', function(data){
      console.log('Websocket connected to Skynet with socket id: ' + data.socketid);
      console.log('Sending device uuid: ad698900-2546-11e3-87fb-c560cb0ca47b');
      socket.emit('identity', {uuid: 'ad698900-2546-11e3-87fb-c560cb0ca47b', socketid: data.socketid, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'});
    });

    socket.on('authentication', function(data){
      if (data.status == 201){
        console.log('Device authenticated with Skynet');
      } else { // 401
        console.log('Device not authenticated with Skynet');
      }
    });

    socket.on('message', function(data){
      console.log(data);
      // var jdata = JSON.parse(data);
      console.log(data.blink);
      if (data.blink == 'start'){
        console.log("strobe request received from skynet");
        led.strobe();
      } else if(data.blink == 'stop'){
        console.log("stop strobe request received from skynet");
        led.stop().off();
      } else if(data.yellow == 'on'){
        console.log("yellow on request received from skynet");
        yled.on();
      } else if(data.yellow == 'off'){
        console.log("yellow off request received from skynet");
        yled.off();
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

