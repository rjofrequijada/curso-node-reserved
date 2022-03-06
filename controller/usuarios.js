const { response } = require('express');
const Usuario = require('../models/usuario');

const usuariosGet = (req, res = response) => {
    const query = req.query;
    res.json({
        msg: "get API - Controlador",
        query
    });
}

const usuariosCreate = async (req, res = response) => {

    const body = req.body;
    const usuario = new Usuario(body);

    await usuario.save();
    res.json({
        msg: "post API - usuariosPost",
        usuario
    });
}
const usuariosUpdate = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: "put API - Controlador",
        id
    });
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete API - Controlador"
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controlador"
    });
}


module.exports = {
    usuariosGet,
    usuariosCreate,
    usuariosUpdate,
    usuariosDelete,
    usuariosPatch
}