/*
     Ruta: /api/gastos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getGastos,
  crearGastos,
  actualizarGastos,
  borrarGastos,
  obtenerGastosPorId,
} = require("../controllers/gastos.controllers");

const router = Router();

router.get("/", getGastos);

router.get("/:idUsuario", obtenerGastosPorId);

router.post(
  "/",
  [
    validarJWT,
    check("description", "La descripción es necesaria").not().isEmpty(),
    check("importe", "El importe es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearGastos
);

router.put(
  "/:id",
  [
    validarJWT,
    check("description", "La descripción es necesaria").not().isEmpty(),
    check("importe", "El importe es necesario").not().isEmpty(),
    validarCampos,
  ],
  actualizarGastos
);

router.delete("/:id", validarJWT, borrarGastos);

module.exports = router;
