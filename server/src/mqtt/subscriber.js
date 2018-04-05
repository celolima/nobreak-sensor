import Client from './client';
import fs from 'fs';
import path from 'path';
import * as file from '../data/deviceFileAccess';

const subscribeDevices = (useLocalBroker) => {
  const p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
  p.then((mqtt) => {
    /*  Subscriber   */
    file.getTopics().then((topics) => {
      console.log(topics);
      topics.forEach((topic) => {
        mqtt.subscribe(topic);
      });
    }, (err) => console.log('rejected: ', err));
    }, (err) => console.log('rejected: ', err));
};

export { subscribeDevices }