import Client from './client';
import events from 'events';
import * as dao from '../dao/dao'
import * as action from '../action/actionAnalyser';

const subscribeDevices = (useLocalBroker) => {    
    const p = new Promise((resolve, reject) => resolve(new Client(useLocalBroker)));
    p.then((mqtt) => {
      /*  Subscriber   */
      dao.getDb().each('SELECT topic FROM TB_PARAM',  (err, row) => {
        mqtt.subscribe(row.topic);
      }); 
      const eventEmitter = new events.EventEmitter();
      eventEmitter.on('messageIn', (incomeObj) => checkValuesOnTopicMessage(incomeObj));      
      mqtt.onMessage(eventEmitter);
      }, (err) => console.log('not able to subscribe: ', err));
};

const checkValuesOnTopicMessage = (incomeObj) => {
  const query = 'SELECT TB_DEVICE.name dev_name, TB_DEVICE.key, TB_PARAM.name param_name, TB_PARAM.unMed, TB_REACT.* FROM TB_REACT JOIN TB_PARAM ' +
                'ON TB_REACT.FK_PARAM = TB_PARAM.ID ' +
                'JOIN TB_DEVICE ON TB_DEVICE.id = TB_PARAM.FK_DEVICE ' +
                'WHERE TB_PARAM.topic like ?'
  
  dao.getDb().each(query, [incomeObj.topic],  (err, row) => {
    const data = {...row, ...{valor_lido: incomeObj.valor_lido}};
    action.checkAndAct(data);
  });
};

export { subscribeDevices }