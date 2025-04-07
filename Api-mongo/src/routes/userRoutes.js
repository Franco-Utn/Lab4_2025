const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usuarios = await user.find();
    if (usuarios.length === 0) {
      return res.status(204).json({ message: "No hay usuarios" });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, edad } = req.body;
    if (!nombre || !apellido || !edad) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    const userData = new user({
      nombre,
      apellido,
      edad,
    });
    const data = await userData.save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;