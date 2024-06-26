/*
    Ruta: /api/login
*/
const { Router  } = require('express');
const { login, renewToken } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
[
    check ('email','El correo es obligatorio').isEmail(),
    check ('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
login
);


router.get('/renew',
[
    validarJWT,
],
renewToken
)






module.exports = router;