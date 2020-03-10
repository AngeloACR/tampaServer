const bcrypt = require('bcryptjs');
const environment = require('../../config/environment');
const crypto = require('crypto');
const db = require('../../database');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

module.exports.addEmisor = async function(newEnvio) {
    try {
        let query = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
        let queryData = ['emisores', 'nombre', 'apellido', 'cedula', newEnvio.emisor.nombre, newEnvio.emisor.apellido, newEnvio.emisor.cedula];
        let results = await this.queryDb(query, queryData);
        if (resutls[0]) {

            let response = {
                status: true,
                values: results
            }
            return response;
        }
        throw new Error("Something went wrong")
    } catch (error) {
        throw error;
    }
};

module.exports.getEmisores = async function() { //Need tons of work
    try {
        let query = 'SELECT * FROM ??';
        let queryData = ['emisores'];
        let results = await this.queryDb(query, queryData);
        if (!results) {
            throw new Error("Emisor doesn't exist")
        }
        var uMap = [{}];
        var i = 0;
        results.forEach(function(result) {
            uMap[i] = {
                nombre: result.nombre,
                apellido: result.apellido,
                cedula: result.cedula,
            };
            i++;
        });
        let fields = ['Nombre', 'Apellido', 'Cedula']
        let response = {
            status: true,
            values: uMap,
            fields: fields
        }
        return response;
    } catch (error) {
        throw error;
    }
};

const Emisor = module.exports