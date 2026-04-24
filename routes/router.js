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

// Agregar rutas para servir archivos HTML sin la extensión

// Ruta para "registro"
router.get("/registro", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/registrate.html"));
});

// Ruta para "inicio"
router.get("/inicio", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
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
    <title>콜롬비아 한국문화센터</title>
    <script>
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 5000);
    </script>
    <link rel="icon" href="assets/images/Logo nuevo CCC.jpeg" type="image/x-icon" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body class="bg-white text-gray-800 korean-pattern min-h-screen flex flex-col">

    <!-- Contenido principal centrado -->
    <div class="flex-1 flex items-center justify-center px-4 py-12">
        <div
            class="text-center bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-10 max-w-md border border-gray-100">
            <!-- Icono de éxito -->
            <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fas fa-check-circle text-5xl text-green-600"></i>
            </div>

            <h1 class="text-4xl font-bold text-red-600 mb-4">¡Registro Exitoso!</h1>

            <!-- Decoración coreana -->
            <div class="flex justify-center space-x-2 mb-4">
                <span class="w-12 h-1 bg-red-600 rounded-full"></span>
                <span class="w-12 h-1 bg-blue-600 rounded-full"></span>
                <span class="w-12 h-1 bg-red-600 rounded-full"></span>
            </div>

            <p class="text-gray-700 mb-6 text-lg leading-relaxed">
                감사합니다<br />
                Gracias por registrarte en el Centro Cultural Coreano.
            </p>

            <p class="text-gray-600 mb-8">
                Serás redirigido a la página principal en unos segundos...
            </p>

            <!-- Spinner al estilo coreano -->
            <div class="flex justify-center items-center space-x-3 mb-6">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
                <span class="text-gray-500">Espera por favor</span>
            </div>

            <!-- Botones de acción -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="index.html"
                    class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium inline-flex items-center justify-center">
                    <i class="fas fa-home mr-2"></i>
                    Ir al inicio ahora
                </a>
            </div>
        </div>
    </div>

</body>

</html>
    `);
  } catch (error) {
    console.error("Error al guardar en NeonDB o enviar correo:", error);
    res.status(500).send("Hubo un error al procesar el registro.");
  }
});

module.exports = router;
