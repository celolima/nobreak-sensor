/* eslint-disable no-console */
const express = require('express');
const favicon = require('serve-favicon');
const path = require("path");

const broker = require('./broker');
//const dao = require('./dao');

const app = express();
const path_client = "../client/public";
const apiObject = require("./api.js");
const apiInstance = new apiObject(app);

//FAVICON
app.use(favicon(path.join(__dirname, path_client, 'favicon.ico')));

//DIRETORIO ESTATICO
app.use('/static',express.static(path.join(__dirname, path_client)));

app.get('/',function(req,res) {
    let dir = path.join(__dirname, path_client, 'index.html');
    res.sendFile(dir);
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

/* 
dao.connect();
dao.getDevices();
dao.disconnect();
broker.subscribe('/device01/sensor04');
broker.publish('/device01/sensor04','50');
*/