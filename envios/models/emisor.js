const bcrypt = require('bcryptjs');
const environment = require('../../config/environment');
const crypto = require('crypto');
const db = require('../../database');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

module.exports.addEmisor = async function(newEnvio) {
    try {
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let queryData = ['emisores', 'cedula', newEnvio.cedula];
        let results = await this.queryDb(query, queryData);
        if (results != 0) {
            return 'done';
        }
        query = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)';
        queryData = ['emisores', 'nombre', 'apellido', 'cedula', newEnvio.nombre, newEnvio.apellido, newEnvio.cedula];
        results = await this.queryDb(query, queryData);
        if (results) {

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
module.exports.queryDb = async function(query, data) {
    try {
        let myDB = db.init();
        let formatedQuery = mysql.format(query, data);
        let results = await myDB.query(formatedQuery);

        return results;
    } catch (e) {
        throw e
    }
};
const Emisor = module.exports