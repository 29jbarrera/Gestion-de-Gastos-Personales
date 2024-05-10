/*
     Ruta: /api/ahorro
*/
const { Router  } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getAhorro,
    crearAhorro,
    obtenerAhorroPorId
} = require('../controllers/ahorro.controllers')

const  router = Router()

router.get('/',getAhorro);

router.get("/:idUsuario", obtenerAhorroPorId);

router.post('/',
[
    validarJWT,
    validarCampos
],
crearAhorro);

module.exports = router;