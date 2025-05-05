const Publication = require("../models/Publication");

// ●	GET /publications → Obtener todas las publicaciones.
const getAllPublications = async (req, res) => {
  try {
    const publicaciones = await Publication.find().populate("autores");
    if (publicaciones.length === 0) {
      return res.status(404).json({ message: "No hay publicaciones disponibles" });
    }
    res.status(200).json(publicaciones);
  } catch {
    res.status(500).json({ messaje: "Error al obtener los publicaciones" });
  }
};
// ●	GET /publications/:id → Obtener una publicación por ID.

const getPublicationById = async (req, res) => {
  try {
    const Publicacion = await Publication.findById(req.params.id);
    if (!Publicacion) {
      return res.status(404).json({ message: "No se encontro el Publicacion" });
    }
    res.status(200).json(Publicacion);
  } catch {
    res.status(500).json({ message: "Error al obtener el Publicacion" });
  }
};

// ●	POST /publications → Crear una publicación.

const createPublication = async (req, res) => {
  try {
    const nuevoPublicacion = new Publication(req.body);
    const publicacionGuardado = await nuevoPublicacion.save();
    res.status(201).json(publicacionGuardado);
  } catch {
    res
      .status(400)
      .json({
        message: "Error al crear el publicacion, revise los datos ingresados",
      });
  }
};
// ●	PUT /publications/:id → Editar una publicación.

const editarPublication = async (req, res) => {
    try {
      const publicacionActualizado = await Publication.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate("autores");
      if (!publicacionActualizado) {
        return res.status(404).json({ message: "No se encontro el publicacion" });
      }
      res.status(200).json(publicacionActualizado);
    } catch {
      res.status(500).json({ message: "Error al editar el publicacion" });
    }
  };
// ●	DELETE /publications/:id → Eliminar una publicación.
const eliminarPublication = async (req, res) => {
  try {
    const publicacionEliminado = await Publication.findByIdAndDelete(req.params.id);
    if (!publicacionEliminado) {
      return res.status(404).json({ message: "No se encontro la publicacion" });
    }
    res.status(200).json({ message: "publicacion eliminada correctamente" });
  } catch {
    res.status(500).json({ message: "Error al eliminar la publicacion" });
  }
};
module.exports = {
  getAllPublications,
  getPublicationById,
  createPublication,
  editarPublication,
  eliminarPublication,
};