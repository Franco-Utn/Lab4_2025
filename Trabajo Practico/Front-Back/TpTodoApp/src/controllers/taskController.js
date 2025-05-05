const Task = require("../models/task.model");
const Sprint = require("../models/sprint.model");

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(204).json({ message: "No hay tareas disponibles" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas", details: error.message });
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = res.tarea;
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea", details: error.message });
  }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, deadline, color } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({ message: "El título y la fecha límite son obligatorios" });
    }

    const taskData = new Task({ title, description, status, deadline, color });
    const savedTask = await taskData.save();
    
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea", details: error.message });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea", details: error.message });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const task = res.tarea;
    
    // Verificar si la tarea está asignada a un sprint
    const sprintWithTask = await Sprint.findOne({ tasks: req.params.id });
    if (sprintWithTask) {
      return res.status(400).json({ 
        message: "No se puede eliminar la tarea porque está asignada a un sprint"
      });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `La tarea ${task.title} eliminada correctamente` });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea", details: error.message });
  }
};