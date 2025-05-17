CREATE DATABASE IF NOT EXISTS inventario_db;

USE inventario_db;

CREATE TABLE usuario (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `contrasenia` varchar(255) DEFAULT NULL,
  `nombre_de_usuario` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO inventario_db.usuario (contrasenia,nombre_de_usuario,rol) VALUES
	 ('$2a$10$1TAMW3ANBht9kOA1R/UoeuKB0zbbmS7baXbrGKdgIr8eM4lIp/VsG','Luis Roberto','ALMACENISTA'),
	 ('$2a$10$8jHkTHDnCbC9HaRPoQO.wuCtmAecFgY22DjkPT6oHSqwCKjsvPzUy','Juan Perez','ADMINISTRADOR');