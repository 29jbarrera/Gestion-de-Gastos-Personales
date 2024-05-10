const { Schema, model } = require("mongoose");

const AhorroSchema = new Schema({
  Ahorro: {
    type: Number,
    required: true,
  },
  mes: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
  },
});

AhorroSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Ahorro", AhorroSchema, "Ahorro");
