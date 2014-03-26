var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "a587eb41-a292-11e3-ad2d-c5fcbb05136c",
  "token": "2715lxsogusdcxrmtqdj7hwzcdz33di"

});

conn.on('ready', function(data){

  console.log('Ready');

  conn.on('message', function(data){
      console.log(data);
  });


});
