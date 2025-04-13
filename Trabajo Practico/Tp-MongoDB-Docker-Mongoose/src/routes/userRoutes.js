const express = require("express");
const usuario = require("../modules/usuario");

const router = express.Router();

// Ruta GET /usuarios: Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await usuario.find(); // Corregido: Usar el modelo correcto
    if (usuarios.length === 0) {
      return res.status(204).json({ message: "No hay usuarios" });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Ruta POST /usuarios: Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, edad, email } = req.body; // Usar los campos correctos
    if (!nombre || !edad || !email) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const usuarioData = new Usuario({ nombre, edad, email }); // Corregido: Usar el modelo correcto
    const data = await usuarioData.save();
    
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;