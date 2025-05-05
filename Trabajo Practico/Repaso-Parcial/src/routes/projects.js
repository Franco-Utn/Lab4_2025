const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// Projects

// ●	GET /projects → Obtener todos los proyectos.
router.get("/", projectController.getAllProjects);

// ●	GET /projects/:id → Obtener un proyecto por ID.
router.get("/:id", projectController.getProjectById);

// ●	POST /projects → Crear un nuevo proyecto.
router.post("/", projectController.createProject);

// ●	PUT /projects/:id → Editar un proyecto.
router.put("/:id", projectController.editarProject);

// ●	DELETE /projects/:id → Eliminar un proyecto.
router.delete("/:id", projectController.eliminarProject);

// ●	PUT /projects/:id/add-researcher/:researcherId → Asignar un investigador a un proyecto.
router.put(
  "/:id/add-researcher/:researcherId",
  projectController.asignarInvestigador
);

module.exports = router;
