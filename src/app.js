const dao = require('./dao');
const broker = require('./broker');


dao.connect();
dao.getDevices();
dao.disconnect();


broker.subscribe('/device01/sensor04');
//broker.publish('/device01/sensor04','50');