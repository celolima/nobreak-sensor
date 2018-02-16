const express = require('express');
const favicon = require('serve-favicon');
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');

const broker = require('./broker');
//const dao = require('./dao');

const app = express();
const path_client = "../client/public";

//JSON
const DATA_FILE = path.join(__dirname, 'data.json');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//FAVICON
app.use(favicon(path.join(__dirname, path_client, 'favicon.ico')));

//DIRETORIO ESTATICO
app.use('/static',express.static(path.join(__dirname, path_client)));

app.get('/',function(req,res) {
    let dir = path.join(__dirname, path_client, 'index.html');
    res.sendFile(dir);
});

//API
app.get('/api/devices', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(JSON.parse(data));
    });
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