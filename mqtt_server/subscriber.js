var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.3.144.44');

client.on('connect', function () {
    client.subscribe('myTopic')
});

client.on('message', function (topic, message) {
    context = message.toString();
    console.log(context);
});