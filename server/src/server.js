/* eslint-disable no-console */
const express = require('express');
//const favicon = require('serve-favicon');
//const path = require("path");

const app = express();
//const path_client = "../../client/public";
const apiObject = require("./serverApi");
const apiInstance = new apiObject(app);

app.set('port', (process.env.API_PORT || 3001));

//FAVICON
//app.use(favicon(path.join(__dirname, path_client, 'favicon.ico')));

//DIRETORIO ESTATICO
//app.use('/static',express.static(path.join(__dirname, path_client)));

/* 
dao.connect();
dao.getDevices();
dao.disconnect();
broker.subscribe('/device01/sensor04');
broker.publish('/device01/sensor04','50');
*/

export default app;