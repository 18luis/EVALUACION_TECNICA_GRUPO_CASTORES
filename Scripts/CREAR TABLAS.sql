CREATE TABLE usuario (
  id bigint NOT NULL AUTO_INCREMENT,
  contrasenia varchar(255) DEFAULT NULL,
  nombre_de_usuario varchar(255) DEFAULT NULL,
  rol varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE producto (
  id bigint NOT NULL AUTO_INCREMENT,
  cantidad bigint NOT NULL,
  estatus varchar(255) DEFAULT NULL,
  nombre varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE `movimiento` (
  id bigint NOT NULL AUTO_INCREMENT,
  autor varchar(255) DEFAULT NULL,
  fecha varchar(255) DEFAULT NULL,
  hora varchar(255) DEFAULT NULL,
  tipo_movimiento varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);