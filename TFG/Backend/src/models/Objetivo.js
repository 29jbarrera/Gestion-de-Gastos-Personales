const { Schema, model } = require("mongoose");

const ObjetivoSchema = new Schema(
  {
    objetivo: {
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
  },
);

ObjetivoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Objetivo", ObjetivoSchema, "Objetivo");
