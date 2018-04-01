const mqtt = require('mqtt');
let client = null;

class Broker {
    constructor() {
        console.log('Criando conexão');
        client = mqtt.connect('mqtt://test.mosquitto.org');
        client.on('message', function (topic, message) {        
            console.log('Got %s - %s', topic, message.toString());
        });
    }
     
    subscribe(topic) {
        client.subscribe(topic);
        console.log('Subscribed on %s', topic);
    }
     
    publish(topic, message) {
        client.publish(topic,message);
        console.log('Publishes on %s: %s', topic, message);
    }
     
    checkConn() {
        console.log('MQTT is offline');
        return 'MQTT is offline';
    }
}

module.exports = Broker;