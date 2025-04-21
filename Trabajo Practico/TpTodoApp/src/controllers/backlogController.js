const Backlog = require("../models/backlog.model");
const Task = require("../models/task.model");
const Sprint = require("../models/sprint.model");

// Obtener el backlog
exports.getBacklog = async (req, res) => {
  try {
    const backlog = await Backlog.findOne().populate("tasks");
    
    if (!backlog) {
      return res.status(404).json({ message: "No existe un backlog" });
    }
    
    res.status(200).json(backlog);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el backlog", details: error.message });
  }
};

// Crear backlog
exports.createBacklog = async (req, res) => {
  try {
    // Verificar si ya existe un backlog
    const existingBacklog = await Backlog.findOne();
    
    if (existingBacklog) {
      return res.status(400).json({ message: "Ya existe un backlog, solo puede haber uno" });
    }
    
    const { tasks } = req.body;
    
    // Verificar que todas las tareas existen
    if (tasks && tasks.length > 0) {
      for (const taskId of tasks) {
        const task = await Task.findById(taskId);
        if (!task) {
          return res.status(404).json({ message: `La tarea con ID ${taskId} no existe` });
        }
        
        // Verificar que la tarea no esté asignada a un sprint
        const sprintWithTask = await Sprint.findOne({ tasks: taskId });
        if (sprintWithTask) {
          return res.status(400).json({ 
            message: `La tarea con ID ${taskId} ya está asignada a un sprint y no puede agregarse al backlog` 
          });
        }
      }
    }
    
    const backlogData = new Backlog({ tasks: tasks || [] });
    const savedBacklog = await backlogData.save();
    
    res.status(201).json(savedBacklog);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el backlog", details: error.message });
  }
};

// Agregar una tarea al backlog
exports.addTaskToBacklog = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Verificar que la tarea existe
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    
    // Verificar que la tarea no esté asignada a un sprint
    const sprintWithTask = await Sprint.findOne({ tasks: taskId });
    if (sprintWithTask) {
      return res.status(400).json({ 
        message: "La tarea ya está asignada a un sprint y no puede agregarse al backlog" 
      });
    }
    
    // Buscar o crear el backlog
    let backlog = await Backlog.findOne();
    
    if (!backlog) {
      backlog = new Backlog({ tasks: [] });
    }
    
    // Verificar si la tarea ya está en el backlog
    if (backlog.tasks.includes(taskId)) {
      return res.status(400).json({ message: "La tarea ya está en el backlog" });
    }
    
    // Agregar la tarea al backlog
    backlog.tasks.push(taskId);
    await backlog.save();
    
    const updatedBacklog = await Backlog.findById(backlog._id).populate("tasks");
    
    res.status(200).json({ message: "Tarea agregada al backlog correctamente", backlog: updatedBacklog });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la tarea al backlog", details: error.message });
  }
};

// Asegúrate de que estas funciones estén correctamente exportadas
module.exports = {
  getBacklog: exports.getBacklog,
  createBacklog: exports.createBacklog,
  addTaskToBacklog: exports.addTaskToBacklog
};