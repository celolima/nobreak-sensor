import app from './src/server';
import Broker from './src/broker';


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

// const broker = new Broker();
// let val = 10;
// setInterval(() => { 
//   broker.publish('/dev-15/temperatura/',(val++).toString());
// }, 3000);