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

let checkConn = function() {
    client.on('offline', function () {
        console.log('MQTT is offline');
        client.end();
        return 'MQTT is offline';
    });
}

client.on('message', function (topic, message) {        
    console.log('Got %s - %s', topic, message.toString());
    //client.end();
});

exports.subscribe = subscribe;
exports.publish = publish;
exports.checkConn = checkConn;