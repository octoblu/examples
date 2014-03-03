var skynet = require('skynet');
var request = require('request');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "protocol": "websocket"
});

conn.on('ready', function(data){

  console.log('Ready');
  conn.on('message', function(data){

    console.log(data);
    try{
      data = JSON.parse(data);
    } catch(e){
      console.log(e);
    }

        // curl -X PUT -d '{"on":false}' http://172.22.111.174/api/newdeveloper/lights/2/state/
        // curl -X PUT -d '{"on":true}' http://172.22.111.174/api/newdeveloper/lights/2/state/

    // {"on":true, "sat":255, "bri":1,"hue": 50000}
    if (data.message.on != undefined){
      try {
        request(
          { method: 'PUT'
          , uri: 'http://10.10.1.180/api/newdeveloper/lights/1/state/'
          , body: JSON.stringify({"on": data.message.on})

        });
        request(
          { method: 'PUT'
          , uri: 'http://10.10.1.180/api/newdeveloper/lights/3/state/'
          , body: JSON.stringify({"on": data.message.on})

        });

      } catch(e){
        console.log(e);
      }

    } else if  (data.message.hue != undefined){
      try {
        request(
          { method: 'PUT'
          , uri: 'http://10.10.1.180/api/newdeveloper/lights/1/state/'
          , body: JSON.stringify({"hue": data.message.hue})

        });   
        request(
          { method: 'PUT'
          , uri: 'http://10.10.1.180/api/newdeveloper/lights/3/state/'
          , body: JSON.stringify({"hue": data.message.hue})

        });   
      } catch(e){
        console.log(e);
      }
    }


  });

});
