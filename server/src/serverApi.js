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
      const newDevice = {
        key: req.body.key,
        devName: req.body.devName,
        empresa: req.body.empresa,
        params:  req.body.params,
      };
      dao.createDeviceParam(newDevice);
      res.setHeader('Cache-Control', 'no-cache');
      res.json({});
    });

    //CREATE NEW REACTION
    app.post('/api/reacts', (req, res) => {
      const newReact = {
        tipo: req.body.tipo,
        condition: req.body.condition,
        valorRef: req.body.valorRef,
        action: req.body.action,
        param: req.body.param,
        endereco: req.body.endereco,
        message: req.body.message
      };

      dao.createDeviceParam(newReact);
      res.setHeader('Cache-Control', 'no-cache');
      res.json({});      
  });
  
  //GET EMAILS SPECIFIC PARAM OF DEVICE
  app.get('/api/devices/param/emails/:reactId', (req, res) => {
    dao.getDb().get('SELECT * FROM TB_LOGEMAIL WHERE fk_react = ?', [req.params.reactId],  (err, row) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(row);
    });
  });
}

module.exports = api;