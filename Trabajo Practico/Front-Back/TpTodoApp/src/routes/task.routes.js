const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Middleware para verificar si existe una tarea
const getTask = async (req, res, next) => {
  let tarea;
  const {id} = req.params;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    return res.status(404).json({message: "ID de la tarea es inválido"});
  }
  try {
    tarea = await require("../models/task.model").findById(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  res.tarea = tarea;
  next();
};

// Ruta GET /tasks: Obtener todas las tareas
router.get("/", taskController.getAllTasks);

// Ruta GET /tasks/:id: Obtener una tarea por ID
router.get("/:id", getTask, taskController.getTaskById);

// Ruta POST /tasks: Crear una nueva tarea
router.post("/", taskController.createTask);

// Ruta PUT /tasks/:id: Editar una tarea existente
router.put("/:id", getTask, taskController.updateTask);

// Ruta DELETE /tasks/:id: Eliminar una tarea
router.delete("/:id", getTask, taskController.deleteTask);

module.exports = router;