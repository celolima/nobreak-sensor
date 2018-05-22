-- ATIVAR A FOREIGN_KEY: PRAGMA foreign_keys = ON; CHECK IF IS ENABLE => PRAGMA foreign_keys;
-- sqlite3 database.db -init dump.sql

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS TB_CLIENT (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome text,
    endereco text,
    nr integer,
    tel text
);

CREATE TABLE IF NOT EXISTS TB_DEVICE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc text NOT NULL,
    key text NOT NULL,
    fk_client NOT NULL,
    FOREIGN KEY (fk_client) REFERENCES TB_CLIENT (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS TB_PARAM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc text NOT NULL,
    unMed text NOT NULL,
    topic text NOT NULL,
    fk_device INTEGER NOT NULL,
    FOREIGN KEY (fk_device) REFERENCES TB_DEVICE (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS TB_REACT (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo text NOT NULL,
    condition text NOT NULL,
    valor_ref real NOT NULL,
    fk_param INTEGER NOT NULL,
    action_type text NOT NULL,
    endereco text NOT NULL,
    message text NOT NULL,
    FOREIGN KEY (fk_param) REFERENCES TB_PARAM (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS TB_LOGEMAIL (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_hora datetime default current_timestamp,
    valor_lido REAL,
    fk_param_react,
    FOREIGN KEY (fk_param_react) REFERENCES TB_PARAM_REACT (id) ON DELETE CASCADE
);

/*
INSERT INTO TB_DEVICE (id,desc, key) VALUES (1,'Sensor AB01', '443DAS#!@#FF');
INSERT INTO TB_PARAM (id,desc) VALUES (1,'Temperatura');
INSERT INTO TB_DEVICE_PARAM (id,fk_device,fk_param) VALUES (1,1,1);
INSERT INTO TB_LOG (fk_device_param,value,data_hora) VALUES (1,'40',DATETIME('now'));
INSERT INTO TB_LOGEMAIL (email,data_hora,id_device,param,valor_lido) VALUES ('celorsl@yahoo.com.br',DATETIME('now'),'adasda9090-90a9s0da-dasda','tensão',98.6);
*/