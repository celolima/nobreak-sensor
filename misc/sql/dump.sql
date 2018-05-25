-- ATIVAR A FOREIGN_KEY: PRAGMA foreign_keys = ON; CHECK IF IS ENABLE => PRAGMA foreign_keys;
-- sqlite3 database.db -init dump.sql inserts.sql

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS TB_EMPRESA (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome text,
    endereco text,
    nr integer,
    tel text
);

CREATE TABLE IF NOT EXISTS TB_USUARIO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome text,
    login text,
    passwd text,
    fk_empresa NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES TB_EMPRESA (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS TB_PERMISSAO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_usuario NOT NULL,
    fk_device INTEGER NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES TB_USUARIO (id) ON DELETE RESTRICT,
    FOREIGN KEY (fk_device) REFERENCES TB_DEVICE (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS TB_PERFIL (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_usuario NOT NULL,
    tipo_acesso text NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES TB_USUARIO (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS TB_DEVICE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    key text NOT NULL
);

CREATE TABLE IF NOT EXISTS TB_PARAM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    unMed text NOT NULL,
    topic text NOT NULL,
    fk_device INTEGER NOT NULL,
    FOREIGN KEY (fk_device) REFERENCES TB_DEVICE (id) ON DELETE RESTRICT,
    CONSTRAINT UNIQUE_DEV_PARAM_NAME UNIQUE (name,fk_device)
);

CREATE TABLE IF NOT EXISTS TB_REACT (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo text NOT NULL,
    condition text NOT NULL,
    valor_ref real NOT NULL,
    fk_param INTEGER NOT NULL,
    action_type text NOT NULL,
    endereco text NOT NULL,
    message text,
    FOREIGN KEY (fk_param) REFERENCES TB_PARAM (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS TB_LOGEMAIL (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_hora datetime default current_timestamp,
    valor_lido REAL,
    fk_react,
    FOREIGN KEY (fk_react) REFERENCES TB_REACT (id) ON DELETE CASCADE
);

INSERT INTO TB_EMPRESA (id,nome,endereco,nr,tel) VALUES (1,'ACTUM','Rua ABC', 85, '31-99728046');
INSERT INTO TB_EMPRESA (id,nome,endereco,nr,tel) VALUES (2,'SENAI','Rua Santo Agostinho', 1717, '31-34825580');

INSERT INTO TB_USUARIO (id,nome,login,passwd,fk_empresa) VALUES (1,'Marcelo','marcelo','marcelo',1);
INSERT INTO TB_USUARIO (id,nome,login,passwd,fk_empresa) VALUES (2,'Mauricio','mauricio','mauricio',1);
INSERT INTO TB_USUARIO (id,nome,login,passwd,fk_empresa) VALUES (3,'Gabriel','gabriel','gabriel',1);
INSERT INTO TB_USUARIO (id,nome,login,passwd,fk_empresa) VALUES (4,'Leonardo','leonardo','leonardo',1);

INSERT INTO TB_USUARIO (id,nome,login,passwd,fk_empresa) VALUES (5,'David','david','david',2);
INSERT INTO TB_USUARIO (id,nome,login,passwd,fk_empresa) VALUES (6,'Carlos','carlos','carlos',2);

INSERT INTO TB_PERFIL (id,fk_usuario,tipo_acesso) VALUES (1,1,'root');
INSERT INTO TB_PERFIL (id,fk_usuario,tipo_acesso) VALUES (2,2,'root');
INSERT INTO TB_PERFIL (id,fk_usuario,tipo_acesso) VALUES (3,3,'root');
INSERT INTO TB_PERFIL (id,fk_usuario,tipo_acesso) VALUES (4,4,'root');

INSERT INTO TB_DEVICE (id,name,key) VALUES (1,'NoBreak01','c83036a4-124a-4fa4-b635-5f53ec1c8d04');
INSERT INTO TB_DEVICE (id,name,key) VALUES (2,'NoBreak02','d54564b5-124a-4fa4-b635-5f53ec1c8d04');
INSERT INTO TB_DEVICE (id,name,key) VALUES (3,'NoBreak01','e65656c2-124a-4fa4-b635-5f53ec1c8d04');
INSERT INTO TB_DEVICE (id,name,key) VALUES (4,'Motor0144','f61236c2-124a-4fa4-b635-5f53ec1c8d04');

INSERT INTO TB_PERMISSAO (id,fk_usuario,fk_device) VALUES (1,5,1);
INSERT INTO TB_PERMISSAO (id,fk_usuario,fk_device) VALUES (2,6,1);
INSERT INTO TB_PERMISSAO (id,fk_usuario,fk_device) VALUES (3,5,2);
INSERT INTO TB_PERMISSAO (id,fk_usuario,fk_device) VALUES (4,6,2);
INSERT INTO TB_PERMISSAO (id,fk_usuario,fk_device) VALUES (5,5,3);
INSERT INTO TB_PERMISSAO (id,fk_usuario,fk_device) VALUES (6,6,3);

INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (1,'Tensão entrada','V','/nobreak01/tensao-entrada/c83036a4-124a-4fa4-b635-5f53ec1c8d04',1);
INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (2,'Tensão saída','V','/nobreak01/tensao-saida/c83036a4-124a-4fa4-b635-5f53ec1c8d04',1);
INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (3,'Tensão bateria','V','/nobreak01/tensao-bateria/c83036a4-124a-4fa4-b635-5f53ec1c8d04',1);
INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (4,'Corrente saída','mA','/nobreak01/corrente-saida/c83036a4-124a-4fa4-b635-5f53ec1c8d04',1);
INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (5,'Frequência de entrada','Hz','/nobreak01/frequencia-entrada/c83036a4-124a-4fa4-b635-5f53ec1c8d04',1);
INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (6,'Frequência de saída','Hz','/nobreak01/frequencia-saida/c83036a4-124a-4fa4-b635-5f53ec1c8d04',1);
INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (7,'Temperatura','°C','/nobreak01/temperatura/c83036a4-124a-4fa4-b635-5f53ec1c8d04',1);
INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (8,'Temperatura','°C','/nobreak02/temperatura/d54564b5-124a-4fa4-b635-5f53ec1c8d04',2);
INSERT INTO TB_PARAM (id,name,unMed,topic,fk_device) VALUES (9,'Tensão entrada','V','/nobreak02/tensao-entrada/d54564b5-124a-4fa4-b635-5f53ec1c8d04',2);

INSERT INTO TB_REACT (id,tipo,condition,valor_ref,fk_param,action_type,endereco,message) VALUES (1,'Inteiro','maior que',127,1,'e-mail','celorsl@yahoo.com.br','');

-- INSERT INTO TB_LOGEMAIL (id,data_hora,valor_lido,fk_react) VALUES (1,)