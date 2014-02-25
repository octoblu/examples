var skynet = require('skynet');

var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "protocol": "websocket"
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);

  // socket.emit('gatewayConfig', {uuid: "4935a683-c960-4814-8dba-2e7629e5a809", token: "c81d29a7698d4df0aa3edb0ab422e0e", method: "getPlugins"}, function(data){console.log(data);});      
  conn.config({
    uuid: "4935a683-c960-4814-8dba-2e7629e5a809", 
    token: "c81d29a7698d4df0aa3edb0ab422e0e", 
    method: "getPlugins"
  }, function (data) {
    console.log(JSON.stringify(data)); 
  });

  // { result:
  //    [ { name: 'skynet-greeting',
  //        version: '0.2.0',
  //        description: 'Greeting plugin for Skynet Gateway',
  //        keywords: [Object],
  //        main: 'index.js',
  //        scripts: [Object],
  //        author: [Object],
  //        license: 'MIT',
  //        readme: 'skynet-greeting\n===============\n\nSkynet Gateway plugin example\n',
  //        readmeFilename: 'README.md',
  //        _id: 'skynet-greeting@0.2.0',
  //        dist: [Object],
  //        _from: 'skynet-greeting@~0.2.0',
  //        _resolved: 'https://registry.npmjs.org/skynet-greeting/-/skynet-greeting-0.2.0.tgz',
  //        dependencies: {},
  //        peerDependencies: {} } ] }

  conn.config({
    uuid: "4935a683-c960-4814-8dba-2e7629e5a809", 
    token: "c81d29a7698d4df0aa3edb0ab422e0e", 
    method: "getSubdevices"
  }, function (data) {
    console.log(data); 
  });


});

