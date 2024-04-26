/*
    Ruta: /api/usuarios
*/

const { Router  } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, getUsuarioLogeado , crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');

const  router = Router()

router.get('/', validarJWT ,getUsuarios);

router.post('/logeado',validarJWT,getUsuarioLogeado)

router.post('/',
[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
crearUsuario);

router.put('/:id',
[
    validarJWT,
    check('email','El correo es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
],
actualizarUsuario);

router.delete('/:id',
    validarJWT,
    borrarUsuario);


module.exports = router;