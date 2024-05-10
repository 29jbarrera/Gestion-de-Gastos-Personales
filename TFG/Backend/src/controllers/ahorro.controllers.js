const { response } = require("express");
const Ahorro = require("../models/Ahorro");

const getAhorro = async (req, res = response) => {
  try {
    const objetivos = await Ahorro.find().populate("usuario", "email");

    res.json({
      ok: true,
      objetivos,
    });
  } catch (error) {
    console.error("Error al obtener el ahorro:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el ahorro",
    });
  }
};

const obtenerAhorroPorId = async (req, res = response) => {
  try {
    const idUsuario = req.params.idUsuario;

    const ahorros = await Ahorro.find({ usuario: idUsuario }).populate(
      "usuario"
    );

    res.json({
      ok: true,
      ahorros,
    });
  } catch (error) {
    console.error("Error al obtener el ahorro por id:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el ahorro por id",
    });
  }
};

const crearAhorro = async (req, res = response) => {
  const uid = req.uid;
  const { mes, year } = req.body;

  try {
    const ahorroExistente = await Ahorro.findOne({ usuario: uid, mes, year });

    if (ahorroExistente) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya tiene un ahorro establecido para este mes y año",
      });
    }

    const nuevoAhorro = new Ahorro({
      usuario: uid,
      mes,
      year,
      Ahorro: req.body.Ahorro,
    });

    const ahorroGuardado = await nuevoAhorro.save();

    res.json({
      ok: true,
      ahorro: ahorroGuardado,
    });
  } catch (error) {
    console.error("Error al crear el ahorro:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear el ahorro",
    });
  }
};

module.exports = {
  getAhorro,
  crearAhorro,
  obtenerAhorroPorId,
};
