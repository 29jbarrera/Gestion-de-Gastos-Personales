const { Schema, model } = require("mongoose");

const GastosSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    importe: {
      type: Number,
      required: true,
    },
    mes: {
      type: String,
      required:true
    },
    year: {
      type: Number,
      required:true
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
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

GastosSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Gastos", GastosSchema, "Gastos");
