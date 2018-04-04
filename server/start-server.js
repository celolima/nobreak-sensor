import app from './src/server';
import mosca, { Server } from 'mosca';
import client from './src/mqtt/client';

/*  Configuração do servidor   */
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

/*  Configuração do Broker Server   */
const broker = new Server({port:1883});
broker.on('ready', function(){
    console.log("ready");
    /*  Publisher   */
    let val = 0;
    const publish = () => {
      setInterval(() => { 
        this.publish('/dev-15/temperatura/',(val++).toString(), {}, (err) => {console.log('error')});
      }, 3000);
    };
    const client = new publisher(publish);
});
