const sqlite3 = require('sqlite3');
let db = null;

let connect = function() {
    console.log('Conectando...');
    if(!db) {
        db = new sqlite3.Database('../misc/sql/database.db', (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
};

let createLogEmail = (data) => {
    var stmt = db.prepare("INSERT INTO TB_LOGEMAIL (email,device_id,device_name,condition,param,valor_lido,valor_def) VALUES (?,?,?,?,?,?,?)");
    stmt.run(data.action.email,data.id,data.name,data.condition,data.param,data.currVal,data.conditionVal);
    stmt.finalize();
};

let getLogsEmail = function() {
    db.serialize(() => {
        db.each('SELECT * FROM TB_LOGEMAIL', (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + "\t" + row.email+ "\t" + row.param + "\t" + row.valor_lido);
        });
    });
};

let disconnect = function() {
    db.close((err) => {
        if (err) {
        console.error(err.message);
        }
        console.log('Close the database connection.');
    });
};

exports.connect = connect;
exports.disconnect = disconnect;
exports.getLogsEmail = getLogsEmail;
exports.createLogEmail = createLogEmail;