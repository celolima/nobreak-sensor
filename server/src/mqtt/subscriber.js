import Client from './client';
import * as file from '../data/deviceFileAccess';

const subscribeDevices = (useLocalBroker) => {    
    const p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
    p.then((mqtt) => {
      /*  Subscriber   */
      const topics = file.getTopics();
      topics.forEach((topic) => {
        mqtt.subscribe(topic);
      });
      }, (err) => console.log('rejected: ', err));
};

export { subscribeDevices }