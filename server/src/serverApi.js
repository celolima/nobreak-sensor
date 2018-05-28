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
        dao.getDb().each('SELECT * FROM TB_DEVICE ORDER BY NAME',  (err, row) => {
          let fk_device = row.id;
          let dev = {...row};
          
          dao.getDb().all('SELECT * FROM TB_PARAM WHERE FK_DEVICE = ?', [fk_device], (err, rows) => {
            dev['topics'] = rows;            
            arr.push(dev);
          });
        });
        // RETORNO ASSYNCRONO
        dao.getDb().get(dao.qryAssync,  (err, rows) => {
          res.setHeader('Cache-Control', 'no-cache');
          res.json(arr);
        });
      });
    });

    //GET SPECIFIC DEVICE
    app.get('/api/devices/:id', (req, res) => {
      let dev = {};

      dao.getDb().serialize(function() {
        if(!isNaN(req.params.id)) {
          dao.getDb().get('SELECT * FROM TB_DEVICE WHERE ID = ?', [req.params.id],  (err, row) => {
            if(row) {
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
            }
          });
        }
        // RETORNO ASSYNCRONO
        dao.getDb().get(dao.qryAssync,  (err, rows) => {
          res.setHeader('Cache-Control', 'no-cache');
          res.json(dev);
        });
      });
    });

    //GET SPECIFIC PARAM
    app.get('/api/devices/param/:id', (req, res) => {
      let param = {};
      const query = 'SELECT TB_DEVICE.ID dev_id, TB_DEVICE.NAME dev_name, TB_DEVICE.KEY, TB_PARAM.NAME name, TB_PARAM.ID param_id, TB_PARAM.TOPIC, TB_PARAM.UNMED ' +
                    'FROM TB_PARAM JOIN TB_DEVICE ON TB_PARAM.FK_DEVICE = TB_DEVICE.ID ' +
                    'WHERE TB_PARAM.ID = ?';
      dao.getDb().serialize(function() {          
        dao.getDb().get(query, [req.params.id],  (err, row) => {
          let fk_param = row.param_id;
          param = {...row};
          dao.getDb().all('SELECT * FROM TB_REACT WHERE FK_PARAM = ?', [fk_param], (err, rows) => {
            param['reacts'] = rows;
          });
        });
        // RETORNO ASSYNCRONO
        dao.getDb().get(dao.qryAssync,  (err, rows) => {
          res.setHeader('Cache-Control', 'no-cache');
          res.json(param);
        });
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
    app.get('/api/devices/param/emails/:id', (req, res) => {
      const qry = 'SELECT TB_LOGEMAIL.*, TB_REACT.condition, TB_REACT.valor_ref, TB_REACT.action_type, TB_REACT.endereco FROM TB_LOGEMAIL join TB_REACT on TB_LOGEMAIL.fk_react = TB_REACT.id ' +
                  'join TB_PARAM on TB_REACT.fk_param = TB_PARAM.id ' +
                  'where TB_PARAM.id = ? ORDER BY TB_LOGEMAIL.DATA_HORA DESC';
      dao.getDb().all(qry, [req.params.id],  (err, rows) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(rows);
      });
    });    

    //CREATE NEW DEVICE
    app.post('/api/devices', (req, res) => {
      const newDevice = {
        key: req.body.key,
        name: req.body.name,
        empresa: req.body.empresa,
        params:  req.body.params,
      };
      const callback = () => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json({});
      };
      dao.createDeviceParam(newDevice,callback);
    });

    //CREATE NEW REACTION
    app.post('/api/reacts', (req, res) => {
      const newReact = {
        tipo: req.body.type,
        condition: req.body.condition,
        valorRef: req.body.value,
        fk_param: req.body.topic,
        action_type: req.body.action.actionType,        
        endereco: req.body.action.email,
        message: req.body.action.message
      };

      dao.createReact(newReact);
      res.setHeader('Cache-Control', 'no-cache');
      res.json({});      
  });
  
}

module.exports = api;