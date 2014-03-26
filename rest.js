var request = require('request');

// Check SkyNet status
request('http://skynet.im/status', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print skynet status.
  }
})

// Subscribe to UUID
// curl -X GET http://skynet.im/subscribe/0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc?token=qirqglm6yb1vpldixflopnux4phtcsor
console.log('Subscribing to UUID: 0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc')
request.get('http://skynet.im/subscribe/0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc',
  {qs: {'token': 'qirqglm6yb1vpldixflopnux4phtcsor'}}
  , function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print device activity.
  }
})

// Send message
// curl -X POST -d '{"devices": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc", "payload": {"yellow":"off"}}' http://skynet.im/messages
setTimeout(function(){
  request.post('http://skynet.im/messages',
    {form: {'devices':'0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc', 'payload': 'test'}}
    , function (error, response, body) {
      if(response.statusCode == 200){
        console.log(body);
      }
  });
},1000);
