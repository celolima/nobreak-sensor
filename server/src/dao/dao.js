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

let createLogEmail = (data) => {
    var stmt = getDb().prepare('INSERT INTO TB_LOGEMAIL (email,data_hora,device_id,device_name,condition,param,valor_lido,valor_def) VALUES (?,?,?,?,?,?,?,?)');
    stmt.run(data.action.email,new Date(),data.id,data.name,data.condition,data.param,data.currVal,data.conditionVal);
    stmt.finalize();
};

let getLogsEmail = function() {
    let rows = [];
    return new Promise((resolve, reject) => resolve(
        getDb().all('SELECT * FROM TB_LOGEMAIL', (err, rows) => {return rows})
    ));
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
exports.getLogsEmail = getLogsEmail;
exports.disconnect = disconnect;