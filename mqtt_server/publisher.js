var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://10.3.144.44');

client.on('connect', function () {
    setInterval(function() {
        client.publish('myTopic', 'Hello mqtt');
        console.log('Message Sent');
    }, 5000);
});