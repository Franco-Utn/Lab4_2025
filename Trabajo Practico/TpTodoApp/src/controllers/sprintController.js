const Sprint = require("../models/sprint.model");
const Task = require("../models/task.model");
const Backlog = require("../models/backlog.model");

// Obtener todos los sprints
exports.getAllSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate("tasks");
    
    if (sprints.length === 0) {
      return res.status(204).json({ message: "No hay sprints disponibles" });
    }
    
    res.status(200).json(sprints);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los sprints", details: error.message });
  }
};

// Obtener un sprint por ID
exports.getSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate("tasks");
    res.status(200).json(sprint);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el sprint", details: error.message });
  }
};

// Crear un sprint
exports.createSprint = async (req, res) => {
  try {
    const { startDate, endDate, tasks, color } = req.body;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Las fechas de inicio y cierre son obligatorias" });
    }
    
    // Verificar que la fecha de inicio sea anterior a la fecha de cierre
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "La fecha de inicio debe ser anterior a la fecha de cierre" });
    }
    
    // Verificar que todas las tareas existen
    if (tasks && tasks.length > 0) {
      for (const taskId of tasks) {
        const task = await Task.findById(taskId);
        if (!task) {
          return res.status(404).json({ message: `La tarea con ID ${taskId} no existe` });
        }
      }
    }
    
    const sprintData = new Sprint({ startDate, endDate, tasks: tasks || [], color });
    const savedSprint = await sprintData.save();
    
    // Si hay tareas, eliminarlas del backlog
    if (tasks && tasks.length > 0) {
      const backlog = await Backlog.findOne();
      if (backlog) {
        backlog.tasks = backlog.tasks.filter(task => !tasks.includes(task.toString()));
        await backlog.save();
      }
    }
    
    res.status(201).json(savedSprint);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el sprint", details: error.message });
  }
};

// Actualizar un sprint
exports.updateSprint = async (req, res) => {
  try {
    const { startDate, endDate, tasks, color } = req.body;
    
    // Verificar que la fecha de inicio sea anterior a la fecha de cierre si ambas están presentes
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "La fecha de inicio debe ser anterior a la fecha de cierre" });
    }
    
    // Verificar que todas las tareas existen si se proporcionan
    if (tasks && tasks.length > 0) {
      for (const taskId of tasks) {
        const task = await Task.findById(taskId);
        if (!task) {
          return res.status(404).json({ message: `La tarea con ID ${taskId} no existe` });
        }
      }
    }
    
    const updatedSprint = await Sprint.findByIdAndUpdate(
      req.params.id,
      { startDate, endDate, tasks, color },
      { new: true }
    ).populate("tasks");
    
    res.status(200).json(updatedSprint);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el sprint", details: error.message });
  }
};

// Eliminar un sprint
exports.deleteSprint = async (req, res) => {
  try {
    const sprint = res.sprint;
    
    // Mover las tareas del sprint al backlog
    if (sprint.tasks.length > 0) {
      let backlog = await Backlog.findOne();
      
      if (!backlog) {
        backlog = new Backlog({ tasks: [] });
      }
      
      backlog.tasks = [...new Set([...backlog.tasks, ...sprint.tasks])];
      await backlog.save();
    }
    
    await Sprint.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: "Sprint eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el sprint", details: error.message });
  }
};

// Agregar una tarea a un sprint
exports.addTaskToSprint = async (req, res) => {
  try {
    const { id, taskId } = req.params;
    
    // Verificar que la tarea existe
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    
    const sprint = res.sprint;
    
    // Verificar si la tarea ya está en el sprint
    if (sprint.tasks.includes(taskId)) {
      return res.status(400).json({ message: "La tarea ya está asignada a este sprint" });
    }
    
    // Agregar la tarea al sprint
    sprint.tasks.push(taskId);
    await sprint.save();
    
    // Eliminar la tarea del backlog si está allí
    const backlog = await Backlog.findOne();
    if (backlog && backlog.tasks.includes(taskId)) {
      backlog.tasks = backlog.tasks.filter(task => task.toString() !== taskId);
      await backlog.save();
    }
    
    res.status(200).json({ message: "Tarea agregada al sprint correctamente", sprint });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la tarea al sprint", details: error.message });
  }
};