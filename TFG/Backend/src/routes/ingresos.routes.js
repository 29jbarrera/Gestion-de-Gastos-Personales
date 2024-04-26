/*
     Ruta: /api/ingresos
*/
const { Router  } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getIngresos,
    crearIngresos,
    actualizarIngresos,
    borrarIngresos,
    obtenerIngresosPorId
} = require('../controllers/ingresos.controllers')

const  router = Router()

router.get('/',getIngresos);

router.get("/:idUsuario", obtenerIngresosPorId);

router.post('/',
[
    validarJWT,
    check('description','La descripción es necesaria').not().isEmpty(),
    check('importe','El importe es necesario').not().isEmpty(),
    validarCampos
],
crearIngresos);

router.put('/:id',
[
    validarJWT,
    check('description','La descripción es necesaria').not().isEmpty(),
    check('importe','El importe es necesario').not().isEmpty(),
    validarCampos
],
actualizarIngresos);

router.delete('/:id',
    validarJWT,
    borrarIngresos);


module.exports = router;