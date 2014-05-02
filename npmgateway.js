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

  // conn.config({
  //   uuid: "feadee3e-7cb5-4fb5-93bd-1bcdba8de1c5",
  //   token: "c1b066c28d1f4a4aa42b53fe514519d",
  //   method: "getPlugins"
  // }, function (data) {
  //   console.log(JSON.stringify(data));
  // });


  // conn.config({
  //   uuid: "feadee3e-7cb5-4fb5-93bd-1bcdba8de1c5",
  //   token: "c1b066c28d1f4a4aa42b53fe514519d",
  //   method: "getSubdevices"
  // }, function (data) {
  //   console.log(data);
  // });


  conn.config({
    uuid: "feadee3e-7cb5-4fb5-93bd-1bcdba8de1c5",
    token: "c1b066c28d1f4a4aa42b53fe514519d",
    method: "getDefaultOptions",
    name: "skynet-hue"
  }, function (data) {
    console.log(JSON.stringify(data));
  });


});
