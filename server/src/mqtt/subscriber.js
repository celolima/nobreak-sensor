import Client from './client';
import * as file from '../data/deviceFileAccess';
import events from 'events';

const subscribeDevices = (useLocalBroker) => {    
    const p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
    p.then((mqtt) => {
      /*  Subscriber   */
      const topics = file.getTopics();
      topics.forEach((topic) => {
        mqtt.subscribe(topic);
      });
      const eventEmitter = new events.EventEmitter();
      eventEmitter.on('messageIn', (incomeObj) => checkValuesOnTopicMessage(incomeObj));      
      mqtt.onMessage(eventEmitter);
      }, (err) => console.log('not able to subscribe: ', err));
};

const checkValuesOnTopicMessage = (incomeObj) => {  
  console.log('Emitted ', incomeObj.name, incomeObj.param);
  const reacts = file.getReactsFromTopic(incomeObj.id, incomeObj.param);  
  reacts.forEach(react => {
    console.log(incomeObj.param.concat(' = ', incomeObj.value, ' is ', react.condition, ' ', react.value, ' ?'));
  })
};

export { subscribeDevices }