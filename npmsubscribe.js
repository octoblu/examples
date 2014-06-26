// var skynet = require('skynet');
var skynet = require('./../npm');

var conn = skynet.createConnection({
  // "uuid": "7ca1a4a1-a292-11e3-ad2d-c5fcbb05136c",
  // "token": "cvtpz3iomdl8r529jhmryyz4a38fr",
  // "uuid": "26cc6770-b9eb-11e3-a3c6-0b41aaf824e3",
  // "token": "g9ydhs699d9ozuxrwgrt1ov52gap2e29",
  // "protocol": "websocket",
  // "server": "localhost",
  // "port": 3000

  // "uuid": "a587eb41-a292-11e3-ad2d-c5fcbb05136c",
  // "token": "2715lxsogusdcxrmtqdj7hwzcdz33di",
  // "protocol": "mqtt",
  "uuid": "c33e14c0-fd55-11e3-a290-ef9910e207d9",
  "token": "0avr9lpll33w0cnmirsghi79omie8kt9",
  // "qos": 0
  "protocol": "websocket",
  "server": "http://localhost",
  "port": 3000
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  // Subscribe to device
  conn.subscribe({
    // "uuid": "1b6aa961-b3be-11e3-bc92-7f78881a7955",
    // "token": "po04kbj0lfw53ik9iq9jrnegpgbymn29"
    "uuid": "196798f1-b5d8-11e3-8c93-45a0c0308eaa"
    // "token": "02du8936gnb9ms4inrbnqwhs9wpi7ldi"
// "uuid": "99ede351-d6f6-11e3-abcd-1d32e7e917fb",
// "token": "2xbbrqb89e4b1emiwuvjfzx98sg1ra4i"
    // "uuid": "9060b9b0-d986-11e3-a065-0b9815260ada"
    // "token": "02du8936gnb9ms4inrbnqwhs9wpi7ldi"
    // "uuid": "da784db1-faec-11e3-a290-ef9910e207d9"
    // "uuid": "91e325f0-faee-11e3-a290-ef9910e207d9"

  }, function (data) {
    // console.log('subscribed to 0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc');
    console.log(data);
  });


  conn.on('message', function(data){
    console.log('message received');
    console.log(JSON.stringify(data));
  });

});
