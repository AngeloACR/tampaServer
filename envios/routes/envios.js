const express = require('express');
const enviosRouter = express.Router();
const Paquete = require('../models/paquete');
const Emisor = require('../models/emisor');
const Receptor = require('../models/receptor');

//**************************** USER CRUD************************************//
enviosRouter.post('/', async(req, res) => {
    try {

        let emisor = req.body.emisor;
        let receptor = req.body.receptor;
        let destino = req.body.paquete.estado + ', ' + req.body.paquete.ciudad + ', ' + req.body.paquete.direccion
        let paquete = {
            cedulaEmisor: emisor.cedula,
            cedulaReceptor: receptor.cedula,
            peso: req.body.paquete.peso,
            destino: destino,
            precio: req.body.paquete.precio
        };
        console.log(paquete)


        let emisorR = await Emisor.addEmisor(emisor);
        let receptorR = await Receptor.addReceptor(receptor);
        let response = await Paquete.addPaquete(paquete);
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e.toString());
    }
});

// Get User
enviosRouter.get('/', async(req, res, next) => {
    const guia = req.query.guia;
    //	let item = JSON.parse(jsonItem); 
    let response = await User.getPaquete(guia);
    res.status(200).json(response);
});


enviosRouter.get('/paquetes', async(req, res, next) => {
    try {

        let response = await Paquete.getPaquetes();
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e.toString());
    }

});
enviosRouter.get('/emisores', async(req, res, next) => {
    try {

        let response = await Emisor.getEmisores();
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e.toString());
    }

});
enviosRouter.get('/receptores', async(req, res, next) => {
    try {

        let response = await Receptor.getReceptores();
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(e.toString());
    }

});
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
module.exports = enviosRouter;