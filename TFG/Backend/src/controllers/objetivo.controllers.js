const { response } = require("express");

const Objetivo = require("../models/Objetivo");

const getObjetivo = async (req, res = response) => {
  const objetivo = await Objetivo.find().populate("usuario", "email");

  res.json({
    ok: true,
    objetivo,
  });
};

const obtenerObjetivoPorId = async (req, res = response) => {
  try {
    const idUsuario = req.params.idUsuario;

    const objetivo = await Objetivo.find({ usuario: idUsuario }).populate(
      "objetivo"
    );

    res.json({
      ok: true,
      objetivo,
    });
  } catch (error) {
    console.error("error al obtener el objetivo por id:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el objetivo por id",
    });
  }
};

const crearObjetivo = async (req, res = response) => {
  const uid = req.uid;
  const { mes } = req.body;

  try {
    const objetivoEsxistente = await Objetivo.findOne({ usuario: uid, mes });

    if (objetivoEsxistente) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya tiene un objetivo establecido",
      });
    }

    const objetivo = new Objetivo({
      usuario: uid,
      mes,
      ...req.body,
    });

    const objetivoguardado = await objetivo.save();

    res.json({
      ok: true,
      objetivo: objetivoguardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarObjetivo = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const objetivodb = await Objetivo.findById(id);

    if (!objetivodb) {
      return res.status(404).json({
        ok: true,
        msg: "Objetivo no encontrado",
      });
    }

    const cambioObjetivo = {
      ...req.body,
      usuario: uid,
    };

    const objetivoactualizado = await Objetivo.findByIdAndUpdate(
      id,
      cambioObjetivo,
      { new: true }
    );

    res.json({
      ok: true,
      objetivo: objetivoactualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const borrarObjetivo = async (req, res = response) => {
  const id = req.params.id;

  try {
    const objetivodb = await Objetivo.findById(id);

    if (!objetivodb) {
      return res.status(404).json({
        ok: true,
        msg: "Objetivo no encontrado",
      });
    }

    await Objetivo.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Objetivo eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getObjetivo,
  crearObjetivo,
  actualizarObjetivo,
  borrarObjetivo,
  obtenerObjetivoPorId,
};
