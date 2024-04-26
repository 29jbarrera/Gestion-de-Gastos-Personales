const { response } = require("express");

const Ingresos = require("../models/Ingresos");

const getIngresos = async (req, res = response) => {
  const ingresos = await Ingresos.find().populate("usuario", "email");

  res.json({
    ok: true,
    ingresos,
  });
};

const obtenerIngresosPorId = async (req, res = response) => {
  try {
    const idUsuario = req.params.idUsuario;

    const ingresos = await Ingresos.find({ usuario: idUsuario }).populate(
      "usuario",
      " email"
    );

    res.json({
      ok: true,
      ingresos,
    });
  } catch (error) {
    console.error("error al obtener los ingresos por id:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener los ingresos por id",
    });
  }
};

const crearIngresos = async (req, res = response) => {
  const uid = req.uid;
  const ingresos = new Ingresos({
    usuario: uid,
    ...req.body,
  });

  try {
    const ingresoguardado = await ingresos.save();

    res.json({
      ok: true,
      gastos: ingresoguardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarIngresos = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const ingresosdb = await Ingresos.findById(id);

    if (!ingresosdb) {
      return res.status(404).json({
        ok: true,
        msg: "Ingreso no encontrado",
      });
    }

    const cambioIngreso = {
      ...req.body,
      usuario: uid,
    };

    const ingresoactualizado = await Ingresos.findByIdAndUpdate(
      id,
      cambioIngreso,
      { new: true }
    );

    res.json({
      ok: true,
      gastos: ingresoactualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarIngresos = async (req, res = response) => {
  const id = req.params.id;

  try {
    const ingresosdb = await Ingresos.findById(id);

    if (!ingresosdb) {
      return res.status(404).json({
        ok: true,
        msg: "Ingreso no encontrado",
      });
    }

    await Ingresos.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Ingreso eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getIngresos,
  crearIngresos,
  actualizarIngresos,
  borrarIngresos,
  obtenerIngresosPorId
};
