const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    // const query = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //     .skip(desde)
    //     .limit(limite);
    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}

const usuariosCreate = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en base de datos

    await usuario.save();
    res.json({
        msg: "post API - usuariosPost",
        usuario
    });
}
const usuariosUpdate = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //valdiar contra BD
    if (password) {
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "put API - Controlador",
        usuario
    });
}
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
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