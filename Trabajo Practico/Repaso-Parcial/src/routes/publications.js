const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicationController");

// publications

// ●	GET /publications 
router.get("/", publicationController.getAllPublications);

// ●	GET /publications/:id 
router.get("/:id", publicationController.getPublicationById);

// ●	POST /publications
router.post("/", publicationController.createPublication);

// ●	PUT /publications/:id 
router.put("/:id", publicationController.editarPublication);

// ●	DELETE /publications/:id 
router.delete("/:id", publicationController.eliminarPublication);

module.exports = router;