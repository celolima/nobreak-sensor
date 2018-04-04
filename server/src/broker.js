const mqtt = require('mqtt');
const connection = 'mqtt://iot.eclipse.org:1883';
let client = null;

class Broker {
    
    constructor(publish) {
        client = mqtt.connect(connection, {rejectUnauthorized: false});

        client.on('connect', function () {
            console.log('Connected on %s', connection);
            publish;
        });

        client.on('error', function(err) {
            console.log('Ocorreu um erro na conexão');
            console.log(err);
        });
        
        client.on('message', function (topic, message) {        
            console.log('GOT: %s -- FROM: %s', topic, message.toString());
        });

        client.stream.on('error', (e) => {            
            console.log('Não foi possível conectar!');
            console.log(e);
            client.end();
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
}

module.exports = Broker;