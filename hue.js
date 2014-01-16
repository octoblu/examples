var skynet = require('skynet');
var request = require('request');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "protocol": "websocket"
});

conn.on('ready', function(data){


  console.log('Ready');

  conn.on('message', function(channel, data){

    console.log(data);

        // curl -X PUT -d '{"on":false}' http://172.22.111.174/api/newdeveloper/lights/2/state/
        // curl -X PUT -d '{"on":true}' http://172.22.111.174/api/newdeveloper/lights/2/state/

    // {"on":true, "sat":255, "bri":1,"hue": 50000}
    if (data.on == true){
      request(
        { method: 'PUT'
        , uri: 'http://172.22.111.174/api/newdeveloper/lights/2/state/'
        , body: JSON.stringify({"on":true})

      });

    } else if (data.on == false){
      request(
        { method: 'PUT'
        , uri: 'http://172.22.111.174/api/newdeveloper/lights/2/state/'
        , body: JSON.stringify({"on":false})
      });    
    }

    if (data.hue != undefined){
      request(
        { method: 'PUT'
        , uri: 'http://172.22.111.174/api/newdeveloper/lights/2/state/'
        , body: JSON.stringify({"hue": data.hue})

      });

    } else if (data.on == false){
      request(
        { method: 'PUT'
        , uri: 'http://172.22.111.174/api/newdeveloper/lights/2/state/'
        , body: JSON.stringify({"on":false})
      });    
    }


  });

});
