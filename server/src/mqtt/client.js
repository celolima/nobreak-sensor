const mqtt = require('mqtt');
const connection = 'mqtt://10.3.144.44';
let mqttClient = null;

class Client {
    
    constructor(publish) {
        mqttClient = mqtt.connect(connection, {rejectUnauthorized: false});

        mqttClient.on('connect', function () {
            console.log('Connected on %s', connection);
            publish;
        });

        mqttClient.on('error', function(err) {
            console.log('Ocorreu um erro na conexão');
            console.log(err);
        });
        
        mqttClient.on('message', function (topic, message) {        
            console.log('GOT: %s -- FROM: %s', topic, message.toString());
        });

        mqttClient.stream.on('error', (e) => {            
            console.log('Não foi possível conectar!');
            console.log(e);
            mqttClient.end();
        });
    }
     
    subscribe(topic) {
        mqttClient.subscribe(topic);
        console.log('Subscribed on %s', topic);
    }
     
    publish(topic, message) {
        mqttClient.publish(topic,message);
        console.log('Publishes on %s: %s', topic, message);
    }
}

module.exports = Client;