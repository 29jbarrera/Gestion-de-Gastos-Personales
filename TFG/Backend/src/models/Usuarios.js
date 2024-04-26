const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "USER_ROLE",
    },
    Fecha: {
      type: String,
      default: () => {
        const date = new Date();
        const day = ('0' + date.getDate()).slice(-2); 
        const month = ('0' + (date.getMonth() + 1)).slice(-2); 
        const hours = ('0' + date.getHours()).slice(-2); 
        const minutes = ('0' + date.getMinutes()).slice(-2); 
        return `${day} / ${month} | ${hours}:${minutes} h`;
      }
    }
  },
);

UsuariosSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } =
    this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Usuarios", UsuariosSchema, "Usuarios");
