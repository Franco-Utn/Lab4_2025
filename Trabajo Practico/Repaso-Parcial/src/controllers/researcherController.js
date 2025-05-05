const Researcher = require("../models/Researcher");
const Project = require("../models/Project");
// ●	GET /researchers → Obtener todos los investigadores.
const getAllResearchers = async (req, res) => {
  try {
    const investigadores = await Researcher.find().populate("proyectos");
    if (investigadores.length === 0) {
      return res.status(404).json({ message: "No hay investigadores disponibles" });
    }
    res.status(200).json(investigadores);
  } catch {
    res.status(500).json({ messaje: "Error al obtener los investigadores" });
  }
};
// ●	GET /researchers/:id → Obtener un investigador por ID.

const getResearcherById = async (req, res) => {
  try {
    const investigador = await Researcher.findById(req.params.id);
    if (!investigador) {
      return res.status(404).json({ message: "No se encontro el investigador" });
    }
    res.status(200).json(investigador);
  } catch {
    res.status(500).json({ message: "Error al obtener el investigador" });
  }
};
// ●	POST /researchers → Crear un investigador.

const createResearcher = async (req, res) => {
    try {
      const nuevoInvestigador = new Researcher(req.body);
      const investigadorGuardado = await nuevoInvestigador.save();
      // Actualizar el Proyecto para agregar al investigador
      await Project.updateMany(
      { _id: { $in: req.body.proyectos } },
      { $addToSet: { investigadores: investigadorGuardado._id } }
    );

      res.status(201).json(investigadorGuardado);
    } catch {
      res
        .status(400)
        .json({
          message: "Error al crear el investigador, revise los datos ingresados",
        });
    }
  };
// ●	PUT /researchers/:id → Editar un investigador.
const editarResearcher = async (req, res) => {
  try {
    const investigadorActualizado = await Researcher.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { proyectos: { $each: req.body.proyectos } } }, 
      { new: true }
    ).populate("proyectos");

    if (!investigadorActualizado) {
      return res.status(404).json({ message: "No se encontró el investigador" });
    }

    // Actualizar el Proyecto para agregar al investigador
    await Project.updateMany(
      { _id: { $in: req.body.proyectos } },
      { $addToSet: { investigadores: req.params.id } }
    );

    res.status(200).json(investigadorActualizado);
  } catch (error) {
    console.error("⚠️ Error al editar el investigador:", error);
    res.status(500).json({ message: "Error al editar el investigador" });
  }
};

// ●	DELETE /researchers/:id → Eliminar un investigador.
const eliminarResearcher = async (req, res) => {
  try {
    const investigadorEliminado = await Researcher.findByIdAndDelete(req.params.id);
    if (!investigadorEliminado) {
      return res.status(404).json({ message: "No se encontro el investigador" });
    }
    res.status(200).json({ message: "investigador eliminado correctamente" });
  } catch {
    res.status(500).json({ message: "Error al eliminar el investigador" });
  }
};
module.exports = {
  getAllResearchers,
  getResearcherById,
  createResearcher,
  editarResearcher,
  eliminarResearcher,
};
