const bcrypt = require('bcryptjs');
const environment = require('../../config/environment');
const crypto = require('crypto');
const db = require('../../database');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

module.exports.addEnvio = async function(newEnvio) {
    try {
        let guia = await this.getGuia(newEnvio)
        let query = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
        let queryData = ['paquetes', 'emisor', 'recptor', 'peso', 'precio', 'destino', 'guia', newEnvio.cedulaEmisor, newEnvio.cedulaReceptor, newEnvio.paquete.peso, newEnvio.paquete.precio, newEnvio.paquete.destino, guia];
        let results = await this.queryDb(query, queryData);
        if (results[0]) {

            let response = {
                status: true,
                values: guia
            }
            return response;
        }
        throw new Error("Something went wrong")
    } catch (error) {
        throw error;
    }
};

module.exports.getGuia = async function(newEnvio) {
    let query = 'SELECT COUNT(*) FROM ??';
    let queryData = ['paquetes'];
    let results = await this.queryDb(query, queryData);
    return results;
}

module.exports.getPaquete = async function(guia) { //Need tons of work
    try {
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let queryData = ['paquetes', 'guia', guia];
        let results = await this.queryDb(query, queryData);
        if (!results[0]) {
            throw new Error("Paquete")
        }
        let paquete = {
            //			id: results[0].id,
            emisor: results[0].emisor,
            receptor: results[0].receptor,
            peso: results[0].peso,
            precio: results[0].precio,
            destino: results[0].destino,
            guia: results[0].guia,
        }
        let fields = ['Emisor', 'Receptor', 'Peso', 'Precio', 'Destino', 'Guia']
        let response = {
            status: true,
            values: paquete,
            fields: fields
        }
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports.getPaquetes = async function() { //Need tons of work
    try {
        let query = 'SELECT * FROM ??';
        let queryData = ['paquetes'];
        let results = await this.queryDb(query, queryData);
        if (!results) {
            throw new Error("Emisor doesn't exist")
        }
        var uMap = [{}];
        var i = 0;
        results.forEach(function(result) {
            uMap[i] = {
                emisor: results.emisor,
                receptor: results.receptor,
                peso: results.peso,
                precio: results.precio,
                destino: results.destino,
                guia: results.guia,
            };
            i++;
        });
        let fields = ['Emisor', 'Receptor', 'Peso', 'Precio', 'Destino', 'Guia']
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
const Paquete = module.exports