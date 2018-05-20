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
        console.log('Getting all');
        fs.readFile(DATA_FILE, (err, data) => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(JSON.parse(data));
        });
    });

    //GET SPECIFIC DEVICE
    app.get('/api/devices/:id', (req, res) => {
      console.log('Getting one: ', req.params.id);
      let device = 'not found';
      fs.readFile(DATA_FILE, (err, data) => {
        const devices = JSON.parse(data);
        devices.forEach((dev) => {
          if (dev.id === req.params.id) {
            device = dev;
            console.log('Founded: ', device.desc);
          }
        });
        res.setHeader('Cache-Control', 'no-cache');
        res.json(device);
      });
    });

    //GET SPECIFIC PARAM OF DEVICE
    app.get('/api/devices/param/:devId/:paramId', (req, res) => {
      //console.log('Getting one: ' + req.params.devId + ' :: ' + req.params.paramId);
      console.log('here =)');
      console.log(req.params);
      let device = null;
      let topic = 'not found';
      fs.readFile(DATA_FILE, (err, data) => {
        const devices = JSON.parse(data);
        devices.forEach((dev) => {
          if (dev.id === req.params.devId) {
            device = dev;
            console.log('Founded: ', device.desc);
            device.topics.forEach((top) => {
              if(top.id === parseInt(req.params.paramId)) {
                console.log('Founded: ', top.param);
                topic = top;
              }
            });
          }
        });
        res.setHeader('Cache-Control', 'no-cache');
        res.json(topic);
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
    
}

module.exports = api;