/*
     Ruta: /api/objetivo
*/
const { Router  } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getObjetivo,
    crearObjetivo,
    actualizarObjetivo,
    borrarObjetivo,
    obtenerObjetivoPorId
} = require('../controllers/objetivo.controllers')

const  router = Router()

router.get('/',getObjetivo);

router.get("/:idUsuario", obtenerObjetivoPorId);

router.post('/',
[
    validarJWT,
    check('objetivo','El objetivo es necesario').not().isEmpty(),
    validarCampos
],
crearObjetivo);

router.put('/:id',
[
    validarJWT,
    check('objetivo','La descripción es necesaria').not().isEmpty(),
    validarCampos
],
actualizarObjetivo);

router.delete('/:id',
    validarJWT,
    borrarObjetivo);


module.exports = router;