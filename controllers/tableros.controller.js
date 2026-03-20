const { Tablero, Lista } = require("../models");

/* =========================
   GET tableros del usuario
========================= */
exports.getTableros = async (req, res) => {
  try {
    const tableros = await Tablero.findAll({
      where: { userId: req.usuario.id }
    });

    res.json(tableros);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo tableros" });
  }
};

/* =========================
   CREAR tablero
========================= */
exports.createTablero = async (req, res) => {
  const { titulo } = req.body;

  try {
    const userId = req.usuario.id;

    // 1️⃣ Crear tablero
    const tablero = await Tablero.create({
      titulo,
      userId
    });

    // 2️⃣ Listas base
    const listasBase = ["Pendiente", "En progreso", "Hecho"];

    const listas = await Lista.bulkCreate(
      listasBase.map(nombre => ({
        titulo: nombre,
        tableroId: tablero.id
      }))
    );

    // 3️⃣ Respuesta más completa (opcional pero pro)
    res.status(201).json({
      tablero,
      listas
    });

  } catch (error) {
    console.error("ERROR CREANDO TABLERO:", error);
    res.status(500).json({ error: "Error creando tablero" });
  }
};