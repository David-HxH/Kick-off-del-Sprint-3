const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/auth.middleware");

/* =========================
   RUTA PROTEGIDA DE PRUEBA
========================= */
router.get("/", verificarToken, (req, res) => {
  res.json({
    mensaje: "Acceso autorizado a tableros",
    usuario: req.usuario
  });
});

module.exports = router;