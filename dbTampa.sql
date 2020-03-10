USE tampaDb

DROP DATABASE tampaDb;

CREATE DATABASE tampaDb;

USE tampaDb

CREATE TABLE emisores (
  id int AUTO_INCREMENT,
  nombre varchar(255),
  cedula varchar(255) PRIMARY KEY
);

CREATE TABLE receptores (
  id int AUTO_INCREMENT,
  nombre varchar(255),
  cedula varchar(255) PRIMARY KEY
);

CREATE TABLE paquetes (
  id int AUTO_INCREMENT,
  emisor varchar(255),
  receptor varchar(255),
  peso int,
  precio int,
  destino varchar(255),
  guia varchar(255) PRIMARY KEY
);

ALTER TABLE paquetes ADD FOREIGN KEY (emisor) REFERENCES emisores (cedula);

ALTER TABLE paquetes ADD FOREIGN KEY (receptores) REFERENCES receptores (cedula);