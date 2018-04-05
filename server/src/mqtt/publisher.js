import Client from './client';

const publishDevices = (useLocalBroker) => {
  const p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
  p.then((mqtt) => {
    /*  Publisher   */
    let temperatura = 0;
    setInterval(() => { 
      mqtt.publish('/dev-15/temperatura/',(temperatura++).toString(), {}, (err) => {console.log('error')});
    }, 3000);
    }, (err) => console.log('rejected: ', err));
};

export { publishDevices }
