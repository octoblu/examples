var skynet = require('skynet');
var conn = skynet.createConnection({
  "uuid": "26cc6770-b9eb-11e3-a3c6-0b41aaf824e3",
  "token": "g9ydhs699d9ozuxrwgrt1ov52gap2e29",
  "protocol": "websocket"
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');

  conn.subscribe({
    "uuid": "f5c6e271-dc60-11e3-8085-85ecd6a78d0e" // INSERT YOUR SKYNET.IM CURSOR DEMO UUID HERE
  }, function (data) {
    console.log(data);
  });

  conn.on('message', function(data){
    console.log('message received');
    console.log(JSON.stringify(data));
  });

});
