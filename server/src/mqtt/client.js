const mqtt = require('mqtt');
let address = 'mqtt://localhost:1883';
let mqttClient = null;

class Client {
    
    constructor(useLocalBroker) {
        address = useLocalBroker ? address : 'mqtt://iot.eclipse.org:1883';
        this.initializeMqttClient();
    }

    initializeMqttClient = () => {
        mqttClient = mqtt.connect(address, {rejectUnauthorized: false});

        mqttClient.on('connect', function () {
            console.log('Connected on %s', address);
        });
        
        mqttClient.on('error', function(err) {
            console.log('Ocorreu um erro na conexão');
            console.log(err);
        });
        
        mqttClient.on('message', function (topic, message) {        
            console.log('GOT: %s -- FROM: %s', message.toString(), topic);
        });

        mqttClient.stream.on('error', (e) => {            
            console.log('Não foi possível conectar!');
            console.log(e);
            mqttClient.end();
        });
    };
     
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