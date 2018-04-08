import mosca, { Server } from 'mosca';
import * as pub from './mqtt/publisher';
import * as sub from './mqtt/subscriber';

const useLocalBroker = false;
const useFakePublisher = true;
const subscribeAllDevs = true;

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

if(useFakePublisher) {
    pub.publishDevices(useLocalBroker);
}

if(subscribeAllDevs) {
    sub.subscribeDevices(useLocalBroker);
}

/* 
dao.connect();
dao.getDevices();
dao.disconnect();
*/

export default app;