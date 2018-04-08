import Client from './client';
import * as file from '../data/deviceFileAccess';
import events from 'events';
import * as action from '../action/actionAnalyser';

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
  const reacts = file.getReactsFromTopic(incomeObj.id, incomeObj.param);  
  reacts.forEach(react => {    
    let data = {};
    data['param'] = incomeObj.param;
    data['currVal'] = incomeObj.value;
    data['condition'] = react.condition;
    data['conditionVal'] = react.value;    
    action.checkAndAct(data);
  })
};

export { subscribeDevices }