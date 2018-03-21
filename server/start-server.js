import app from './src/server';
import Broker from './src/broker';


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

const broker = new Broker();
broker.subscribe('teste/devices');
broker.publish('teste/devices','CARAIO');