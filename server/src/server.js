import mosca, { Server } from 'mosca';
import Client from './mqtt/client';

const useLocalBroker = false;
const express = require('express');
const app = express();
const apiObject = require("./serverApi");
const apiInstance = new apiObject(app);

app.set('port', (process.env.API_PORT || 3001));

if(useLocalBroker) {
    /*  Configuração do Broker Server   */
    const broker = new Server({port:1883});
  
    broker.on('clientConnected', function(client) {
      console.log('client connected', client.id);		
    });
  
    broker.on('ready', function(){
        console.log("Mqtt broker is ON!");
    });
}
  
var p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
p.then((mqtt) => {
    /*  Subscribe   */
    //mqtt.subscribe('/dev-15/temperatura/');

    /*  Publisher   */
    let temperatura = 0;
    setInterval(() => { 
    mqtt.publish('/dev-15/temperatura/',(temperatura++).toString(), {}, (err) => {console.log('error')});
    }, 3000);
    }, (err) => console.log('rejected: ', err));

/* 
dao.connect();
dao.getDevices();
dao.disconnect();
broker.subscribe('/device01/sensor04');
broker.publish('/device01/sensor04','50');
*/

export default app;