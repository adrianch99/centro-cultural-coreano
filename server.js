const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/router");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./")));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Sirviendo archivos desde: ${__dirname}`);
});
