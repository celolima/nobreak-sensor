const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, 'data.json');

function api(app) {
    loadAPI(app);
}

function loadAPI(app) {   
    //JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //GET ALL
    app.get('/api/devices', (req, res) => {
        fs.readFile(DATA_FILE, (err, data) => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(JSON.parse(data));
        });
    });
    //CREATE NEW
    app.post('/api/devices', (req, res) => {
        fs.readFile(DATA_FILE, (err, data) => {
          const devices = JSON.parse(data);
          const newDevice = {
            desc: req.body.desc,
            id: req.body.id,
          };
          devices.push(newDevice);
          fs.writeFile(DATA_FILE, JSON.stringify(devices, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(devices);
          });
        });
    });
    //UPDATE
    app.put('/api/devices', (req, res) => {
        fs.readFile(DATA_FILE, (err, data) => {
          const devices = JSON.parse(data);
          devices.forEach((dev) => {
            if (dev.id === req.body.id) {
              dev.desc = req.body.desc;
            }
          });
          fs.writeFile(DATA_FILE, JSON.stringify(devices, null, 4), () => {
            res.json({});
          });
        });
      });
    //DELETE
    app.delete('/api/devices', (req, res) => {
        fs.readFile(DATA_FILE, (err, data) => {
          let devices = JSON.parse(data);
          devices = devices.reduce((memo, dev) => {
            if (dev.id === req.body.id) {
              return memo;
            } else {
              return memo.concat(dev);
            }
          }, []);
          fs.writeFile(DATA_FILE, JSON.stringify(devices, null, 4), () => {
            res.json({});
          });
        });
      });   
}

module.exports = api;