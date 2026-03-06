const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const pool = require("../config/database");

const router = express.Router();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Ruta
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

router.post("/registrar", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  try {
    const query =
      "INSERT INTO registros (nombre, email, mensaje) VALUES ($1, $2, $3)";
    const values = [nombre, email, mensaje];
    await pool.query(query, values);

    // enviar correo de confirmación
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmación de Registro",
      text: `Hola ${nombre},

Gracias por registrarte en el Centro Cultural Coreano. Hemos recibido tu mensaje.

Saludos,
Centro Cultural Coreano`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registro Exitoso</title>
          <script>
              setTimeout(() => {
                  window.location.href = '/index.html';
              }, 5000);
          </script>
      </head>
      <body>
          <h1>¡Registro Exitoso!</h1>
          <p>Gracias por registrarte. Serás redirigido a la página principal en unos segundos.</p>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Error al guardar en NeonDB o enviar correo:", error);
    res.status(500).send("Hubo un error al procesar el registro.");
  }
});

module.exports = router;