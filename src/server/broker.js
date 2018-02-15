const mqtt = require('mqtt');
let client = mqtt.connect('mqtt://test.mosquitto.org');

let subscribe = function(topic) {
    client.on('connect', function () {
        client.subscribe(topic);
        console.log('Subscribed on %s', topic);
    });
};

let publish = function(topic, message) {
    client.on('connect', function () {
        client.publish(topic,message);
    });
};

client.on('message', function (topic, message) {        
    console.log('Got %s - %s', topic, message.toString());
    //client.end();
});

client.on('offline', function () {
    console.log('\nNot able to connect on MQTT\n');
    client.end();
});

exports.subscribe = subscribe;
exports.publish = publish;