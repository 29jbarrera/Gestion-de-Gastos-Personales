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
} = require('../controllers/objetivo.controllers')

const  router = Router()

router.get('/',getAhorro);

router.get("/:idUsuario", obtenerAhorroPorId);

router.post('/',
[
    validarJWT,
    check('ahorro','El objetivo es necesario').not().isEmpty(),
    validarCampos
],
crearAhorro);

module.exports = router;