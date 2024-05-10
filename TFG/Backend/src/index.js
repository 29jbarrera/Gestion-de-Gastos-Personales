require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./conex-database");

const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/login", require("./routes/auth.routes"));

app.use("/api/gastos", require("./routes/gastos.routes"));

app.use("/api/ingresos", require("./routes/ingresos.routes"));

app.use("/api/objetivo", require("./routes/objetivo.routes"))

app.use("/api/ahorro", require("./routes/ahorro.routes"))

app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puerto", app.get("port"));
});
