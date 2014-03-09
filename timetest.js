var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "qos": 0
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  var startTime = new Date().getTime();
  // Send and receive messages
  conn.message({
    "devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
    "payload": {
      "skynet":"online"
    }
  });

  conn.on('message', function(data){
    console.log('message received');
    console.log(data);
    var endTime = new Date().getTime();
    console.log('Sent timestamp: ' + startTime);
    console.log('Received timstamp: ' + endTime);
    var elapsed = endTime - startTime;
    console.log('Elapsed: ' + elapsed + ' milliseconds');
  });

});

