import * as dao from './dao/dao'
const bodyParser = require('body-parser');

function api(app) {
    console.log('Creating server API');
    loadAPI(app);
}

function loadAPI(app) {   
    //JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  
    app.get('/api/devices', (req, res) => {
      let arr = [];
      dao.getDb().serialize(function() {          
        dao.getDb().each('SELECT * FROM TB_DEVICE',  (err, row) => {
          let fk_device = row.id;
          let dev = {...row};
          dao.getDb().all('SELECT * FROM TB_PARAM WHERE FK_DEVICE = ?', [fk_device], (err, rows) => {
            dev['topics'] = rows;            
            arr.push(dev);
          });
        });
        // RETORNO ASSYNCRONO
        dao.getDb().get('SELECT * FROM TB_LOGEMAIL',  (err, rows) => {
          res.setHeader('Cache-Control', 'no-cache');
          res.json(arr);
        });
      });
    });

    //GET SPECIFIC DEVICE
    app.get('/api/devices/:id', (req, res) => {
      let dev = {};
      dao.getDb().serialize(function() {          
        dao.getDb().get('SELECT * FROM TB_DEVICE WHERE ID = ?', [req.params.id],  (err, row) => {
          let fk_device = row.id;
          dev = {...row};
          dev['topics'] = [];
          dao.getDb().each('SELECT * FROM TB_PARAM WHERE FK_DEVICE = ?', [fk_device], (err, row) => {
            let fk_param = row.id;
            let param = {...row};
            dao.getDb().all('SELECT * FROM TB_REACT WHERE FK_PARAM = ?', [fk_param], (err, rows) => {
              param['reacts'] = rows;
              dev['topics'].push(param);
            });
          });
        });
        // RETORNO ASSYNCRONO
        dao.getDb().get('SELECT * FROM TB_LOGEMAIL',  (err, rows) => {
          res.setHeader('Cache-Control', 'no-cache');
          res.json(dev);
        });
      });
    });

    //GET SPECIFIC PARAM
    app.get('/api/devices/param/:id', (req, res) => {
      dao.getDb().get('SELECT * FROM TB_PARAM where id = ?', [req.params.id],  (err, row) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(row);
      });
    });

    //GET PARAMS OF DEVICE
    app.get('/api/devices/params/:fk_device', (req, res) => {
      dao.getDb().all('SELECT * FROM TB_PARAM WHERE fk_device = ?', [parseInt(req.params.fk_device)],  (err, rows) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(rows);
      });
    });     

    //GET EMAILS SPECIFIC PARAM OF DEVICE
    app.get('/api/devices/param/emails/:fk_react', (req, res) => {
      dao.getDb().all('SELECT * FROM TB_LOGEMAIL WHERE fk_react = ?', [parseInt(req.params.fk_react)],  (err, rows) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(rows);
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
  
}

module.exports = api;