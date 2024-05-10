const { response } = require("express");

const Ahorro = require("../models/Ahorro")

const getAhorro = async (req, res = response) => {
  const objetivo = await Objetivo.find().populate("usuario", "email");

  res.json({
    ok: true,
    objetivo,
  });
};

const obtenerahorroPorId = async (req, res = response) => {
  try {
    const idUsuario = req.params.idUsuario;

    const ahorro = await Objetivo.find({ usuario: idUsuario }).populate(
      "ahorro"
    );

    res.json({
      ok: true,
      objetivo,
    });
  } catch (error) {
    console.error("error al obtener el ahorro por id:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el ahorro por id",
    });
  }
};

const crearAhorro = async (req, res = response) => {
  const uid = req.uid;
  const { mes } = req.body;
  const { year } = req.body;

  try {
    const AhorroExistente = await ahorro.findOne({ usuario: uid, mes, year });

    if (ahorroExistente) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya tiene un ahorro establecido",
      });
    }

    const ahorro = new Ahorro({
      usuario: uid,
      mes,
      year,
      ...req.body,
    });

    const ahorroguardado = await objetivo.save();

    res.json({
      ok: true,
      objetivo: ahorroguardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getAhorro,
  crearAhorro,
  obtenerahorroPorId,
};
