// Projects

const Project = require("../models/Project");

// ●	GET /projects → Obtener todos los proyectos.

const getAllProjects = async (req, res) => {
  try {
    const proyectos = await Project.find().populate("investigadores");
    if (proyectos.length === 0) {
      return res.status(404).json({ message: "No hay proyectos disponibles" });
    }
    res.status(200).json(proyectos);
  } catch {
    res.status(500).json({ messaje: "Error al obtener los proyectos" });
  }
};
// ●	GET /projects/:id → Obtener un proyecto por ID.

const getProjectById = async (req, res) => {
  try {
    const proyecto = await Project.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ message: "No se encontro el proyecto" });
    }
    res.status(200).json(proyecto);
  } catch {
    res.status(500).json({ message: "Error al obtener el proyecto" });
  }
};

// ●	POST /projects → Crear un nuevo proyecto.

const createProject = async (req, res) => {
  try {
    const nuevoProyecto = new Project(req.body);
    const proyectoGuardado = await nuevoProyecto.save();
    res.status(201).json(proyectoGuardado);
  } catch {
    res
      .status(400)
      .json({
        message: "Error al crear el proyecto, revise los datos ingresados",
      });
  }
};
// ●	PUT /projects/:id → Editar un proyecto.

const editarProject = async (req, res) => {
  try {
    const proyectoActualizado = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("investigadores");
    if (!proyectoActualizado) {
      return res.status(404).json({ message: "No se encontro el proyecto" });
    }
    res.status(200).json(proyectoActualizado);
  } catch {
    res.status(500).json({ message: "Error al editar el proyecto" });
  }
};

// ●	DELETE /projects/:id → Eliminar un proyecto.

const eliminarProject = async (req, res) => {
  try {
    const proyectoEliminado = await Project.findByIdAndDelete(req.params.id);
    if (!proyectoEliminado) {
      return res.status(404).json({ message: "No se encontro el proyecto" });
    }
    res.status(200).json({ message: "Proyecto eliminado correctamente" });
  } catch {
    res.status(500).json({ message: "Error al eliminar el proyecto" });
  }
};

// ●	PUT /projects/:id/add-researcher/:researcherId → Asignar un investigador a un proyecto.
const asignarInvestigador = async (req, res) => {
  try {
    const { id, researcherId } = req.params;
    const proyecto = await Project.findById(id);
    if (!proyecto) {
      return res.status(404).json({ message: "No se encontro el proyecto" });
    }

    if (!proyecto.investigadores.includes(researcherId)) {
      proyecto.investigadores.push(researcherId);
      await proyecto.save();
    }

    await proyecto.populate("investigadores");

    res.status(200).json(proyecto);
  } catch {
    res.status(500).json({ message: "Error al asignar el investigador" });
  }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    editarProject,
    eliminarProject,
    asignarInvestigador,
    };
