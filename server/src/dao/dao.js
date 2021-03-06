const sqlite3 = require('sqlite3');
let db = null;
const qryAssync = 'SELECT * FROM TB_LOGEMAIL WHERE id = 999';

let getDb = function() {
    if(!db) {
        db = new sqlite3.Database('../misc/sql/database.db', (err) => {
            if (err) {
                console.error(err.message);
                return null;
            }
        });
    }
    return db;
};

let createDeviceParam = (data,callback) => {
    getDb().serialize(function() {
        var stmt1 = getDb().prepare('INSERT INTO TB_DEVICE (name,key) VALUES (?,?)');
        stmt1.run([data.name,data.key],function(err, row) {
            if(err) {
                console.log(err);
                return;
            }
            
            const id_device = stmt1.lastID;
            stmt1.finalize();
    
            if(id_device) {
                
                data.params.forEach((param) => {
                    var stmt2 = getDb().prepare('INSERT INTO TB_PARAM (name,unMed,topic,fk_device) VALUES (?,?,?,?)');
                    stmt2.run([param.name,param.unMed,param.topic,id_device], function(err,row) {
                        if(err) {
                            console.log(err);
                            return;
                        }
                    });
                    stmt2.finalize();
                });
    
                getDb().each('SELECT ID FROM TB_USUARIO WHERE fk_empresa = ?', [data.empresa],  (err, row) => {
                    const fk_usuario = row.id;
                    var stmt2 = getDb().prepare('INSERT INTO TB_PERMISSAO (fk_usuario,fk_device) VALUES (?,?)');
                    stmt2.run([fk_usuario,id_device], function(err,row) {
                        if(err) {
                            console.log(err);
                            return;
                        }
                    });
                    stmt2.finalize();
                });             
            }
        });
        // RETORNO ASSYNCRONO
        getDb().get(qryAssync,  (err, rows) => {
            callback();
        });
    });
};

let createReact = (data) => {    
    var stmt = getDb().prepare('INSERT INTO TB_REACT (tipo,condition,valor_ref,fk_param,action_type,endereco,message) VALUES (?,?,?,?,?,?,?)');
    const msg = data.message ? message : '';
    stmt.run(data.tipo,data.condition,data.valorRef,data.fk_param,data.action_type,data.endereco,msg);
    stmt.finalize();
};

let createLogEmail = (data) => {
    var stmt = getDb().prepare('INSERT INTO TB_LOGEMAIL (data_hora,valor_lido,fk_react) VALUES (?,?,?)');
    const atual = new Date();
    stmt.run(atual,data.valor_lido,data.id);
    stmt.finalize();
};

let disconnect = function() {
    getDb().close((err) => {
        if (err) {
        console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};

exports.getDb = getDb;
exports.createDeviceParam = createDeviceParam;
exports.createReact = createReact;
exports.createLogEmail = createLogEmail;
exports.qryAssync = qryAssync;