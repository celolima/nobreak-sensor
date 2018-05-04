-- ATIVAR A FOREIGN_KEY: PRAGMA foreign_keys = ON; CHECK IF IS ENABLE => PRAGMA foreign_keys;
-- sqlite3 database.db -init dump.sql

/*
CREATE TABLE IF NOT EXISTS TB_DEVICE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc text NOT NULL,
    key text NOT NULL
);

CREATE TABLE IF NOT EXISTS TB_PARAM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc text NOT NULL
);

CREATE TABLE IF NOT EXISTS TB_DEVICE_PARAM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_device INTEGER NOT NULL,
    fk_param INTEGER NOT NULL,
    FOREIGN KEY (fk_device) REFERENCES TB_DEVICE (id) ON DELETE RESTRICT,
    FOREIGN KEY (fk_param) REFERENCES TB_PARAM (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS TB_LOG (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_device_param INTEGER NOT NULL,
    value text,
    data_hora text,
    FOREIGN KEY (fk_device_param) REFERENCES TB_DEVICE_PARAM (id) ON DELETE RESTRICT
);
*/

CREATE TABLE IF NOT EXISTS TB_LOGEMAIL (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email text,
    data_hora datetime default current_timestamp,
    device_id text,
    device_name text,    
    condition text,
    param text,
    valor_lido REAL,
    valor_def REAL
);

PRAGMA foreign_keys = ON;

/*
INSERT INTO TB_DEVICE (id,desc, key) VALUES (1,'Sensor AB01', '443DAS#!@#FF');
INSERT INTO TB_PARAM (id,desc) VALUES (1,'Temperatura');
INSERT INTO TB_DEVICE_PARAM (id,fk_device,fk_param) VALUES (1,1,1);
INSERT INTO TB_LOG (fk_device_param,value,data_hora) VALUES (1,'40',DATETIME('now'));
INSERT INTO TB_LOGEMAIL (email,data_hora,id_device,param,valor_lido) VALUES ('celorsl@yahoo.com.br',DATETIME('now'),'adasda9090-90a9s0da-dasda','tensão',98.6);
*/