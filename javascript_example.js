
<html>
<head>
  <script src="skynet.js"></script>
  <script>
    var skynetConfig = {
      "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
      "token": "qirqglm6yb1vpldixflopnux4phtcsor",
      "protocol": "websocket"
    }
    skynet(skynetConfig, function (e, socket) {
      if (e) throw e

      window.socket = socket;

      // Wait for message
      socket.on('message', function(channel, message){
        console.log('message received', channel, message);
      });

      // Get the status of the Skynet network
      socket.emit('status', function(data){
        console.log('status received');
        console.log(data);
      });

      // Send and receive messages
      socket.emit('message', {
        "devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
        "message": {
        "red":"on"
      }}, function(data){
        console.log(data);
      });

    });
  </script>

</head>
<body>
  Skynet.JS Demo  
  <hr/>
  <div id="log"></div>
</body>
</html>
