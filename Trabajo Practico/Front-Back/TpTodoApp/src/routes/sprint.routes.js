const express = require("express");
const router = express.Router();
const sprintController = require("../controllers/sprintController");
// Middleware para verificar si el sprint existe
const getSprint = async (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "ID del sprint es inválido" });
  }
  
  try {
    const sprint = await require("../models/sprint.model").findById(id);
    if (!sprint) {
      return res.status(404).json({ message: "Sprint no encontrado" });
    }
    res.sprint = sprint;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Ruta GET /sprints: Obtener todos los sprints
router.get("/", sprintController.getAllSprints);

// Ruta GET /sprints/:id: Obtener un sprint por ID
router.get("/:id", getSprint, sprintController.getSprintById);

// Ruta POST /sprints: Crear un sprint
router.post("/", sprintController.createSprint);

// Ruta PUT /sprints/:id: Editar un sprint
router.put("/:id", getSprint, sprintController.updateSprint);

// Ruta DELETE /sprints/:id: Eliminar un sprint
router.delete("/:id", getSprint, sprintController.deleteSprint);

// Ruta PUT /sprints/:id/add-task/:taskId: Agregar una tarea a un sprint
router.put("/:id/add-task/:taskId", getSprint, sprintController.addTaskToSprint);

module.exports = router;