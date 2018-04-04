import app from './src/server';
import Broker from './src/broker';

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

let val = 0;
const publish = () => {
  setInterval(() => { 
    this.publish('/dev-15/temperatura/',(val++).toString(), {}, (err) => {console.log('error')});
  }, 3000);
};

const broker = new Broker(publish);