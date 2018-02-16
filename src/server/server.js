const express = require('express');
const path = require("path");
const app = express();
const broker = require('./broker');
//const dao = require('./dao');

app.use('/static',express.static(path.join(__dirname, '../client/public')));

app.get('/',function(req,res) {
    let dir = path.join(__dirname, '../client/public/index.html');
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