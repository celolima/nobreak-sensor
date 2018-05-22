import Client from './client';
import events from 'events';
import * as action from '../action/actionAnalyser';

const subscribeDevices = (useLocalBroker) => {    
    const p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
    p.then((mqtt) => {
      /*  Subscriber   */
      dao.getDb().each('SELECT topic FROM TB_PARAM',  (err, row) => {
        mqtt.subscribe(row);
      }); 
      const eventEmitter = new events.EventEmitter();
      eventEmitter.on('messageIn', (incomeObj) => checkValuesOnTopicMessage(incomeObj));      
      mqtt.onMessage(eventEmitter);
      }, (err) => console.log('not able to subscribe: ', err));
};

/*
            incomeObj['devName'] = arr[1];
            incomeObj['paramName'] = arr[2];
            incomeObj['devKey'] = arr[3];
            incomeObj['valor_lido'] = message.toString();
*/

const checkValuesOnTopicMessage = (incomeObj) => {
  const query = 'SELECT TB_REACT.*, TB_PARAM.unMed UNIDADE FROM TB_REACT JOIN TB_PARAM ON TB_PARAM.ID = FK_PARAM JOIN TB_DEVICE ON TB_DEVICE.id = FK_DEVICE WHERE TB_PARAM.name like ? AND TB_DEVICE.KEY LIKE ?';
  const key = incomeObj.devKey;  
  const paramName = incomeObj.paramName;

  dao.getDb().each(query, [key, paramName],  (err, row) => {
    data['devName'] = incomeObj.devName;    
    data['currVal'] = incomeObj.valor_lido;
    data['devKey'] = key;    
    data['paramName'] = paramName;
    data['reactId'] = row.id;
    data['unMed'] = row.unidade;
    data['condition'] = row.condition;
    data['conditionVal'] = row.valor_ref;
    data['action'] = row.action_type;
    action.checkAndAct(data);
  });
};

export { subscribeDevices }