import * as dao from './dao/dao'
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');

const DATA_FILE = path.join(__dirname + '/data/', 'data.json');

function api(app) {
    console.log('Creating server API');
    loadAPI(app);
}

function loadAPI(app) {   
    //JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //GET ALL
    app.get('/api/devices', (req, res) => {
        dao.getDb().all('SELECT * FROM TB_DEVICE',  (err, rows) => {
          res.setHeader('Cache-Control', 'no-cache');
          res.json(rows);
        });
    });

    //GET SPECIFIC DEVICE
    app.get('/api/devices/:id', (req, res) => {
      dao.getDb().get('SELECT * FROM TB_DEVICE where id = ?', [req.params.id],  (err, row) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(row);
      });
    });

    //GET SPECIFIC PARAM
    app.get('/api/devices/param/:paramId', (req, res) => {
      dao.getDb().get('SELECT * FROM TB_PARAM where id = ?', [req.params.id],  (err, row) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(row);
      });
    });

    //CREATE NEW DEVICE
    app.post('/api/devices', (req, res) => {
        fs.readFile(DATA_FILE, (err, data) => {
          const devices = JSON.parse(data);
          const newDevice = {
            id: req.body.id,
            desc: req.body.desc,
            topics: req.body.topics,
            emailAddress: req.body.emailAddress,
            sendEmail: req.body.sendEmail
          };
          devices.push(newDevice);
          fs.writeFile(DATA_FILE, JSON.stringify(devices, null, 4), () => {
            res.json({});
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
              dev.topics = req.body.topics;             
              dev.emailAddress = req.body.emailAddress;
              dev.sendEmail = req.body.sendEmail;
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

    //CREATE NEW REACTION
    app.post('/api/reacts', (req, res) => {
      fs.readFile(DATA_FILE, (err, data) => {
        const devices = JSON.parse(data);
        devices.forEach((dev) => {
          if (dev.id === req.body.device) {
            dev.topics.forEach((topic) => {
              console.log(topic.id);
              if (topic.id === parseInt(req.body.topic)) {
                let react = {
                  type: req.body.type,
                  condition: req.body.condition,
                  value: req.body.value,
                  action: req.body.action
                }
                if(!topic.reacts) {
                  topic.reacts = [];
                }
                react['id'] = topic.reacts.length + 1;
                topic.reacts.push(react);
              }
            });
          }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(devices, null, 4), () => {
          res.json({});
        });
      });
  });
  
  //GET EMAILS SPECIFIC PARAM OF DEVICE
  app.get('/api/devices/param/emails/:devId/:paramId', (req, res) => {
    dao.getDb().get('SELECT * FROM TB_LOGEMAIL WHERE device_id like ? and param like ?', [req.params.devId,req.params.paramId],  (err, row) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(row);
    });
  });
}

module.exports = api;