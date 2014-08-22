var SkynetSerialPort = require('skynet-serial').SerialPort;
var skynet = require('skynet-mqtt');
var firmata = require('firmata');
 
// You mus set up variables for myId and token
// You can create a skynet device with this curl command:
// curl -X POST -d "type=fakeFirmware&payloadOnly=true&name=myDevice" http://skynet.im/devices
 
var myId = '161dcef0-eafb-11e3-93f8-f3e7e8d1cce9';
var token = '2ixbtfunijft7qfr0ryzqmu25mm9rudi';
 
// the sendId is for the uuid of the physical serial device
var sendId = '322b3f91-1c3f-11e4-861d-89322229e557';
var board;
var pinState = 1;
 
var conn = skynet.createConnection({
  uuid: myId,
  token: token
});
 
conn.on('ready', function(data){
  var serialPort = new SkynetSerialPort(conn, sendId);
  var options = {skipHandshake:true};
  //var options = {samplingInterval:60000};
 
  board = new firmata.Board(serialPort, options, function (err, ok) {
    if (err){ throw err; }
 
    togglePin();
 
  });
});
 
function togglePin(){
  console.log('toggling', pinState);
  if(pinState){
    pinState = 0;
  }else{
    pinState = 1;
  }
  board.digitalWrite(6, pinState);
  setTimeout(togglePin, 3000);
}