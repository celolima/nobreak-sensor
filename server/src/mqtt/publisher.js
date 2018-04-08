import Client from './client';
import * as file from '../data/deviceFileAccess';

const publishDevices = (useLocalBroker) => {
  const p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
  p.then((mqtt) => {
    /*  Publisher   */
    setInterval(() => {
      const topics = file.getTopics();
      topics.forEach((topic) => {
        mqtt.publish(topic,(getRandomInt(0,100)).toString(), {}, (err) => {console.log('Error to publish on ', topic)});
      });
    }, 6000);
    }, (err) => console.log('rejected: ', err));
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { publishDevices }
