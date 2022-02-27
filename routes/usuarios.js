const { Router } = require('express');
const { usuariosGet, usuariosCreate, usuariosUpdate, usuariosDelete, usuariosPatch } = require('../controller/usuarios');
const router = Router();

router.get('/', usuariosGet);

router.post('/', usuariosCreate);

router.put('/:id', usuariosUpdate);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;