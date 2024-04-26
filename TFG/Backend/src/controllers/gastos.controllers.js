const { response } = require("express");

const Gastos = require("../models/Gastos");

const getGastos = async (req, res = response) => {
  const gastos = await Gastos.find().populate("usuario", "email");

  res.json({
    ok: true,
    gastos,
  });
};

const obtenerGastosPorId = async (req, res = response) => {
  try {
    const idUsuario = req.params.idUsuario;

    const gastos = await Gastos.find({ usuario: idUsuario }).populate(
      "usuario",
      " email"
    );

    res.json({
      ok: true,
      gastos,
    });
  } catch (error) {
    console.error("error al obtener los gastos por id:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener los gastos por id",
    });
  }
};

const crearGastos = async (req, res = response) => {
  const uid = req.uid;
  const gastos = new Gastos({
    usuario: uid,
    ...req.body,
  });

  try {
    const gastoguardado = await gastos.save();

    res.json({
      ok: true,
      gastos: gastoguardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarGastos = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const gastosdb = await Gastos.findById(id);

    if (!gastosdb) {
      return res.status(404).json({
        ok: true,
        msg: "Gasto no encontrado",
      });
    }

    const cambioGastos = {
      ...req.body,
      usuario: uid,
    };

    const gastoactualizado = await Gastos.findByIdAndUpdate(id, cambioGastos, {
      new: true,
    });

    res.json({
      ok: true,
      gastos: gastoactualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarGastos = async (req, res = response) => {
  const id = req.params.id;

  try {
    const gastosdb = await Gastos.findById(id);

    if (!gastosdb) {
      return res.status(404).json({
        ok: true,
        msg: "Gasto no encontrado",
      });
    }

    await Gastos.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Gasto eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getGastos,
  crearGastos,
  actualizarGastos,
  borrarGastos,
  obtenerGastosPorId,
};
