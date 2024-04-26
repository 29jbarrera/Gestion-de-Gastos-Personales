const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuarios = require("../models/Usuarios");
const { generarJWT } = require("../helpers/jwt");

// Obtener Usuarios
const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  console.log(desde);

  const usuario = await Usuarios.find().skip(desde).limit(20);

  const total = await Usuarios.countDocuments();

  res.json({
    ok: true,
    usuario,
    total,
  });
};

// Obtener Usuario Logeado
const getUsuarioLogeado = async (req, res) => {
  const { email } = req.body;
  try {
    // Buscar el usuario por su correo electrónico
    const usuario = await Usuarios.findOne({ email });
    // Verificar si se encontró el usuario
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    // Enviar solo el nombre del usuario como respuesta
    res.json({
      ok: true,
      nombreUsuario: usuario.nombre,
      idUsuario: usuario.id,
      role: usuario.role
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({
      ok: false,
      message: "Error al obtener el usuario",
    });
  }
};

// Crear Usuario
const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuarios.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }
    const usuario = new Usuarios(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar Usuario
    await usuario.save();

    // Generar el TOKEN
    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado....revisar logs",
    });
  }
};

// Actualizar Usuario

const actualizarUsuario = async (req, res = response) => {
  // TDO: Validar token y comprobar si el usuario es correcto

  const uid = req.params.id;

  try {
    const usuarioDB = await Usuarios.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }
    // Actualizaciones  //Actualizo contraseña pero se guarda sin encriptarse
    const campos = req.body;

    if (usuarioDB.email === req.body.email) {
      delete campos.email;
    }

    const usuarioActualizado = await Usuarios.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

// Borrar Usuario

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuarios.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await Usuarios.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  // usuariosCtrl
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  getUsuarioLogeado,
};
