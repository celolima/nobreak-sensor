const sqlite3 = require('sqlite3');
let db = null;

let getDb = function() {
    console.log('Conectando...');
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
    var stmt = getDb().prepare('INSERT INTO TB_LOGEMAIL (email,device_id,device_name,condition,param,valor_lido,valor_def) VALUES (?,?,?,?,?,?,?)');
    stmt.run(data.action.email,data.id,data.name,data.condition,data.param,data.currVal,data.conditionVal);
    stmt.finalize();
};

let getLogsEmail = function() {
    getDb().serialize(() => {
        console.log('ID\tEMAIL\tPARAM\tVALOR');
        getDb().each('SELECT * FROM TB_LOGEMAIL', (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + '\t' + row.email+ '\t' + row.param + '\t' + row.valor_lido);
        });
    });
};

let disconnect = function() {
    getDb().close((err) => {
        if (err) {
        console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};

exports.createLogEmail = createLogEmail;
exports.getLogsEmail = getLogsEmail;
exports.disconnect = disconnect;