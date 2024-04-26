const { response } = require("express");

const Usuarios = require("../models/Usuarios");
const Gastos = require("../models/Gastos");
const Ingresos = require("../models/Ingresos");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, gastos, ingresos] = await Promise.all([
    Usuarios.find({ email: regex }),
    Gastos.find({ description: regex }),
    Ingresos.find({ description: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    gastos,
    ingresos,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "gastos":
      data = await Gastos.find({ description: regex }).populate(
        "usuario",
        "email role"
      );
      break;

    case "ingresos":
      data = await Ingresos.find({ description: regex }).populate(
        "usuario",
        "email role"
      );
      break;

    case "usuarios":
      data = await Usuarios.find({ email: regex });

      break;

    default:
      res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios/gastos/ingresos",
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
