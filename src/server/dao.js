const sqlite3 = require('sqlite3');
let db = null;

let connect = function() {
    console.log('Conectando...');
    db = new sqlite3.Database('../misc/sql/database.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the project database.');
      });
};

let getDevices = function() {
    console.log('Obtendo registros: ');
    db.serialize(() => {
        db.each('SELECT * FROM TB_DEVICE', (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + "\t" + row.desc);
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
exports.getDevices = getDevices;