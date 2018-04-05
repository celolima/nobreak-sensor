import app from './src/server';
import mosca, { Server } from 'mosca';
import Client from './src/mqtt/client';

const useLocalBroker = false;

/*  Configuração do servidor   */
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

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