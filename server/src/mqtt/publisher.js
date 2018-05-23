import Client from './client';
import * as dao from '../dao/dao'

const publishDevices = (useLocalBroker) => {
  const p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
  p.then((mqtt) => {
    /*  Publisher   */
    setInterval(() => {
      dao.getDb().each('SELECT topic FROM TB_PARAM',  (err, row) => {
        //console.log('Publishing on '+ row.topic);
        mqtt.publish(row.topic,(getRandomInt(0,100)).toString(), {}, (err) => {console.log('Error to publish on ', row.topic)});
      });
    }, 6000);
    }, (err) => console.log('rejected: ', err));
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { publishDevices }