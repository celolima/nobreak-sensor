const sqlite3 = require('sqlite3');
let db = null;

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

let createDeviceParam = (data) => {
    getDb().serialize(function() {
        var stmt1 = getDb().prepare('INSERT INTO TB_DEVICE (name,key) VALUES (?,?)');
        const id_device = stmt1.run(data.devName,data.key);
        console.log('ID DEVICE :: ' + id_device);
        stmt1.finalize();

        var stmt2 = getDb().prepare('INSERT INTO TB_PARAM (name,unMed,topic,fk_device) VALUES (?,?,?,?)');
        stmt2.run(data.paramName,data.unMed,data.topic,id_device);
        stmt2.finalize();

        getDb().each('SELECT ID FROM TB_USUARIO WHERE fk_empresa = ?', [data.empresa],  (err, row) => {
            const fk_usuario = row;
            var stmt2 = getDb().prepare('INSERT INTO TB_PERMISSAO (fk_usuario,fk_device) VALUES (?,?)');
            stmt2.run(fk_usuario,fk_device);
            stmt2.finalize();
        });
    });
};

let createReact = (data) => {    
    var stmt = getDb().prepare('INSERT INTO TB_REACT (tipo,condition,valor_ref,fk_param,action_type,endereco,message) VALUES (?,?,?,?,?,?,?)');
    stmt.run(data.tipo,data.condition,data.valorRef,data.param,data.action,data.endereco,data.message);
    stmt.finalize();
};

let createLogEmail = (data) => {
    var stmt = getDb().prepare('INSERT INTO TB_LOGEMAIL (data_hora,valor_lido,fk_react) VALUES (?,?,?)');
    stmt.run(new Date(),data.currVal,data.reactId);
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
exports.createLogEmail = createLogEmail;
exports.disconnect = disconnect;